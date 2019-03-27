<template>
  <div id="newDisk">
    <div class="newDiskLeft">
      <div id="container"></div>
      <div class="info scroll_bar">
        <div v-for="item in Object.keys(houseInfo)">
          <label>{{houseInfo[item]}}：</label>
          <span>{{showHouseInfo[item]}}</span>
        </div>
        <div style="width: 100%;" v-for="item in Object.keys(houseImages)">
          <label>{{houseImages[item]}}：</label>
          <span v-for="p in showImages[item]">
             <img data-magnify="" data-caption="图片查看器" :data-src="p.uri" :src="p.uri">
          </span>
        </div>
      </div>
    </div>
    <div class="list list1 scroll_bar" style="width: 100%">
      <h3>全站大数据房源匹配</h3>
      <div v-for="(item,index) in list" @click="getVillageInfo(item,index)">
        <div class="content" :class="{'chooseColor':listIndex === index}">
          <p>{{item.village_name}}</p>
          <span>({{item.bulletin_user.name}}-{{item.bulletin_org.name}})</span>
        </div>
        <div class="caozuo">
          <div>
            <el-button type="info" size="mini" @click="passThrough(item.id, 0)">拒绝
            </el-button>
            <el-button type="primary" size="mini" @click="passThrough(item.id, 1)">通过
            </el-button>
          </div>
          <p>({{item.status_name.name}})</p>
        </div>
      </div>
    </div>
    <div class="list price scroll_bar">
      <h3>房型价格区块链推荐</h3>
      <div v-for="(item,index) of villageInfo" @click="getImage(item,index)"
           :class="{'chooseColor':houseIndex === index}">
        <span>
           <span class="village_name">{{item.village_name}}</span><br>
          {{item.house_type}}&nbsp;-&nbsp;{{item.price}}元
        </span>
        <b @click="houseOpenWindow(item.url)">查看详情</b>
      </div>
    </div>
    <div class="list img scroll_bar">
      <h3>自适应聚类房型图</h3>
      <div v-for="item in images">
        <img data-magnify="" data-caption="图片查看器" :data-src="item" :src="item">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        url: globalConfig.server,
        fullscreenLoading: false,
        list: [],
        map: null,
        listIndex: 0,
        houseIndex: 0,
        villageInfo: {},
        images: [],
        showHouseInfo: {},
        showImages: {},
        houseInfo: {
          city: '城市名',
          district: '区/县名称',
          village_name: '小区名称',
          village_alias: '小区别名',
          address: '街道地址',
          built_year: '建筑年代',
          house_type: '房屋类型',
          total_buildings: '总栋数',
          property_fee: '物业费',
          property_phone: '物业电话',
          lessor_phone: '求租人电话',
          property_com: '物业公司',
          content: '详情',
          peripheral_info: '周边信息',
          subway_road: '地铁线路',
          remark: '备注',
        },
        // 小区照片
        houseImages: {
          village_photo: '小区照片',
          home_photo: '房屋照片',
          files: '小区名称',
        }
      }
    },
    mounted() {

    },
    activated() {
      this.getVillageList();
    },
    watch: {},
    computed: {},
    methods: {
      houseOpenWindow(url) {
        window.open(url);
      },
      getVillageList() {
        this.$http.get(this.url + 'setting/village/list?limit=9999').then(res => {
          if (res.data.code === '9920') {
            this.list = res.data.data;
            if (this.list[0]) {
              this.villageImage(this.list[0].id);
              this.showHouseInfo = this.list[0].draft_content || {};
              if (this.list[0].outer_net_data) {
                if (this.list[0].outer_net_data[0]) {
                  this.villageInfo = this.list[0].outer_net_data;
                  this.images = this.list[0].outer_net_data[0].pic_address;
                }
              }
            }
            this.highSearch(this.list[0].outer_net_data);
          }
        })
      },
      villageImage(id) {
        this.$http.get(this.url + 'setting/village/get_album/' + id).then(res => {
          if (res.data.code === '9930') {
            this.showImages = res.data.data;
          } else {
            this.showImages = {};
          }
        });
      },
      passThrough(id, pass) {
        let msg = pass ? '通过' : '拒绝';
        if (pass === 1) {
          this.$confirm('此操作将' + msg + '报备, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.villageInfo = {};
            this.images = [];
            this.list = [];
            this.$http.put(this.url + 'setting/village/' + id, {
              is_pass: pass
            }).then(res => {
              if (res.data.code === '9920') {
                this.prompt('success', res.data.msg);
              } else {
                this.prompt('warning', res.data.msg);
              }
              this.listIndex = 0;
              this.getVillageList();
            }).catch(_ => {
              this.getVillageList();
            })
          }).catch(() => {
          });
        } else {
          this.$prompt('请输入拒绝理由', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            this.villageInfo = {};
            this.images = [];
            this.list = [];
            let msg = value || '';
            this.$http.put(this.url + 'setting/village/' + id, {
              is_pass: pass,
              message: msg,
            }).then(res => {
              if (res.data.code === '9920') {
                this.prompt('success', res.data.msg);
              } else {
                this.prompt('warning', res.data.msg);
              }
              this.listIndex = 0;
              this.getVillageList();
            }).catch(_ => {
              this.getVillageList();
            })
          }).catch(() => {
          });
        }
      },
      getImage(val, index) {
        this.houseIndex = index;
        this.images = [];
        this.images = val.pic_address || [];
      },
      getVillageInfo(item, index) {
        this.villageInfo = {};
        this.images = [];
        this.villageImage(item.id);
        this.map.destroy();
        this.listIndex = index;
        this.showHouseInfo = item.draft_content || {};
        this.villageInfo = item.outer_net_data;
        if (item.outer_net_data && item.outer_net_data.length > 0) {
          this.houseIndex = 0;
          this.images = item.outer_net_data[0].pic_address;
        }
        this.highSearch(this.villageInfo);
      },
      highSearch(info) {
        let that = this;
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 13,
        });
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(5, -20)});
        if (!info) return;
        for (let key of info) {
          let marker = new AMap.Marker({
            position: [key.longitude, key.latitude],
            map: that.map
          });
          marker.content = key.village_name;
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
          this.map.add(marker);
        }

        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(that.map, e.target.getPosition());
        }

        that.map.setFitView();
      }
    },
  }
</script>

<style lang="scss" scoped>
  #newDisk {
    display: flex;
    display: -webkit-flex;
    position: relative;
    .newDiskLeft {
      width: 50%;
      height: 750px;
      #container {
        width: 100%;
        height: 450px;
      }
      .info {
        height: 300px;
        overflow: auto;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        img {
          width: 60px;
          height: 60px;
          border-radius: 6px;
          margin-right: 10px;
        }
        div {
          margin-top: 20px;
          width: 30%;
          display: flex;
          display: -webkit-flex;
          margin-right: 2%;
          label {
            color: #212121;
            white-space: nowrap;
          }
        }
      }
    }

    .list {
      max-width: 13%;
      min-width: 13%;
      height: 750px;
      padding: 0 30px;
      overflow-y: auto;
      border-left: 1px solid #e4e7ed;
      h3 {
        text-align: center;
        color: #FF4302;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 5px;
      }
      .caozuo {
        > div {
          display: flex;
          min-width: 130px;
          text-align: right;
        }
        p {
          margin: 0;
          padding: 3px 6px 0 0;
          text-align: right;
        }
      }
      .content {
        width: 50%;
        padding: 6px 10px;
        p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          line-height: 20px;
        }
        span {
          color: #c8cbd1;
        }
      }
    }
    .price {
      div {
        margin-bottom: 10px;
        line-height: 22px;
      }
      .village_name {
        color: #212121;
      }
      b {
        color: #409EFF;
      }
    }
    .list1 {
      max-width: 20%;
      min-width: 20%;
    }
    .img {
      max-width: 20%;
      min-width: 20%;
      div {
        float: left;
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
      }
    }
    .scroll_bar {
      > div {
        cursor: pointer;
        &:hover {
          color: #409EFF;
        }
      }
      .chooseColor {
        color: #e4393c;
      }
    }
  }
</style>
