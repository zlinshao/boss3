<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="客服部问题申报"
      :visible.sync="problemReportVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form size="mini" label-width="100px">
          <div v-for="item in number">
            <el-form-item :label="'报销明细('+item+')'">
              <el-button v-if="item>1" type="text" size="mini" style="float: right" @click="deleteNumber(item-1)">删除</el-button>
            </el-form-item>
            <el-form-item label="房屋地址">
              <el-input v-model="problem_report_address[item-1]"  placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="租客电话">
              <el-input v-model="problem_report_mobile[item-1]"  placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="报销金额" required="">
              <el-input v-model="problem_report_amount[item-1]" placeholder="请输入(必填)"></el-input>
            </el-form-item>
            <el-form-item label="报销类别" required="">
              <el-input v-model="problem_report_type[item-1]" placeholder="请输入(必填)"></el-input>
            </el-form-item>
            <el-form-item label="费用明细">
              <el-input v-model="problem_report_cost_details[item-1]" type="textarea" :autosize="{minRows: 2, maxRows: 4}" ></el-input>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button @click="addNumber">
              <i class="el-icon-plus"></i>增加报销明细
            </el-button>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 2, maxRows: 4}" ></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="upLoad">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="审批人">
            <div class="upLoad">
              <el-row>
                <el-col>
                  <div class="remind">审批人已由管理员预置,并将自动去重</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <div class="conservator">
                    <div class="conservatorInfo">
                      <img src="../../../../assets/images/情人节.png" alt="">
                      <div class="conservatorName">张琳琳</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div class="picSign">
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="conservator">
                    <div class="conservatorInfo">
                      <img src="../../../../assets/images/情人节.png" alt="">
                      <div class="conservatorName">张琳琳</div>
                    </div>
                    <div class="grade">第1级主管</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>

          <el-form-item label="抄送人">
            <div class="upLoad ">
              <el-row>
                <el-col>
                  <div class="remind">审批通过后，通知抄送人</div>
                </el-col>
              </el-row>
              <div class="examine">
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div>
                  <el-button type="text">添加抄送人</el-button>
                </div>
              </div>

            </div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button type="primary" size="small" @click="confirmSubmit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: ['module'],
    data () {
      return {
        problemReportVisible: false,           //请假审批
        form: {
          content:[],
          remark:'',
        },
        problem_report_address : [],
        problem_report_mobile : [],
        problem_report_amount : [],
        problem_report_type : [],
        problem_report_cost_details : [],
        number:1,
      }
    },
    watch:{
      module(val){
        this.problemReportVisible = val;
      },
      problemReportVisible(val){
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
      },
      //增加报销明细
      addNumber(){
        this.number++;
      },
      //删除报销明细
      deleteNumber(index){
        this.number--;
        this.problem_report_address.splice(index,1);
        this.problem_report_mobile.splice(index,1);
        this.problem_report_amount.splice(index,1);
        this.problem_report_type.splice(index,1);
        this.problem_report_cost_details.splice(index,1);
      },
      //确认提交
      confirmSubmit(){

        let contentItem = {};
        this.form.content=[];
        for(let i=0;i<this.number;i++){
          contentItem = {};
          contentItem.problem_report_address = this.problem_report_address[i]?this.problem_report_address[i]:'';
          contentItem.problem_report_mobile = this.problem_report_mobile[i]?this.problem_report_mobile[i]:'';
          contentItem.problem_report_amount = this.problem_report_amount[i]?this.problem_report_amount[i]:'';
          contentItem.problem_report_type = this.problem_report_type[i]?this.problem_report_type[i]:'';
          contentItem.problem_report_cost_details = this.problem_report_cost_details[i]?this.problem_report_cost_details[i]:'';
          this.form.content.push(contentItem);
        }

        this.$http.post(globalConfig.server+'oa/problemReport',this.form).then((res) => {
          if(res.data.code === '220010'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.closeModal();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      closeModal(){
        this.form = {
          content:[],
          remark:'',
        };
        this.problem_report_address = [];
        this.problem_report_mobile = [];
        this.problem_report_amount = [];
        this.problem_report_type = [];
        this.problem_report_cost_details = [];
        this.number = 1;
        this.problemReportVisible = false;
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
  .picSign {
    font-size: 16px;
    text-align: center;
    margin-top: 16px;
  }
  .statistics {
    background: #409EFF;
    color: #FFFFFF;
    @include border_radius(6px);
    padding: 10px;
    .first {
      font-size: 14px;
    }
    .second {
      font-size: 20px;
    }
  }
</style>
