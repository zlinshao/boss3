<template>
  <div id="villageDetail">
    <div class="scroll_bar">
      <div class="personalInfo" style="">
        <div class="title">小区信息</div>
      </div>
      <div class="form_border">
        <el-form size="mini" label-width="110px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="小区名称">
                <div class="special">{{myData.village_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋数">
                <div class="special">{{myData.total_buildings}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区地址">
                <div class="special">{{myData.address}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地域">
                <div class="special">
                  <span v-if="myData.province">{{myData.province.province_name}}</span>
                  -
                  <span v-if="myData.city">{{myData.city.city_name}}</span>
                  -
                  <span v-if="myData.area">{{myData.area.area_name}}</span>
                  -
                  <span v-if="myData.region">{{myData.region.region_name}}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格区间">
                <div class="special">{{myData.min_price}} - {{myData.max_price}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房屋类型">
                <div class="special">{{myData.house_types}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产权地址">
                <div class="special">{{myData.village_alias}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物业费">
                <div class="special">{{myData.property_fee}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物业联系方式">
                <div class="special">{{myData.property_phone}}</div>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="建造年限">
                <div class="special">{{myData.built_year}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地铁线路">
                <div class="special">{{myData.content}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="照片">
                <div class="special imgs">
                  <span v-for="(key,index) in house_pic">
                     <img data-magnify="" data-caption="图片查看器" v-for="item in key"
                          :data-src="item.uri" :src="item.uri">
                  </span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="title">小区简介</div>
      <div class="form_border">
        <el-form size="mini" label-width="110px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="周边配套">
                <div class="special">{{myData.peripheral_info}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区简介">
                <div class="special">{{myData.content}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="title">周边信息</div>
      <div class="form_border">
        <div id="container"></div>

        <div id="panel" class="scroll_bar">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "village-detail",
    props: ['formList'],
    data() {
      return {
        urls: globalConfig.server,
        myData: {},
        house_pic: {},
        location:[],
      }
    },
    mounted() {
      this.details();
    },
    activated() {
      this.details();
    },
    watch: {},
    methods: {
      details() {
        if(!this.$route.query.ids) {
          this.$router.push({path:"/villageManage/villageDetail",query:{ids:sessionStorage.villageId}});
        }else {
          sessionStorage.setItem('villageId',this.$route.query.ids)
        }
        this.$http.get(this.urls + 'setting/community/' + this.$route.query.ids).then((res) => {
          this.myData = res.data.data;
          this.house_pic = res.data.data.album.house_pic;

          this.location = [];
          this.location.push(res.data.data.longitude);
          this.location.push(res.data.data.latitude);

          this.initMap();
        });
      },
      initMap(){
        let _this = this;
        let map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 12,
          center:_this.location
        });
        let marker = new AMap.Marker({
          position: _this.location
        });
        marker.setMap(map);
        AMap.service(["AMap.PlaceSearch"], function () {
          let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 4,
            type: '餐饮服务',
            pageIndex: 1,
            city: '', //城市
            map: map,
            panel: "panel"
          });

          let cpoint = _this.location; //中心点坐标
          placeSearch.searchNearBy('', cpoint, 500, function (status, result) {

          });
        });
      }
    },
  }
</script>

<style lang="scss">
  #container {
    width: 100%;
    height: 360px;
  }

  #villageDetail {
    .form_border {
      position: relative;
      #panel {
        margin: 15px;
        position: absolute;
        top: 15px;
        right: 15px;
        width: 360px;
        height: 330px;
        overflow-y: auto;
      }
    }
    @mixin border_ {
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .personalInfo {
      a {

      }
    }
    .title {
      color: #409EFF;
      opacity: .7;
      font-size: 12px !important;
      line-height: 24px;
      &:before {
        border-radius: 2px;
        margin-right: 5px;
        background: #409EFF;
        border-left: 1px solid #409EFF;
        content: '|';
      }
    }
    .personalInfo {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      a {
        color: #409EFF;
      }
    }
    .special {
      min-height: 28px;
      padding: 0 20px;
      background-color: #eef3fc;
      @include border_;
      img {
        width: 120px;
        height: 80px;
        margin: 10px 0 0 10px;
        @include border_;
      }
    }
    .special.imgs {
      padding: 0;
    }
    .scroll_bar {
      padding-right: 10px;
      overflow-x: auto;
      .form_border {
        padding: 15px;
        border: 1px solid #dfe6fb;
        @include border_;
        margin-bottom: 12px;
      }
    }
  }
</style>
