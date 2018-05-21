<template>
  <div id="addWebInfo">
    <el-dialog :close-on-click-modal="false" title="新增官网房源" :visible.sync="addWebInfoDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="small" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="小区名称">
                  <div class="content">
                    <span v-if="detailData.community">{{detailData.community.name}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="小区地址">
                  <div class="content">
                    <span v-if="detailData.community">{{detailData.community.detailed_address}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="门牌地址">
                  <div class="content">
                    <span v-if="detailData.door_address">{{detailData.door_address}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房型" required>
                  <el-col :span="8" style="padding-right: 10px">
                    <el-select clearable v-model="params.house_type[0]" placeholder="室" value="">
                      <el-option label="一室" value="1"></el-option>
                      <el-option label="二室" value="2"></el-option>
                      <el-option label="三室" value="3"></el-option>
                      <el-option label="四室" value="4"></el-option>
                      <el-option label="五室" value="5"></el-option>
                      <el-option label="六室" value="6"></el-option>
                      <el-option label="七室" value="7"></el-option>
                      <el-option label="八室" value="8"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="padding-right: 10px">
                    <el-select clearable v-model="params.house_type[1]" placeholder="厅" value="">
                      <el-option label="无" value=""></el-option>
                      <el-option label="一厅" value="1"></el-option>
                      <el-option label="二厅" value="2"></el-option>
                      <el-option label="三厅" value="3"></el-option>
                      <el-option label="四厅" value="4"></el-option>
                      <el-option label="五厅" value="5"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select clearable v-model="params.house_type[2]" placeholder="卫" value="">
                      <el-option label="无" value=""></el-option>
                      <el-option label="一卫" value="1"></el-option>
                      <el-option label="二卫" value="2"></el-option>
                      <el-option label="三卫" value="3"></el-option>
                      <el-option label="四卫" value="4"></el-option>
                      <el-option label="五卫" value="5"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="省" required>
                  <el-select v-model="province" clearable @change="choose('city',province)">
                    <el-option v-for="(item,index) in provinceList" :label="item.province_name"
                               :value="item.province_id" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="市" required>
                  <el-select v-model="city" clearable  @change="choose('area',city)">
                    <el-option v-for="(item,index) in cityList" :label="item.city_name" :value="item.city_id"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="区/县" required>
                  <el-select v-model="area" clearable @change="choose('region',area)">
                    <el-option v-for="(item,index) in areaList" :label="item.area_name" :value="item.area_id"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="区域" required>
                  <el-select v-model="params.region" clearable>
                    <el-option v-for="(item,index) in regionList" :label="item.region_name" :value="item.id"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="建筑面积" required>
                  <el-input placeholder="请输入内容" v-model="params.area"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装修" required>
                  <el-select clearable v-model="params.decorate" placeholder="请选择装修类型" value="">
                    <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋特色" required>
                  <el-select clearable v-model="params.house_feature" placeholder="请选择房屋特色" value="">
                    <el-option label="无" value=""></el-option>
                    <el-option label="近地铁" value="1"></el-option>
                    <el-option label="独卫" value="2"></el-option>
                    <el-option label="独立阳台" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="朝向" required>
                  <el-select clearable v-model="params.direction" placeholder="请选择朝向" value="">
                    <el-option v-for="(item,index) in direction" :label="item" :value="index+1"
                               :key="index+1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="月单价" required>
                  <el-input placeholder="请输入内容" v-model="params.price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">配套设施</div>
        <div class="describe_border">
          <el-checkbox-group v-model="params.furniture">
            <el-row>
              <el-col :span="4" v-for="(val,key) in furniture" :key="key">
                <el-checkbox :label="key">{{val}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>

        <div class="title">描述</div>
        <div class="form_border">
          <el-form size="small" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" required>
                  <el-input placeholder="请输入内容" v-model="params.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="整租合租" required>
                  <el-radio v-model="params.is_share" label="0">整租</el-radio>
                  <el-radio v-model="params.is_share" label="1">合租</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="户型介绍" required>
                  <el-input type="textarea" placeholder="请输入内容" v-model="params.type_intro"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="装修描述" required>
                  <el-input type="textarea" placeholder="请输入内容" v-model="params.decorate_descript"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="封面照片(仅一张)" required="">
                  <UpLoad :ID="'cover_photo'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">房屋照片 （最多只可选取和上传5张）</div>
        <div class="form_border">
          <el-form size="small" label-width="80px">
            <el-form-item label="选取照片">
              <el-checkbox-group v-model="selectPic">
                <el-checkbox v-for="item in imgArray" :key="item.id" :label="item.id">
                  <img :src="item.uri" alt="">
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="添加照片">
              <UpLoad :ID="'new_house_photo'" :isClear="isClear" @getImg="getImg"></UpLoad>
            </el-form-item>
          </el-form>
        </div>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addWebInfoDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../../common/UPLOAD.vue'
  export default {
    props:['addWebInfoDialog','houseId'],
    components:{UpLoad},
    data() {
      return {
        addWebInfoDialogVisible:false,
        isClear:false,
        params:{
          house_id:'',            //房屋id
          house_type:[],          //房型
          region: '',             //热门区域
          area: '',               //面积
          decorate: '',           //装修类型
          direction: '',          //朝向
          house_feature: '',      //房屋特色
          furniture:[],           //房屋配置
          price:'',               //价格
          photo: [],              //照片
          photo_v3 : [],
          title:'',               //标题
          type_intro: '',         //房型介绍
          decorate_descript: '',  //装修描述
          is_share: '',           //合租-整租
          cover_photo: '',        //封面照片
        },

        detailData: {},
        albumData : [],
        allDictionary: [],
        property_type_dic: [],   //房屋类型
        house_feature_dic: [],   //房屋特色
        decorate_dic: [],        //装修

        isDictionary : false,

        imgArray : [],
        selectPic : [],
        newUpPic : [],
        direction:['东', '南', '西', '北', '东南', '东北', '西南', '西北','南北','东西'],
        furniture:{
          1 : '床',
          2 : '衣柜',
          3 : '桌椅',
          4 : '电视',
          5 : '冰箱',
          6 : '洗衣机',
          7 : '空调',
          8 : '热水器',
          9 : '微波炉',
          10: '暖气',
          11: '宽带',
          12: '天然气',
        },

        provinceList : [],
        cityList : [],
        areaList : [],
        regionList : [],
        province : '',
        city : '',
        area : '',
      };
    },
    mounted(){
      this.$http.get(globalConfig.server + 'setting/others/province').then((res) => {
        this.provinceList = res.data.data;
      });
    },
    watch:{
      addWebInfoDialog(val){
        this.addWebInfoDialogVisible = val
      },
      addWebInfoDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.clearData();
        }else {
          this.isClear = true;
          if (!this.isDictionary) {
            this.getDictionary();
          }
          this.getData();

        }
      },

      all_dic(val) {
        this.allDictionary = val;
      },

      houseId(val){
        this.params.house_id = val;
      },

      totalPic(val){
        this.params.photo_v3 = val;
        if(val.length>5){
          this.$notify.warning({
            title: '警告',
            message:'您选取照片和上传照片已经超过5张，请删除多余照片！',
          })
        }
      }
    },
    computed :{
      totalPic(){
        return this.selectPic.concat(this.newUpPic)
      }
    },
    methods:{
      getDictionary(){
        this.dictionary(410, 1).then((res) => {
          this.property_type_dic = res.data;
          this.isDictionary = true
        });
        // this.dictionary(425, 1).then((res) => {
        //   this.house_feature_dic = res.data;
        //   this.isDictionary = true
        // });
        this.dictionary(404, 1).then((res) => {
          this.decorate_dic = res.data;
          this.isDictionary = true
        });
      },

      choose(val, id) {
        if (val === 'city') {
          this.city = '';
          this.area = '';
          this.params.region = '';
          this.chooseList(val, id);
        }else if (val === 'area') {
          this.area = '';
          this.params.region = '';
          this.chooseList(val, id);
        }else if (val === 'region') {
          this.params.region = '';
          this.chooseList(val, id);
        }
      },

      chooseList(val, id) {
        if (val === 'city') {
          this.cityList = [];
          this.areaList = [];
          this.regionList = [];
          this.$http.get(globalConfig.server + 'setting/others/city?city_parent=' + id).then((res) => {
            if (res.data.code === '100050') {
              this.cityList = res.data.data;
            }
          })
        } else if (val === 'area') {
          this.areaList = [];
          this.regionList = [];
          this.$http.get(globalConfig.server + 'setting/others/area?area_parent=' + id).then((res) => {
            if (res.data.code === '100060') {
              this.areaList = res.data.data;
            }
          })
        } else if (val === 'region') {
          this.regionList = [];
          this.$http.get(globalConfig.server + 'setting/others/region?region_parent=' + id).then((res) => {
            if (res.data.code === '100070') {
              this.regionList = res.data.data;
            }
          })
        }
      },
      getImg(val){
        if(val[0] === 'cover_photo'){
          this.params.cover_photo = val[1];
        }else {
          this.newUpPic = val[1];
        }
      },
      getData() {
        this.$http.get(globalConfig.server + 'house/album/' + this.houseId).then((res) => {
          if (res.data.code === '30070') {
            this.detailData = res.data.data.detail;
            this.albumData = res.data.data.album;
            if(this.detailData.house_type){
              this.detailData.house_type.forEach((item) => {
                if(item){
                  this.params.house_type.push(String(item));
                }else {
                  this.params.house_type.push('');
                }

              });
            }
            this.params.area =  this.detailData.area.replace(/[^(0-9).]+/,'');
            this.params.decorate = this.detailData.decorate;
            this.params.direction = this.detailData.direction && this.detailData.direction.id;

            this.params.price = this.detailData.price.replace(/[^(0-9).]+/,'');

            if(this.detailData.house_goods){
              let goods = this.detailData.house_goods;
              if(goods.bed && goods.bed!=='无'){
                this.params.furniture.push('1');
              }
              if(goods.wardrobe && goods.wardrobe!=='无'){
                this.params.furniture.push('2');
              }
              if(goods.chair && goods.chair!=='无'){
                this.params.furniture.push('3');
              }
              if(goods.television && goods.television!=='无'){
                this.params.furniture.push('4');
              }
              if(goods.fridge && goods.fridge!=='无'){
                this.params.furniture.push('5');
              }
              if(goods.wash_machine && goods.wash_machine!=='无'){
                this.params.furniture.push('6');
              }
              if(goods.air_condition && goods.air_condition!=='无'){
                this.params.furniture.push('7');
              }
              if(goods.water_heater && goods.water_heater!=='无'){
                this.params.furniture.push('8');
              }
              if(goods.microwave && goods.microwave!=='无'){
                this.params.furniture.push('9');
              }
              if(goods.heater && goods.heater!=='无'){
                this.params.furniture.push('10');
              }

              if(goods.gas && goods.gas!=='无'){
                this.params.furniture.push('12');
              }
            }

            this.imgArray = [];
            let imgItem = {};
            if(this.albumData.length>0){
              this.albumData.forEach((item) => {
                item.album.album_file.forEach((img)=>{
                  imgItem = {};
                  imgItem['id'] = img.id;
                  imgItem['uri'] = img.uri;
                  this.imgArray.push(imgItem);
                })
              })
            }
            if(this.detailData.house_goods&&this.detailData.house_goods.photo.length>0){
              this.detailData.house_goods.photo.forEach((img)=>{
                imgItem = {};
                imgItem['id'] = img.id;
                imgItem['uri'] = img.uri;
                this.imgArray.push(imgItem);
              })
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg,
            })
          }
        })
      },

      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      confirmAdd(){
        this.$http.post(globalConfig.server+'web/house/save',this.params).then((res)=>{
          if(res.data.code === '90010'){
            this.$notify.success({
              title: "成功",
              message: res.data.msg,
            })
            this.addWebInfoDialogVisible = false;
          }else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg,
            })
          }
        })
      },
      clearData(){
        this.isClear = false;
        this.params = {
          house_id:this.houseId,            //房屋id
          house_type:[],          //房型
          region: '',             //热门区域
          area: '',               //面积
          decorate: '',           //装修类型
          direction: '',          //朝向
          house_feature: '',      //房屋特色
          furniture:[],           //房屋配置
          price:'',               //价格
          photo: [],              //照片
          photo_v3 : [],
          title:'',               //标题
          type_intro: '',         //房型介绍
          decorate_descript: '',  //装修描述
          is_share: '',           //合租-整租
          cover_photo: '',        //封面照片
        };
        this.detailData = {};
        this.albumData = [];

        this.imgArray  = [];
        this.selectPic  = [];
        this.newUpPic  = [];
        this.cityList  = [];
        this.areaList  = [];
        this.regionList  = [];
        this.province  = '';
        this.city  = '';
        this.area  = '';
      },
    }
  }
</script>
<style lang="scss" scoped="">
  .content {
    padding: 0 10px;
    min-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
  }
  img {
    width: 120px;
    height : 120px;
    border-radius: 5px;
  }
  .el-checkbox{
    margin-left: 30px !important;
  }
</style>
