<template>
  <div id="villageModule" class="dialog_scroll">
    <el-dialog :title="formList.status" :visible.sync="dialogVisible" width="40%">
      <div class="modules scroll_bar">
        <el-form :model="form" size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="省">
                <el-select v-model="form.province" clearable @change="choose('city',form.province)">
                  <el-option v-for="(item,index) in province" :label="item.province_name"
                             :value="item.province_id" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市">
                <el-select v-model="form.city" clearable @change="choose('area',form.city)">
                  <el-option v-for="(item,index) in cityList" :label="item.city_name" :value="item.city_id"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="区/县">
                <el-select v-model="form.area" clearable @change="choose('region',form.area)">
                  <el-option v-for="(item,index) in areaList" :label="item.area_name" :value="item.area_id"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域">
                <el-select v-model="form.region" clearable>
                  <el-option v-for="(item,index) in regionList" :label="item.region_name" :value="item.id"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="小区名称">
                <el-input @focus="openAddress" v-model="form.villageName" placeholder="请选择小区" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小区地址">
                <el-input v-model="form.villageAddress" placeholder="小区地址" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="小区别名">
            <el-input v-model="form.otherName" placeholder="请输入小区别名"></el-input>
          </el-form-item>

          <!--<el-col :span="4">-->
          <!--<div class="amount">-->
          <!--<i class="el-icon-circle-plus-outline"></i>-->
          <!--<i class="el-icon-remove-outline"></i>-->
          <!--</div>-->
          <!--</el-col>-->

          <el-row>
            <el-col :span="12">
              <el-form-item label="建筑年限">
                <el-select v-model="form.built_year" clearable>
                  <el-option v-for="(key,index) in 51" :label="key + 1970" :value="index + 1970"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋类型">
                <el-select v-model="form.houseType" clearable>
                  <el-option v-for="(key,index) in dict" :label="key.dictionary_name" :value="key.id"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="总栋数">
                <el-input type="number" v-model="form.allBuilding" placeholder="请输入总栋数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物业费">
                <el-input type="number" v-model="form.propertyFee" placeholder="金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="小区照片">
            <upLoad :ID="'address'" @getImg="villagePic"></upLoad>
          </el-form-item>
          <el-form-item label="周边配套">
            <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入配套情况"
                      v-model="form.configure"></el-input>
          </el-form-item>
          <el-form-item label="小区简介">
            <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入简介"
                      v-model="form.villageIntroduce"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button v-if="formList.status === '新增小区'" size="small" type="primary" @click="villageSave('save')">确&nbsp;定
        </el-button>
        <el-button v-if="formList.status === '修改小区'" size="small" type="primary" @click="villageSave('update')">修&nbsp;改</el-button>
      </div>
    </el-dialog>

    <MapSearch :FormVisible="mapVisible" @close="closeAddress"></MapSearch>
  </div>
</template>

<script>
  import MapSearch from '../../../common/mapSearch'
  import upLoad from '../../../common/UPLOAD.vue'

  export default {
    name: "add-village",
    components: {MapSearch, upLoad},
    props: ['module', 'formList', 'province', 'dict'],
    data() {
      return {
        urls: globalConfig.server,
        villageId: '',
        mapVisible: false,
        dialogVisible: false,
        form: {
          province: '',                 //小区位置
          city: '',                     //小区位置
          area: '',                     //小区位置
          region: '',                   //小区位置
          villageName: '',              //小区名称
          villageAddress: '',           //小区地址
          otherName: '',                //小区别名
          built_year: '',               //建筑年限
          houseType: '',                //房屋类型
          allBuilding: '',              //总栋数
          latitude: '',                 //纬度
          longitude: '',                //经度
          propertyFee: '',              //物业费
          addressId: [],                //小区照片
          configure: '',                //周边配套
          villageIntroduce: '',         //小区简介
        },
        cityList: [],
        areaList: [],
        regionList: [],
        yearValues: ['1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990'],
        houseValues: ['住宅', '公寓', '酒店公寓', '商住两用', '平方', '别墅', '其他'],
      }
    },

    watch: {
      formList(val) {
        this.villageId = val.id;
        this.form.province = val.province;
        if (val.province !== '') {
          this.chooseList('city', val.province);
          this.form.city = val.city;
        }
        if (val.city !== '') {
          this.chooseList('area', val.city);
          this.form.area = val.area;
        }
        if (val.area !== '') {
          this.chooseList('region', val.area);
          this.form.region = Number(val.region);
        }
        this.form.villageName = val.village_name;
        this.form.villageAddress = val.address;
        this.form.otherName = val.village_alias;
        this.form.latitude = val.latitude;
        this.form.longitude = val.longitude;
        this.form.built_year = val.built_year;
        this.form.houseType = val.house_type;
        this.form.allBuilding = val.total_buildings;
        this.form.propertyFee = val.property_fee;
        this.form.configure = val.peripheral_info;
        this.form.villageIntroduce = val.content;
      },
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.close_();
        }
      },
    },
    methods: {
      // 上传成功
      villagePic(val) {
        this.addressId = val[1];
        console.log(val)
      },

      choose(val, id) {
        if (val === 'city') {
          this.form.city = '';
          this.form.area = '';
          this.form.region = '';
          this.chooseList(val, id);
        }
        if (val === 'area') {
          this.form.area = '';
          this.form.region = '';
          this.chooseList(val, id);
        }
        if (val === 'region') {
          this.form.region = '';
          this.chooseList(val, id);
        }
      },

      chooseList(val, id) {
        if (val === 'city') {
          this.$http.get(this.urls + 'setting/others/city?city_parent=' + id).then((res) => {
            if (res.data.code === '100050') {
              this.cityList = res.data.data;
            }
          })
        }
        if (val === 'area') {
          this.$http.get(this.urls + 'setting/others/area?area_parent=' + id).then((res) => {
            if (res.data.code === '100060') {
              this.areaList = res.data.data;
            }
          })
        }
        if (val === 'region') {
          this.$http.get(this.urls + 'setting/others/region?region_parent=' + id).then((res) => {
            if (res.data.code === '100070') {
              this.regionList = res.data.data;
            }
          })
        }
      },

      openAddress() {
        this.mapVisible = true;
      },
      closeAddress(val) {
        this.mapVisible = false;
        if (val !== '') {
          let lat = val.location.split(',')[0];
          let long = val.location.split(',')[1];
          this.form.latitude = lat;
          this.form.longitude = long;
          this.form.villageName = val.name;
          this.form.villageAddress = val.address;
        }
      },
      villageSave(addr) {
        let type, urls;
        if (addr === 'save') {
          type = this.$http.post;
          urls = this.urls + 'setting/community/save';
        } else {
          type = this.$http.put;
          urls = this.urls + 'setting/community/update';
        }
        type(urls, {
          id: this.villageId,
          province: this.form.province,
          city: this.form.city,
          area: this.form.area,
          region: this.form.region,
          village_name: this.form.villageName,
          address: this.form.villageAddress,
          village_alias: this.form.otherName,
          latitude: this.form.latitude,
          longitude: this.form.longitude,
          built_year: this.form.built_year + 1,
          house_type: this.form.houseType,
          total_buildings: this.form.allBuilding,
          property_fee: this.form.propertyFee,
          house_pic: this.addressId,
          peripheral_info: this.form.configure,
          content: this.form.villageIntroduce,
        }).then((res) => {
          if (res.data.code === '10010' || res.data.code === '10030') {
            this.dialogVisible = false;
            this.$emit('addVillage');
            this.prompt(res.data.msg, 1);
          } else {
            this.prompt(res.data.msg, 2);
          }
        })
      },
      close_() {
        this.villageId = '';                     //小区id
        this.form.province = '';                 //小区位置
        this.form.city = '';                     //小区位置
        this.form.area = '';                     //小区位置
        this.form.region = '';                   //小区位置
        this.form.villageName = '';              //小区名称
        this.form.villageAddress = '';           //小区地址
        this.form.otherName = '';                //小区别名
        this.form.built_year = '';               //建筑年限
        this.form.houseType = '';                //房屋类型
        this.form.allBuilding = '';              //总栋数
        this.form.latitude = '';                 //纬度
        this.form.longitude = '';                //经度
        this.form.propertyFee = '';              //物业费
        this.form.addressId = [];                //小区照片
        this.form.configure = '';                //周边配套
        this.form.villageIntroduce = '';         //小区简介
        $('.imgItem').remove();
      },
      // ====================提示信息=================
      prompt(val, stu) {
        if (stu === 1) {
          this.$notify({
            title: '成功',
            message: val,
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: val,
            type: 'warning'
          });
        }
      },
    },
  }
</script>

<style lang="scss">
  #villageModule {
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          padding: 0;
          .modules {
            padding: 15px;
            max-height: 500px;
            overflow: auto;
          }
        }
      }
    }
    .amount {
      i {
        cursor: pointer;
        font-size: 22px;
        margin: 4px 6px 0;
      }
      i:first-of-type {
        margin-left: 12px;
      }
    }
  }


</style>
