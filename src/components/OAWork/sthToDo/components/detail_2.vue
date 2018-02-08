<template>
  <div id="auditing">
    <div class="titles">
      <div><i class="el-icon-tickets"></i>&nbsp;使用说明</div>
      <div><i class="el-icon-setting"></i>&nbsp;设置</div>
    </div>
    <div class="main">
      <div class="mainTop">
        <el-button type="info" size="mini" plain>
          <router-link to="/sthToDo">取 消</router-link>
        </el-button>
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="success" size="mini" @click="confirmCheck">已审核</el-button>
      </div>
      <div class="mainContent">
        <el-row>
          <el-col :span="10">
            <div class="title">仙居雅苑</div>
            <div class="content_left scroll_bar">
              <el-form :model="form" size="mini" label-width="110px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="报备状态">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="小区名称">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="门牌地址">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="房型">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收房月数">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保修期">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="空置期">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="付款方式">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="月单价">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="押金">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="第一次付款时间">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="物业费情况">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收款银行">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="第一次付款方式">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="支行">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收款人名">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="账户">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="房东姓名">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="电话号码">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收款人与业主姓名">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客户来源">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开单人">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所属姓名">
                      <div class="content">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <div class="content" style="height: 60px">仙居雅苑</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="content_right scroll_bar" style="position: relative">
              <div class="title">租客信息</div>
              <el-form :model="form" size="mini" label-width="110px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="房东姓名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证件类型">
                      <el-select v-model="form.region" clearable placeholder="请选择证件类型">
                        <el-option label="身份证" value="shanghai"></el-option>
                        <el-option label="护照" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="尊称">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="附属房东">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证件号码">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="国籍">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
              <div class="title">房屋信息</div>
              <el-form :model="form" size="mini" label-width="110px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="小区名称">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="小区地址"><el-input v-model="form.name" clearable></el-input>
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
                    <el-form-item label="建筑面积">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="装修">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房屋类型">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房屋特色">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="建筑类型">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="楼层数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="门卡数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="水表卡号">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电表卡号">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="气表卡号">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="水表底数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电表底数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="气表底数">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="卫生情况">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="配套设施">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="房屋照片">
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://img2.niutuku.com/desk/1208/1513/ntk-1513-31894.jpg"
                             src="http://img2.niutuku.com/desk/1208/1513/ntk-1513-31894.jpg" alt="">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <div class="title">租赁信息</div>
              <el-form :model="form" size="mini" label-width="110px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同编号">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同性质">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="付款方式">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="签约时长">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同开始时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同结束时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="空置时长">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="空置开始时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="空置结束时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="个人/中介">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="中介费">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="资料补齐时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="月单价">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="押金">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="打房租日期">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第一次打房租时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二次打房租时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="尾款补齐时间">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="待签约日期">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开单人">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核人">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="汇款方式">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款人姓名">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户行">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="账号">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="合同照片">
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://i2.hdslb.com/bfs/archive/f4c1445fa657c460365e1a9ca70703165378819c.jpg"
                             src="http://i2.hdslb.com/bfs/archive/f4c1445fa657c460365e1a9ca70703165378819c.jpg" alt="">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="证件照片">
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://imgstore.cdn.sogou.com/app/a/100540002/850349.jpg"
                             src="http://imgstore.cdn.sogou.com/app/a/100540002/850349.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://img4.imgtn.bdimg.com/it/u=2747188369,1529640155&fm=214&gp=0.jpg"
                             src="http://img4.imgtn.bdimg.com/it/u=2747188369,1529640155&fm=214&gp=0.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://imgstore.cdn.sogou.com/app/a/100540002/435825.jpg"
                             src="http://imgstore.cdn.sogou.com/app/a/100540002/435825.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://img2.niutuku.com/desk/1208/1420/ntk-1420-17603.jpg"
                             src="http://img2.niutuku.com/desk/1208/1420/ntk-1420-17603.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://4493bz.1985t.com/uploads/allimg/160523/3-160523132956.jpg"
                             src="http://4493bz.1985t.com/uploads/allimg/160523/3-160523132956.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://image.tianjimedia.com/uploadImages/2011/286/JYK9ZH332RD7.jpg"
                             src="http://image.tianjimedia.com/uploadImages/2011/286/JYK9ZH332RD7.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://img2.niutuku.com/1312/0857/0857-niutuku.com-9908.jpg"
                             src="http://img2.niutuku.com/1312/0857/0857-niutuku.com-9908.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg"
                             src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg" alt="">
                      </div>
                      <div class="image">
                        <img data-magnify="" data-caption="图片查看器"
                             data-src="http://pic1.win4000.com/wallpaper/4/5489069c8aa80.jpg"
                             src="http://pic1.win4000.com/wallpaper/4/5489069c8aa80.jpg" alt="">
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="title">备注</div>
              <el-form :model="form" size="mini" label-width="110px">
                <el-form-item label="备注">
                  <el-input type="textarea"></el-input>
                </el-form-item>
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
        .title {
          height: 19px;
          color: #409EFF;
          margin: 10px 0;
          &:before{
            border-radius: 2px;
            margin-right: 5px;
            background: #409EFF;
            border-left: 1px solid #409EFF;
            content: '|';
          }
        }
        .image {
          display: inline-block;
          img {
            width: 120px;
            height: 80px;
            border-radius: 4px;
            margin-right: 10px;

          }
        }
        .content_left {
          margin-right: 12px;
          padding: 10px;
          height: 660px;
          overflow-y: auto;
          @include border_radius(6px);
          border: 1px solid #e1e1e1;
          .content {
            padding: 0 10px;
            background: #eef3fc;
            border-radius: 4px;
            font-size: 12px;
            color: #727479;
            height: 30px;
          }
        }
        .content_right {
          margin-top: 39px;
          margin-right: 12px;
          padding: 10px;
          height: 660px;
          overflow-y: auto;
          @include border_radius(6px);
          border: 1px solid #e1e1e1;
        }
      }
    }
  }
</style>
