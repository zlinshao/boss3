<template>
  <div id="organizationId">
    <el-dialog title="选人" :visible.sync="organizationVisible" width="785px" center :modal="false">
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
               :key="item.id"
               :label="item.name"
               :value="item.id">
               <div class="head">
                 <img src="../../assets/images/head.jpg" :class="selectMember.indexOf(item.name)>-1?'':'gray'">
               </div>
               <div class="infoBox">
                 <div class="info">{{item.name}}</div>
                 <div class="info">{{item.phone}}</div>
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
                <ul>
                  <li><el-checkbox>全选</el-checkbox></li>
                  <li v-for="item in organizeList" @click="getDepartment(item.id)">
                    <div>
                      <el-checkbox></el-checkbox>
                      <span>{{item.name}}</span>
                    </div>
                    <div>({{item.users}}人)</div>
                  </li>
                </ul>
                <!--<ul class="organizeList">-->
                  <!--<li v-for="item in 10" @click="selectStaff(item)">-->
                    <!--<div class="head">-->
                      <!--<img src="../../assets/images/head.jpg" alt="">-->
                       <!--&lt;!&ndash;对号&ndash;&gt;-->
                      <!--<span class="el-icon-check" v-if="item>4"></span>-->
                       <!--&lt;!&ndash;遮罩&ndash;&gt;-->
                      <!--<span class="shade" v-if="item>4"></span>-->
                    <!--</div>-->
                    <!--<div class="infoBox">-->
                      <!--<div class="info">张琳</div>-->
                      <!--<div class="info">研发部（前端）</div>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</ul>-->
              </div>
            </div>
          </div>
       </div>
     </div>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="organizationVisible = false">取 消</el-button>-->
        <el-button type="primary" :disabled="buttonStatus" @click="organizationVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['organizationDialog'],
    data () {
      return {
        organizationVisible: false,
        formLabelWidth: '120px',
        buttonStatus :true,
        searchItems: [],    //搜索到人员
        selectMember: [],
        list: [],
        keywords : '',
        loading: false,
        organizeList:[],
      }
    },
    mounted() {
//      this.list = this.states.map(item => {
//        return { value: item, label: item };
//      });
      this.getDepartment(1);
    },
    watch:{
      organizationDialog(val){
        this.organizationVisible = val
      },
      organizationVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      selectMember(val){
          this.buttonStatus = !val.length;
      }
    },
    methods:{
      getDepartment(id){
        this.$ajax.get('api/v1/organizations?parent_id='+id).then((res) => {
          if(res.data.status === 'success'){
            if(res.data.data.length>0){
              this.organizeList = res.data.data;
            }
          }
        })
      },
      remoteMethod(query) {
        if (query !== ''){
          this.$ajax.get('api/v1/users?q='+query).then((res) => {
            if(res.data.status === 'success'){
              this.searchItems = res.data.data;
            }
          })
        }else {
          this.searchItems = [];
        }

//        if (query !== '') {
//          this.loading = true;
//          setTimeout(() => {
//            this.loading = false;
//            this.searchItems = this.list.filter(item => {
//              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
//            });
//          }, 200);
//        } else {
//          this.searchItems = [];
//        }
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
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
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
