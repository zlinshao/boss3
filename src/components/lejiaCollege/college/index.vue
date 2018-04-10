<template>
  <div id="university">
    <div class="headPic">
      <img src="../../../assets/images/university/1-乐伽大学.png">

      <!--<div class="navigation">-->
      <!--<div class="navigation_left" @mouseover="showKey('achievement')" @mouseout="outHide('achievement') ">-->
      <!--<img src="../../../assets/images/university/勋章.svg" v-if="achievementImgShow" style="width:40px;"/>-->
      <!--<div v-if="!achievementImgShow">成绩查询</div>-->
      <!--</div>-->
      <!--<div class="navigation_right" @mouseover="showKey('sign')" @mouseout="outHide('sign') ">-->
      <!--<img src="../../../assets/images/university/在线报名.svg" v-if="signImgShow" style="width:32px;position: absolute;right: 26px;"/>-->
      <!--<div v-if="!signImgShow">在线报名</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!--课程状态-->
    <div class="curriculum">
      <div class="curriculumTitle">
        <div class="left_border"></div>
        <div class="title">课程状态</div>
      </div>
      <div class="curriculumList">
        <el-row>
          <el-col :span="9">
            <div class="list_left" @mouseover="showKey('top')" @mouseout="outHide('top')">
              <img v-if="courseStatusTop[0]" :src="courseStatusTop[0].uri" @click="routerDetail(courseStatusTop[0].id)">
              <div class="shade" v-if="isTopShow">{{courseStatusTop[0] && courseStatusTop[0].title}}</div>
            </div>
          </el-col>
          <el-col :span="15">
            <el-row>
              <el-col :span="8" v-for="(course,key) in courseStatus" :key="course.id" v-if="key<6">
                <div class="list_frame" @click="routerDetail(course.id)">
                  <div class="list_pic">
                    <img :src="course.uri" style="border-radius:10px;">
                  </div>
                  <div class="list_detail" style="min-width: 130px;">
                    <div class="list_title space_nowarp">{{course.title}}</div>
                    <div class="list_remark">{{course.content}}</div>
                    <div class="readerInfo">
                      <div class="read">
                        <i class="iconfont icon-yanjing"></i>
                        <span>{{course.read_num}}人</span>
                      </div>
                      <div class="critique">
                        <i class="el-icon-edit"></i>
                        <span>{{course.favor_num}}人</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>

            </el-row>

          </el-col>
        </el-row>
      </div>
    </div>
    <!--教师风采-->
    <div class="teacher">
      <div class="curriculumTitle">
        <div class="left_border" style="border-left: 2px solid #fb4699;"></div>
        <div class="title" style="color: #fb4699">教师风采</div>
      </div>
      <!--<el-row :gutter="12">-->
      <!--<el-col :span="5">-->
      <!--<div class="teacher_left key_left"  @mouseover="showKey('left')" @mouseout="outHide('left')">-->
      <!--<img v-if="teacherStyles" :src="teacherStyles[0] && teacherStyles[0].uri"  />-->
      <!--&lt;!&ndash;<img vl-else src="../../../assets/images/university/412-07843.png" >&ndash;&gt;-->
      <!--<div class="shade" v-if="isLeftShow" @click="previous">-->
      <!--<i class="el-icon-arrow-left"></i>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="14">-->
      <!--<div class="teacher_left key_center">-->
      <!--<img v-if="teacherStyles" :src="teacherStyles[1] &&teacherStyles[1].uri" :center="teacherSelect" />-->
      <!--&lt;!&ndash;<img vl-else src="../../../assets/images/university/is843-069.png" alt="">&ndash;&gt;-->
      <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="5">-->
      <!--<div class="teacher_left key_right" @mouseover="showKey('right')" @mouseout="outHide('right')">-->
      <!--<img v-if="teacherStyles" :src="teacherStyles[2] &&teacherStyles[2].uri" alt="">-->
      <!--&lt;!&ndash;<img src="../../../assets/images/university/ie360-041.png" alt="">&ndash;&gt;-->

      <!--<div class="shade" v-if="isRightShow" @click="next">-->
      <!--<i class="el-icon-arrow-right"></i>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->

      <el-carousel :interval="5000" type="card" height="400px">
        <el-carousel-item v-for="teacher in teacherStyles" :key="teacher.id">
          <img :src="teacher.uri" @click="routerDetail(teacher.id)">
        </el-carousel-item>
      </el-carousel>

    </div>
    <!--图片赏析-->
    <div class="img_appreciation">
      <div class="curriculumTitle">
        <div class="left_border"></div>
        <div class="title">课堂实记</div>
      </div>
      <div class="img_list">
        <el-row :gutter="2" style="margin-top: 10px">
          <el-col :span="10">
            <div class="img_left curs">
              <img v-if="pictureAppreciation[0]" :src="pictureAppreciation[0].uri"
                   @click="routerDetail(pictureAppreciation[0].id)">
            </div>
          </el-col>
          <el-col :span="4">
            <div class="img_left">
              <img src="../../../assets/images/university/组9.png" alt="">
            </div>
          </el-col>
          <el-col :span="10">
            <div class="img_left curs">
              <img v-if="pictureAppreciation[1]" :src="pictureAppreciation[1].uri"
                   @click="routerDetail(pictureAppreciation[1].id)">
            </div>
          </el-col>
        </el-row>

        <div style="margin-top: 2px">
          <el-row :gutter="2">
            <el-col :span="5">
              <div class="img_left">
                <img src="../../../assets/images/university/组9拷贝.png" alt="">
              </div>
            </el-col>
            <el-col :span="9">
              <div class="img_left curs">
                <img v-if="pictureAppreciation[2]" :src="pictureAppreciation[2].uri"
                     @click="routerDetail(pictureAppreciation[2].id)">
              </div>
            </el-col>
            <el-col :span="5">
              <div class="img_left">
                <img src="../../../assets/images/university/组9拷贝4.png" alt="">
              </div>
            </el-col>
            <el-col :span="5">
              <div class="img_left curs">
                <img v-if="pictureAppreciation[3]" :src="pictureAppreciation[3].uri"
                     @click="routerDetail(pictureAppreciation[3].id)">
              </div>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        // isLeftShow: false,
        // isRightShow: false,
        teacherStyles: [],
        // teacherSelect: 1,
        pictureAppreciation: [],
        courseStatus: [],
        courseStatusTop: [],
        isTopShow: false,
        achievementImgShow: true,
        signImgShow: true,
      }
    },
    methods: {
      // 详情
      routerDetail(id) {
        let data = {ids: id, detail: 'converge'};
        this.$router.push({path: '/Infodetails', query: data});
        this.$store.dispatch('articleDetail', data);
      },
      showKey(val) {
        // if (val == 'left') {
        //   this.isLeftShow = true;
        // } else {
        //   this.isRightShow = true;
        // }
        switch (val) {
          case 'top':
            this.isTopShow = true;
            break;
          case 'achievement':
            this.achievementImgShow = false;
            break;
          case 'sign':
            this.signImgShow = false;
            break;
        }

      },
      outHide(val) {
        // if (val == 'left') {
        //   this.isLeftShow = false;
        // } else {
        //   this.isRightShow = false;
        // }
        switch (val) {
          case 'top':
            this.isTopShow = false;
            break;
          case 'achievement':
            this.achievementImgShow = true;
            break;
          case 'sign':
            this.signImgShow = true;
            break;
        }
      },
      previous() {
        // if(this.teacherSelect > 0){
        //   if(this.teacherStyles.length-this.teacherSelect >= 3){
        //     console.log(1111);
        //     this.teacherStyles[0].uri = this.teacherStyles[this.teacherSelect].uri;
        //     this.teacherStyles[1].uri = this.teacherStyles[this.teacherSelect+1].uri;
        //     this.teacherStyles[2].uri = this.teacherStyles[this.teacherSelect+2].uri;
        //     this.teacherSelect++;
        //   }else if(this.teacherStyles.length-this.teacherSelect <= 2){
        //     console.log(2222);
        //     this.getTeachers();
        //     this.teacherStyles[0].uri = this.teacherStyles[this.teacherSelect].uri;
        //     this.teacherStyles[1].uri = this.teacherStyles[this.teacherSelect+1].uri;
        //     this.teacherStyles[2].uri = '';
        //     this.teacherSelect++;
        //   }
        // }
      },
      next() {

      },
      //请求教师风采每一篇文章的第一张图片
      getTeachers() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=363&pages=1").then((res) => {
          let teachers = res && res.data && res.data.data && res.data.data.data;
          this.teacherStyles = [];
          if (typeof teachers === "undefined") {
            return;
          }
          for (let i = 0; i < teachers.length; i++) {
            let cover_pic = teachers[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (teachers[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  pic.id = teachers[i].id;
                  pic.uri = cover_pic[key][0].uri;
                  this.teacherStyles.push(pic);
                }
                first = false;
              }
            }
          }
          localStorage.setItem('collegeTeacherStyles', JSON.stringify(this.teacherStyles));
        });
      },
      //请求图片赏析的图片
      getPictureAppreciation() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=364&pages=1").then((res) => {
          let pictures = res && res.data && res.data.data && res.data.data.data;
          this.pictureAppreciation = [];
          if (typeof pictures === "undefined") {
            return;
          }
          for (let i = 0; i < pictures.length; i++) {
            let cover_pic = pictures[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (pictures[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  pic.id = pictures[i].id;
                  pic.uri = cover_pic[key][0].uri;
                  this.pictureAppreciation.push(pic);
                }
                first = false;
              }
            }
          }
          localStorage.setItem('collegePictureAppreciation', JSON.stringify(this.pictureAppreciation));
        });
      },
      //请求课程状态的数据
      getCourseStatus() {
        this.$http.get(globalConfig.server + "oa/portal/?dict_id=362&pages=1").then((res) => {
          let courses = res && res.data && res.data.data && res.data.data.data;
          this.courseStatus = [];
          this.courseStatusTop = [];
          if (typeof courses === "undefined") {
            return;
          }
          for (let i = 0; i < courses.length; i++) {
            let cover_pic = courses[i].album.cover_pic;
            let first = true;
            for (let key in cover_pic) {
              if (courses[i].statuss == "已发布") {
                if (first) {
                  let pic = {};
                  let top = {};
                  top.id = courses[i].id;
                  top.title = courses[i].title;

                  pic.id = courses[i].id;
                  pic.title = courses[i].title;
                  pic.content = courses[i].content;
                  pic.read_num = courses[i].read_num;
                  pic.favor_num = courses[i].favor_num;
                  pic.uri = cover_pic[key][0].uri;
                  this.courseStatus.push(pic);
                  if (courses[i].top !== null) {
                    top.uri = cover_pic[key][0].uri;
                    this.courseStatusTop.push(top);
                  }
                }
                first = false;
              }
            }
          }
          localStorage.setItem('collegeCourseStatus', JSON.stringify(this.courseStatus));
          localStorage.setItem('collegeCourseStatusTop', JSON.stringify(this.courseStatusTop));
        });
      }
    },
    mounted() {
      this.getCourseStatus();
      this.getTeachers();
      this.getPictureAppreciation();
      $("ul.el-carousel__indicators").css("display", "none");
    },
    created() {
      if (localStorage.getItem('collegeCourseStatus')) {
        this.courseStatus = JSON.parse(localStorage.getItem('collegeCourseStatus'));
      }
      if (localStorage.getItem('collegeCourseStatusTop')) {
        this.courseStatusTop = JSON.parse(localStorage.getItem('collegeCourseStatusTop'));
      }
      if (localStorage.getItem('collegePictureAppreciation')) {
        this.pictureAppreciation = JSON.parse(localStorage.getItem('collegePictureAppreciation'));
      }
      if (localStorage.getItem('collegeTeacherStyles')) {
        this.teacherStyles = JSON.parse(localStorage.getItem('collegeTeacherStyles'));
      }
    },
  }
</script>

<style scoped lang="scss">
  .space_nowarp {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
    min-width: 130px;
    white-space: nowrap;
  }

  ul.el-carousel__indicators {
    display: none;
  }

  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .list_left {
    position: relative;
    .shade {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      color: #fff;
      font-size: 25px;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
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

  #university {
    min-width: 1300px;
    .headPic {
      width: 100%;
      height: 400px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .navigation {
        @include flex;
        justify-content: center;
        position: absolute;
        right: 94px;
        bottom: -30px;
        div {
          width: 92px;
          height: 92px;
          @include border_radius(50%);
          cursor: pointer;
          text-align: center;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        .navigation_left {
          background: #6a8dfb;
          div {
            display: flex; /*Flex布局*/
            display: -webkit-flex; /* Safari */
            align-items: center; /*指定垂直居中*/
            justify-content: center;
            color: #fff;
            font-size: 18px;
          }
        }
        .navigation_right {
          background: #fb4699;
          margin-left: 30px;
          div {
            display: flex; /*Flex布局*/
            display: -webkit-flex; /* Safari */
            align-items: center; /*指定垂直居中*/
            justify-content: center;
            color: #fff;
            font-size: 18px;
          }
        }
        i {
          font-size: 30px;
          color: #FFFFFF;
          line-height: 92px;
        }
      }
    }
    .curriculumTitle {
      line-height: 15px;
      @include flex;
      .left_border {
        height: 14px;
        width: 0;
        border-left: 2px solid #6a8dfb;
        @include border_radius(3px);
      }
      .title {
        padding-left: 7px;
        color: #6a8dfb;
        font-size: 13px;
      }
    }
    .curriculum {
      margin-top: 30px;
      .curriculumList {
        margin-top: 10px;
        .list_left {
          height: 400px;
          img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .list_frame {
          @include flex;
          justify-content: space-between;
          height: 200px;
          border: 1px solid #e4e7ed;
          padding: 0 30px;
          overflow: hidden;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          &:hover {
            border: 1px solid #6a8dfb;
            @include border_radius(5px);
            .list_detail {
              .list_title {
                color: #6a8dfb;
              }
            }
            .read {
              span {
                color: #81dfa2;
              }
            }
            .critique {
              span {
                color: #fc76af;
              }
            }
          }
          .list_pic {
            width: 92px;
            height: 92px;
            min-width: 92px;
            min-height: 92px;
            @include border_radius(50%);
            margin-top: 45px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .list_detail {
            @include flex;
            flex-direction: column;
            margin-left: 16px;
            max-height: 200px;
            .list_title {
              font-size: 16px;
              color: #303133;
              margin-top: 46px;
            }
            .list_remark {
              font-size: 14px;
              color: #a1a2a4;
              margin: 13px 0 23px 0;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              height: 38px;
            }
            .readerInfo {
              @include flex;
              font-size: 14px;
              line-height: 14px;
              color: #c4c5c6;
              i {
                margin-right: 10px;
              }
              .critique {
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
    .teacher {
      margin-top: 26px;
      .teacher_left {
        width: 100%;
        height: 400px;
        position: relative;
        margin-top: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .teacher_info {
          position: absolute;
          top: 78px;
          left: 26px;
          font-size: 16px;
          color: #FFFFFF;
          max-width: 200px;
        }
        .teacher_name {
          font-size: 30px;
        }
        .teacher_department {
          margin: 14px 0 20px 0;
        }
        .separate {
          width: 30px;
          border-top: 3px solid #fb4699;
        }
        .teacher_motto {
          margin: 40px 0 20px 0;
        }
        .teacher_center {
          position: absolute;
          top: 78px;
          right: 125px;
          font-size: 16px;
          color: #404042;
          max-width: 200px;
        }
      }
      .key_right, .key_left {
        position: relative;
        .shade {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          i {
            position: absolute;
            font-size: 60px;
            top: 175px;
            right: 130px;
            cursor: pointer;
            color: #FFFFFF;
          }
        }
      }
    }
    .img_appreciation {
      margin-top: 26px;
      .img_left {
        width: 100%;
        height: 249px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img_left.curs {
        img {
          cursor: pointer;
        }
      }
    }
  }
</style>
