<template>
  <div>
    <div class="tool">
      <div class="tool_left">
        <el-button type="primary" size="mini">
          <!--<i class="el-icon-document"></i>&nbsp;-->
          基本设置
        </el-button>
      </div>

      <div class="tool_right">
        <div>
          <i class="el-icon-tickets"></i>
          &nbsp;使用说明
        </div>
        <div>
          <i class="el-icon-setting"></i>
          &nbsp;设置
        </div>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col class="leftTitle" :span="4">
          退房提醒设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="收房业务人员1"></el-checkbox>
              <el-checkbox label="收房业务人员2"></el-checkbox>
              <el-checkbox label="收房业务人员3"></el-checkbox>
              <el-checkbox label="收房业务人员4"></el-checkbox>
              <el-checkbox label="收房业务人员5"></el-checkbox>
              <el-checkbox label="收房业务人员6"></el-checkbox>
              <el-checkbox label="收房业务人员7"></el-checkbox>
              <el-checkbox label="收房业务人员8"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下的所有员工
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          租房将近提醒设置
        </el-col>
        <el-col :span="20">
          <div style="display: flex;align-items: center">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="启用房东/租客合同到期自动提醒"></el-checkbox>
            </el-checkbox-group>
            <div style="margin-bottom: 10px;">
              ，提前
              <el-select v-model="form.banks" clearable size="mini">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="key in 30" :label="key" :value="key" :key="key"></el-option>
              </el-select>
              天
            </div>
          </div>
          <div class="remark">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="收房业务人员11"></el-checkbox>
              <el-checkbox label="收房业务人员22"></el-checkbox>
              <el-checkbox label="收房业务人员33"></el-checkbox>
              <el-checkbox label="收房业务人员44"></el-checkbox>
              <el-checkbox label="收房业务人员55"></el-checkbox>
              <el-checkbox label="收房业务人员66"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          房东租客录入保存后弹出设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="收房业务人员1"></el-checkbox>
              <el-checkbox label="收房业务人员2"></el-checkbox>
              <el-checkbox label="收房业务人员3"></el-checkbox>
              <el-checkbox label="收房业务人员4"></el-checkbox>
              <el-checkbox label="收房业务人员5"></el-checkbox>
              <el-checkbox label="收房业务人员6"></el-checkbox>
              <el-checkbox label="收房业务人员7"></el-checkbox>
              <el-checkbox label="收房业务人员8"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下的所有员工
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          补齐合同时间
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="收房业务人员1"></el-checkbox>
              <el-checkbox label="收房业务人员2"></el-checkbox>
              <el-checkbox label="收房业务人员3"></el-checkbox>
              <el-checkbox label="收房业务人员4"></el-checkbox>
              <el-checkbox label="收房业务人员5"></el-checkbox>
              <el-checkbox label="收房业务人员6"></el-checkbox>
              <el-checkbox label="收房业务人员7"></el-checkbox>
              <el-checkbox label="收房业务人员8"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下的所有员工
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="leftTitle" :span="4">
          房屋管理领取/放弃时间设置
        </el-col>
        <el-col :span="20">
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="收房业务人员1"></el-checkbox>
              <el-checkbox label="收房业务人员2"></el-checkbox>
              <el-checkbox label="收房业务人员3"></el-checkbox>
              <el-checkbox label="收房业务人员4"></el-checkbox>
              <el-checkbox label="收房业务人员5"></el-checkbox>
              <el-checkbox label="收房业务人员6"></el-checkbox>
              <el-checkbox label="收房业务人员7"></el-checkbox>
              <el-checkbox label="收房业务人员8"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="remark">
            备注：勾选职务后，只要有租客退房，系统会自动发送待办提醒给该职位下的所有员工
          </div>
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
</style>
