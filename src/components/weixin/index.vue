<template>
  <div id="weixin">
    <div class="title">
      <h2>乐伽公寓-邀请好友赚现金</h2>
    </div>
    <div class="content">
      <p>活动规则：</p>
      <p>1、本活动所有人均可参与，推荐求租/托管成功签约，推荐人和被推荐人平分<span style="color: red;">666元现金奖励</span>。多推荐多赚钱，奖励无上限；</p>
      <p>2、被推荐人签约完成并交付相关款项后视为成功签约；（续约不参与本次活动。）</p>
      <p>3、活动<span style="font-weight: bold;">仅限南京地区</span>，其他城市敬请期待；</p>
      <p>4、活动咨询及合作请添加专属微信：<span style="font-weight: bold;">13605140401</span>；</p>
      <p>5、由于需要人工审核，所有奖励红包在签约成功后1-7个工作日内到账；</p>
      <p>6、活动时间2018年12月8日至2019年1月31日。</p>
    </div>
    <div class="form">
      <el-form :model="params" :rules="rules" ref="infoFrom">
        <h4><span style="color: red;">*</span>1.您的姓名</h4>
        <el-form-item prop="user_name">
          <el-input size="small" v-model="params.user_name"></el-input>
        </el-form-item>
        <h4><span style="color: red;">*</span>2.您的联系方式</h4>
        <el-form-item prop="user_phone">
          <el-input size="small" v-model="params.user_phone"></el-input>
        </el-form-item>
        <h4><span style="color: red;">*</span>3.您的微信号</h4>
        <el-form-item prop="user_account">
          <el-input size="small" v-model="params.user_account"></el-input>
        </el-form-item>
        <h4>您推荐的好友信息</h4>
        <h4><span style="color: red;">*</span>4.您推荐的好友姓名</h4>
        <el-form-item prop="recommend_name">
          <el-input size="small" v-model="params.recommend_name"></el-input>
        </el-form-item>
        <h4><span style="color: red;">*</span>5.好友联系方式</h4>
        <el-form-item prop="recommend_phone">
          <el-input size="small" v-model="params.recommend_phone"></el-input>
        </el-form-item>
        <h4><span style="color: red;">*</span>6.选择好友需要的服务</h4>
        <el-form-item prop="recommend_type">
          <el-radio-group v-model="params.recommend_type">
            <el-radio :label="1">租房</el-radio>
            <el-radio :label="2">托管</el-radio>
          </el-radio-group>
        </el-form-item>
        <h4><span style="color: red;">*</span>7.房屋需求</h4>
        <p>填写您的好友求租/托管房屋的位置、租金范围、房屋的基本条件等</p>
        <el-form-item prop="house_where">
          <el-input type="textarea" size="small" v-model="params.house_where"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" style="width: 100%;" type="primary" @click="submitForm('infoFrom')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%;text-align: right;">
      <el-button type="text" size="small" @click="openInvite">查看我的邀请</el-button>
    </div>
    <div :class="{getNum: !getPhone}">
      <el-input type="text" size="small" v-model="user_phone" placeholder="请输入您的手机号码"></el-input>
      <div style="text-align: right;margin: 15px 0">
        <el-button type="normal" size="mini" @click="handleCancel">取消</el-button>
        <el-button type="primary" size="mini" @click="getDataList">确定</el-button>
      </div>
    </div>
    <div :class="{list : !isShow}">
      <el-table
        :data="inviteList"
      >
        <el-table-column label="好友" prop="recommend_name"></el-table-column>
        <el-table-column label="好友联系方式" prop="recommend_phone" min-width="120px;"></el-table-column>
        <el-table-column label="服务类别" prop="recommend_type">
          <template slot-scope="scope">
            <span v-text="scope.row.recommend_type === 1 ? '租房' : '托管'"></span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="recommend_status">
          <template slot-scope="scope">
            <span v-text="scope.row.recommend_status === 1 ? '未签约' : scope.row.recommend_status === 2 ? '已签约' : '已结算'"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            url: globalConfig.server,
            params: {
              user_name: '',
              user_phone: '',
              user_account: '',
              recommend_name: '',
              recommend_phone: '',
              recommend_type: 1,
              house_where: ''
            },
            rules: {
              user_name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
              ],
              user_phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { min: 11, max: 15, message: '长度在 11 到 15 个字符', trigger: 'blur' }
              ],
              user_account: [
                { required: true, message: '请输入微信号', trigger: 'blur' },
              ],
              recommend_name: [
                { required: true, message: '请输入好友姓名', trigger: 'blur' },
                { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
              ],
              recommend_phone: [
                { required: true, message: '请输入好友手机号码', trigger: 'blur' },
                { min: 11, max: 15, message: '长度在 11 到 15 个字符', trigger: 'blur' }
              ],
              recommend_type: [
                { required: true, message: '请选择服务类型',trigger: 'blur'}
              ],
              house_where: [
                { required: true,message: '请输入房屋基本配置',trigger: 'blur'},
                { min: 0, max: 999, message: '长度在 0 到 999 之间', trigger: 'blur' }
              ]
            },
            isShow: false,
            inviteList: [],
            user_phone: '',
            getPhone: false
          }
      },
      methods: {
        handleCancel() {
          this.getPhone = false;
          this.isShow = false;
          this.user_phone = '';
        },
        openInvite() {
          if (this.getPhone) {
            this.getPhone = false;
            this.isShow = false;
            this.user_phone = '';
            return false;
          } else {
            this.getPhone = true;
          }
        },
        //获取邀请列表
        getDataList() {
          if (!this.user_phone || this.user_phone.length < 11) {
            this.$message("手机号码格式不正确");
            return false;
          }
          this.$http.get(this.url + `/recommend/fellow/${this.user_phone}`).then(res => {
            if(res.data.code === '20000') {
              this.inviteList = res.data.data;
              this.isShow = true;
            }else {
              this.inviteList = [];
              this.isShow = false;
              this.$notify.warning({
                title: '警告',
                message: '获取列表失败'
              });
            }
          }).catch(err => {
            console.log(err);
          })
        },
          //提交邀请
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post(this.url + '/recommend/fellow',this.params).then(res => {
                if(res.data.code === '20000') {
                  this.$notify.success({
                    title: '成功',
                    message: res.data.msg
                  });
                  this.$refs[formName].resetFields();
                }else {
                  this.$notify.warning({
                    title: '警告',
                    message: res.data.msg
                  });
                  return false;
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style lang="scss">
  body{
    background-color: white !important;
  }
  #weixin{
    width: 90%;
    padding: 15px;
    text-align: center;
    margin: 0 auto;
    .title>h2{
      color: #409EFF;
    }
    .content{
      width: 100%;
      border-bottom: 1px dashed #808080;
      text-align: left;
      margin-bottom: 1em;
    }
    .form{
      margin-top: 20px;
      text-align: left;
    }
    .list,.getNum{
      display: none;
    }
  }
</style>
