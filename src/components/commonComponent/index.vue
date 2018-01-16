<template>
  <div>
    <div>
      消息提示：
      <el-button :plain="true" @click="open2">成功</el-button>
      <el-button :plain="true" @click="open3">警告</el-button>
      <el-button :plain="true" @click="open">消息</el-button>
      <el-button :plain="true" @click="open4">错误</el-button>
    </div>

    <div style="margin-top: 20px">
      通知信息：
      <el-button plain @click="open_3">
        成功
      </el-button>
      <el-button plain @click="open_4">
        警告
      </el-button>
      <el-button plain @click="open_5">
        消息
      </el-button>
      <el-button plain @click="open_6">
        错误
      </el-button>
    </div>
    <template>
      confirm确认：
      <el-button type="text" @click="openMessage">点击打开 Message Box</el-button>
    </template>

    <div>
      文字提示：
      <el-tooltip content="Top center" placement="top">
        <el-button>Dark</el-button>
      </el-tooltip>
      <el-tooltip content="Bottom center" placement="bottom" effect="light">
        <el-button>Light</el-button>
      </el-tooltip>
    </div>
    <DIV>
      <DropZone @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" @complete="dropzoneALL"
                id="myVueDropzone" url="https://httpbin.org/post"></DropZone>
    </DIV>
  </div>
</template>

<script>
  import DropZone from '../common/dropzone.vue'
  export default {
    components:{DropZone},
    methods: {
      openMessage() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      },

      open_3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open_4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open_5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open_6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      },
      dropzoneS(file) {
        console.log(file)
        this.$message({ message: '上传成功', type: 'success' })
      },
      dropzoneR(file) {
        console.log(file)
        this.$message({ message: '删除成功', type: 'success' })
      },
      dropzoneALL(val){
          alert(val)
      }
    }
  }
</script>
