<template>
  <div id="publicArticle">
    <div class="title" v-show="previewShow">文章发布</div>
    <el-form v-show="previewShow" label-width="100px">
      <el-form-item label="标题" required v-if="moduleType !='newVersionUpdate'">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="版本" v-if="moduleType =='newVersionUpdate'">
        <el-input v-model="form.name" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="分类" required="" v-if="moduleType !='newVersionUpdate'">
        <el-select v-model="form.region" clearable placeholder="请选择类别">
          <el-option v-for="(key,index) in dict.region" :label="key.dictionary_name" :value="key.id"
                     :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本类型" required="" v-else>
        <el-select v-model="form.type" clearable placeholder="请选择类别">
          <el-option v-for="item in versionType" :label="item.dictionary_name" :value="item.id"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" required="" v-if="moduleType !='newVersionUpdate'">
        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                    v-model="form && form.htmlForEditor" :disabled="editorDisabled"></vue-editor>
      </el-form-item>
      <el-form-item label="内容" required=""
                    v-else-if="!(form.type == 673 || form.type== 675) && moduleType =='newVersionUpdate'">
        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                    v-model="form && form.htmlForEditor" :disabled="editorDisabled"></vue-editor>
      </el-form-item>
      <el-form-item label="更新日志" v-if="form.type == 675 && moduleType =='newVersionUpdate'">
        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                    v-model="form && form.htmlForEditor" :disabled="editorDisabled"></vue-editor>
      </el-form-item>
      <el-form-item label="上传文件" required="" v-show="(form.type == 675 || form.type == 705) && moduleType =='newVersionUpdate'">
        <Dropzone :ID="'cover1'" @getImg="photo_success" :editImage="cover_pic" :isClear="isClear"></Dropzone>
      </el-form-item>
      <el-form-item label="封面图片" v-show="moduleType !='newVersionUpdate'">
        <Dropzone :ID="'cover2'" @getImg="photo_success" :editImage="cover_pic" :isClear="isClear"></Dropzone>
      </el-form-item>
      <el-form-item label="新手导读" required="" v-show="form.type == 673 && moduleType =='newVersionUpdate'">
        <Dropzone :ID="'cover3'" @getImg="photo_success" :editImage="cover_pic" :isClear="isClear"></Dropzone>
      </el-form-item>
      <el-form-item label="是否强制更新" v-show="(form.type == 675 || form.type == 705) && moduleType =='newVersionUpdate'">
        <el-radio v-model="form.update_install" label="1">是</el-radio>
        <el-radio v-model="form.update_install" label="2">否</el-radio>
      </el-form-item>


      <el-form-item style="text-align: center;" v-if="moduleType !='newVersionUpdate'">
        <el-button size="small" type="default" @click="goBack">取消</el-button>
        <el-button size="small" type="warning" @click="preview">预览</el-button>
        <el-button v-for="(key,index) in dict.status" size="small" type="primary" @click="onSubmit(key.id)" :key="index"
                   v-if="key.dictionary_name !== '已结束'">
          <span v-if="key.dictionary_name === '已发布'">发布</span>
          <span v-else>{{key.dictionary_name}}</span>
        </el-button>
      </el-form-item>
      <el-form-item style="text-align: center;" v-else>
        <el-button size="small" type="default" @click="goBack">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmitNew()">发布</el-button>
      </el-form-item>
    </el-form>

    <div style="padding: 20px 17px;" v-show="!previewShow">
      <div class="newsMain">
        <div class="newsTitle">{{form.name}}</div>
      </div>
      <div class="staff_name">
        <div class="staff_pic">
          <img :src="personal.avatar" v-if="personal.avatar !== ''">
          <img src="../../../../../assets/images/head.png" v-else>
        </div>
        <div class="info">
          <span>
            <span>{{personal.name}}</span>&nbsp;&nbsp;
            <span v-for="key in personal.org">
              {{key.name}}
            </span>
          </span>
          <span>{{times}}</span>
        </div>
      </div>
      <div class="ql-editor" v-html="form.htmlForEditor"></div>

      <div class="previewBtn">
        <el-button type="primary" size="small" @click="preBtn">返回上一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import Dropzone from '../../../../common/UPLOAD.vue'

  export default {
    components: {VueEditor, Dropzone},
    data() {
      return {
        urls: globalConfig.server,
        personal: {},
        times: '',
        pitch: '',
        info: '',
        cover_pic: {},
        file: {},
        cover_id: [],
        dict: {
          region: [],
          status: [],
        },
        versionType: [],
        form: {
          name: '',
          region: '',
          htmlForEditor: '',
          type: '',
          content: '',
          update_install: "1",
        },
        previewShow: true,
        tabIndex: '',
        editorDisabled: false,
        moduleType: '',
        isClear: false,
        uploadStatus: false,
      }
    },
    activated() {
      this.getParams();
      this.isClear = false;
    },
    mounted() {
      this.getParams();
      // this.getDictionary();
    },
    methods: {
      getDictionary() {
        this.dictionary(672).then((res) => {
          if (res.data.code === '30010') {
            this.versionType = res.data.data;
          }
        });
      },
      getParams() {
        if (!this.$route.query.moduleType) {
          if (this.$route.query.moduleType) {
            this.$store.dispatch('moduleType', this.$route.query.moduleType);
          }
          this.$router.push({
            path: "/publicArticle",
            query: {
              ids: this.$store.state.article.article_id,
              moduleType: this.$store.state.article.module_type,
            }
          });
        }
        let query = this.$route.query;
        this.moduleType = query.moduleType;
        if (query.from === 'publicArticleBtn') {
          this.form.name = '';
          this.form.region = '';
          this.form.htmlForEditor = '';
          this.form.type = '';
          this.cover_id = [];
          this.cover_pic = {};
          this.form.update_install = "1";
        }
        this.getDict();
        this.pitch = '';
        if (query.ids !== undefined) {
          if (this.moduleType != 'newVersionUpdate') {
            this.publicDetail(query.ids);
            this.pitch = query.ids;
          } else {
            this.newVersionDetail(query.ids);
            this.pitch = query.ids;
          }

        }
        if (query.ids) {
          this.$store.dispatch('articleId', query.ids);
        }
        if (query.moduleType) {
          this.$store.dispatch('moduleType', query.moduleType);
        }
      },
      publicDetail(id) {
        this.$http.get(this.urls + 'oa/portal/' + id).then((res) => {
          if (res.data.code === '80020') {
            let detail = res.data.data;
            this.form.name = detail.title;
            this.form.region = detail.dict_id;
            this.form.htmlForEditor = detail.content;
            let pic = detail && detail.album && detail.album.cover_pic;
            let arr = {};
            this.cover_id = [];
            for (let key in pic) {
              this.cover_id.push(key);
              for (let i = 0; i < pic[key].length; i++) {
                arr[key] = pic[key][i].uri;
              }
            }
            this.cover_pic = arr;
          }
        })
      },
      newVersionDetail(id) {
        this.$http.get(this.urls + 'setting/update/read?id=' + id).then((res) => {
          if (res.data.code === '50040') {
            let pic = res.data.data.album.image_pic;
            let arr = {};
            this.cover_id = [];
            this.cover_pic = {};
            pic.forEach((item) => {
              this.cover_id.push(item.id);
              arr[item.id] = item.uri;
            });
            this.cover_pic = arr;
            console.log(this.cover_pic);
            this.form.name = res.data.data.version;
            this.form.type = res.data.data.type;
            this.form.htmlForEditor = res.data.data.content;
            this.form.update_install = res.data.data.update_install;
          } else {
            this.cover_id = [];
            this.cover_pic = {};
            this.form.name = '';
            this.form.type = '';
            this.form.htmlForEditor = '';
            this.form.update_install = '1';
          }
        });
      },
      getDict() {
        switch (this.moduleType) {
          case 'lejiaCollege':  //乐伽大学
            this.tabIndex = 'first';
            this.dictionary(361, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
          case 'companyPortal':   //公司门户
            this.tabIndex = 'second';
            this.dictionary(377, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
          case 'staffSquare':    //员工广场
            this.tabIndex = 'third';
            this.dictionary(137, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
          case 'systemManageMent':   //制度管理
            this.tabIndex = 'fourth';
            this.dictionary(380, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
          case 'newVersionUpdate':   //版本管理
            this.tabIndex = 'fifth';
            this.dictionary(672, 1).then((res) => {
              this.versionType = res.data;
            });
            break;
          case 'intelligence':      //乐伽情报屋
            this.tabIndex = 'six';
            this.dictionary(683, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
          case 'lejiaStory':      //乐伽情报屋
            this.tabIndex = 'seven';
            this.dictionary(686, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
            case 'ownerStory':      //乐伽情报屋
            this.tabIndex = 'eight';
            this.dictionary(688, 1).then((res) => {
              this.dict.region = res.data;
            });
            break;
        }
        // 统一用员工广场的状态
        this.$http.get(this.urls + 'setting/dictionary/147').then((res) => {
          this.dict.status = res.data.data;
        });
      },
      // 预览
      preview() {
        this.previewShow = false;
        this.personal = JSON.parse(localStorage.getItem("personal"));
        this.nowDate();
      },
      // 返回上一步
      preBtn() {
        this.previewShow = true;
      },
      onSubmit(val) {
        if (this.uploadStatus) {
          this.$notify.warning({
            title: '警告',
            message: '图片上传中，请稍后'
          });
          return;
        }
        let type;
        if (this.pitch !== '') {
          type = this.$http.put;
        } else {
          type = this.$http.post;
        }
        type(this.urls + 'oa/portal', {
          id: this.pitch,
          title: this.form.name,
          dict_id: this.form.region,
          content: this.form.htmlForEditor,
          cover_pic: this.cover_id,
          status: val
        }).then((res) => {
          if (res.data.code === '80010' || res.data.code === '80030') {
            this.goBack();
            this.prompt(1, res.data.msg);
          } else {
            this.prompt(2, res.data.msg);
          }
        });
      },
      //发布版本
      onSubmitNew() {
        let type;
        //新增
        if (this.pitch !== '') {
          type = this.$http.put;
          type(this.urls + 'setting/update/' + this.pitch, {
            version: this.form.name,
            content: this.form.htmlForEditor,
            image_pic: this.cover_id,
            type: this.form.type,
            update_install: this.form.update_install
          }).then((res) => {
            if (res.data.code === '50050') {
              this.goBack();
              this.prompt(1, res.data.msg);
            } else {
              this.prompt(2, res.data.msg);
            }
          });
          //修改
        } else {
          type = this.$http.post;
          type(this.urls + 'setting/update', {
            version: this.form.name,
            content: this.form.htmlForEditor,
            image_pic: this.cover_id,
            type: this.form.type,
            update_install: this.form.update_install
          }).then((res) => {
            if (res.data.code === '50030') {
              this.goBack();
              this.prompt(1, res.data.msg);
            } else {
              this.prompt(2, res.data.msg);
            }
          });
        }

      },
      goBack() {
        //点击取消清掉ids
        this.$store.dispatch('deleteArticleId');
        this.form.name = '';
        this.form.region = '';
        this.form.htmlForEditor = '';
        this.form.update_install = "1";
        this.isClear = true;
        let view = {};
        view.name = ' 文章发布 ';
        view.path = '/publicArticle';
        this.$store.dispatch('delVisitedViews', view);
        setTimeout(() => {
          this.$router.push({path: '/articleMessage', query: {refresh: 'refresh'}})
        }, 0);
      },
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {

        let formData = new FormData();
        formData.append('file', file);

        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        if (file.size > 1024 * 1024 * 2) {
          this.$notify.warning({
            title: '警告',
            message: '只能上传jpg/png文件，且不超过2M'
          })
        } else {
          this.$http.post(this.urls + 'api/v1/upload-indirect', formData, config).then((res) => {
            if (res.data.code === '110100') {
              Editor.insertEmbed(cursorLocation, 'image', res.data.data.uri);
            }
          })
        }

      },
      // 上传成功
      photo_success(val) {
        this.cover_id = val[1];
        this.uploadStatus = val[2];
      },
      prompt(val, info) {
        if (val === 1) {
          this.$notify.success({
            title: '成功',
            message: info,
          });
        } else {
          this.$notify.info({
            title: '提示',
            message: info,
          });
        }
      },
      upLoad(e) {
        console.log(e)
      },
      // 当前时间
      nowDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours(); //获取当前小时数(0-23)
        let minutes = date.getMinutes(); //获取当前分钟数(0-59)
        let seconds = date.getSeconds(); //获取当前秒数(0-59)
        if (month < 10) {
          month = '0' + month;
        }
        if (strDate < 10) {
          strDate = '0' + strDate;
        }
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        this.times = year + '-' + month + '-' + strDate + ' ' + hour + ':' + minutes + ':' + seconds
      }
    },
    watch: {
      pitch(val) {
        if (val === '') {
          this.form.name = '';
          this.form.region = '';
          this.form.htmlForEditor = '';
          this.cover_pic = '';
        }
      },
    }
  }
</script>

<style lang="scss">
  #publicArticle {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }
    .title {
      font-size: 18px;
      margin: 0 0 15px 15px;
      font-weight: bold;
      color: #409EFF;
      opacity: .7;
      &:before {
        border-radius: 2px;
        margin-right: 5px;
        background: #409EFF;
        border-left: 1px solid #409EFF;
        content: '|';
      }
    }
    .ql-snow .ql-picker-label:before {
      vertical-align: top;
    }

    .newsMain {
      @include flex;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #dfe6fb;
      .newsTitle {
        color: #606266;
        font-size: 24px;
      }
      .newsDate {
        color: #8f9193;
        font-size: 13px;
      }
    }
    .ql-editor {
      padding: 0;
      max-height: 700px;
    }
    .staff_name {
      @include flex;
      align-items: center;
      margin: 18px 0;
      .staff_pic {
        margin-right: 14px;
        min-width: 40px;
        max-width: 40px;
        min-height: 40px;
        max-height: 40px;
        img {
          width: 100%;
          height: 100%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .info {
        width: 100%;
        @include flex;
        justify-content: space-between;
      }
    }
    .previewBtn {
      padding-top: 18px;
      text-align: center;
      border-top: 1px solid #dfe6fb;
    }
  }
</style>
