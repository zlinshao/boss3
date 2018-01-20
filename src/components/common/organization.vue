<template>
  <div id="organizationId">
    <el-dialog title="选人" :visible.sync="dialogFormVisible" width="785px" center>
     <div class="content">
       <div class="content_left" @click="inputFocus">
           <el-select id="search" size="small"
             v-model="selectMember"
             multiple
             filterable
             remote
             reserve-keyword
             placeholder="搜索企业联系人"
             :remote-method="remoteMethod"
             :loading="loading">
             <el-option
               v-for="item in searchItems"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               <div class="head">
                 <img src="../../assets/images/head.jpg" :class="selectMember.indexOf(item.label)>-1?'':'gray'">
               </div>
               <div class="infoBox">
                 <div class="info">{{item.label}}</div>
                 <div class="info">{{item.value}}</div>
               </div>
             </el-option>
           </el-select>
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
                      <img src="../../assets/images/head.jpg" alt="">
                       <!--对号-->
                      <span class="el-icon-check" v-if="item>4"></span>
                       <!--遮罩-->
                      <span class="shade" v-if="item>4"></span>
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
        buttonStatus :true,
        searchItems: [],    //搜索到人员
        selectMember: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
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
          this.buttonStatus = !val.length;
      }
    },
    methods:{
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.searchItems = this.list.filter(item => {
              return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.searchItems = [];
        }
      },
      inputFocus(){
          let _input = document.getElementById('search');
          _input.focus();
      },

      selectStaff(item){
          let index = this.selectMember.indexOf(item);
          index>-1?this.selectMember.splice(index,1):this.selectMember.push(item);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .gray {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }
  .el-select-dropdown{
    .el-select-dropdown__wrap{
      ul {
        li.el-select-dropdown__item{
          height: 50px;
          display: flex;
          align-items: center;
          .head{
            font-size: 12px;
            float: left;
            height: 35px;
            width: 35px;
            border-radius: 50%;
            margin-right: 5px;
            position: relative;
            img{
              height: 35px;
              width: 35px;
              border-radius: 50%;
            }
          }
          .infoBox{
            height: 36px;
            .info{
              height: 20px;
              line-height: 20px;
              font-size: 15px;
              &:last-child{
                font-size: 12px;
                height: 16px;
                line-height: 16px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }

  #organizationId{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          .content{
            height: 442px;
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
                        margin:4px 5px 0 0;
                        position: relative;
                        img{
                          height: 35px;
                          width: 35px;
                          border-radius: 50%;
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
