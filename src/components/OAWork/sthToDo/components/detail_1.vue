<template>
  <div id="auditing">
    <div class="titles">
      <div><i class="el-icon-tickets"></i>&nbsp;使用说明</div>
      <div><i class="el-icon-setting"></i>&nbsp;设置</div>
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
          <el-col :span="16">
            <div class="title">仙居雅苑</div>
            <div class="content left scroll_bar">
              <el-form :model="form" size="mini" label-width="110px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="报备状态">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="小区名称">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="门牌地址">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="房型">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收房月数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保修期">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="空置期">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="付款方式">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="月单价">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="押金">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次付款时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="物业费情况">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款银行">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次付款方式">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款人名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="账户">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房东姓名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="电话号码">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款人与业主姓名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="客户来源">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开单人">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属姓名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="备注">
                      <el-input v-model="form.name" clearable type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="title">合同照片</div>
            <div class="content right scroll_bar" id="con" @dragover='allowDrop($event)'>
              <img data-magnify="" data-caption="图片查看器"
                   data-src="http://imgstore.cdn.sogou.com/app/a/100540002/850349.jpg"
                   src="http://imgstore.cdn.sogou.com/app/a/100540002/850349.jpg" alt="">
              <img data-magnify="" data-caption="图片查看器"
                   data-src="https://farm5.staticflickr.com/4267/34162425794_1430f38362_z.jpg"
                   src="https://farm5.staticflickr.com/4267/34162425794_1430f38362_s.jpg" alt="">
            </div>
          </el-col>
          <el-col :span="4">
            <div class="title">合同照片</div>
            <div class="content right scroll_bar" id="box" @dragover='allowDrop($event)'>
              <img data-magnify="" data-caption="图片查看器"
                   data-src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg"
                   src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg" alt="">
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
        },
      }
    },
    mounted(){
      let box=document.getElementById('box');
      let con=document.getElementById('con');
      let lis=document.getElementsByTagName('img');
      for(let i=0;i<lis.length;i++){
        lis[i].draggable=true;
        lis[i].flag=false;
        lis[i].ondragstart=function(){
          this.flag=true;

        };
        lis[i].ondragend=function(){
          this.flag=false;
        }
      }
      box.ondrop = function(e) {
        // e.preventDefault();
        for (let i = 0; i < lis.length; i++) {
          if(lis[i].flag){ //如果flag为真，则添加一个li至box里
            box.appendChild(lis[i]);
          }
        }
      };
      con.ondrop = function(e) {
        // e.preventDefault();
        for (let i = 0; i < lis.length; i++) {
          if(lis[i].flag){ //如果flag为真，则添加一个li至box里
            con.appendChild(lis[i]);
          }
        }
      }
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
      },
      allowDrop(e){
        e.preventDefault();
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

    img{
      margin: 5px 5px 2px;
      @include border_radius(6px);
      width: 120px;
      height: 80px;
      display: block;
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
              padding: 10px;
              .el-col {

              }
            }
            .content {
              height: 650px;
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
