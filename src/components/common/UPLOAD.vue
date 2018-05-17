<template>
  <div>
    <div id="pictureContainer">
      <div class="editImg" v-if="Object.keys(editImg).length>0">
        <div class="imgItem" style="position: relative" v-for="(val,key) in editImg">
          <div style="width: 120px;  height: 120px; border-radius:6px;background: #f0f0f0">
            <img :src="val" alt="">
          </div>
          <div class="remove el-icon-circle-close" @click="deleteImage(key)" v-if="!onlyShow"></div>
        </div>
      </div>
      <div :id="'pickfiles'+ID" class="pickfiles">
        <div class="upButton" :id="ID" @click.stop="getToken">
          <span class="el-icon-plus"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import fileImage from '../../assets/images/file.png'

  export default {
    name: 'hello',
    props: ['ID', 'editImage', 'isClear', 'onlyShow'],
    data() {
      return {
        imgArray: [],
        imgId: [],
        isUploading: false,
        activeIndex: null,
        uploader: null,
        editImg: {},
        isUpId: '',
        token: '',
      }
    },
    mounted() {
      let _this = this;
      $(document).on('click', '#pickfiles' + this.ID + ' ' + '.pic_delete', function () {
        let id = $(this).attr("data-val");
        let toremove = '';
        for (let i in _this.uploader.files) {
          if (_this.uploader.files[i].id === id) {
            toremove = i;
          }
        }
        $('#' + id).remove();
        _this.uploader.splice(toremove, 1);
        for (let i = 0; i < _this.imgArray.length; i++) {
          if (_this.imgArray[i].name.indexOf(id) > -1) {
            _this.imgId.forEach((item) => {
              if (_this.imgArray[i].id === item) {
                _this.imgId = _this.imgId.filter((x) => {
                  return x !== item
                })
              }
            });
            _this.imgArray.splice(i, 1);
          }
        }
        _this.$emit('getImg', [_this.ID, _this.imgId, _this.isUploading]);
      });
      this.getTokenMessage();
    },
    watch: {
      editImage: {
        deep: true,
        handler(val, old) {
          this.editImg = this.editImage;
          this.imgId = [];
          for (let key in val) {
            this.imgId.push(key)
          }
        }
      },
      isClear(val) {
        this.imgId = [];
        this.imgArray = [];
        this.editImg = [];
        $('.imgItem').remove();
        this.uploader.splice(0, this.uploader.files.length);
      }
    },
    methods: {
      mouseOver(index) {
        this.activeIndex = index;
      },
      mouseOut() {
        this.activeIndex = null;
      },
      deleteImage(key) {
        this.imgId = this.imgId.filter((x) => {
          return x !== key
        });
        this.$emit('getImg', [this.ID, this.imgId, this.isUploading]);
        let imgObject = {};
        for (let img in this.editImg) {
          if (img !== key) {
            imgObject[img] = this.editImg[img];
          }
        }
        this.editImg = {};
        this.editImg = imgObject;
      },
      getToken() {
        this.$http.get(globalConfig.server_user + 'files').then((res) => {
          this.token = res.data.data;
          this.$set(this.uploader.settings,'uptoken',this.token);
        })
      },

      getTokenMessage() {
        this.$http.get(globalConfig.server_user + 'files').then((res) => {
          this.token = res.data.data;
          this.uploaderReady();
        })
      },
      uploaderReady() {
        let _this = this;
        _this.uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: _this.ID,       //上传按钮的ID
          uptoken: _this.token,               // uptoken是上传凭证，由其他程序生成
          get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的uptoken
          unique_names: true,                 // 默认false，key为文件
          domain: globalConfig.domain,        // bucket域名，下载资源时用到，必需

//          pictureContainer: 'pictureContainer',             // 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: '100mb',             // 最大文件体积限制
          flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
          max_retries: 1,                     // 上传失败最大重试次数
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: 'pictureContainer',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传

          init: {
            'PostInit': function () {
//              document.getElementById(_this.ID).innerHTML = '';
            },

            'FilesAdded': function (up, files) {
              _this.isUploading = true;
              _this.$emit('getImg', [_this.ID, _this.imgId, _this.isUploading]);
              plupload.each(files, function (file) {
                if (!file || !/image\//.test(file.type) || /photoshop/.test(file.type)) {
                  $('#pickfiles' + _this.ID).prepend(`
                    <div class="imgItem" id="${file.id}">
                      <div style=" width: 120px;  height: 120px; border-radius:6px;position: relative;">
                        <img src="${fileImage}">
                        <div class="progress"><p></p></div>
                        <div class="remove pic_delete el-icon-circle-close" data-val=${file.id}>

                        </div>
                      </div>
                    </div>
                   `);
                } else {
                  let fr = new mOxie.FileReader();

                  fr.onload = function () {
                    // 文件添加进队列后，处理相关的事情
                    $('#pickfiles' + _this.ID).prepend(`
                    <div class="imgItem" id="${file.id}">
                      <div style=" position: relative;">
                        <img src="${fr.result}">
                        <div class="progress"><p style="color: #fff !important;"></p></div>
                        <div class="remove pic_delete el-icon-circle-close" data-val=${file.id}>
                        </div>
                      </div>
                    </div>
                   `);
                  };
                  fr.readAsDataURL(file.getSource());
                }
              });
            },


            'BeforeUpload': function (up, file) {
              // 每个文件上传前，处理相关的事情

              up.setOption('multipart_params', {
                token: _this.token,               // 上传凭证
              });
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时，处理相关的事情
              if (document.getElementById(file.id)) {
                if (file.percent < 100) {
                  document.getElementById(file.id).getElementsByTagName('p')[0].innerHTML = `
                  <div role="progressbar" aria-valuenow="10" aria-valuemin="${file.percent}" aria-valuemax="100" class="el-progress el-progress--circle"><div class="el-progress-circle" style="height: 80px; width: 80px;background: #fff;opacity:.7;border-radius: 50%;"><svg viewBox="0 0 100 100"><path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#e5e9f2" stroke-width="4.8" fill="none" class="el-progress-circle__track"></path><path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#20a0ff" stroke-width="4.8" fill="none" class="el-progress-circle__path" style="stroke-dasharray: 299.08px, 299.08px; stroke-dashoffset: ${299.08 - (299.08 / 100) * file.percent}px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;"></path></svg></div><div class="el-progress__text" style="font-size: 16px;color: #409EFF">${file.percent}%</div></div>
                  `;
                } else {
                  document.getElementById(file.id).getElementsByTagName('p')[0].innerHTML = '<span class="el-icon-loading"></span>';
                }
              }

            },
            'FileUploaded': function (up, file, info) {

              let domain = up.getOption('domain');
              let url = JSON.parse(info);
              let sourceLink = domain + "/" + url.key;
              _this.$http.defaults.timeout = 5000;
              _this.$http.post(globalConfig.server_user + 'files', {
                url: sourceLink,
                name: url.key,
                raw_name: file.name,
                type: file.type,
                size: file.size
              }).then((res) => {
                _this.$http.defaults.timeout = null;
                if (res.data.status === "success") {
                  _this.imgId.push(res.data.data.id);
                  let object = {};
                  object.id = res.data.data.id;
                  object.name = res.data.data.name;
                  _this.imgArray.push(object);
                  _this.$emit('getImg', [_this.ID, _this.imgId, _this.isUploading]);
                  document.getElementById(file.id).getElementsByTagName('p')[0].innerHTML = '<span class="el-icon-success"></span>';
                }
              }).catch(error => {
                  _this.$http.defaults.timeout = null;
                  document.getElementById(file.id).getElementsByTagName('p')[0].innerHTML = '<span class="el-icon-error"></span>';
              });
            },
            'FilesRemoved': function (uploader, files) {

            },

//              console.log(errTip);
              'Error': function (up, err, errTip) {
            },
            'UploadComplete': function (uploader,files) {
              //队列文件处理完毕后，处理相关的事情
              _this.isUploading = false;
              _this.$emit('getImg', [_this.ID, _this.imgId, _this.isUploading]);
              // _this.$notify.success({
              //   title: '成功',
              //   message: '文件已全部上传成功！'
              // })
            },
            'Key': function (up, file) {
              // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
              // 该配置必须要在unique_names: false，save_key: false时才生效
              let key = "";
              // do something with key here
              return key
            }
          }
        });
      },

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .moxie-shim {
    position: static !important;
    width: 0 !important;
    height: 0 !important;
    input {
      font-size: 0 !important;
      opacity: 0;
      position: static !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  #pictureContainer {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    .editImg {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      > div {
        margin-right: 15px;
        margin-top: 15px;
        &:first-child {
          margin-left: 0;
        }
      }

      .remove {
        font-size: 26px;
        border-radius: 50%;
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 0;
        color: #6a8dfb;
        background: #ffffff;
        padding: 0;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          opacity: .9;
        }
      }
    }
    .pickfiles {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      z-index: 0;
      > div {
        margin-right: 15px;
        margin-top: 15px;
        &:first-child {
          margin-left: 0;
        }
      }
      .upButton {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 120px;
        height: 120px;
        cursor: pointer;
        line-height: 120px;
        vertical-align: top;
        display: inline-block;
        text-align: center;
      }
      .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
      }
    }
    .progress {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      text-align: center;
    }
    .remove {
      font-size: 26px;
      border-radius: 50%;
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 0;
      color: #6a8dfb;
      background: #ffffff;
      padding: 0;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        opacity: .9;
      }
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 6px;
    }
    .el-icon-success {
      background: #37ff32;
      border-radius: 50%;
    }
    .el-icon-error {
      background: #ff3737;
      border-radius: 50%;
    }
  }


</style>

