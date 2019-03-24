<template>
  <div id="newDisk">
    <div id="container"></div>
    <div class="list list1 scroll_bar" style="width: 100%">
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
    <div class="list scroll_bar">
      <div v-for="item of villageInfo" @click="getImage(item)">
        {{item.village_name}}<br>{{item.house_type}}&nbsp;-&nbsp;{{item.price}}元
      </div>
    </div>
    <div class="list img scroll_bar">
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
        this.villageInfo = {};
        this.images = [];
        this.list = [];
        this.$http.put(this.url + 'setting/village/' + id, {
          is_pass: pass
        }).then(res => {
          if (res.data.code === '9920') {
            this.listIndex = 0;
            this.getVillageList();
          }
        }).catch(_ => {
          this.getVillageList();
        })
      },
      getImage(val) {
        this.images = [];
        this.images = val.pic_address || [];
      },
      getVillageInfo(item, index) {
        this.villageInfo = {};
        this.images = [];
        this.map.destroy();
        this.listIndex = index;
        this.villageInfo = item.village_info;
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
        p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        span {
          color: #c8cbd1;
        }
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
