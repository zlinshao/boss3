<template>
  <div :ref="id" :action="url" class="dropzone" :id="id">
    <input type="file" name="file">
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

      defaultMsg: {
        type: String,
        default: '上传图片'
      },
      acceptedFiles: {
        type: String
      },
      thumbnailHeight: {
        type: Number,
        default: 120
      },
      thumbnailWidth: {
        type: Number,
        default: 120
      },
      showRemoveLink: {
        type: Boolean,
        default: true
      },
      maxFilesize: {
        type: Number,
        default: 20
      },
      maxFiles: {
        type: Number,
        default: 60
      },
      resizeWidth:{
        type: Number,
        default: 1000
      },
      autoProcessQueue: {
        type: Boolean,
        default: true
      },
      useCustomDropzoneOptions: {
        type: Boolean,
        default: false
      },
      defaultImg: {
        default: false
      },
      couldPaste: {
        default: false
      }
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
        clickable: true,
        thumbnailWidth: this.thumbnailWidth,
        thumbnailHeight: this.thumbnailHeight,
        maxFiles: this.maxFiles,
        maxFilesize: this.maxFilesize,
        resizeWidth: this.resizeWidth,
        dictRemoveFile: '删除',
        addRemoveLinks: this.showRemoveLink,
        acceptedFiles: this.acceptedFiles,
        autoProcessQueue: this.autoProcessQueue,
        dictDefaultMessage: '<i style="margin-top: 3em;display: inline-block" class="material-icons">' + this.defaultMsg + '</i><br>Drop files here to upload',
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
          })
        }
      })
    },
    methods: {
      pasteImg(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        if (items[0].kind === 'file') {
          this.dropzone.addFile(items[0].getAsFile())
        }
      },
      initImages(val) {
        if (!val) return;
        if (Array.isArray(val)) {
          val.map((v, i) => {
            const mockFile = { name: 'name' + i, size: 12345, url: v };
            this.dropzone.options.addedfile.call(this.dropzone, mockFile);
            this.dropzone.options.thumbnail.call(this.dropzone, mockFile, v);
            mockFile.previewElement.classList.add('dz-success');
            mockFile.previewElement.classList.add('dz-complete');
            return true
          })
        } else {
          const mockFile = { name: 'name', size: 12345, url: val };
          this.dropzone.options.addedfile.call(this.dropzone, mockFile);
          this.dropzone.options.thumbnail.call(this.dropzone, mockFile, val);
          mockFile.previewElement.classList.add('dz-success');
          mockFile.previewElement.classList.add('dz-complete')
        }
      }

    },
    watch: {
      defaultImg(val) {
        if (val.length === 0) {
          this.initOnce = false;
          return
        }
        if (!this.initOnce) return;
        this.initImages(val);
        this.initOnce = false
      }
    },
  }
</script>

<style scoped lang="scss">
  .dropzone {
    border: 1px solid #E5E5E5;
    font-family: 'Roboto', sans-serif;
    color: #fff;
    transition: background-color .2s linear;
    padding: 5px;
    &:hover {
      background-color: #ffffff;
    }
    .dz-image {
      img {
        width: 100%;
        height: 100%;
      }
    }
    input[name='file'] {
      display: none;
    }
    .dz-preview{
      &:hover .dz-image img {
        transform: none;
        -webkit-filter: none;
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
