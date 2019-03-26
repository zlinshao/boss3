<template>
  <div id="newDisk">
    <div id="container"></div>
    <div class="list list1 scroll_bar" style="width: 100%">
      <h3>全站大数据房源匹配</h3>
      <div v-for="(item,index) in list" @click="getVillageInfo(item,index)">
        <div class="content" :class="{'chooseColor':listIndex === index}">
          <p>{{item.village_name}}</p>
          <span>({{item.bulletin_user.name}}-{{item.bulletin_org.name}})</span>
        </div>
        <div class="caozuo">
          <el-button type="info" size="mini" @click="passThrough(item.id, 0)">拒绝
          </el-button>
          <el-button type="primary" size="mini" @click="passThrough(item.id, 1)">通过
          </el-button>
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
      getVillageList() {
        this.$http.get(this.url + 'setting/village/list?limit=9999').then(res => {
          if (res.data.code === '9920') {
            this.list = res.data.data;
            if (this.list[0]) {
              this.villageInfo = this.list[0].village_info;
              if (this.list[0].village_info[0]) {
                this.images = this.list[0].village_info[0].pic_address;
              }
            }
            this.highSearch(this.list[0].village_info);
          }
        })
      },
      passThrough(id, pass) {
        let msg = pass ? '通过' : '拒绝';
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
      },
      getImage(val, index) {
        this.houseIndex = index;
        this.images = [];
        this.images = val.pic_address || [];
      },
      getVillageInfo(item, index) {
        this.villageInfo = {};
        this.images = [];
        this.map.destroy();
        this.listIndex = index;
        this.villageInfo = item.village_info;
        if (item.village_info && item.village_info.length > 0) {
          this.houseIndex = 0;
          this.images = item.village_info[0].pic_address;
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
    #container {
      height: 750px;
      width: 50%;
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
        display: flex;
        min-width: 130px;
        text-align: right
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
