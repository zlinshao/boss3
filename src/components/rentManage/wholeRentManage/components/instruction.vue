<template>
  <div id="instruction">
    <el-dialog title="功能说明" :visible.sync="instructionDialogVisible" width="60%">
      <div>
        <el-row :gutter="20" class="instruct_main">
          <el-col :span="6" class="instruct_right scroll_bar">
            <ul class="instruct_ul">
              <li class="step_basic">基本操作</li>
              <li>01、如何登记房源？</li>
              <li>02、如何登记租客？</li>
              <li>03、租客如何退房？</li>
              <li>04、租客如何转租？</li>
              <li>05、如何下载房东合同？</li>
              <li>06、租客如何续约？</li>
              <li>07、如何设置定价？</li>
            </ul>
            <ul class="instruct_ul">
              <li class="step_basic">基本操作</li>
              <li>01、如何登记房源？</li>
              <li>02、如何登记租客？</li>
              <li>03、租客如何退房？</li>
              <li>04、租客如何转租？</li>
              <li>05、如何下载房东合同？</li>
              <li>06、租客如何续约？</li>
              <li>07、如何设置定价？</li>
            </ul>
            <ul class="instruct_ul">
              <li class="step_basic">基本操作</li>
              <li>01、如何登记房源？</li>
              <li>02、如何登记租客？</li>
              <li>03、租客如何退房？</li>
              <li>04、租客如何转租？</li>
              <li>05、如何下载房东合同？</li>
              <li>06、租客如何续约？</li>
              <li>07、如何设置定价？</li>
            </ul>
          </el-col>
          <el-col :span="18" class="instruct_left">
              <div>
                <img src="" alt="">
              </div>
          </el-col>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="instructionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="instructionDialogVisible = false">确 定</el-button>
      </span>
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
<style lang="scss">
  #instruction{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          padding: 10px 20px;
          .instruct_main{
            .instruct_right{
              height: 550px;
              overflow: auto;
              .instruct_ul{
                li{
                  cursor: pointer;
                  padding: 1px 0;
                  font-size: 12px;
                  &:hover{
                    background: #ddd;
                    color: #ee508f;
                  }
                }
                .step_basic{
                  background: #409EFF;
                  padding: 5px 0;
                  color: #ffffff;
                  font-size: 14px;
                  text-align: center;
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
