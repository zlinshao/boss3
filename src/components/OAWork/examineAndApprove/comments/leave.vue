<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="请假审批"
      :visible.sync="leaveVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="请假类型">
                <el-select v-model="form.leave_type"  clearable="" placeholder="请选择">
                  <el-option
                    v-for="item in dictionary"
                    :key="item.id"
                    :label="item.dictionary_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="form.leave_start_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="form.leave_end_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="时长">
            <el-input v-model="hours" readonly></el-input>
          </el-form-item>

          <el-form-item>
            根据排班自动计算时长：<el-button type="text" @click="innerVisible = true">查看明细</el-button>
          </el-form-item>

          <el-dialog :close-on-click-modal="false"
            width="30%"
            title="计算明细"
            :visible.sync="innerVisible"
            append-to-body>
            <div class="statistics">
              <el-row>
                <el-col :span="24">
                  <div class="first">将在出勤统计中记为</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="second">共请假5小时</div>
                </el-col>
              </el-row>
            </div>
            <div style="height: 300px;margin-top: 20px">
              <el-steps direction="vertical" :active="1">
                <el-step title="8小时" description="2018-03-07 周三"></el-step>
                <el-step title="8小时" description="2018-03-07 周三"></el-step>
                <el-step title="8小时" description="2018-03-07 周三"></el-step>
              </el-steps>
            </div>
          </el-dialog>

          <el-form-item label="请假事由">
            <el-input v-model="form.remark" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入请假事由(必填)"></el-input>
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

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>
                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

                <div class="conservator">
                  <div class="conservatorInfo">
                    <img src="../../../../assets/images/情人节.png" alt="">
                    <div class="conservatorName">张琳琳</div>
                  </div>
                </div>

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
    name: "leave",
    props: ['module'],
    data () {
      return {
        leaveVisible: false,           //请假审批
        form: {
          leave_type: '',
          leave_start_time: '',
          leave_end_time: '',
          leave_duration: '',
          remark: '',
        },
        dictionary:[],
        innerVisible: false,  //查看明细
      }
    },
    mounted(){
        this.getDictionary();
    },
    watch:{
      module(val){
        this.leaveVisible = val;
      },
      leaveVisible(val){
        if(!val){
          this.$emit('close');
        }
      }
    },
    computed:{
        hours(){
            let totalHours = Math.ceil((new Date(this.form.leave_end_time).getTime()-new Date(this.form.leave_start_time).getTime())/1000/3600);
            return totalHours>0?totalHours+'小时':'';
        }
    },
    methods: {
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/112').then((res) => {
          if(res.data.code === '30010'){
            this.dictionary = res.data.data;
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      confirmSubmit(){
        this.form.leave_duration = Math.ceil((new Date(this.form.leave_end_time).getTime()-new Date(this.form.leave_start_time).getTime())/1000/3600);
        this.$http.post(globalConfig.server+'oa/leave',this.form).then((res) => {
          if(res.data.code === '180010'){
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
          leave_type: '',
          leave_start_time: '',
          leave_end_time: '',
          leave_duration: '',
          remark: '',
        };
        this.options = [];
        this.leaveVisible = false;
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
