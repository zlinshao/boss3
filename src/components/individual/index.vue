<template>
  <div id="individual">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img src="../../assets/images/individual/touxiang.png" alt="">
        </div>
        <div class="rightPic">
          <p>
            <span>我去犯得上发</span>
            <span></span>
          </p>
          <p>
            分行贷款发货的时刻范德萨
          </p>
        </div>
      </div>
      <div class="topBackRight">
        <div>
          <span class="iconfont icon-shiyongshouce"></span>
          <span>照片</span>
        </div>
        <div>
          <span class="iconfont icon-shiyongshouce"></span>
          <span>收藏夹</span>
        </div>
        <div>
          <span class="iconfont icon-shezhi"></span>
          <span @click="routerLink('/integraldetail')">设置</span>
        </div>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="18">
          <div class="mainLeft">
            <div class="title">个人主页</div>
            <div class="ingress">
              <div class="a">
                <div class="aLeft"></div>
                <div class="aRight">
                  <p>BACKLOG</p>
                  <p>代办事项<span>24</span></p>
                </div>
              </div>
              <div class="a" @click="routerLink('/dailyRecord')">
                <div class="aLeft"></div>
                <div class="aRight">
                  <p>JOURNAL</p>
                  <p>日志管理<span>24</span></p>
                </div>
              </div>
              <div class="a">
                <div class="aLeft"></div>
                <div class="aRight">
                  <p>MAIL&nbsp;LIST</p>
                  <p>通讯录<span>24</span></p>
                </div>
              </div>
              <div class="a">
                <div class="aLeft"></div>
                <div class="aRight">
                  <p>SCHEDULE</p>
                  <p>日程管理<span>24</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mainRight">

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    methods: {
      routerLink(val) {
        this.$router.push({path: val})
      }
    }
  }
</script>

<style lang="scss">
  #individual {

    $colorBor: rgba(255, 255, 255, .8);

    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin back($n) {
      background: url($n) no-repeat;
      background-size: 100% 100%;
    }
    @mixin backLiner($a,$b) {
      background: -webkit-linear-gradient(left, $a, $b);
      background: -o-linear-gradient(left, $a, $b);
      background: -moz-linear-gradientleft, ($a, $b);
      background: linear-gradient(left, $a, $b);
    }
    img {
      width: 100%;
      height: 100%;
    }

    @font-face {
      font-family: Impact;                        //字体名称
      src: url(../../assets/font/impact-2.ttf);   //字体路径
    }

    .topBack, .topBackLeft, .topBackRight {
      @include flex;
    }

    .topBack {
      width: 100%;
      height: 200px;
      @include back("../../assets/images/individual/beijing.png");
      justify-content: space-between;
      align-items: center;
      .topBackLeft {
        .leftPic {
          margin-left: 100px;
          margin-right: 20px;
          width: 120px;
          height: 120px;
          @include border_radius(50%);
        }
        .rightPic {
          p {
            @include flex;
            align-items: center;
            font-size: 21px;
            color: $colorBor;
            span:last-of-type {
              width: 24px;
              height: 24px;
              margin-left: 10px;
              @include back("../../assets/images/individual/1.png");
            }
          }
          p:last-of-type {
            font-size: 18px;
          }
        }
      }
      .topBackRight {
        margin-right: 270px;
        div + div {
          margin-left: 20px;
        }
        div {
          font-size: 18px;
          color: $colorBor;
          @include flex;
          align-items: center;
          span:first-of-type {
            font-size: 24px;
            padding-top: 6px;
          }
        }
        div:nth-of-type(1) {
          span:first-of-type {
            color: #6abdfd;
          }
        }
        div:nth-of-type(2) {
          span:first-of-type {
            color: #fb4699;
          }
        }
        div:nth-of-type(3) {
          span:first-of-type {
            color: #f0c044;
          }
        }
      }
    }

    .main {
      .title {
        color: #C0CAE9;
        font-size: 14px;
        margin: 12px 0;
      }
      .mainLeft {
        .ingress {
          @include flex;
          justify-content: center;
          div {
            @include border_radius(5px);
            width: 25%;
            height: 130px;
          }
        }
        .ingress {
          div.a + div.a {
            margin-left: 12px;
          }
          div.a {
            @include flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            div {
              height: 52px;
            }
            .aLeft {
              min-width: 52px;
              max-width: 52px;
              margin-right: 20px;
              @include border_radius(50%);
              border: 1px solid $colorBor;
            }
            .aRight {
              width: 100%;
              p {
                margin: 0;
                height: 27px;
                line-height: 27px;
              }
              p:first-of-type {
                font-size: 20px;
                color: #436bac;
              }
              p:last-of-type {
                color: $colorBor;
                span {
                  font-weight: bold;
                  color: #ffffff;
                  padding-left: 6px;
                }
              }
            }
          }
          div.a:nth-of-type(1) {
            @include backLiner(#6F86F7, #60BDF8);
          }
          div.a:nth-of-type(2) {
            @include backLiner(#EE7A88, #EE9A89);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #c25b60;
              }
            }
          }
          div.a:nth-of-type(3) {
            @include backLiner(#51B4D4, #6EE6AC);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #3895ad;
              }
            }
          }
          div.a:nth-of-type(4) {
            @include backLiner(#8480ED, #D691E1);
            .aLeft {

            }
            .aRight {
              p:first-of-type {
                color: #625ac2;
              }
            }
          }
        }
      }
    }
  }
</style>
