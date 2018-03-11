<template>
  <div id="dailyRecord">
    <div class="highRanking">
      <div class="tabsSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">物业地址</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-form-item>
                      <el-input v-model="form.address" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">物业地址</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-form-item label="请选择">

                    </el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div class="topTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="tabs" v-if="activeName === 'second'">
          <div>选择模板</div>
          <div style="margin: 10px 0;">
            <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                       v-for="(key,index) in buttonVal" :key="index">{{key}}
            </el-button>
          </div>
        </div>
        <el-tab-pane label="看日志" name="first">
          <div class="lookLog" v-for="key in 5">
            <div class="pic">
              <img src="../../assets/images/head.jpg" alt="">
            </div>
            <div style="width: 100%">
              <div class="titles">
                <div class="a">到付快递费好看多啦</div>
                <div class="b">0000-00-00</div>
                <p>今日营业额：<span>1000</span></p>
                <p>今日客户数：<span>1000</span></p>
                <p>月累计营业额：<span>1000</span></p>
                <p>本月业绩目标：<span>1000</span></p>
              </div>
              <div class="lookPeople">
                <div><span>1223</span>人已读</div>
                <span v-for="key in 12">
                  <img src="../../assets/images/head.jpg" alt="">
                </span>
                <p>●●●</p>
              </div>
              <div class="commentContent" v-if="false">
                <div v-for="key in 3">
                  <span>习大大：</span>
                  <span>发射点范德萨范德萨范德萨范德萨打发</span>
                </div>
                <p>
                  全部22条评论
                </p>
              </div>
              <div class="comment" v-if="false">
                <el-input class="comInput" size="mini" placeholder="请输入内容" v-model="comments"></el-input>
                <el-button size="mini" type="primary">评&nbsp;论</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发日志" name="second">
          <div class="sendLog">
            <div class="sendTitle">今日完成工作</div>
            <el-input type="textarea" placeholder="请输入文字"></el-input>
          </div>
          <div class="sendLog">
            <div class="sendTitle">未完成工作</div>
            <el-input type="textarea" placeholder="请输入文字"></el-input>
          </div>
          <div class="sendLog">
            <div class="sendTitle">需协调工作</div>
            <el-input type="textarea" placeholder="请输入文字"></el-input>
          </div>
          <div class="sendLog">
            <div class="sendTitle">备注</div>
            <el-input type="textarea" placeholder="请输入文字"></el-input>
          </div>
          <div class="sendLog">
            <div class="sendTitle">增加照片</div>

          </div>
          <div class="sendLog">
            <div class="sendTitle">发送给</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我发出的" name="third" class="thirdSend">
          <div class="meSend" v-for="key in 12">
            <div class="meSendTop">
              <div>
                <span>
                  <img src="../../assets/images/head.jpg" alt="">
                </span>
                <span>米见过</span>
              </div>
              <span>日报</span>
            </div>
            <div class="mainTitle">
              <div>
                <span>今日完成工作：</span>
                <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
              </div>
              <div>
                <span>未完成工作：</span>
                <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
              </div>
              <div>
                <span>需协调工作：</span>
                <span>DSFDSFDSAFFDSFDSFSAFSAFSDFSDA</span>
              </div>
            </div>
            <div class="footer">
              <span class="times">0000-00-00 00:00:00</span>
              <span>删除</span>
              <span>修改</span>
              <span>查看详情</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日志报表" name="fourth">
          <el-table
            :data="tableData"
            width="100%">
            <el-table-column
              label="填报人"
              prop="fillName">
            </el-table-column>
            <el-table-column
              label="填报时间"
              prop="fillTime">
            </el-table-column>
            <el-table-column
              label="今日完成工作"
              prop="todayFinish">
            </el-table-column>
            <el-table-column
              label="未完成工作"
              prop="noFinish">
            </el-table-column>
            <el-table-column
              label="需协调工作"
              prop="coordinate">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        form: {},
        buttonVal: ['日报', '周报', '月报', '业绩日报'],
        active: 0,
        isHigh: false,
        activeName: 'fourth',
        tableData: [
          {
            fillName: '米见过',
            fillTime: '0000-00-00 00:00:00',
            todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
          },
          {
            fillName: '米见过',
            fillTime: '0000-00-00 00:00:00',
            todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
          },
          {
            fillName: '米见过',
            fillTime: '0000-00-00 00:00:00',
            todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
            coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
          },
        ],
        comments: '',
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // tag切换
      handleClick(val) {

      },
      // 按钮切换
      tagClick(val) {
        this.active = val;
      }
    },
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin minMax {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    @include border_radius(50%);
  }

  .tabs {
    padding: 0 10px;
    div {
      button + button {
        margin-left: 10px;
      }
    }
    .primary {
      background: #409EFF;
      border-color: #409EFF;
      color: #ffffff;
    }
  }

  .lookLog {
    padding: 18px;
    margin: 12px;
    @include flex;
    @include border_radius(6px);
    -webkit-box-shadow: 0 2px 15px 0 #aaaaaa;
    -moz-box-shadow: 0 2px 15px 0 #aaaaaa;
    box-shadow: 0 2px 15px 0 #aaaaaa;
    p {
      margin: 0;
      line-height: 26px;
      font-size: 16px;
    }
    .pic {
      @include minMax;
      margin-right: 12px;
    }
    .titles {
      .a {
        font-size: 15px;
      }
      .b {
        font-size: 12px;
        margin: 6px 0;
      }
    }
    .lookPeople {
      @include flex;
      padding: 12px 0;
      margin: 10px 0;
      border: 1px solid #DFE6FB;
      border-left: none;
      border-right: none;
      div {
        width: 100px;
        background: #DFE6FB;
        height: 36px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
      }
      p, span {
        width: 36px;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
        cursor: pointer;
      }
      p {
        @include border_radius(50%);
        text-align: center;
        background: #cccccc;
        font-size: 12px;
        color: #ffffff;
      }
    }
    .commentContent {
      div {
        font-size: 12px;
        line-height: 20px;
        span:first-of-type {
          color: #409EFF;
        }
      }
      p {
        cursor: pointer;
        font-size: 12px;
        color: #409EFF;
      }
    }
    .comment {
      margin-top: 6px;
      @include flex;
      .comInput {
        margin-right: 20px;
      }
    }
  }

  .sendLog {
    div.sendTitle {
      margin: 18px 0 6px;
    }
  }

  .thirdSend {
    @include flex;
    flex-wrap: wrap;
    .meSend {
      position: relative;
      box-sizing: border-box;
      width: 300px;
      height: 200px;
      padding: 10px 12px;
      margin: 0 16px 16px 0;
      border: 1px solid #DFE6FB;
      @include border_radius(6px);
      .meSendTop {
        padding-bottom: 10px;
        border-bottom: 1px solid #DFE6FB;
        @include flex;
        align-items: center;
        justify-content: space-between;
        div {
          @include flex;
          align-items: center;
          span:first-of-type {
            @include minMax;
            margin-right: 12px;
          }
        }
      }
      .mainTitle {
        margin-top: 8px;
        div {
          line-height: 26px;
          @include flex;
          align-items: center;
          span:first-of-type {
            min-width: 100px;
            color: #cccccc;
          }
          span:last-of-type {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #eeeeee;
        height: 40px;
        @include flex;
        justify-content: space-around;
        align-items: center;
        .times {
          padding-top: 2px;
          font-size: 12px;
        }
        span + span {
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
  }

</style>
