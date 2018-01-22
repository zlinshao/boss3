<template>
  <div :ref="id" :action="url" class="dropzone" :id="id">
    <div class="dz-message" v-show="false"></div>

    <div class="dz-preview dz-processing dz-image-preview dz-success dz-complete" v-if="false">
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
      url: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        dropzone: '',
        initOnce: true
      }
    },
    mounted() {
      const element = document.getElementById(this.id);
      const vm = this;
      this.dropzone = new Dropzone(element, {
        maxFiles: 60,
        maxFilesize: 20,
        resizeWidth: 1000,
        dictRemoveFile: '删除',
        dictCancelUpload:'取消上传',
        addRemoveLinks: true,
        acceptedFiles: '',
        dictDefaultMessage:null,
        init() {
          this.on('success', file => {
            vm.$emit('dropzone-success', file, vm.dropzone.element)
          });
          this.on('addedfile', file => {
            vm.$emit('dropzone-fileAdded', file)
          });
          this.on('removedfile', file => {
            vm.$emit('dropzone-removedFile', file)
          });
          this.on('error', (file, error, xhr) => {
            vm.$emit('dropzone-error', file, error, xhr)
          });
          this.on('successmultiple', (file, error, xhr) => {
            vm.$emit('dropzone-successmultiple', file, error, xhr)
          });
          this.on("queuecomplete", function (file) {
            vm.$emit('complete','ok');
            //上传完成后触发的方法
          });
        }
      })
    },
    methods: {

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
