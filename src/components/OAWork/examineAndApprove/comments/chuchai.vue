<template>
  <div class="modalFrame">
    <el-dialog :close-on-click-modal="false"
      title="出差报销"
      :visible.sync="chuchaiVisible"
      width="50%">
      <div class="scroll_bar">
        <el-form :model="form" size="mini" label-width="88px">

          <el-form-item label="差旅事由">
            <el-input v-model="form.textarea" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入(必填)"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="出发地">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的地">
                <el-input v-model="form.input1" placeholder="">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div>报销费用明细(1)</div>

          <el-row>
            <el-col :span="12">
              <el-form-item label="费用日期">
                <el-date-picker
                  v-model="form.value1"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="住宿费(元)">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="餐饮费(元)">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交通费(元)">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="其他费用(元)">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合计(元)">
                <el-input v-model="form.input1" placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="费用明细">
            <el-input v-model="form.textarea" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入费用明细描述"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button>
              <i class="el-icon-plus"></i>增加报销明细
            </el-button>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总住宿(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总餐饮费(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总餐饮(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总交通费(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总其它费用(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总合计(元):">
                <div>12313123</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="大写:">
            <div>零元整</div>
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

          <el-form-item label=附件>
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
        <el-button type="primary" @click="chuchaiVisible = false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>m

<script>
  export default {
    name: "chuchai",
    props: ['module'],
    data () {
      return {
        chuchaiVisible: false,           //出差报销申请
        form: {
          input1: '',
          value1: '',
          textarea: '',
          dialogImageUrl: '',
        }

      }
    },
    watch:{
      module(val){
        this.chuchaiVisible = val;
      },
      chuchaiVisible(val){
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
</style>
