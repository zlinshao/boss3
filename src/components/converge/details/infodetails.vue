<template>
  <div class="newsDetail">
    <el-row>
      <el-col :span="16">
        <div style="padding: 20px 17px">
          <div class="newsMain">
            <div class="newsTitle">标题标题标题标题标题标题标题标题标题标题标题标题</div>
          </div>
          <div class="userInfo" style="margin-top: 22px">
            <div class="publishInfo">
              <div class="headPic">
                <img src="../../../assets/images/head.jpg" alt="">
              </div>
              <div class="publishName">徐志摩</div>
              <div class="publishRank">研发部-研发部研发部研发部</div>
            </div>
            <div class="InfoRight">
              <div class="title">乐伽新闻</div>
              <div class="newsDate">2017-09-09</div>
            </div>
          </div>

          <div class="newsPic">
            <img src="../../../assets/images/情人节.png" alt="">
          </div>

          <div class="newsInfo">
            轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
            是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
            软泥上的青荇，油油的在水底招摇；在康河的柔波里，我甘心做一条水草！ 那榆荫下的一潭，不是清泉， 是天上虹；揉碎在浮藻间，
            沉淀着彩虹似的梦。寻梦？撑一支长篙，向青草更青处漫溯；满载一船星辉，在星辉斑斓里放歌。但我不能放歌，悄悄是别离的笙箫；
            夏虫也为我沉默，沉默是今晚的康桥！悄悄的我走了，正如我悄悄的来；我挥一挥衣袖，不带走一片云彩。
            轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
            是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
            软泥上的青荇，油油的在水底招摇；在康河的柔波里，我甘心做一条水草！ 那榆荫下的一潭，不是清泉， 是天上虹；揉碎在浮藻间，
            沉淀着彩虹似的梦。寻梦？撑一支长篙，向青草更青处漫溯；满载一船星辉，在星辉斑斓里放歌。但我不能放歌，悄悄是别离的笙箫；
            夏虫也为我沉默，沉默是今晚的康桥！悄悄的我走了，正如我悄悄的来；我挥一挥衣袖，不带走一片云彩。
          </div>

          <div class="newsPic">
            <img src="../../../assets/images/情人节.png" alt="">
          </div>
          <div class="newsInfo">
            轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
            是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
            软泥上的青荇，油油的在水底招摇；在康河的柔波里，我甘心做一条水草！ 那榆荫下的一潭，不是清泉， 是天上虹；揉碎在浮藻间，
            沉淀着彩虹似的梦。寻梦？撑一支长篙，向青草更青处漫溯；满载一船星辉，在星辉斑斓里放歌。但我不能放歌，悄悄是别离的笙箫；
            夏虫也为我沉默，沉默是今晚的康桥！悄悄的我走了，正如我悄悄的来；我挥一挥衣袖，不带走一片云彩。
            轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
            是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
            软泥上的青荇，油油的在水底招摇；在康河的柔波里，我甘心做一条水草！ 那榆荫下的一潭，不是清泉， 是天上虹；揉碎在浮藻间，
            沉淀着彩虹似的梦。寻梦？撑一支长篙，向青草更青处漫溯；满载一船星辉，在星辉斑斓里放歌。但我不能放歌，悄悄是别离的笙箫；
            夏虫也为我沉默，沉默是今晚的康桥！悄悄的我走了，正如我悄悄的来；我挥一挥衣袖，不带走一片云彩。
          </div>
          <div class="lines"></div>
          <div class="readerInfos">
            <div></div>
            <div class="readers">
              <div>
                <i class="iconfont icon-xiaoxi"></i>1232
              </div>
              <div>
                <i class="iconfont icon-dianzan"></i>123
              </div>
              <div>
                <i class="iconfont icon-yanjing"></i>123
              </div>
            </div>
          </div>
          <div class="contents">
            <div>
              上一篇：轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩
            </div>
            <div>
              下一篇：轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩
            </div>
          </div>
        </div>

        <div class="comment_box">
          <div class="userInfo">
            <div class="publishInfo" style="color: #a2a3a6;font-size: 15px">
              <div class="headPic">
                <img src="../../../assets/images/head.jpg" alt="">
              </div>
              <div class="publishName">徐志摩</div>
              <div class="publishRank">研发部-研发部研发部研发部</div>
            </div>
            <div class="InfoRight">
              <div></div>
              <div class="newsDate">2017-09-09</div>
            </div>
          </div>
          <el-form size="mini" style="margin: 20px 0 0 54px">
            <el-form-item>
              <el-input type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="submitButt">
                <div></div>
                <el-button type="success" size="mini">发表</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="commentOn">
            <div class="publish">
              <div class="userInfo">
                <div class="publishInfo" style="color: #a2a3a6;font-size: 15px">
                  <div class="headPic">
                    <img src="../../../assets/images/head.jpg" alt="">
                  </div>
                  <div class="publishName">徐志摩</div>
                  <div class="publishRank">研发部-研发部研发部研发部</div>
                </div>
                <div class="InfoRight">
                  <div></div>
                  <div class="newsDate">2017-09-09</div>
                </div>
              </div>
              <div class="publishDetail">
                轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
                是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
                轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。 那河畔的金柳，
                是夕阳中的新娘；波光里的艳影，在我的心头荡漾。
              </div>
              <div class="replyButt">
                <div></div>
                <div>
                  <el-button type="primary" size="mini" @click="add">回复</el-button>
                </div>
              </div>
              <div class="inputBox" v-if="showUp">
                <el-form size="mini">
                  <el-form-item>
                    <el-input type="textarea" :rows="3"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="submitButt">
                      <div></div>
                      <el-button type="success" size="mini">发表</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="8">
        <div class="ingreat">
          <div class="title">热门新闻</div>
          <div class="ingreatNews">
            <div class="ingreat_title">轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。</div>
            <div class="subhead">
              <div class="ingreat_data">2017-09-09</div>
              <div class="readers">
                <div>
                  <i class="iconfont icon-xiaoxi"></i><span>1232</span>
                </div>
                <div>
                  <i class="iconfont icon-dianzan"></i><span>1232</span>
                </div>
                <div>
                  <i class="iconfont icon-yanjing"></i><span>1232</span>
                </div>
              </div>
            </div>
            <div class="ingreat_pic">
              <img src="../../../assets/images/情人节.png" alt="">
            </div>
            <div class="ingreat_detail">
              轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
              轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
              轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
            </div>
            <div class="ingreat_butt">
              <el-button type="primary" size="mini">MORE</el-button>
            </div>
          </div>
          <div style="margin-top: 66px">
            <div class="ingreatNews">
              <div class="ingreat_title">轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。</div>
              <div class="subhead">
                <div class="ingreat_data">2017-09-09</div>
                <div class="readers">
                  <div>
                    <i class="iconfont icon-xiaoxi"></i><span>1232</span>
                  </div>
                  <div>
                    <i class="iconfont icon-dianzan"></i><span>1232</span>
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i><span>1232</span>
                  </div>
                </div>
              </div>
              <div class="ingreat_pic">
                <img src="../../../assets/images/情人节.png" alt="">
              </div>
              <div class="ingreat_detail">
                轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
                轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
                轻轻的我走了，正如我轻轻的来；我轻轻的招手，作别西天的云彩。
              </div>
              <div class="ingreat_butt">
                <el-button type="primary" size="mini">MORE</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "infodetails",
      data () {
          return {
            showUp: false,
          }
      },
      methods:{
        add(){
          this.showUp = true;
        }
      }
    }
</script>

<style scoped lang="scss">
  #converge {
    width: 100%;
    overflow: hidden;
  }

    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
  .newsDetail {
    @include border_radius(5px);
    border: 1px solid #dfe6fb;
    margin-top: 10px;
    /*padding: 20px 17px;*/
    overflow: hidden;
    .newsMain {
      @include flex;
      justify-content: space-between;
      .newsTitle {
        color: #606266;
        font-size: 24px;
      }
      .newsDate {
        color: #8f9193;
        font-size: 13px;
      }
    }
    .userInfo {
      @include flex;
      justify-content: space-between;
      line-height: 40px;
      .publishInfo {
        @include flex;
        justify-content: space-between;
        font-size: 16px;
        color: #818183;
        .headPic {
          width: 40px;
          height: 40px;
          @include border_radius(50%);
          img {
            width: 100%;
            height: 100%;
            @include border_radius(50%);
          }
        }
        .publishName {
          margin-left: 14px;
        }
        .publishRank {
          margin-left: 16px;
        }
      }
      .InfoRight {
        @include flex;
        justify-content: space-between;
        .title {
          /*font-size: 16px;*/
          color: #6a8dfb;
          margin-right: 20px;
        }
        .newsDate {
          font-size: 13px;
          color: #929395;
        }
      }
    }

    .newsPic {
      width:100%;
      height: 250px;
      margin-top: 20px;
      img {
        width:100%;
        height: 100%;
      }
    }
    .newsInfo {
      margin: 30px 0 21px 0;
      color: #606266;
    }
    .lines {
      width: 25px;
      border-bottom: 3px solid #6a8dfb;
      margin-top: 20px;
    }
    .readerInfos {
      @include flex;
      justify-content: space-between;
      width: 100%;
      margin-top:30px;
      .readers {
        @include flex;
        justify-content: space-between;
      }
       div {
         margin-left: 20px;
         cursor: pointer;
       }
    }
    .contents {
      margin-top: 30px;
      line-height: 25px;
      padding: 30px 0;
      border-top: 1px solid #e5e5e5;
      font-size: 15px;
      color: #464748;
      div {
        cursor: pointer;
      }
    }
    .comment_box {
      background: #F4F6FC;
      padding: 10px;
      .submitButt {
        @include flex;
        justify-content: space-between;
      }
    }
    .publish {
      .publishFrame {
        @include flex;
        justify-content: space-between;
        font-size: 12px;
      }
      .publishDetail {
        /*font-size: 13px;*/
        margin-left: 54px;
        line-height: 16px;
      }
      .replyButt {
        @include flex;
        justify-content: space-between;
        margin: 10px 0;
      }
      .inputBox {
        margin-left: 45px;
        .submitButt {
          @include flex;
          justify-content: space-between;
        }
      }
    }
    .commentOn {
      background: #F4F6FC;
      padding-top: 10px;
      border-top: 1px solid #eeeeee;
    }
/*右边栏*/
    .ingreat {
      padding: 20px 17px;
      .title {
        margin-top: 62px;
        color: #fb4699;
      }
      .ingreatNews {
        .ingreat_title {
          color: #303133;
          margin-top: 28px;
        }
        .subhead {
          @include flex;
          justify-content: space-between;
          margin-top: 19px;
          font-size: 12px;
          .readers {
            @include flex;
            justify-content: space-between;
          }
          .readers {
            div {
              margin-left: 10px;
            }
            span {
              color: #303133;
            }
          }
        }
        .ingreat_pic {
          width: 100%;
          height: 180px;
          cursor: pointer;
          margin-top: 11px;
          img {
            width:100%;
            height: 100%;
          }
        }
        .ingreat_detail {
          width: 100%;
          height: 35px;
          margin-top: 10px;
          text-overflow : ellipsis;
          overflow : hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .ingreat_butt {
          margin-top: 30px;
        }
      }

    }
  }
</style>
