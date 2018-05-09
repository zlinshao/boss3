<template>
  <div id="messageCent">
    <div>
      <el-menu  default-active="1" class="el-menu-vertical-demo elMenu" @select="handleSelect">
        <el-menu-item index="1">
          <span slot="title">@我</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">通知</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">报备</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">审批</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">评论</span>
        </el-menu-item>
        <el-menu-item index="6">
          <span slot="title">公告</span>
        </el-menu-item>
        <el-menu-item index="7">
          <span slot="title">私信</span>
        </el-menu-item>
      </el-menu>
    
      <div class="container"
          v-loading="tableLoading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)">
        <div class="header">
          <div v-if="theIndex == 1" class="headName">@我</div>
          <div v-if="theIndex == 2" class="headName">通知</div>
          <div v-if="theIndex == 3" class="headName">报备</div>
          <div v-if="theIndex == 4" class="headName">审批</div>
          <div v-if="theIndex == 5" class="headName">评论</div>
          <div v-if="theIndex == 6" class="headName">公告</div>
          <div v-if="theIndex == 7" class="headName">私信</div>
          <div class="filterGroup">
            <div class="buttonGroup">
              <el-button size="small" type="primary" @click="isRead"> 全部消息</el-button>
              <el-button size="mini" type="success" @click="isRead"> <i class="iconfont icon-weiduyoujian"></i>已 读</el-button>
              <el-button size="mini" type="danger" @click="unRead"> <i class="iconfont icon-yiduyoujian"></i>未 读</el-button>
            </div>
            <div class="search">
              <el-button size="small" type="primary" @click="isRead"> 全部标记为已读</el-button>
            </div>
          </div>
        </div>
        
        <div class="mainContent">
          <div class="contentItem" v-for="(item,index) in messageTable" :key="item.id">
            <div class="itemMain" @dblclick="showMessageDetail(item)">
              <div class="itemMainContent">
                <div class="title">
                  <div class="titleWord" v-if="item.content"><i class="iconfont icon-weiduyoujian" style="margin: 0 5px"></i>{{item.content.title}}</div>
                  <div class="from">
                    <span v-if="item.read_at" style="color: #8de1ab"><el-button size="small" type="primary">标记为未读</el-button></span>
                    <span v-else style="color: #fc76af"><el-button size="small" type="primary">标记为已读</el-button></span>
                  </div>
                </div>
                <div class="messageInfo" v-if="item.content">
                  <div @click="openMore(index)" v-if="openIndex != index" class="lookMore">显示更多<i class="el-icon-arrow-down" style="margin: 0 5px"></i></div>
                  <span style="margin-left:22px;display:block" v-if="openIndex == index">{{item.content.content}}<br />
                  <div @click="closeMore()" class="closeMore">收起<i class="el-icon-arrow-up" style="margin: 0 5px"></i></div>                  
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="block pages">
          <div class="left">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-size="12"
              layout="total, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>


    </div>
    <MessageDetail :messageDialog="messageDialog" :messageDetail="messageDetail" @close="closeMessage"></MessageDetail>
  </div>
</template>

<script>
import MessageDetail from "../common/messageDetail.vue";
export default {
  components: { MessageDetail },
  data() {
    return {
      tabPosition: "left",
      params: {
        keywords: "",
        per_page_number: 5,
        page: 1,
        unread: ""
      },
      currentPage: 1,
      totalNum: 0,
      messageTable: [],
      isLastPage: false,
      messageDialog: false,
      messageDetail: [],
      isGetMore: true,
      scrollHeight: "",
      tableLoading: false,
      theIndex: 1,
      openIndex:null,
    };
  },
  mounted() {
    let _this = this;
    this.getMessage();
    this.params.unread = this.$route.query.unread;
  },
  watch: {},
  methods: {
    handleSelect(key, keyPath) {
      this.theIndex = key[0];
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      console.log(`当前页: ${val}`);
    },
    openMore(index){
      this.openIndex = index;
    },
    closeMore(){
      this.openIndex = null;
    },
    getMessage() {
      this.tableLoading = true;
      this.$http
        .get(globalConfig.server_user + "messages", { params: this.params })
        .then(res => {
          this.tableLoading = false;
          if (res.data.status === "success") {
            let arr = [];
            arr = res.data.data;
            this.isLastPage = this.params.page === res.data.meta.last_page;
            arr.forEach(x => {
              this.messageTable.push(x);
            });
          }
        });
    },
    getMore() {
      if (this.isGetMore && !this.isLastPage) {
        this.params.page++;
        this.getMessage();
      }
    },
    unRead() {
      this.params.page = 1;
      this.params.unread = 1;
      this.messageTable = [];
      this.getMessage();
    },
    isRead() {
      this.params.page = 1;
      this.params.unread = "";
      this.messageTable = [];
      this.getMessage();
    },
    search() {},
    //显示消息详情
    showMessageDetail(val) {
      this.messageDetail = val;
      this.messageDialog = true;
      this.$http
        .put(globalConfig.server_user + "messages/" + val.id)
        .then(res => {
          if (res.data.status === "success") {
            this.getMessage();
          }
        });
    },
    closeMessage() {
      this.messageDialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@font-face {
  font-family: Impact; //////字体名称
  src: url(../../assets/font/impact-2.ttf); ////字体路径
}

.el-button--danger {
  background-color: #fb4694;
  border-color: #fb4694;
}

.el-button--success {
  background-color: #58d788;
  border-color: #58d788;
}
#messageCent{
  border: 1px solid rgba(64, 158, 255, 0.3);
  box-shadow: 0 2px 4px 0 rgba(64, 158, 255, 0.12),
    0 0 6px 0 rgba(64, 158, 255, 0.08);
  border-radius: 5px;
}
.elMenu {
  width: 12%;
  text-align: center;
  display: inline-grid;
  border:0;

}

.container {
  display: inline-table;
  width: 87%;
  min-height: 800px;
  border-left: 1px solid rgba(64, 158, 255, 0.3);

  .header {
    height: 70px;
    margin-top: 28px;
    padding-bottom: 17px;
    border-bottom: 1px solid #eeeeee;
    .headName {
      color: #6a8dfb;
      font-size: 16px;
      margin-left: 20px;
    }
    .el-input-group__append {
      &:hover {
        opacity: 0.9;
      }
      .el-icon-search {
        font-size: 20px;
        color: #ffffff;
      }
    }
    .filterGroup {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      margin-top: 10px;
    }
  }

  .mainContent {
    .contentItem {
      display: flex;
      &:last-child {
        border-bottom: 1px solid #eeeeee;
      }
      .itemTime {
        min-width: 170px;
        padding: 30px 0 0 20px;
        span {
          color: #666;
          opacity: 0.8;
          font-size: 14px;
          font-family: "Impact", sans-serif;
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
        .stretchLine {
          border-right: 1px solid #eeeeee;
          flex-grow: 1;
        }
      }

      .itemMain {
        flex-grow: 1;
        display: flex;
        .itemMainHead {
          width: 90px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 20px 20px 0 30px;
            cursor: pointer;
            &:hover {
              filter: blur(1px);
            }
          }
        }

        .itemMainContent {
          padding-right: 30px;
          border-bottom: 1px solid #eeeeee;
          flex-grow: 1;
          .personInfo {
            margin-top: 20px;
          }
          .title {
            margin: 0;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .titleWord {
              color: #444;
              font-weight: 600;
            }
            .from{
              display: none;
              margin-top: 20px;
            }
          }
          .messageInfo {
            .lookMore{
              margin-left:22px;
            }
            .closeMore{
              padding:5px 0;
            }
            line-height: 150%;
            margin-left:1%;
            text-align: justify;
            min-height: 24px;
            text-justify: inter-ideograph;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; //这里是在第二行有省略号
            overflow: hidden;
          }
        }
          .itemMainContent:hover{
             .from{
              display: block;
            }           
          }
      }
    }
  }
}
</style>
