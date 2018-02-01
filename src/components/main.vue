<template>
  <div id="main">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="banner">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="banner_pic">
                  <img src="../assets/images/情人节.png" alt="">
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="mainContent">

            <!--<el-row :gutter="10">-->

            <el-col :span="12" style="padding-left: 0">
              <div class="title" style="color: #6a8dfb;">
                <span style="border-left: 4px solid #6a8dfb;"></span>日历
              </div>
              <div class="calendar">

                <vue-event-calendar :events="demoEvents" @day-changed="handleDayChanged"
                                    @month-changed="handleMonthChanged"></vue-event-calendar>
              </div>
            </el-col>
            <el-col :span="12" style="padding-right: 0">
              <div class="title" style="color: #fb4699;">
                <span style="border-left: 4px solid #fb4699;"></span>龙虎榜
              </div>
              <div class="longHuBang">
                <div class="item_list scroll_bar">
                  <div v-for="item in 7">
                    <div style="margin-right: 10px;color:#6a8dfb">{{item}}</div>
                    <div>
                      <img src="../assets/images/head.jpg" style="width: 40px;height: 40px;border-radius: 50%;" alt="">
                    </div>
                    <div style="font-weight: 600;margin:0 20px 0 30px;">陆宣羽</div>
                    <div>南京一区 - 百万一组</div>
                    <div style="flex-grow: 1;text-align: right;margin-right: 10px;color:#6a8dfb">212.222.00元</div>
                  </div>
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="leJiaHistory">
            <img src="../assets/images/发展.png" alt="">
          </div>

          <div class="system">
            <div class="talent">
              <img src="../assets/images/人才.png" alt="">
            </div>

            <div class="manage">
              <img src="../assets/images/管理.png" alt="">
            </div>
          </div>

          <div class="title" style="color: #76e79e;">
            <span style="border-left: 4px solid #76e79e;"></span>新人入职
          </div>
          <div class="newEntrants scroll_bar">
            <div class="newEntrants_list" v-for="item in 2">
              <div class="newHeader">
                <img src="../assets/images/head.jpg" alt="">
              </div>
              <div class="newEntrants_content">
                <div class="newEntrants_info">
                  <div style="font-weight: 600;margin-right: 20px">陆宣羽</div>
                  <div>南京一区 - 百万一组</div>
                  <div style="flex-grow: 1;text-align: right;margin-right: 10px">2018-01-31</div>
                </div>
                <div class="newEntrants_intro">
                  大家好，我是刘德华，大家好，我是刘德华，大家好，我是刘德华，大家好，我是刘德华，大家好，我是刘德华.
                </div>
              </div>
            </div>
          </div>
          <div class="title" style="color: #6a8dfb;margin-top: 22px">
            <span style="border-left: 4px solid #6a8dfb;"></span>新闻中心
          </div>
          <div class="newsCenter scroll_bar">
            <div class="newTitle" style="color: #666">
                <a href="javascript:;">乐伽新闻</a>
                <a href="javascript:;">乐伽新闻</a>
                <a href="javascript:;">乐伽新闻</a>
            </div>

            <div class="newsContent">
              <div><img src="../assets/images/head.jpg" alt=""></div>
              <div class="news_words">
                align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
              </div>
            </div>
          </div>
        </el-col>
      </el-row>


    </div>
  </div>
</template>

<script>
  let today = new Date()
  export default {
    name: 'app',
    data () {
      return {
        demoEvents: [{
          date: `${today.getFullYear()}/${today.getMonth() + 1}/15`,
          title: 'Title-1',
          desc: 'longlonglong description'
        }, {
          date: `${today.getFullYear()}/${today.getMonth() + 1}/24`,
          title: 'Title-2'
        }, {
          date: `${today.getFullYear()}/${today.getMonth() === 11 ? 1 : today.getMonth() + 2}/06`,
          title: 'Title-3',
          desc: 'description'
        }]
      }
    },
    methods: {
      handleDayChanged (data) {
        console.log('date-changed', data)
      },
      handleMonthChanged (data) {
        console.log('month-changed', data)
      }
    }
  }
</script>

<style scoped lang="scss">
  #main {
    width: 100%;
    overflow: hidden;
    .container {
      .banner {
        margin-bottom: 30px;
        .banner_pic {
          border-radius: 5px;
          width: 100%;
          height: 100%;
          overflow: hidden;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
        span {
          display: inline-block;
          height: 16px;
          border-radius: 2px;
          margin-right: 10px
        }
      }
      .mainContent {
        width: 100%;

        .calendar {
          margin-bottom: 10px;
          border-radius: 5px;
          border: 1px solid #dfe6fb;
          padding: 10px;
          box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
        }
        .longHuBang {
          margin-bottom: 10px;
          border: 1px solid #dfe6fb;
          padding: 0 10px;
          border-radius: 5px;
          box-sizing: border-box;
          box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
          height: 433px;
          .scroll_bar {
            &::-webkit-scrollbar-button {
              height: 30px;
              background-color: #ffffff;
            }
          }
          .item_list {
            overflow: auto;
            height: 100%;
            > div {
              height: 60px;
              border-bottom: 1px solid #e4e4e4;
              display: flex;
              align-items: center;
              &:last-child {
                border-bottom: none;
              }
            }
          }

        }
      }
      .leJiaHistory {
        width: 100%;
        height: 145px;
        margin-bottom: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
        }
      }
      .system {
        width: 100%;
        height: 145px;
        display: flex;
        cursor: pointer;
        margin-bottom: 30px;
        .talent {
          margin-right: 10px;
          flex-grow: 1
        }
        .manage {
          flex-grow: 1
        }
        img {
          width: 100%;
          height: 100%;
          box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
        }
      }

      .newEntrants, .newsCenter {
        width: 100%;
        height: 190px;
        overflow: auto;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 10px;
        border: 1px solid #dfe6fb;
        box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
      }

      .newEntrants {
        > div {
          display: flex;
          height: 100px;
          border-bottom: 1px solid #e4e4e4;
          padding: 20px 10px 10px 10px;
          box-sizing: border-box;
          .newHeader{
            img {
              width: 50px;
              height: 50px;
              border-radius: 10px;
            }
          }
          .newEntrants_content{
            flex-grow: 1;
            padding: 0 0 0 30px ;
          }
          .newEntrants_info{
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }
          .newEntrants_intro{

          }
        }
      }

      .newsCenter{
        .newTitle{
          padding: 20px 10px 10px 20px;
          a{
            margin-right: 10px;
            &:hover{
              color: #6a8dfb;
            }
          }
        }
        .newsContent{
          padding: 5px 10px 0 20px;
          display: flex;
          div{
            img{
              width: 160px;
              height: 110px;
              border-radius: 5px;
            }
          }
          .news_words{
            flex-grow: 1;
            margin-left: 10px;
          }
        }
      }
    }

  }
</style>
