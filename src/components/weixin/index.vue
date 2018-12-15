<template>
  <div id="weixin">
    <div class="title">
      <h2>乐伽公寓-邀请好友赚现金</h2>
    </div>
    <div class="content">
      <p>活动规则：</p>
      <p>1、本活动所有人均可参与，推荐求租/托管成功签约，推荐人和被推荐人平分666元现金奖励。多推荐多赚钱，奖励无上限；</p>
      <p>2、被推荐人签约完成并交付相关款项后视为成功签约；（续约不参与本次活动。）</p>
      <p>3、活动仅限南京地区，其他城市敬请期待；</p>
      <p>4、活动咨询及合作请添加专属微信：13605140401；</p>
      <p>5、由于需要人工审核，所有奖励红包在签约成功后1-7个工作日内到账；</p>
      <p>6、活动时间2018年12月8日至2019年1月31日。</p>
    </div>
    <el-card>
      <b>提示：</b>不发了返利网客服务旅客访问量凤舞龙飞分为了加快分解违反了我垃圾费奇偶发了我房间里。
    </el-card>
    <div class="form">
      <el-form :model="params" :rules="rules" ref="infoFrom">
        <h4>1.您的姓名</h4>
        <el-form-item prop="name">
          <el-input size="mini" v-model="params.name"></el-input>
        </el-form-item>
        <h4>2.您的联系方式</h4>
        <el-form-item prop="phone">
          <el-input size="mini" v-model="params.phone"></el-input>
        </el-form-item>
        <h4>3.您的微信号</h4>
        <el-form-item prop="weixin_num">
          <el-input size="mini" v-model="params.weixin_num"></el-input>
        </el-form-item>
        <h4>您推荐的好友信息</h4>
        <h4>4.您推荐的好友姓名</h4>
        <el-form-item prop="f_name">
          <el-input size="mini" v-model="params.f_name"></el-input>
        </el-form-item>
        <h4>5.好友联系方式</h4>
        <el-form-item prop="f_phone">
          <el-input size="mini" v-model="params.f_phone"></el-input>
        </el-form-item>
        <h4>6.选择好友需要的服务</h4>
        <el-radio-group v-model="params.f_type">
          <el-radio label="rent">租房</el-radio>
          <el-radio label="manage">托管</el-radio>
        </el-radio-group>
        <h4>7.房屋需求</h4>
        <p>填写您的好友求租/托管房屋的位置、租金范围、房屋的基本条件等</p>
        <el-form-item prop="f_phone">
          <el-input size="mini" type="textarea" :row="6" v-model="params.house_params"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" style="width: 100%;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            params: {
              name: '',
              phone: '',
              weixin_num: '',
              f_name: '',
              f_phone: '',
              f_type: 'rent',
              house_params: ''
            },
            rules: {}
          }
      },
      methods: {
        submitForm(form) {

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
  }
</style>
