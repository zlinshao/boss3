<template>
  <div id="publicArticle">
    <div class="title" v-show="previewShow">文章发布</div>
    <el-form v-show="previewShow" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="分类" required="">
        <el-select v-model="form.region" clearable placeholder="请选择类别">
          <el-option v-for="(key,index) in dict.region" :label="key.dictionary_name" :value="key.id"
                     :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容" required="">
        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                    v-model="form.htmlForEditor" :disabled="editorDisabled"></vue-editor>
      </el-form-item>

      <el-form-item label="封面图片">
        <Dropzone :ID="'cover'" @getImg="photo_success" :editImage="cover_pic"></Dropzone>
      </el-form-item>

      <el-form-item style="text-align: center;">
        <el-button size="small" type="default" @click="goBack">取消</el-button>
        <el-button size="small" type="warning" @click="preview">预览</el-button>
        <el-button v-for="(key,index) in dict.status" size="small" type="primary" @click="onSubmit(key.id)" :key="index"
                   v-if="key.dictionary_name !== '已结束'">
          <span v-if="key.dictionary_name === '已发布'">发布</span>
          <span v-else>{{key.dictionary_name}}</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div style="padding: 20px 17px;" v-show="!previewShow">
      <div class="newsMain">
        <div class="newsTitle">{{form.name}}</div>
      </div>
      <div class="staff_name">
        <div class="staff_pic">
          <img :src="personal.avatar" v-if="personal.avatar !== ''">
          <img src="../../../../../assets/images/head.png">
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
    components: {
      VueEditor, Dropzone
    },
    data() {
      return {
        urls: globalConfig.server,
        address: globalConfig.server_user,
        personal: {},
        times: '',
        pitch: '',
        cover_pic: {},
        file: {},
        cover_id: [],
        dict: {
          region: [],
          status: [],
        },
        form: {
          name: '',
          region: '',
          htmlForEditor: '',
          type: '',
        },
        previewShow: true,
        tabIndex: '',
        editorDisabled: false,
      }
    },
    computed:{
      ids(val){
        return this.$route.query.ids? this.$route.query.ids:this.$store.state.article.article_id;
        console.log("article_id==="+this.$store.state.article.article_id);
      },
      moduleType() {
        return this.$route.query.ModuleType ? this.$route.query.ModuleType : this.$store.state.article.module_type;
      }
    },
    mounted() {
      this.getDict();
      this.pitch = '';
      if (this.ids !== undefined) {
        this.publicDetail(this.ids);
        this.pitch = this.ids;
      }
      if(this.ids){
        this.$store.dispatch('articleId',this.ids);
        console.log("articleId======" + this.ids);
      }
    },
    methods: {
      publicDetail(id) {
        this.$http.get(this.urls + 'oa/portal/' + id).then((res) => {
          if (res.data.code === '80020') {
            let detail = res.data.data;
            this.form.name = detail.title;
            this.form.region = detail.dict_id;
            this.form.htmlForEditor = detail.content;
            let pic = detail.album.cover_pic;
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
      getDict() {
        switch(this.moduleType){
          case 'lejiaCollege':  //乐伽大学
            this.tabIndex = 'first';
            this.$http.get(this.urls + 'setting/dictionary/361').then((res) => {
              this.dict.region = res.data.data;
            });
            break;
          case 'companyPortal':   //公司门户
            this.tabIndex = 'second';
            this.$http.get(this.urls + 'setting/dictionary/377').then((res) => {
              this.dict.region = res.data.data;
            });
            break;
          case 'staffSquare':    //员工广场
            this.tabIndex = 'third';
            this.$http.get(this.urls + 'setting/dictionary/137').then((res) => {
              this.dict.region = res.data.data;
            });
            break;
          case 'systemManageMent':   //制度管理
            this.tabIndex = 'fourth';
            this.$http.get(this.urls + 'setting/dictionary/380').then((res) => {
              this.dict.region = res.data.data;
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
        })
      },
      goBack() {
        this.$router.push({path: '/articleMessage', query: {tabs: this.tabIndex}})
      },
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        let formData = new FormData();
        formData.append('file', file);
        console.log(file)

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        if(file.size > 1024 * 1024 * 2){
            this.$notify.warning({
              title:'警告',
              message:'只能上传jpg/png文件，且不超过2M'
            })
        }else {
          this.$http.post(this.address + 'files', formData ,config).then((res) => {
            if(res.data.status === 'success'){
              Editor.insertEmbed(cursorLocation, 'image', res.data.data.uri);
            }
          })
        }

      },
      // 上传成功
      photo_success(val) {
        this.cover_id = val[1];
      },

      prompt(val, info) {
        if (val === 1) {
          this.$message({
            type: 'success',
            message: info,
          });
        } else {
          this.$message({
            type: 'info',
            message: info,
          });
        }
      },

      upLoad(e){
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
      // 'form.region':{
      //   handler(val){
      //     if(val == '363' || val == '364') {
      //       this.editorDisabled = true;  //图片赏析和教师风采时富文本框禁用
      //       $("#editor").css("background","#eae9e985");
      //       this.form.htmlForEditor='';
      //     }else{
      //       this.editorDisabled = false;
      //       $("#editor").css("background","initial");
      //     }
      //   }
      // }
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
