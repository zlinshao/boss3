<template>
  <div>
    <div id="container">
      <div class="btn btn-default btn-lg" id="pickfiles">
        <!--<div v-for="(item,index) in imgArray" class="imgBox" @mouseover="mouseOver(index)" @mouseout="mouseOut(index)">-->
          <!--<img v-if="item" :src="item">-->
          <!--<i v-else="" class="el-icon-loading"></i>-->
          <!--<div class="deleteImg">-->
            <!--<i class="el-icon-delete" v-if="activeIndex===index" @click="deleteImg(item,index,$event)">删除</i>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    {{imgId}}{{imgArray}}
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        imgArray: [],
        imgId: [],
        isUploading:false,
        activeIndex : null,
        uploader:null,
      }
    },
    mounted(){
      this.getTokenMessage();
      let _this =this;
      $(document).on('click','a.pic_delete',function () {
        console.log(_this.uploader.files)
        let toremove = '';
        let id = $(this).attr("data-val");
        for (var i in _this.uploader.files) {
          if (_this.uploader.files[i].id === id) {
            toremove = i;
          }
        }
        $('#'+id).remove();
        _this.uploader.files.splice(toremove, 1);
      });
    },

    watch:{
      uploader : {
        deep:true,
        handler(val,old){
          if(val && val!==null){
              console.log(val.files)
              console.log(old)
//            if(val.files.length < old.files.length)
//              for(let i=0;i<this.imgArray.length;i++){
//                for(let j=0;j<val.files.length;j++){
//                  if(this.imgArray[i] == val.files[j].target_name){
//                    this.imgId.splice(i,1)
//                    this.imgArray.splice(i,1)
//                  }
//                }
//              }
          }
        }
      }
    },

    methods: {
      mouseOver(index){
        this.activeIndex = index;
      },
      mouseOut(){
        this.activeIndex = null;
      },
      getTokenMessage() {
        this.$http.get(globalConfig.server_user + 'api/v1/files').then((res) => {
          this.uploaderReady(res.data.data);
        })
      },

      uploaderReady(token) {
        let event = event;
        let _this = this;
        _this.uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: 'pickfiles',       //上传按钮的ID
          uptoken: token,                     // uptoken是上传凭证，由其他程序生成

          get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
          unique_names: true,                 // 默认false，key为文件
          domain: 'http://static.lejias.cn',  // bucket域名，下载资源时用到，必需

          container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: '100mb',             // 最大文件体积限制
          flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
          max_retries: 1,                     // 上传失败最大重试次数
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传

          init: {
            'PostInit': function() {
              document.getElementById('pickfiles').innerHTML = '';
//
//              document.getElementById('uploadfiles').onclick = function() {
//                uploader.start();
//                return false;
//              };
            },


            'FilesAdded': function (up, files) {



              plupload.each(files, function (file) {



//                document.getElementById('pickfiles').innerHTML += `
//                  <div style="margin: 10px;  width: 120px;  height: 120px; overflow: hidden; border-radius: 10px;position: relative;" id="${file.id}">
//                      <img src=""  style="width: 120px; height: 120px; border-radius: 10px;filter:blur(2px);">
//                      <div style="width: 100%;position: absolute;top: 20px;text-align: center">${plupload.formatSize(file.size)}</div>
//                      <div style="width: 100%;position: absolute;bottom: 10px;font-size:20px;text-align: center"><b style=""></b></div>
//                  </div>
//                `;

                console.log(file)
                if (!file || !/image\//.test(file.type) || /photoshop/.test(file.type)) {
                  document.getElementById('pickfiles').innerHTML += `
                  <div style="margin: 10px;  width: 120px;  height: 120px; overflow: hidden; border-radius: 10px;position: relative;" id="${file.id}">
                      <img src=""  style="width: 120px; height: 120px; border-radius: 10px;filter:blur(2px);">
                      <div style="width: 100%;position: absolute;top: 50px;text-align: center;color: #ffffff">${plupload.formatSize(file.size)}</div>
                      <div style="width: 100%;position: absolute;bottom: 10px;font-size:20px;text-align: center;"><b style=""></b></div>
                  </div>
                  <div>
                     <a href="javascript:;" class="pic_delete" data-val=${file.id}>删除</a>
                  </div>
                  `;



                }else {
                  var fr = new mOxie.FileReader();
                  fr.onload = function () {
                    // 文件添加进队列后，处理相关的事情
                    document.getElementById('pickfiles').innerHTML += `
                    <div style="margin: 10px;" id="${file.id}">
                      <div style=" width: 120px;  height: 120px; overflow: hidden; border-radius: 10px;position: relative;">
                      <img src="${fr.result}"  style="width: 120px; height: 120px; border-radius: 10px;">
                      <div style="width: 100%;position: absolute;top: 20px;text-align: center">${plupload.formatSize(file.size)}</div>
                      <div style="width: 100%;position: absolute;bottom: 10px;font-size:20px;text-align: center;color: #ffffff;"><b style=""></b></div>
                    </div>
                    <div style="text-align: center">
                        <a href="javascript:;" class="pic_delete" data-val=${file.id}>删除</a>
                    </div>
                    </div>
                `;
                  };
                  fr.readAsDataURL(file.getSource());

                }

              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前，处理相关的事情
              _this.isUploading = true;
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时，处理相关的事情

                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";

            },
            'FileUploaded': function (up, file, info) {


              // 每个文件上传成功后，处理相关的事情
              // 其中info是文件上传成功后，服务端返回的json，形式如：
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }
              // 获取url路径 传入后台保存到数据库
              let domain = up.getOption('domain');
              let url = JSON.parse(info);
              let sourceLink = domain + "/" + url.key;

              _this.$http.post(globalConfig.server_user + 'api/v1/files', {
                url: sourceLink,
                name: url.key
              }).then((res) => {
                if (res.data.status === "success") {
//                  $('#'+file.id).remove();
                  _this.imgId.push(res.data.data.id);
                  _this.imgArray.push(res.data.data.name);
                }
              })
            },
            'Error': function (up, err, errTip) {
              console.log(errTip);
            },
            'UploadComplete': function () {
              //队列文件处理完毕后，处理相关的事情
              _this.isUploading = false;

              _this.$notify.success({
                title:'成功',
                message:'文件上传全部完成'
              })
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



      deleteImg(val,index,e){
        e.stopPropagation();
        this.imgId.splice(index,1);
        this.imgArray.splice(index,1);
//        this.isDelete = false;
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #pickfiles {
    width: 100%;
    min-height: 40px;
    box-sizing: border-box;
    border: 1px solid #bbb;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    .imgBox{
      margin: 10px;
      img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
        cursor: pointer;
        &:hover{
          filter:blur(2px);
        }
      }
      .deleteImg{
        text-align: center;
        cursor: pointer;
        height: 14px;
        &:hover{
          color: #6a8dfb;
        }
      }
    }

  }
</style>
