<template>
  <div>
    <div class="tool">
      <div class="tool_left">
        <el-button type="primary" size="mini" @click="showBasicset()">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          基本设置
        </el-button>
        <el-button type="primary" size="mini" @click="showSecond()">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          二级密码设置
        </el-button>
        <el-button type="primary" size="mini" @click="showLockscreen()">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          锁屏密码设置
        </el-button>
      </div>

      <div class="tool_right">
        <div>
          <i class="el-icon-tickets"></i>
          &nbsp;使用说明
        </div>
        <!--<div>-->
        <!--<i class="el-icon-setting"></i>-->
        <!--&nbsp;设置-->
        <!--</div>-->
      </div>
    </div>
    <!--<div class="main">-->
    <!--<el-row>-->
    <!--<el-col class="leftTitle" :span="4">-->
    <!--退房提醒设置-->
    <!--</el-col>-->
    <!--<el-col :span="20">-->
    <!--<div>-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="收房业务人员1"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员2"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员3"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员4"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员5"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员6"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员7"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员8"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--</div>-->
    <!--<div class="remark">-->
    <!--备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下的所有员工-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-col class="leftTitle" :span="4">-->
    <!--租房将近提醒设置-->
    <!--</el-col>-->
    <!--<el-col :span="20">-->
    <!--<div class="nowrap">-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="启用房东/租客合同到期自动提醒"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--&nbsp;&nbsp;-->
    <!--<div style="margin-bottom: 10px;">-->
    <!--，提前-->
    <!--<el-select v-model="form.banks" clearable size="mini">-->
    <!--<el-option label="请选择" value=""></el-option>-->
    <!--<el-option v-for="key in 30" :label="key" :value="key" :key="key"></el-option>-->
    <!--</el-select>-->
    <!--天-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="remark">-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="收房业务人员11"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员22"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员33"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员44"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员55"></el-checkbox>-->
    <!--<el-checkbox label="收房业务人员66"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-col class="leftTitle" :span="4">-->
    <!--房东租客录入保存后弹出设置-->
    <!--</el-col>-->
    <!--<el-col :span="20" class="collect_rent">-->
    <!--<div>-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="房东"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--<div style="padding-left: 22px;">-->
    <!--<p>勾选：在录入或修改房东信息后会自动弹出已经生成好的应支房租计划表，对不稳定的可以随时修改，这种适合免租期模式经常变化的情况。</p>-->
    <!--<p>不勾选：则直接按照设定好的免租期生成模式自动保存，这种适合免租期比较固定的情况。</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div>-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="租客"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--<div style="padding-left: 22px;">-->
    <!--<p>勾选：在录入或修改租客信息后自动弹出已经生成好的应支房租计划表，以便于修改，若需要经常修改，就勾选。</p>-->
    <!--<p>不勾选：由于租客没有那么多模式，生成出来的一般不需要修改，所以建议不勾选。</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-col class="leftTitle" :span="4">-->
    <!--补齐合同时间-->
    <!--</el-col>-->
    <!--<el-col :span="20">-->
    <!--<div class="nowrap">-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="合同开始后"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--&nbsp;&nbsp;-->
    <!--<div style="margin-bottom: 10px;">-->
    <!--<el-select v-model="form.banks" clearable size="mini">-->
    <!--<el-option label="请选择" value=""></el-option>-->
    <!--<el-option v-for="key in 30" :label="key" :value="key" :key="key"></el-option>-->
    <!--</el-select>-->
    <!--天内-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-col class="leftTitle" :span="4">-->
    <!--房屋管理领取/放弃时间设置-->
    <!--</el-col>-->
    <!--<el-col :span="20">-->
    <!--<div class="nowrap">-->
    <!--<el-checkbox-group v-model="checkList">-->
    <!--<el-checkbox label="每月"></el-checkbox>-->
    <!--</el-checkbox-group>-->
    <!--&nbsp;&nbsp;-->
    <!--<div class="block" style="margin-bottom: 10px;">-->
    <!--<el-date-picker-->
    <!--size="mini"-->
    <!--v-model="form.dates"-->
    <!--type="daterange"-->
    <!--align="right"-->
    <!--unlink-panels-->
    <!--range-separator="至"-->
    <!--start-placeholder="开始日期"-->
    <!--end-placeholder="结束日期"-->
    <!--:picker-options="pickerOptions">-->
    <!--</el-date-picker>-->
    <!--</div>-->
    <!--&nbsp;&nbsp;-->
    <!--<div style="margin-bottom: 10px;">-->
    <!--可领取房源-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="remark">-->
    <!--备注：当设置成功后，除设置内的时间外，其余时间均不可领取/放弃房源-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-col :span="4">&nbsp;</el-col>-->
    <!--<el-col :span="20">-->
    <!--<el-button type="primary" size="small" style="padding: 10px 140px;">保存</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</div>-->

    <div class="main" v-if="basicSet">
      <el-row>
        <el-col class="leftTitle" :span="4" style="margin-top: 5px">
          首页倒计时
        </el-col>
        <el-col :span="20">
          <div class="nowrap" style="margin-bottom: 12px;">
            <div>倒计时设置</div>
            &nbsp;&nbsp;
            <div>
              <el-input model="form" size="mini" clearable></el-input>
            </div>
          </div>
          <div class="remark">
            备注：法大师傅士大夫的撒范德萨范德萨范德萨发幅度萨芬安德森
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          喜报弹窗设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：法大师傅士大夫的撒范德萨范德萨范德萨发幅度萨芬安德森
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          喜报弹窗设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：法大师傅士大夫的撒范德萨范德萨范德萨发幅度萨芬安德森
          </div>
        </el-col>
      </el-row>


      <el-row>
        <el-col class="leftTitle" :span="4">
          喜报弹窗设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
              <el-checkbox label="勾选后不显示喜报弹窗"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-button type="primary" size="small" style="padding: 10px 140px;">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main" v-if="secondPassword">

      <el-row>
        <el-col class="leftTitle" :span="4">
          设置二级密码
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="租赁管理"></el-checkbox>
              <el-checkbox label="财务账本"></el-checkbox>
              <el-checkbox label="喜报管理"></el-checkbox>
              <el-checkbox label="业绩工资"></el-checkbox>
              <el-checkbox label="人资管理"></el-checkbox>
              <el-checkbox label="OA办公"></el-checkbox>
              <el-checkbox label="系统设置"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选后，查看此模块前，需输入二级密码。
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4" style="margin-top: 5px">
          密码设置
        </el-col>
        <el-col :span="20">
          <div class="nowrap" style="margin-bottom: 12px;">
            <!--<div>手机号码</div>-->
            <div>
              <el-input model="form" clearable placeholder="请输入手机号码"></el-input>
            </div>
          </div>
          <div class="validate">
            <div>
              <el-input model="form" clearable placeholder="请输入验证码"></el-input>
            </div>
            <div>
              <el-button type="primary">获取验证码</el-button>
            </div>
            <div>
              <el-button type="text">60S后重新获取</el-button>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input model="form" clearable placeholder="请输入新密码"></el-input>
              <i class="el-icon-success"></i>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input model="form" clearable placeholder="请确认新密码"></el-input>
              <i class="el-icon-success"></i>
            </div>
          </div>

          <div class="remark">
            备注：密码长度6-16位，数字、字母和符号至少包含两种。
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-button type="primary" size="small" style="padding: 10px 140px;">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main" v-if="lockScreen">

      <el-row>
        <el-col class="leftTitle" :span="4" style="margin-top: 5px">
          锁屏密码设置/修改
        </el-col>
        <el-col :span="20">
          <div class="validate">
            <div>
              <el-input placeholder="请输入验证码" v-model="sms_lock_num"></el-input>
            </div>
            <div>
              <el-button @click="sendMessage" v-if="isSending>59" style="width: 140px;" type="primary">获取验证码</el-button>
              <el-button v-if="isSending<60" disabled="" style="width: 140px;" type="primary">{{isSending}}s后重新发送</el-button>
            </div>
          </div>
          <div class="validate">
            <div class="validateSign">
              <el-input v-model="set_pwd_lock" placeholder="请输入新密码"></el-input>
              <i class="el-icon-success" style="color: #46ff53" v-show="set_pwd_lock.length>6"></i>
            </div>
          </div>
          <!--<div class="validate">-->
            <!--<div class="validateSign">-->
              <!--<el-input type="password" v-model="identify_pwd_lock" placeholder="请确认新密码"></el-input>-->
              <!--<i class="el-icon-success" style="color: #46ff53" v-show="false"></i>-->
            <!--</div>-->
          <!--</div>-->

          <div class="remark">
            备注：密码长度6-16位，数字、字母和符号至少包含两种。
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-button type="primary" size="small" @click="setLockPassword" style="padding: 10px 140px;">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        basicSet: true,
        secondPassword: false,
        lockScreen: false,
        isSending : 60,    //发送验证码
        sms_lock_num:'',    //验证码
        set_pwd_lock:'',    //锁屏密码
        identify_pwd_lock:'',
        form: {},
        checkList: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    mounted() {
    },
    watch: {

    },
    methods: {
      showBasicset() {
        this.basicSet = true;
        this.secondPassword = false;
        this.lockScreen = false;
      },
      showSecond() {
        this.basicSet = false;
        this.secondPassword = true;
        this.lockScreen = false;
      },
      showLockscreen() {
        this.basicSet = false;
        this.secondPassword = false;
        this.lockScreen = true;
      },
      //发送验证码
      sendMessage(){
        new Promise((resolve, reject) => {
          let interval = setInterval(() => {
            this.isSending--;
            if(this.isSending<0){
              clearInterval(interval)
              resolve()
            }
          }, 1000)
        }).then((data) => {
            this.isSending = 60;
        });
        this.$http.get(globalConfig.server+'setting/others/sms_code').then((res)=>{
            if(res.data.code === '100090'){
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
            }
        })
      },
      setLockPassword(){
        this.$http.get(globalConfig.server+'setting/others/lock_screen_status?sms_lock_num='+this.sms_lock_num +'&set_pwd_lock='+this.set_pwd_lock).then((res)=>{
            if(res.data.code === '100000'){
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
            }else {
              this.$notify({
                title: '警告',
                message: res.data.msg,
                type: 'warning'
              });
            }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  .main {
    padding: 40px 0;
  }

  .main > .el-row {
    margin-bottom: 40px;
    .el-col.el-col-20 {
      label {
        margin-bottom: 12px;
      }
    }
    .el-col.el-col-20.collect_rent {
      label {
        margin-bottom: 0;
      }
    }
  }

  .tool {
    border-bottom: 1px solid #eee;
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between;
    .tool_right {
      display: flex;
      align-items: center;
      div {
        width: 100px;
        text-align: center;
        cursor: pointer;
        i {
          color: #409EFF;
        }
      }
      div + div {
        border-left: 1px solid #DDDDDD;
      }
    }
  }

  .leftTitle {
    text-align: right;
    padding-right: 40px;
    color: #409EFF;
  }

  .remark {
    color: #FDAECE;
  }

  .nowrap {
    display: flex;
    display: -webkit-flex;
    align-items: center
  }

  .validate {
    @include flex;
    margin-bottom: 12px;
    :nth-child(2) {
      margin: 0 10px;
    }
    .validateSign {
      @include flex;
      justify-content: center;
      i {
        line-height: 40px;
      }
    }
  }
</style>
