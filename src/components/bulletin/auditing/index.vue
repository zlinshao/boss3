<template>
  <div id="auditing">
    <div class="titles">
      <div><i class="el-icon-tickets"></i>&nbsp;使用说明</div>
      <div><i class="el-icon-setting"></i>&nbsp;设置</div>
    </div>
    <div class="main">
      <div class="mainTop">
        <el-button type="info" size="mini" plain>取消</el-button>
        <el-button type="success" size="mini">已审核</el-button>
      </div>
      <div class="mainContent">
        <el-row>
          <el-col :span="16">
            <div class="title">仙居雅苑</div>
            <div class="content left scroll_bar">
              <el-form :model="form" size="mini" label-width="110px">
                <el-row v-for="key in 20" :key="key">
                  <el-col :span="8">
                    <el-form-item label="第一次付款时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次付款时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次付款时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="title">合同照片</div>
            <div class="content right scroll_bar">
              <el-row v-for="key in 10" :key="key">
                <el-col :span="6">
                  <div>
                    <img src="../../../assets/images/情人节.png" style="width: 100%;height: 100%;">
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <img src="../../../assets/images/情人节.png" style="width: 100%;height: 100%;">
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <img src="../../../assets/images/情人节.png" style="width: 100%;height: 100%;">
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <img src="../../../assets/images/情人节.png" style="width: 100%;height: 100%;">
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        form: {
          name: '',
        }
      }
    },
    mounted() {
    },
    watch: {},
    methods: {},
  }
</script>

<style lang="scss">
  #auditing {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    .titles {
      @include flex;
      justify-content: flex-end;
      border-bottom: 1px solid #EEEEEE;
      padding-bottom: 10px;
      div {
        padding: 0 20px;
        cursor: pointer;
        i {
          color: #409EFF;
        }
      }
      div:first-of-type {
        border-right: 1px solid #DDDDDD;
      }
    }
    .main {
      padding: 10px 0;
      .mainTop {
        @include flex;
        justify-content: flex-end;
      }
      .mainContent {
        margin-top: 20px;
        .el-row {
          .el-col {
            .title {
              color: #409EFF;
              margin-bottom: 8px;
            }
            .content.left {
              margin-right: 12px;
              padding: 10px;
            }
            .content.right {
              padding: 5px;
              .el-row {
                .el-col {
                  div {
                    margin: 5px 5px 2px;
                    height: 66px;
                    img{
                      @include border_radius(6px);
                    }
                  }
                }
              }
            }
            .content {
              height: 500px;
              overflow-y: auto;
              @include border_radius(6px);
              border: 1px solid #EFF2FD;
            }
          }
        }
      }
    }
  }
</style>
