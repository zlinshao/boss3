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

          <!--<el-col :span="3">-->
            <!--<el-select v-model="value8" filterable placeholder="请选择" value="">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-col>-->
        </el-row>
      </el-form-item>
    </el-form>

    <el-row :gutter="30">
      <el-col :span="9">
        <div class="registerList scroll_bar">
          <div class="personnelInfo" v-for="item in myData" @click="lookThis(item)">
            <div class="name_pic">
              <div class="personnelPIc">
                <img :src="item.avatar" alt="">
              </div>
              <div class="personnelName">{{item.name}}</div>
            </div>
            <div class="register_position">
              <i class="el-icon-location"></i>
              <div class="positionInfo">{{item.detail_place}}</div>
            </div>
            <div class="date_time">
              <i class="el-icon-time"></i>
              <div class="registerDate">{{item.update_time}}</div>
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
          <div id="mapContainer" class="registerMap">
            <!--<h4 v-if="location.length==0||location[0]===''">暂无地图信息...</h4>-->
          </div>
          <!--<div class="ambitusDetail" v-if="location.length>0&&location[0]!==''">-->
          <!--<div class="ambitusDetail_top" @click="changeActive($event)">-->
          <!--<a class="active">交通</a>-->
          <!--<a>学校</a>-->
          <!--<a>医疗</a>-->
          <!--<a>购物</a>-->
          <!--<a>生活</a>-->
          <!--<a>娱乐</a>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div id="panel" class="roll"></div>-->
        </div>
      </el-col>
    </el-row>

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganize" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>

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
          department_id:'',
          staff_id:'',
          limit:5,
          page:1,
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
      }
    },
    mounted() {
      this.getData();
    },
    watch: {},
    methods: {
      getData(){
        this.$http.get(globalConfig.server+ 'avatar/Checkin/getRecord',{params:this.params}).then((res) => {
          if(res.data.code === '20310'){
            this.myData = res.data.data;
            this.totalNumber =res.data.num;
            if(res.data.data.length>0){
              this.isShow = false;
              this.centerLongitude = res.data.data[0].longitude;
              this.centerLatitude = res.data.data[0].latitude;
            }else {
              this.centerLongitude = '118.78550998264';
              this.centerLatitude = '32.088234863281';
              this.isShow = true;
            }
          }else {
            this.myData = [];
            this.isShow = true;
            this.totalNumber = 0;
            this.centerLongitude = '118.78550998264';
            this.centerLatitude = '32.088234863281';
          }
          this.initMap();
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
          this.params.department_id = val[0].id;
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
          this.params.department_id = '';
          this.depart_name = null;
        }
        this.search();
      },

      lookThis(item){
        this.centerLongitude = item.longitude;
        this.centerLatitude = item.latitude;
        this.initMap();
      },
      //init map
      initMap(){
        let map = new AMap.Map("mapContainer", {
          resizeEnable: true,
          zoom: 15,
          center:[this.centerLongitude,this.centerLatitude]
        });
        map.clearMap();  // 清除地图覆盖物

        let markers = [];



        for (let i =0;i<this.myData.length;i++){
          markers.push({
            'icon' : this.myData[i].avatar,
            'position' : [this.myData[i].longitude,this.myData[i].latitude]
          })
        }
        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        markers.forEach(function(marker) {
          new AMap.Marker({
            map: map,
//                        icon: marker.icon,
            icon: new AMap.Icon({
              image: marker.icon,
              size: new AMap.Size(128, 128),  //图标大小
              imageSize: new AMap.Size(50,50)
            }),
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
          });
        });
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
  }
</style>
