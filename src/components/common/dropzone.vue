<template>
  <div :ref="id" class="dropzone" :id="id">
    <div class="dz-default dz-message" v-show="false"></div>
    <div v-for="(p,index) in photo.pic_url"
         class="dz-preview dz-processing dz-image-preview dz-success dz-complete"
         v-if="p !== '' && p.small !== null">
      <div class="dz-image">
        <img v-if="p.small" data-dz-thumbnail="" alt="" :src="p.small">
        <!--<img v-else="" data-dz-thumbnail="" alt="" src="../../assets/img/head.png">-->
      </div>
      <a class="dz-remove" @click="rules(index)">删除文件</a>
    </div>

  </div>
</template>

<script>
  import Dropzone from 'dropzone'
  import 'dropzone/dist/dropzone.css'

  Dropzone.autoDiscover = false;

  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      photo: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        dropzone: '',
        initOnce: true,
        pic_id: [],
      }
    },
    mounted() {
      this.photo.pic_id = this.pic_id;
      const element = document.getElementById(this.id);
      const vm = this;
      this.dropzone = new Dropzone(element, {
        url: globalConfig.pic_address,
        // resizeWidth: 1000,
        addRemoveLinks: true,
        dictRemoveLinks: "x",
        dictCancelUpload: "正在上传",
        dictRemoveFile: '删除',
        maxFiles: 60,       //一次性上传的文件数量上限
        maxFilesize: 20,    //MB
        // resizeWidth: _this.is_property,
        acceptedFiles: ".jpg,.jpeg,.gif,.png,.bmp,.doc,.docx,.xls,.xlsx,.pdf,",
        dictResponseError: "当前网络连接不稳定请稍后再试",
        dictMaxFilesExceeded: "您最多只能上传60个文件！",
        dictFileTooBig: "文件过大上传文件最大支持.",
        withCredentials: "yes",
        init() {
          this.on('success', (file, xhr) => {
            vm.pic_id.push(xhr.data);
            vm.$emit('finish', vm.pic_id);
          });
          this.on('addedfile', file => {
            vm.$emit('dropzone-fileAdded', file);
          });
          this.on('removedfile', file => {
            let card = JSON.parse(file.xhr.response).data;
            let index = vm.pic_id.indexOf(card);
            if (index > -1) {
              vm.pic_id.splice(index, 1);
            }
            vm.$emit('remove', vm.pic_id);
          });
          this.on('error', (file, error, xhr) => {
            vm.$emit('dropzone-error', file, error, xhr);
          });
          this.on('successmultiple', (file, error, xhr) => {
            vm.$emit('dropzone-successmultiple', file, error, xhr);
          });
          this.on("queuecomplete", function (file) {
            vm.$emit('complete', 'ok');
            //上传完成后触发的方法
          });
        }
      })
    },
    methods: {
      rules(val) {
        console.log(val);
        let index = this.pic_id.indexOf(val);
        if (index > -1) {
          this.pic_id.splice(index, 1);
        }
        this.$emit('remove', this.pic_id);
        this.$delete(this.photo.pic_url, val);
      }
    },
  }
</script>

<style scoped lang="scss">
  .dropzone {
    border: 1px solid #dcdfe6;
    min-height: 32px;
    border-radius: 4px;
    color: #fff;
    transition: background-color .2s linear;
    padding: 5px;
    &:hover {
      background-color: #ffffff;
    }
  }

</style>
