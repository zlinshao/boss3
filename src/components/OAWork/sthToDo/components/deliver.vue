<template>
  <div id="auditing">
    <div class="titles">
     <b style="padding: 5px 0;font-size: 18px">事件转交 - 陆宣羽给你生成了一条代办事项</b>
    </div>
    <div class="main">
      <div class="mainTop">
        <el-button type="info" size="mini" plain>
          <router-link to="/sthToDo">取消</router-link>
        </el-button>
        <el-button type="success" size="mini" @click="confirmCheck">已审核</el-button>
      </div>
      <div class="mainContent">
        <el-row>
          <el-col :span="24">
            <div class="title">具体事件</div>
            <div class="content left scroll_bar">
              <el-form :model="form" size="mini" label-width="120px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="地址">
                      <div class="textContent">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="创建事件">
                      <div class="textContent">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="创建人">
                      <div class="textContent">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="事件名称">
                      <div class="textContent">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="事件详情">
                      <div class="textContent">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aperiam dolores, esse eveniet ex magni maxime, minus nostrum officiis omnis possimus quidem repellat reprehenderit tempore! Accusantium consectetur cumque tempora!
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
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
    mounted(){

    },
    watch: {},
    methods: {
      confirmCheck(){
        this.$confirm('审核后无法撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          this.$router.push('./sthToDo')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
      }
    },
  }
</script>

<style lang="scss">
  #auditing {

    .scroll_bar {
      &::-webkit-scrollbar-button {
        height: 10px;
        background-color: #ffffff;
      }
    }

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
      border-bottom: 1px solid #EEEEEE;
      padding-bottom: 10px;
    }
    .main {
      padding: 10px 0;
      .mainTop {
        @include flex;
        justify-content: flex-end;
      }
      .mainContent {
        margin-top: 20px;
        .title {
          color: #409EFF;
          margin-bottom: 8px;
          &:before{
            border-radius: 2px;
            margin-right: 5px;
            background: #409EFF;
            border-left: 1px solid #409EFF;
            content: '|';
          }
        }
        .content {
          height: 650px;
          overflow-y: auto;
          @include border_radius(6px);
          border: 1px solid #e1e1e1;
          .textContent{
            padding: 0 10px;
            background: #eef3fc;
            border-radius: 4px;
            font-size: 12px;
            color: #727479;
            min-height: 30px;
          }
        }
        .content.left {
          margin-right: 12px;
          padding: 10px;
        }
        .content.right {
          padding: 10px;
        }
      }
    }
  }
</style>
