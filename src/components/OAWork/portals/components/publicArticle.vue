<template>
  <div id="publicArticle">
    <div class="title">文章发布</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类" required="">
        <el-select v-model="form.region" clearable placeholder="请选择分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容" required="">
        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor"></vue-editor>
      </el-form-item>

      <el-form-item label="封面图片" required="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goBack">取消</el-button>
        <el-button type="primary">预览</el-button>
        <el-button type="primary">草稿</el-button>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        htmlForEditor: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      },
      goBack(){
        this.$router.push('/portals')
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        let formData = new FormData();
        formData.append('image', file)
        this.$http.post('picture/upload',formData).then((res)=>{
//                    console.log(res.data.data)
          let picId = res.data.data;
          this.$http.post('picture/'+picId).then((res)=>{
            let url = res.data.data; // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .title{
    font-size: 18px;
    margin: 0 0 15px 15px;
    font-weight: bold;
    color: #409EFF;
    opacity: .7;
    &:before{
      border-radius: 2px;
      margin-right: 5px;
      background: #409EFF;
      border-left: 1px solid #409EFF;
      content: '|';
    }
  }
</style>
