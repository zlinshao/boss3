<template>
  <div class="modalFrame">
    <el-dialog
      title="调休申请"
      :visible.sync="takeworkVisible"
      width="50%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="调休类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.value3"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="调休事由">
          <el-input v-model="form.textarea" type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入请假事由(必填)"></el-input>
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
      <span slot="footer">
        <el-button type="primary" @click="takeworkVisible = false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "takework",
    props: ['module'],
    data () {
      return {
        takeworkVisible: false,           //请假审批
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
        innerVisible: false,  //查看明细
      }
    },
    watch:{
      module(val){
        this.takeworkVisible = val;
      },
      takeworkVisible(val){
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
