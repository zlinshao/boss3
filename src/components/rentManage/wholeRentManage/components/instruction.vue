<template>
  <div id="instruction">
    <el-dialog title="功能说明" :visible.sync="instructionDialogVisible" width="60%">
      <div>
        <el-row :gutter="20" class="instruct_main">
          <el-col :span="6" class="instruct_right scroll_bar">
            <ul class="instruct_ul">
              <li class="step_basic">
                <span>基本操作</span>
              </li>
              <li>1. 如何登记房源？</li>
              <li>2. 如何登记租客？</li>
              <li>3. 租客如何退房？</li>
              <li>4. 租客如何转租？</li>
              <li>5. 如何下载房东合同？</li>
              <li>6. 租客如何续约？</li>
              <li>7. 如何设置定价？</li>
            </ul>
            <ul class="instruct_ul">
              <li class="step_basic">
                <span>技巧介绍</span>
              </li>
              <li>1. 如何登记房源？</li>
              <li>2. 如何登记租客？</li>
              <li>3. 租客如何退房？</li>
              <li>4. 租客如何转租？</li>
              <li>5. 如何下载房东合同？</li>
              <li>6. 租客如何续约？</li>
              <li>7. 如何设置定价？</li>
            </ul>
            <ul class="instruct_ul">
              <li class="step_basic">
                <span>功能介绍</span>
              </li>
              <li>1. 如何登记房源？</li>
              <li>2. 如何登记租客？</li>
              <li>3. 租客如何退房？</li>
              <li>4. 租客如何转租？</li>
              <li>5. 如何下载房东合同？</li>
              <li>6. 租客如何续约？</li>
              <li>7. 如何设置定价？</li>
            </ul>
          </el-col>
          <el-col :span="18" class="instruct_left">
              <div>
                <img src="" alt="">
              </div>
          </el-col>
        </el-row>

      </div>
      <div style="text-align: center;padding: 10px;">
        <span slot="footer" class="dialog-footer" >
        <!--<el-button size="small" @click="instructionDialogVisible = false">取 消</el-button>-->
        <el-button size="small" type="primary" @click="instructionDialogVisible = false">确 定</el-button>
      </span>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['instructionDialog'],
    data() {
      return {
        instructionDialogVisible:false
      };
    },
    watch:{
      instructionDialog(val){
        this.instructionDialogVisible = val
      },
      instructionDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #instruction{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 0 15px;

          .instruct_main{
            .instruct_right{
              height: 550px;
              overflow: auto;
              .instruct_ul{
                li{
                  cursor: pointer;
                  padding: 10px 15px;
                  font-size: 13px;
                  &:hover{
                    color: #6a8dfb;
                  }
                }
                .step_basic{
                  font-size: 14px;
                  margin-left: -10px;
                  span{
                    border-left: 7px solid #6a8dfb;
                    color: #6a8dfb;
                    padding-left: 5px;
                  }
                  &:hover{
                    color: #b4c6fd;
                  }
                }
              }
            }
            .instruct_left{
              background: #fafafa;
              height: 550px;
              overflow: auto;
            }
          }
        }
      }
    }
  }

</style>
