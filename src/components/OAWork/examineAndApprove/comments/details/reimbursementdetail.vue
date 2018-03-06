<template>
  <div class="modalFrame">
    <el-dialog
      title="报销详情"
      :visible.sync="reimbursedetail"
      width="50%">
      <div class="frameHead">
        <div class="personInfo">
          <div class="headPic">
            <img src="../../../../../assets/images/dd1.png" alt="">
          </div>
          <div class="personName">
            <div>张琳琳</div>
            <div>研发部-研发部研发部研发部</div>
          </div>
        </div>
        <div class="status">
          <el-button type="success" disabled>审批通过</el-button>
        </div>
      </div>

      <div class="infoList">
        <el-form size="mini" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="审批编号">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在部门">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缺卡原因">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证明人">
                <el-input readonly>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col></el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="timeDate">
                <div class="detailDate">2018-01-01</div>
                <div class="detailTime">10:00</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-steps direction="vertical" :active="1">
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>
                  <el-step title=""></el-step>

                  <el-step title="" description=""></el-step>
                </el-steps>
              </div>
            </el-col>
            <el-col :span="12">
              <div></div>
            </el-col>
          </el-row>

          <el-form-item label="抄送人" style="margin-top: 20px">
            <div class="upLoad ">
              <el-row>
                <el-col>
                  <div class="remind">审批通过后，通知抄送人</div>
                </el-col>
              </el-row>
              <div class="examine">
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div>
                  <el-button type="text">添加抄送人</el-button>
                </div>
              </div>

            </div>
          </el-form-item>
          <div class="payTime">
            共耗时5天四小时，比10%的同类申请快
          </div>
        </el-form>
      </div>



      <span slot="footer">
        <el-button type="primary" @click="reimbursedetail = false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "reimbursedetail",
    props: ['module'],
    data () {
      return {
        reimbursedetail: false,           //报销详情
        form: {
          input1: '',
          value1: '',
          textarea: '',
          dialogImageUrl: '',
          value3: '',
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      }
    },
    watch:{
      module(val){
        this.reimbursedetail = val;
      },
      reimbursedetail(val){
        if(!val){
          this.$emit('close');
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
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

  @font-face{
    font-family:Impact;//////字体名称
    src:url(../../../../../assets/font/impact-2.ttf);  ////字体路径
  }

.frameHead {
  width: 100%;
  @include flex;
  justify-content: space-between;
  .personInfo {
    @include flex;
    .headPic {
      width: 45px;
      height: 45px;
      @include border_radius(50%);
      img {
        width: 45px;
        height: 45px;
        @include border_radius(50%);
      }
    }
    .personName {
      :nth-child(1) {
        color: #409EFF;
        font-size: 14px;
      }
      :nth-child(2) {
        font-size: 12px;
      }
      margin-left: 10px;
    }
  }
}
.infoList {
  padding: 25px 35px;
  input {
    background-color: #EEF3FC;
  }
}
.timeDate {
  padding-left: 20px;
  color: #BEBEBF;
  @include flex;
  .detailTime {
    font-family: 'Impact', sans-serif;
    margin-left: 5px;
    font-size: 14px;

  }
}
  .upLoad {
    @include border_radius(4px);
    border: 1px solid #dfe6fb;
    padding: 10px;
    .examine {
      @include flex;
      flex-wrap: wrap;
    }
  }
  .remind {
    font-size: 12px;
  }
.conservator {
  @include border_radius(50%);
  .conservatorInfo{
    /*border: 1px solid red;*/
    width: 70px;
    height: 66px;
    img {
      width: 35px;
      height: 35px;
      @include border_radius(50%);
      margin-left: 21px;
    }
    .conservatorName {
      font-size: 13px;
      text-align: center;
      width: 80px;
      height: 20px;
    }
  }
  .grade {
    border: 1px solid #dfe6fb;
    @include border_radius(4px);
    width: 75px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: #409EFF;
    text-align: center;
    margin: 0 0 10px 3px;
  }
}
.payTime {
  font-size: 14px;
  color: #fb4699;
}
</style>
