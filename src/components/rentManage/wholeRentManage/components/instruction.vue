<template>
  <div id="instruction">
    <el-dialog title="功能说明" :visible.sync="instructionDialogVisible" width="62%">
      <div>
        <el-row :gutter="20" class="instruct_main">
          <el-col :span="6" class="instruct_right scroll_bar">
            <ul class="instruct_ul">
              <li class="step_basic">
                <span>基本操作</span>
              </li>
              <li v-for="(item,index) in tabs" :class="{active:index == num}"  @click="tab(index)" :key="index">{{item}}</li>
            </ul>
          </el-col>
          <el-col :span="18" class="instruct_left">
            <div v-show=" 0 == num" class="imgdiv">
              <el-button v-show="article == 1" class="elbuttom1" size="small" @click="preimg" type="primary">上一张</el-button>
              <el-button v-show="article == 0" class="elbuttom1" size="small" type="info">上一张</el-button>
              <el-button v-show="article == 0" class="elbuttom2" size="small" @click="nextimg" type="primary">下一张</el-button>
              <el-button v-show="article == 1" class="elbuttom2" size="small"  type="info">下一张</el-button>
              <img v-show="article == 0" src="../../../../assets/images/article1.jpg" />
              <img v-show="article == 1" src="../../../../assets/images/article2.jpg" />
            </div>  

            <div v-show=" 1 == num" class="imgdiv">
              <img src="../../../../assets/images/highsearch.jpg" />
            </div> 
            <div v-show=" 2 == num" class="imgdiv">
              <el-button v-show="articlemanagement != 0" class="elbuttom3" size="small" @click="premanimg" type="primary">上一张</el-button>
              <el-button v-show="articlemanagement == 0" class="elbuttom3" size="small" type="info">上一张</el-button>
              <el-button v-show="articlemanagement != 2" class="elbuttom4" size="small" @click="nextnamimg" type="primary">下一张</el-button>
              <el-button v-show="articlemanagement == 2" class="elbuttom4" size="small" type="info">下一张</el-button>
              <img v-show="articlemanagement == 0" src="../../../../assets/images/articlemanagement1.jpg" />
              <img v-show="articlemanagement == 1" src="../../../../assets/images/articlemanagement2.jpg" />    
              <img v-show="articlemanagement == 2" src="../../../../assets/images/articlemanagement3.jpg" />          
            </div>  
            <div v-show=" 3 == num" class="imgdiv">
              <img src="../../../../assets/images/published.jpg" />
            </div>    
            <div v-show=" 4 == num" class="imgdiv">
              <img src="../../../../assets/images/overed.jpg" />
            </div>            
          </el-col>
        </el-row>

      </div>
      <div style="text-align: center;padding: 20px;">
        <span slot="footer" class="dialog-footer" >

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
        instructionDialogVisible:false,
        tabPosition:'left',
        tabs: ["1.文章管理页的基本功能？", "2. 高级搜索的搜索项？","3. 如何发布文章？","4. 当文章处于已发布状态？","5. 当文章处于已结束/草稿状态？"],
        num: 0,
        article:0,
        articlemanagement:0,       
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
    },
    methods:{
        tab(index) {
            this.num = index;
        },
        preimg(){
          this.article = this.article - 1;
        },
        nextimg(){
          this.article = this.article + 1;
        },
        premanimg(){
          this.articlemanagement = this.articlemanagement - 1;
        },
        nextnamimg(){
          this.articlemanagement = this.articlemanagement + 1;
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
                  input{
                    display: none;
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
              
            }
          }
        }
      }
    }
  }
  #tab1:checked ~ #content1,  
  #tab2:checked ~#content2,  
  #tab3:checked ~#content3,  
  #tab4:checked ~#content4,  
  #tab5:checked ~#content5{  
    display:block;  
  }  
  .table-content{  
    display:none;  
  } 
  .imgdiv{
    position: relative;
    .elbuttom1{ position: absolute; bottom:-34px; left:330px;margin:0}
    .elbuttom2{ position: absolute; bottom:-34px; left:420px;margin:0}
    .elbuttom3{ position: absolute; bottom:-34px; left:330px;margin:0}
    .elbuttom4{ position: absolute; bottom:-34px; left:420px;margin:0}
  } 
</style>
