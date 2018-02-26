<template>
  <div>
    <div class="tool">
      <div class="tool_left">
        <el-button type="primary" size="mini">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          基本设置
        </el-button>
        <el-button type="primary" size="mini">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          密码设置
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

    <div class="main">
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
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
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
    watch: {},
    methods: {},
  }
</script>

<style scoped lang="scss">
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
</style>
