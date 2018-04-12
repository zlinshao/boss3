<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="地图" :visible.sync="mapFormVisible" width="40%">
      <div class="content" v-if="isMapSearch">
        <div class="filter-container">
          <el-form :inline="true" onsubmit="return" size="mini" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="chooseCity" placeholder="请选择城市" value="">
                <el-option v-for="item in cityDictionary" :label="item.dictionary_name"
                           :value="item.dictionary_name" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchInfo" placeholder="请输入内容" class="input-with-select" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>

            <el-button type="text" @click="isMapSearch = false">
              没有找到相应小区?点击新增
            </el-button>
          </el-form>
        </div>
        <div class="tableList scroll_bar">
          <el-table :data="tableData" @row-click="rowClick" style="width: 100%">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>

            <el-table-column label="小区名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="district"
              label="行政地区">
            </el-table-column>
            <el-table-column
              prop="address"
              label="小区地址">
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div class="content" v-if="!isMapSearch">
        <el-form size="mini" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="小区名称" required>
                <el-input placeholder="请输入内容" v-model="villageName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="">
              <a style="display: inline-block;font-size: 12px;line-height: 150%">
                小区名称规范：<br>
                1.有小区名——仙居雅苑，禁填xx路xx号<br>
                2.无小区名——水西门大街87号
              </a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="小区地址" required>
                <el-input placeholder="请输入内容" v-model="address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="小区坐标" required>
                <el-input placeholder="请选择小区" v-model="location" @focus="innerVisible = true" readonly=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--内层dialog 选择坐标-->
      <el-dialog :close-on-click-modal="false"
        width="40%"
        title="选取坐标"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="map">
          <div id="mapContainer" style="width: 100%;height: 100%"></div>
          <div id="panel"></div>
          <div id="myPageTop">
            <table>
              <tr>
                <td>
                  <label>按关键字搜索：</label>
                </td>
                <td class="column2">
                  <label>左击获取经纬度：</label>
                </td>
              </tr>
              <tr>
                <td>
                  <el-input type="text" v-model="keywords" size="mini" placeholder="请输入关键字进行搜索"
                            @keyup.enter.native="enterSearch"></el-input>
                </td>
                <td class="column2">
                  <el-input type="text" readonly id="lnglat" size="mini" v-model="coordinate"></el-input>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="innerVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="selectCoordinate">确 定</el-button>
        </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isMapSearch = true" v-if="!isMapSearch">返 回</el-button>
        <el-button size="small" @click="mapFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="closeDialog()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";

  let addr = "//restapi.amap.com/v3/assistant/inputtips?key=2cafb0027aa13d1c6b13542462b3c94f&datatype=poi&types=120300";
  export default {
    components: {ElInput},
    props: ['FormVisible'],
    data () {
      return {
        mapFormVisible: false,
        innerVisible: false,
        tableData: [],
        chooseCity: '',
        searchInfo: '',
        radio: '1',
        selectDate: [],
        selectedItem: {},
        cityDictionary: [],
        isMapSearch: true,

        keywords: '',
        coordinate: '',

        villageName:'',
        address:'',
        location: '',
      }
    },

    mounted(){
    },
    watch: {
      FormVisible(val){
        this.mapFormVisible = val
      },
      mapFormVisible(val) {
        if (!val) {
          this.$emit('close', '');
        } else {
          if (!this.isDictionary) {
            this.getDictionary();
          }
        }
      },
      innerVisible(val){
        if (val) {
          setTimeout(() => {
            this.initMap();
          }, 10)
        }
      },
      selectMember(val){
        this.buttonStatus = !val.length;
      }
    },
    methods: {

      getDictionary(){
        this.dictionary(306, 1).then((res) => {
          this.cityDictionary = res.data;
          this.isDictionary = true
        });
      },

      search(){ //关键词 搜索线上高德数据
        this.$http.defaults.withCredentials = false;
        this.$http.defaults.headers = {};
        this.$http.get(addr + '&keywords=' + this.searchInfo + '&city=' + this.chooseCity).then((res) => {
          if (res.data.tips.length > 0) {
            //过滤掉没有地址的数据
            this.tableData = res.data.tips.filter((x) => {
              return typeof x.address === 'string'
            })
          }
        });
        this.$http.defaults.withCredentials = true;
        this.$http.defaults.headers = globalConfig.header;
        if (localStorage.myData !== undefined) {
          let head = JSON.parse(localStorage.myData);
          globalConfig.header.Authorization = head.token_type + ' ' + head.access_token;
        }
      },
      closeDialog(){    //关闭模态框回调
        if(this.isMapSearch){
          if (Object.keys(this.selectedItem).length>0) {
            this.$emit('close', this.selectedItem);
            this.tableData = [];
            this.selectedItem = {};
            this.chooseCity = '';
            this.searchInfo = '';
            this.mapFormVisible = false;
          }else {
            this.$notify.warning({
              title:"警告",
              message:'您尚未选择任何信息'
            })
          }
        }else {
          if(!this.villageName){
            this.$notify.warning({
              title:"警告",
              message:'请填写小区名称！'
            })
          }else if(!this.address){
            this.$notify.warning({
              title:"警告",
              message:'请填写小区地址！'
            })
          }else if(!this.location){
            this.$notify.warning({
              title:"警告",
              message:'请选取小区坐标！'
            })
          }else {
            this.$emit('close', {
              name: this.villageName,
              address: this.address,
              location: this.location
            });
            this.mapFormVisible = false;
            this.isMapSearch = true;
            this.villageName = '';
            this.address = '';
            this.location = '';
          }
        }
      },

      rowClick(row, event, column){
        this.radio = row.id;
        this.selectedItem = row;
      },
      //选择坐标
      enterSearch(){
        this.initMap();
      },
      initMap(){
        let _this = this;
        let map = new AMap.Map("mapContainer", {
          resizeEnable: true
        });
//        为地图注册click事件获取鼠标点击出的经纬度坐标
        let clickEventListener = map.on('click', function (e) {
          document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
          _this.coordinate = e.lnglat.getLng() + ',' + e.lnglat.getLat();
        });

        AMap.service(["AMap.PlaceSearch"], function () {
          let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 5,
            pageIndex: 1,
            city: "", //城市
            map: map,//,
//            panel: "panel"
          });
          //关键字查询
          placeSearch.search(_this.keywords, function (status, result) {
          });
        });
      },
      selectCoordinate(){
        this.location = this.coordinate;
        this.innerVisible = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .map {
    width: 100%;
    height: 450px;
    position: relative;
    border: 1px solid rgba(64, 158, 255, .12);
    box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
    #myPageTop {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #e9e9e9;
      padding: 5px
    }
  }

  .content {
    padding: 15px
  }
</style>
