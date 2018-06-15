<template>
  <div id="register">
    <el-form size="mini">
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-input placeholder="点击选择部门" size="mini" v-model="depart_name" @focus="openFrames('depart')" readonly>
              <el-button @click="clearOrganization('depart')" slot="append">清空</el-button>
            </el-input>
          </el-col>

          <el-col :span="3">
            <el-input placeholder="点击选择人员" size="mini" v-model="staff_name" @focus="openFrames('staff')" readonly>
              <el-button @click="clearOrganization('staff')" slot="append">清空</el-button>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                            v-model="params.insert_date"></el-date-picker>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-row :gutter="30">
      <el-col :span="9">
        <div class="registerList scroll_bar">
          <div class="personnelInfo" v-for="item in myData" :class="currentId===item.id?'activeBack':''" @click="lookThis(item)">
            <div class="name_pic">
              <div class="personnelPIc">
                <img :src="item.user_avatar" alt="">
              </div>
              <div class="personnelName">{{item.user_name}}</div>
            </div>
            <div class="register_position">
              <i class="el-icon-location"></i>
              <div class="positionInfo">{{item.address_name}}</div>
            </div>
            <div class="date_time">
              <i class="el-icon-time"></i>
              <div class="registerDate">{{item.create_time}}</div>
            </div>
          </div>

          <div style="width: 100%;height: 680px;text-align: center;line-height: 680px" v-if="isShow">
            &nbsp;暂无签到记录
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="totalNumber">
            </el-pagination>
          </div>
        </div>

      </el-col>
      <el-col :span="15">
        <div class="map">
          <div id="container" class="map registerMap" tabindex="0"></div>

        </div>

      </el-col>
    </el-row>

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganize" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import img from '../../assets/images/head.jpg'
  import Organization from '../common/organization'

  export default {
    name: "index",
    components:{
      Organization
    },
    data() {
      return {
        depart_name: '',
        staff_name: '',
        params:{
          org_id:'',
          staff_id:'',
          limit : 5,
          insert_date : '',
          page : 1,
        },
        //选人框
        organizationDialog:false,
        length:null,
        type:null,

        isShow: false,              //暂无数据
        myData:[],
        totalNumber:0,
        centerLongitude:'',
        centerLatitude:'',
        currentId : '',
        marker : [],
        startEndData : [],
      }
    },
    mounted() {
      this.getData();
      this.initMap();
    },
    watch: {
      'params.insert_date':{
        handler(val,old){
          this.search();
        }
      }
    },
    methods: {
      getData(){
        this.$http.get(globalConfig.server+ 'avatar/track/selectTrack',{params:this.params}).then((res) => {
          if(res.data.code === '20360'){
           if(res.data.data.status_code === '1'){
             this.myData = res.data.data.data;
             this.isShow = false;
             this.totalNumber = res.data.data.total;

             //init
             let startEndData = res.data.data.data;
             this.startEndData = [];
             this.marker = [];
             startEndData.forEach((x)=>{
               let pathParamArray = [];
               x.points.forEach((item)=>{
                 let pathParam = {};
                 pathParam = Object.assign({},pathParam,{"x":item.gg_lon,"y":item.gg_lon,"sp":10,"ag":0,"acc":5,"tm":3,"type":1});
                 pathParamArray.push(pathParam);
               });
               this.startEndData.push(pathParamArray);
               x.marker.forEach((item)=>{
                 this.marker.push(item);
               })
             });
             this.initMap();

           }else {
             this.myData = [];
             this.isShow = true;
             this.totalNumber = 0;
           }
          }else {
            this.myData = [];
            this.isShow = true;
            this.totalNumber = 0;
            // this.centerLongitude = '118.78550998264';
            // this.centerLatitude = '32.088234863281';
          }
        })
      },

      search(){
        this.params.page = 1;
        this.getData();
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
      },
      openFrames(type) {
        this.type = type;
        this.length = 1;
        this.organizationDialog = true;
      },
      closeOrganize(){
        this.organizationDialog = false;
      },
      selectMember(val){
        if(this.type === 'depart'){
          this.params.org_id = val[0].id;
          this.depart_name =  val[0].name;
        }else {
          this.params.staff_id = val[0].id;
          this.staff_name = val[0].name;
        }
        this.search();
      },
      clearOrganization(type){
        if(type==='staff'){
          this.params.staff_id = '';
          this.staff_name = null;
        }else {
          this.params.org_id = '';
          this.depart_name = null;
        }
        this.search();
      },

      lookThis(item){
        this.currentId = item.id;
        this.centerLongitude = item.longitude;
        this.centerLatitude = item.latitude;
        this.getPersonal();
      },

      getPersonal(){
        this.$http.get(globalConfig.server+'track/'+this.currentId).then((res)=>{
          if(res.data.code === '20360'){
            if(res.data.data.status_code === '1'){
              let startEndData = res.data.data.data;
              this.startEndData = [];
              this.marker = [];
              let pathParamArray = [];
              startEndData.points.forEach((item)=>{
                let pathParam = {};
                pathParam = Object.assign({},pathParam,{"x":item.gg_lon,"y":item.gg_lon,"sp":10,"ag":0,"acc":5,"tm":3,"type":1});
                pathParamArray.push(pathParam);
              });
              this.startEndData.push(pathParamArray);
              startEndData.marker.forEach((item)=>{
                this.marker.push(item)
              });
              this.initMap();
            }else {
              this.startEndData = [];
              this.marker = [];
              this.$notify.warning({
                title:'警告',
                message:res.data.msg,
              })
            }
          }else {
            this.startEndData = [];
            this.marker = [];
          }
        })
      },

      //init map
      initMap(){
        let map = new AMap.Map('container', {
          resizeEnable: true
        });
        let pathParam = [];
        this.startEndData.forEach((item)=>{
          pathParam = item;
          new AMap.GraspRoad().driving(pathParam,function(error,result){
            if(!error){
              let path2 = [];
              let newPath = result.data.points;
              for(let i =0;i<newPath.length;i+=1){
                path2.push([newPath[i].x,newPath[i].y])
              }
              let newLine = new AMap.Polyline({
                path:path2,
                strokeWeight:8,
                strokeOpacity:0.7,
                strokeColor:'green',
                showDir:true
              });
              map.add(newLine);
              map.setFitView();
            }
          });
        });


        let lnglats = this.marker;
        console.log(this.marker)
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        for (let i = 0, marker; i < lnglats.length; i++) {
          let marker = new AMap.Marker({
            position: [lnglats[i].point.gg_lon,lnglats[i].point.gg_lat],
            map: map
          });
          let htmlContent = `
            <div class="InfoWindow InfoWindow_border" style="width: 360px;background: #fff;padding: 5px;box-sizing: border-box">
              <div style="height: 50px;display: flex;">
                <div style="margin-right: 10px">
                  <img src="${lnglats[i].user_avatar}" alt="" style="width: 50px;height: 50px;border-radius: 50%">
                </div>
                <div style="height:50px;line-height: 50px;border-bottom: 1px solid #ddd;flex-grow: 1;font-size: 14px;color: #aaa">
                  <span style="margin-right: 5px">${lnglats[i].user_name}</span>
                  <span>${lnglats[i].user_org_name}</span>
                </div>
              </div>
              <div style="padding: 10px 0 0 60px;font-size: 14px;color: #666">
                <div style="line-height: 160%">
                <span style="color: #999">时间</span> ：${lnglats[i].insert_datetime}
                </div>
                <div style="line-height: 160%"><span style="color: #999">地址</span> ：${lnglats[i].address_name}</div>
                <div style="line-height: 160%">
                <span style="color: #999">照片</span> ：
                <img src="${lnglats[i].download_url}" alt="" data-magnify="" data-src="${lnglats[i].download_url}"
                style="width: 120px;height: 80px;vertical-align: middle;cursor: pointer">
                </div>
                <div style="line-height: 160%"><span style="color: #999">备注</span> ：${lnglats[i].content}</div>
              </div>
            </div>
          `;

          marker.content = htmlContent;
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
        }


        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
        }
        map.setFitView();


//         let map = new AMap.Map("mapContainer", {
//           resizeEnable: true,
//           zoom: 15,
//           center:[this.centerLongitude,this.centerLatitude]
//         });
//         map.clearMap();  // 清除地图覆盖物
//
//         let markers = [];
//
//
//
//         for (let i =0;i<this.myData.length;i++){
//           markers.push({
//             'icon' : this.myData[i].avatar,
//             'position' : [this.myData[i].longitude,this.myData[i].latitude]
//           })
//         }
//         // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
//         markers.forEach(function(marker) {
//           new AMap.Marker({
//             map: map,
// //                        icon: marker.icon,
//             icon: new AMap.Icon({
//               image: marker.icon,
//               size: new AMap.Size(128, 128),  //图标大小
//               imageSize: new AMap.Size(50,50)
//             }),
//             position: [marker.position[0], marker.position[1]],
//             offset: new AMap.Pixel(-12, -36)
//           });
//         });
      },
    },
  }
</script>

<style scoped="" lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  #register{
    .registerList {
      padding: 0 30px;
      height: 750px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      border: 1px solid #cccccc;
      border-radius: 5px;
      .personnelInfo {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px dashed #cccccc;
        color: #667A8F;
        .name_pic {
          @include flex;
          justify-content: left;
          .personnelPIc {
            width: 45px;
            height: 45px;
            @include border_radius(50%);
            img {
              width: 100%;
              height: 100%;
              @include border_radius(50%);
            }
          }
          .personnelName {
            line-height: 48px;
            margin-left: 20px;
            color: #6a8dfb;
          }
        }
        .remarks {
          margin-top: 15px;
        }
        .register_position {
          @include flex;
          justify-content: left;
          margin-top: 15px;
          i {
            line-height: 19px;
          }
          .positionInfo {
            margin-left: 10px
          }
        }
        .date_time {
          @include flex;
          justify-content: left;
          margin-top: 15px;
          i {
            line-height: 19px;
          }
          .registerDate {
            margin-left: 10px;
          }
        }
      }
      .pagination {
        margin-top: 10px;
        text-align: right;
      }
    }
    .registerMap {
      height: 750px;
      border-radius: 6px;
      border: 1px solid #cccccc;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .InfoWindow_border {
      border: 1px solid rgba(64, 158, 255, .12);
      box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
    }
    .activeBack{
      background: #f9fbff;
    }
  }
</style>
