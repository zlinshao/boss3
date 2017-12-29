<template>
  <div id="organizationId">
    <el-dialog title="选人" :visible.sync="dialogFormVisible" width="785px" center>


     <div class="content">
       <div class="content_left" @click="inputFocus">
         <div>
           <el-tag :key="tag" v-for="tag in selectMember" closable :disable-transitions="false" @close="handleClose(tag)">
             {{tag}}
           </el-tag>

           <input placeholder="搜索企业联系人" id="search" v-model="keywords" @keyup="searchInfo($event)">

           <div class="select_list scroll_bar" v-if="false">
             <ul>
               <li v-for="item in 10">
                 <div class="head">
                   <img src="" alt="">
                 </div>
                 <div class="infoBox">
                   <div class="info">张琳</div>
                   <div class="info">研发部（前端）</div>
                 </div>
               </li>
             </ul>
           </div>
         </div>
       </div>
       <div class="content_right">
          <div class="box">
            <div class="boxHead">组织架构</div>

            <div class="breadcrumb-wrapper">
              <div class="breadcrumb">
                <a><span>组织架构</span></a>
                <a>
                  <span >&nbsp;&gt;&nbsp;乐伽商业管理有限公司</span>
                </a>
              </div>
              <div class="box-body scroll_bar">
                <ul class="organizeList">
                  <li v-for="item in 10" @click="selectStaff(item)">
                     <div class="head">
                       <img src="" alt="">

                       <!--对号-->
                       <span class="el-icon-check"></span>
                       <!--遮罩-->
                       <span class="shade"></span>
                     </div>
                    <div class="infoBox">
                      <div class="info">张琳</div>
                      <div class="info">研发部（前端）</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
       </div>
     </div>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" :disabled="buttonStatus" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['FormVisible'],
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        selectMember: [],
        keywords:'',    //  关键字搜索
        buttonStatus :true,
        searchList:[{
          name : '张琳',
        },{
          name : '小飞'
        }

        ],  // 搜索列表
      }
    },
    watch:{
      FormVisible(val){
        this.dialogFormVisible = val
      },
      dialogFormVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      selectMember(val){
          if(val.length){
            this.buttonStatus = false
          }else {
            this.buttonStatus = true
          }
      }
    },
    methods:{
      handleClose(tag) {  //删除tag
        this.selectMember.splice(this.selectMember.indexOf(tag), 1);
      },
      inputFocus(){
          let _input = document.getElementById('search');
          _input.focus();
      },
      searchInfo(e){  //关键词搜索事件
        if (this.keywords !== '') {
          if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
            this.$http.get('http://test.v2.api.boss.lejias.cn/index/profile/searchStaff/keywords/' + this.keywords).then((res) => {
              if (res.data.code === '90010') {
                this.searchList = res.data.data;
                console.log(this.searchList)
              } else {
                this.searchList = [];
              }
            })
          }
        } else {
          this.searchList = [];
        }
      },

      selectStaff(item){
          this.selectMember.push('张琳')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #organizationId{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__header{
          padding: 15px 0;
          .el-dialog__title{
            font-size: 16px;
          }
        }

        .el-dialog__body{
          padding: 15px;
          background: #F8F8F8;
          height: 460px;
          .content{
            font-size: 0;
            .content_left{
              font-size: 14px;
              float: left;
              width: 440px;
              height: 440px;
              background: #fff;
              margin-right: 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-sizing: border-box;
              overflow: hidden;
              &:hover{
                border-color: #83c7ff;
              }
              div{
                .el-tag{
                  margin: 5px 0 5px 5px;
                  cursor: pointer;
                  .tag_span{
                    display: inline-block;
                    padding: 0 10px;
                  }
                }
                input{
                  border: 0;
                  outline: 0;
                  box-sizing: border-box;
                  min-width: 70px;
                  height: 30px;
                  padding: 4px 4px;
                  font-size: 13px;
                }
                .select_list{
                  width: 438px;
                  height:395px;
                  box-sizing: border-box;
                  border: 1px solid #83c7ff;
                  border-bottom: none;
                  overflow: auto;
                  ul{
                    padding: 0;
                    li{
                      padding: 5px 20px;
                      box-sizing: border-box;
                      cursor: pointer;
                      &:hover{
                        background: rgb(223, 237, 250);;
                      }
                      list-style-type: none;
                      height: 50px;
                      .head{
                        font-size: 12px;
                        float: left;
                        height: 35px;
                        width: 35px;
                        border-radius: 50%;
                        background: #ff65ed;
                        margin:4px 5px 0 0;
                        position: relative;
                        img{
                          height: 35px;
                          width: 35px;
                          border-radius: 50%;
                          background: #ff65ed;
                          vertical-align: text-top;
                        }
                      }
                      .infoBox{
                        float: left;
                        .info{
                          height: 20px;
                          font-size: 15px;
                          &:last-child{
                            font-size: 12px;
                            height: 16px;
                            color: #999;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            .content_right{
              font-size: 14px;
              float: right;
              width: 300px;
              height: 440px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-sizing: border-box;
              div{
                .boxHead{
                  text-align: center;
                  padding: 5px 0;
                }
                .breadcrumb-wrapper{
                  .breadcrumb{
                    padding: 0 15px;
                    a:not(last-child){
                      color: #409EFF;
                      cursor: pointer;
                    }
                  }
                }
                .box-body{
                  max-height: 380px;
                  overflow: auto;
                  ul{
                    padding: 0;
                    li{
                      padding: 5px 20px;
                      box-sizing: border-box;
                      cursor: pointer;
                      &:hover{
                        background: rgb(223, 237, 250);;
                      }
                      list-style-type: none;
                      height: 50px;
                      .head{
                        font-size: 12px;
                        float: left;
                        height: 35px;
                        width: 35px;
                        border-radius: 50%;
                        background: #ff65ed;
                        margin:4px 5px 0 0;
                        position: relative;
                        img{
                          height: 35px;
                          width: 35px;
                          border-radius: 50%;
                          background: #ff65ed;
                          vertical-align: text-top;
                        }
                        .el-icon-check{
                          color: #ffffff;
                          font-size: 20px;
                          position: absolute;
                          left: 50%;
                          top: 50%;
                          transform: translate(-50%,-50%);
                          z-index: 1
                        }
                        .shade {
                          width: 35px;
                          height: 35px;
                          background: #777777;
                          position: absolute;
                          left: 0;
                          top: 0;
                          border-radius: 50%;
                          opacity: .6
                        }
                      }
                      .infoBox{
                        float: left;
                        .info{
                          height: 20px;
                          font-size: 15px;
                          &:last-child{
                            font-size: 12px;
                            height: 16px;
                            color: #999;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .el-dialog__footer{
          padding: 10px 15px 15px;
          .dialog-footer{
            .el-button{
              padding: 10px 20px;
              width: 150px;
            }
          }
        }
      }
    }
  }

</style>
