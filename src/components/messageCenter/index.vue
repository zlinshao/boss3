<template>
  <div id="messageCent">
    <div class="container">
      <div class="header">
        <div class="headName">消息列表</div>

        <div class="filterGroup">

          <div class="buttonGroup">
            <el-button size="mini" type="success" @click="isRead"> <i class="iconfont icon-yanjing" style="margin: 0 5px"></i> 已 读</el-button>
            <el-button size="mini" type="danger" @click="unRead"> <i class="iconfont icon-yanjingclose" style="margin: 0 5px"></i> 未 读</el-button>
          </div>

          <div class="search">
            <el-input placeholder="请输入内容" size="small" @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </div>

      </div>

      <div class="mainContent">
        <div class="contentItem" v-for="item in messageTable">
          <div class="itemTime">{{item.created_at.split(' ')[0]}}&nbsp;&nbsp; <span>{{item.created_at.split(' ')[1]}}</span></div>
          <div class="itemLIne">
            <div class="line"></div>
            <div class="circle"></div>
            <div class="stretchLine"></div>
          </div>
          <div class="itemMain" @dblclick="showMessageDetail(item)">
            <div class="itemMainHead">
              <img src="../../assets/images/head.jpg" alt="" data-card>
            </div>
            <div class="itemMainContent">
              <div class="personInfo">
                <div style="height: 40px;line-height: 40px">BOOS小秘书</div>
                <!--<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. flex-grow:1;flex-grow:1;flex-grow:1;</div>-->
              </div>
              <div class="title">
                <div class="titleWord" v-if="item.content">{{item.content.title}}</div>
                <div class="from">
                  <span v-if="item.read_at" style="color: #8de1ab">已读</span>
                  <span v-else="" style="color: #fc76af">未读</span>
                </div>
              </div>
              <div class="messageInfo" v-if="item.content">
                {{item.content.content}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align: center;margin: 20px 0 50px 0 ;cursor: pointer" @click="getMore" v-if="!isLastPage">
        加载更多...
      </div>
      <div style="text-align: center;margin: 20px 0 50px 0 ;" v-if="isLastPage">
        已经到最底部了
      </div>
    </div>
    <MessageDetail :messageDialog="messageDialog" :messageDetail="messageDetail" @close="closeMessage"></MessageDetail>
  </div>
</template>

<script>
  import MessageDetail from '../common/messageDetail.vue'
  export default {
    components: {MessageDetail},
    data () {
      return {
        params:{
          keywords:'',
          per_page_number:5,
          page:1,
          unread:'',
        },
        currentPage:1,
        messageTable:[],
        isLastPage:false,
        messageDialog:false,
        messageDetail:[],
      }
    },
    mounted(){
        this.getMessage();
        this.params.unread = this.$route.query.unread
       
    },
    watch:{
    },
    methods: {
      getMessage(){
        this.$http.get(globalConfig.server_user+'messages',{params:this.params}).then((res) => {
          if(res.data.status === 'success'){
            let arr = [];
            arr = res.data.data;
            this.isLastPage = this.params.page === res.data.meta.last_page;
            arr.forEach((x)=>{
              this.messageTable.push(x)
            })
          }
        })
      },
      getMore(){
        this.params.page++;
        this.getMessage();
      },
      unRead(){
        this.params.page = 1;
        this.params.unread = 1;
        this.messageTable = [];
        this.getMessage();
      },
      isRead(){
        this.params.page = 1;
        this.params.unread = '';
        this.messageTable = [];
        this.getMessage();
      },
      search(){

      },
      //显示消息详情
      showMessageDetail(val){
        this.messageDetail = val;
        this.messageDialog = true;
        this.$http.put(globalConfig.server_user + 'messages/' + val.id).then((res) => {
          if (res.data.status === 'success') {
            this.getMessage();
          }
        })
      },
      closeMessage(){
        this.messageDialog = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">

  @font-face {
    font-family: Impact;//////字体名称
    src: url(../../assets/font/impact-2.ttf);  ////字体路径
  }


  .el-button--danger {
    background-color: #fb4694;
    border-color: #fb4694;
  }

  .el-button--success {
    background-color: #58d788;
    border-color: #58d788;
  }

  .container {
    min-height: 800px;
    border: 1px solid rgba(64, 158, 255, .3);
    box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .08);
    border-radius: 5px;
    .header {
      margin-top: 28px;
      padding-bottom: 17px;
      border-bottom: 1px solid #eeeeee;
      .headName {
        color: #6a8dfb;
        font-size: 16px;
        margin-left: 20px;
      }
      .el-input-group__append{
        &:hover{
          opacity: .9;
        }
        .el-icon-search{
          font-size: 20px;
          color: #ffffff;
        }
      }
      .filterGroup{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 10px;
        .search {
          width: 300px;
          margin-left: 113px;
          border-radius: 4px;
          /*border: 1px solid #6a8dfb;*/
          /*box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .08);*/
          /*.el-input-group__append {*/
            /*background: #6a8dfb;*/
            /*color: #ffffff;*/
            /*border: none;*/
          /*}*/
          /*.el-input__inner {*/
            /*border: none;*/
          /*}*/
        }
      }
    }

    .mainContent {
      padding-top: 5px;
      .contentItem {
        display: flex;
        &:last-child{
          border-bottom: 1px solid #eeeeee;
        }
        .itemTime {
          min-width: 170px;
          padding: 30px 0 0 20px;
          span {
            color: #666;
            opacity: .8;
            font-size: 14px;
            font-family: 'Impact', sans-serif;
          }
        }
        .itemLIne {
          width: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .line {
            height: 35px;
            border-right: 1px solid #eeeeee;
          }
          .circle {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #6a8dfb;
          }
          .stretchLine{
            border-right: 1px solid #eeeeee;
            flex-grow:1;
          }
        }

        .itemMain{
          flex-grow:1;
          display: flex;
          .itemMainHead{
            width: 90px;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin: 20px 20px 0 30px;
              cursor: pointer;
              &:hover{
                filter: blur(1px);
              }
            }
          }

          .itemMainContent{
            padding-right: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
            flex-grow:1;
            .personInfo{
              margin-top: 20px;
            }
            .title{
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .titleWord{
                color: #444;
                font-weight: 600;
              }
            }
            .messageInfo{
              line-height:150%;
              text-align:justify;
              min-height: 39px;
              text-justify:inter-ideograph;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;  //这里是在第二行有省略号
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>
