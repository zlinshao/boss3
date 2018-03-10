<template>
  <div class="modalFrame">
    <el-dialog
      title="房屋维修申报"
      :visible.sync="repairVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form size="mini" label-width="80px">

          <el-form-item label="房屋地址" required="">
            <el-input v-model="form.repair_address" placeholder="小区名称、栋数、单元号（必填）"></el-input>
          </el-form-item>
          <el-form-item label="租客电话" required="">
            <el-input v-model="form.repair_mobile" placeholder="请输入（必填）"></el-input>
          </el-form-item>

          <el-form-item label="责任人" required="">
            <el-select v-model="form.dict_id" clearable="" placeholder="请选择责任人">
              <el-option
                v-for="item in dictionary"
                :key="item.id"
                :label="item.dictionary_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="申请内容" required="">-->
            <!--<el-input v-model="form.remark" type="textarea" placeholder="请输入（必填）" :autosize="{minRows: 2, maxRows: 4}"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="备注" required="">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入（必填）" :autosize="{minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>

          <el-form-item label="用途">
            <el-input v-model="form.repair_use_info" placeholder="请输入（必填）"></el-input>
            <!--<el-select v-model="form.repair_use_info" placeholder="请选择用途">-->
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
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
    name: "leave",
    props: ['module'],
    data () {
      return {
        repairVisible: false,           //请假审批
        form: {
          repair_address: '',
          repair_mobile: '',
          dict_id: '',
          remark: '',
          repair_use_info: '',
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
        this.repairVisible = val;
      },
      repairVisible(val){
        if(!val){
          this.$emit('close');
        }
      }
    },
    computed:{

    },
    methods: {
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/159').then((res) => {
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
        this.$http.post(globalConfig.server+'oa/repair',this.form).then((res) => {
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
          repair_address: '',
          repair_mobile: '',
          dict_id: '',
          remark: '',
          repair_use_info: '',
        };
        this.options = [];
        this.repairVisible = false;
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
