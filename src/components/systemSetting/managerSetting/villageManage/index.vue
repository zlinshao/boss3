<template>
  <div @click="show=false" @contextmenu="closeMenu" id="community">
    <div class="highRanking">
      <div class="highSearch">
        <div class="managementBtn">
          <el-button type="primary" size="mini" :disabled="btnDisable" @click="openOrganizeModal">分配</el-button>
          <el-button type="primary" size="mini" :disabled="deletedBtn" @click="openVillage('修改小区')">编辑</el-button>
          <el-button type="primary" size="mini" @click="openDelete()" :disabled="deletedBtn">删除</el-button>
          <!-- <el-button type="primary" size="mini" :disabled="btnDisable" @click="mergeBtn" >合并</el-button> -->
        </div>
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="小区名称/地址/位置" v-model="form.keywords" @keyup.enter.native="search()" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openVillage('新增小区')"><i class="el-icon-plus"></i>&nbsp;新增小区</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">房屋类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.house_type" clearable>
                      <el-option v-for="(key,index) in dict" :label="key.dictionary_name" :value="key.id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">建造年限</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-form-item>
                      <el-select v-model="form.built_year" clearable>
                        <el-option v-for="(key,index) in 151" :label="key + 1969" :value="index + 1969" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">省份</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.province" clearable @change="choose('city',form.province)">
                      <el-option v-for="(item,index) in provinceList" :label="item.province_name" :value="item.province_id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">市</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.city" clearable @change="choose('area',form.city)">
                      <el-option v-for="(item,index) in cityList" :label="item.city_name" :value="item.city_id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">区/县</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.area" clearable @change="choose('region',form.area)">
                      <el-option v-for="(item,index) in areaList" :label="item.area_name" :value="item.area_id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">区域</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.region" clearable>
                      <el-option v-for="(item,index) in regionList" :label="item.region_name" :value="item.id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row> -->
          <div class="btnOperate">

            <el-button size="mini" type="primary" @click="search()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!-- <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="villageLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      style="width: 100%;"
      @row-contextmenu='houseMenu'
      @row-dblclick='dblMenu'>
      <el-table-column
        prop="village_name"
        label="小区名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="地域">
        <template slot-scope="scope">
            {{scope.row.province_name}}&nbsp;-&nbsp;{{scope.row.city_name}}
            &nbsp;-&nbsp;{{scope.row.area_name}}&nbsp;-&nbsp;{{scope.row.region_name}}
        </template>
      </el-table-column>
      <el-table-column
        prop="village_alias"
        label="产权地址">
      </el-table-column>
      <el-table-column
        prop="house_types"
        label="房屋类型">
      </el-table-column>
      <el-table-column
        prop="built_year"
        label="建造年限">
      </el-table-column>
      <el-table-column
        prop="total_buildings"
        label="房屋栋数">
      </el-table-column>
    </el-table> -->
    <!-- 新布局 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-table :data="cityDate" style="width: 100%" class="urban-division">
            <!-- <el-table-column prop="province" label="省">
              <template slot-scope="scope">
                <div v-for="(province, index) in newProvinceList" :key="index" @click="newChooseCity(province.province_id, index)" :class="{blue: ind1 === index}">{{province.province_name}}</div>
              </template>
            </el-table-column> -->
            <el-table-column prop="city" label="城市">
              <template slot-scope="scope">
                <div v-for="(city, index) in newCityList" :key="index" @click="newChooseCountry(city,city.city_id, index)"  :class="{blue: ind2 === index}">{{city.city_name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="country" label="区/县">
              <template slot-scope="scope">
                <div v-for="(country, index) in newCountryList" :key="index"  @click="newAreaChoose(country.area_id, index)"  :class="{blue: ind3 === index}">{{country.area_name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="area" label="区域">
              <template slot-scope="scope">
                <div v-for="(region, index) in newAreaList" :key="index" @click="newSreach(region.id, index)"  :class="{blue: ind4 === index}">{{region.region_name}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-table :data="tableData" :empty-text='emptyContent' v-loading="villageLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0)" style="width: 100%;" @row-contextmenu='houseMenu' @row-dblclick='dblMenu' @selection-change="handleSelectionChange">
            <transition name="fade">
              <el-table-column type="selection" width="55">
              </el-table-column>
            </transition>
            <el-table-column prop="village_name" label="小区名称">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="地域">
              <template slot-scope="scope">
                {{scope.row.province_name}}&nbsp;-&nbsp;{{scope.row.city_name}}
                &nbsp;-&nbsp;{{scope.row.area_name}}&nbsp;-&nbsp;{{scope.row.region_name}}
              </template>
            </el-table-column>
            <el-table-column prop="village_alias" label="产权地址">
            </el-table-column>
            <el-table-column prop="house_types" label="房屋类型">
            </el-table-column>
            <el-table-column prop="built_year" label="建造年限">
            </el-table-column>
            <el-table-column prop="total_buildings" label="房屋栋数">
            </el-table-column>
            <el-table-column prop="department" label="所属部门">
              <template slot-scope="scope">
                <span :class="{activeHeght: isHeight !== scope.row.id}">{{scope.row.department}}<span v-if="scope.row.department.split('，').length>3" style="color: #409eff;cursor: pointer;" @click="collapseShow(scope.row,scope.$index)" class="collapse">{{isHeight !== scope.row.id ? "全部" : "收起"}}</span></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="myData" :current-page="currentPage" :page-size="12" layout="total, prev, pager, next, jumper" :total="paging">
      </el-pagination>
    </div>
    <!--模态框-->
    <el-dialog title="合并小区" :close-on-click-modal="false" :visible.sync="mergeDialog" width="30%">
      <el-form size="mini" label-width="80px">
        <el-form-item label="小区名称" required>
          <el-input v-model="mergeName" @focus="villageDialog = true" placeholder="请选择小区" readonly></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mergeDialog = false">取 消</el-button>
        <el-button type="primary" @click="isConfirmMerge">确 定</el-button>
      </span>
    </el-dialog>

    <!--右键-->
    <!-- <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show" @clickOperate="clickEvent"></RightMenu> -->

    <VillageModule :module="addVisible" @close="closeVillage" :formList="formList" :province="provinceList" :dict="dict" @addVillage="search"></VillageModule>

    <VillageSearch :villageDialog="villageDialog" @close="getVillage"></VillageSearch> 

     <!-- 组织架构 -->
    <organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember" :depart="organization"></organization>
  </div>
</template>

<script>
import RightMenu from "../../../common/rightMenu.vue"; //右键
import VillageModule from "./villageModule";
import VillageSearch from "../../../common/villageSearch";
import { setTimeout, clearTimeout } from "timers";
import organization from "../../../common/organization"; //组织架构 

export default {
  name: "hello",
  components: { RightMenu, VillageModule, VillageSearch, organization },
  data() {
    return {
      distribution: false, // 分配框
      multipleSelection: [], //计数多选框
      btnDisable: true, // 分配按钮
      deletedBtn: true, // 删除按钮
      checkList: [],
      cityDate: [
       { 
          city: [],
          country: []
       }
      ],
      newProvinceList: [], // 省
      newCityList: [], // 市
      newCountryList: [], // 县区
      newAreaList: [], // 区域
      deletedId: "", // 删除ID
      organizationDialog: false,  // 组织架构
      length: 0,
      type: "",
      organizeVisible: false, // 组织架构
      communityArr: [],  // 小区数组
      distributionForm: {
        org_id: [],  // 部门ID
        community_id: [] // 小区ID
      },
      ind1: 0,
      ind2: 0,
      ind3: 0,
      ind4: 0,
      isHeight: false,  // 类名添加
      collapse: "全部", // 收起
      // provinceIdArr: [],
      organization: '',  // 组织架构
      follow_name: "",
      follow_id: "",
      urls: globalConfig.server,
      rightMenuX: 0,
      rightMenuY: 0,
      show: false,
      lists: [],

      dict: [],
      pitch: "",
      formList: {},
      currentPage: 1,
      paging: 0,

      isHigh: false,
      addVisible: false,
      mergeDialog: false,
      villageDialog: false,
      form: {
        pages: 1,
        house_type: "",
        built_year: "",
        keywords: "",
        province: "",
        city: "",
        area: "",
        region: "",
        a: "list"
      },
      tableData: [],

      provinceList: [],
      cityList: [],
      areaList: [],
      regionList: [],

      emptyContent: " ",
      villageLoading: false,
      mergeParams: { id: "" },
      mergeName: "",
      oldVillageName: ""
    };
  },
  mounted() {
    this.villageLoading = true;
    this.emptyContent = " ";
    this.$http.get(this.urls + "setting/others/province").then(res => {
      this.provinceList = res.data.data;
    });
    this.$http.get(this.urls + "setting/dictionary/10").then(res => {
      this.dict = res.data.data;
      if (this.$route.query.status === 1) {
        let term = this.$route.query.term;
        this.form = term;
        this.myData(term.pages);
        if (term.province !== "") {
          this.chooseList("city", term.province);
        }
        if (term.city !== "") {
          this.chooseList("area", term.city);
        }
        if (term.area !== "") {
          this.chooseList("region", term.area);
        }
      } else {
        this.myData(1);
      }
    });
  },
  methods: {
    handleSelectionChange(val) {
    //  只支持删除一个
      this.multipleSelection = val;
      // this.pitch = val[0].id;
      val.forEach((item, index) => {
        if(this.communityArr.indexOf(item.id) == -1) {
          this.communityArr.push(item.id)
        }
      })
      if(val.length == 1) {
        this.deletedBtn = false;
      } else {
        this.deletedBtn = true;
      }
      if (!this.multipleSelection.length) {
        this.btnDisable = true;
      } else {
        this.btnDisable = false;
      }
    },
    subordinate(val) {
      console.log(val);
    },
    distributionShow() {
      this.distribution = true;
    },
    distributionClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    myData(val) {
      this.villageLoading = true;
      this.emptyContent = " ";
      this.form.pages = val;
      this.$http
        .get(this.urls + "setting/community/", {
          params: this.form
        })
        .then(res => {
          this.villageLoading = false;
          if (res.data.code === "10000") {
            // this.currentPage = val;
            // this.tableData = res.data.data.list;
            let data = res.data.data.list;
            this.tableData = [];
            for (let i = 0; i < data.length; i++) {
              let list = {};
              let departStr = ""
              data[i].orgs.forEach((item, index) => {
                departStr += item.name + '，';
              })
              list.department = departStr.substring(0, departStr.length - 1);
              list.id = data[i].id;
              list.village_name = data[i].village_name;
              list.province_name = data[i].province.province_name;
              list.city_name = data[i].city.city_name;
              list.area_name = data[i].area.area_name;
              list.region_name = data[i].region.region_name;
              list.address = data[i].address;
              list.village_alias = data[i].village_alias
                ? data[i].village_alias
                : "暂无信息";
              list.house_types = data[i].house_types
                ? data[i].house_types
                : "暂无信息";
              list.built_year = data[i].built_year;
              list.total_buildings = data[i].total_buildings
                ? data[i].total_buildings
                : "暂无信息";
              this.tableData.push(list);
            }
            this.paging = res.data.data.count;
          } else {
            this.tableData = [];
            this.paging = 0;
            this.emptyContent = "暂无数据";
          }
        });
    },
    // 新的省搜索
    // newChooseProvince() {
    //   this.$http.get(this.urls + "setting/others/province").then(res => {
    //     if(res.data.code == "100040") {
    //       this.newProvinceList = res.data.data;
    //     }
    //     this.newProvinceList.forEach(item => {
    //       this.provinceIdArr.push(item.province_id);
    //       this.$http.get(this.urls + "setting/others/city?city_parent=" + item.province_id).then(res => {
    //         if(res.data.code == "100050") {
    //           res.data.data.forEach((data, key) => {
    //             if(data.city_name == "市辖区" || data.city_name == "县" || data.city_name == "市") {
    //               data.city_name = "重庆" + data.city_name;
    //             }
    //             this.newCityList.push(data)
    //           })
    //         }
    //       })
    //     })
    //   })
    // },
    // 新的市搜索
    newChooseCity(id, index) {
      this.ind1 = index;
      this.form.province = id;
      this.newCountryList = [];
      this.newAreaList = [];
      // let province_id = id || "320000";
      this.$http.get(this.urls + "setting/others/companyCity").then(res => {
        if(res.data.code == "100050") {
          this.newCityList = res.data.data;
        }
      })
    },
    // 新的区县搜索
    newChooseCountry(val,id, index) {
      console.log(val, "11111");
      this.organization = val.org_id
      this.ind2 = index;
      this.form.city = id;
      this.newCountryList = [];
      this.newAreaList = [];
      let city_id = id || "320100";
      this.$http.post(this.urls + "setting/others/companyArea", {area_parent: city_id}).then(res => {
        if(res.data.code == "100060") {
          this.newCountryList = res.data.data;
        }
      })
    },
    //  新的区域搜索
    newAreaChoose(id, index) {
      this.ind3 = index;
      this.form.area = id;
      let area_id = id || "320102";
      this.$http.get(this.urls + "setting/others/region?region_parent=" + area_id).then(res => {
        if(res.data.code == "100070") {
          this.newAreaList = res.data.data;
        }
      })
    },
    // 展示全部
    collapseShow(val,id) {
      this.isHeight = val.id;
    },
    // 搜索
    newSreach(id, index) {
      this.ind4 = index
      this.form.region = id;
      this.myData(1)
      this.isHigh = false;
    },
    // 所属部门
    getDepartment(id) {
      this.$http.get(this.urls + "distribution/community/" +  this.pitch).then(res => {
        console.log(res, "1111");
      })
    },
    // 合并
    mergeBtn() {
      this.mergeDialog = true;
    },
     //选人组件
    openOrganizeModal(id) {
      this.organizationDialog = true;
      this.type = "depart";
      this.length = 20;
    },
    selectMember(val) {
      this.type = "";
      this.length = "";
      this.distributionForm = {org_id: [], community_id: ""};
      val.forEach((item, index) => {
       this.distributionForm.org_id.push(item.id)
      });
      this.distributionForm.community_id = this.communityArr;
      this.$http.post(this.urls + "distribution/community", this.distributionForm).then(res => {
        if(res.data.code == "10000") {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          });
          this.myData(1);
        } else {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          });
        }
      })
    },
    // 清除
    emptyFollowPeople() {
      this.follow_id = "";
      // this.params.org_id = "";
      this.follow_name = "";
    },
     // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
    },
    choose(val, id) {
      if (val === "city") {
        this.form.city = "";
        this.form.area = "";
        this.form.region = "";
        this.chooseList(val, id);
      }
      if (val === "area") {
        this.form.area = "";
        this.form.region = "";
        this.chooseList(val, id);
      }
      if (val === "region") {
        this.form.region = "";
        this.chooseList(val, id);
      }
    },

    chooseList(val, id) {
      if (val === "city") {
        this.$http
          .get(this.urls + "setting/others/city?city_parent=" + id)
          .then(res => {
            if (res.data.code === "100050") {
              this.cityList = res.data.data;
            }
          });
      }
      if (val === "area") {
        this.$http
          .get(this.urls + "setting/others/area?area_parent=" + id)
          .then(res => {
            if (res.data.code === "100060") {
              this.areaList = res.data.data;
            }
          });
      }
      if (val === "region") {
        this.$http
          .get(this.urls + "setting/others/region?region_parent=" + id)
          .then(res => {
            if (res.data.code === "100070") {
              this.regionList = res.data.data;
            }
          });
      }
    },
    search() {
      this.myData(1);
      this.isHigh = false;
    },
    // 重置
    resetting() {
      this.form.pages = 1;
      this.form.house_type = "";
      this.form.built_year = "";
      this.form.keywords = "";
      this.form.province = "";
      this.form.city = "";
      this.form.area = "";
      this.form.region = "";
      this.isHigh = false;
      this.myData(1);
    },
    // 高级筛选
    highGrade() {
      this.isHigh = !this.isHigh;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    openVillage(val) {
      this.addVisible = true;
      if (val === "修改小区") {
        this.$http
          .get(this.urls + "setting/community/" + this.pitch)
          .then(res => {
            this.formList = res.data.data;
            this.formList.status = val;
          });
      } else {
        this.formList.status = val;
      }
    },
    closeVillage() {
      this.addVisible = false;
    },
    // 双击
    dblMenu(row) {
      this.$router.push({
        path: "/villageManage/villageDetail",
        query: { ids: row.id }
      });
    },

    // 右键
    houseMenu(row, event) {
      this.pitch = row.id;
      this.oldVillageName = row.village_name;
      this.lists = [
        {
          clickIndex: "revise",
          headIcon: "el-icon-edit-outline",
          label: "编辑"
        },
        {
          clickIndex: "delete",
          headIcon: "el-icon-circle-close-outline",
          label: "删除"
        },
        { clickIndex: "merge", headIcon: "el-icons-fa-magic", label: "合并" }
      ];
      this.contextMenuParam(event);
    },
    // 右键回调
    clickEvent(val) {
      if (val === "delete") {
        this.openDelete();
      } else if (val === "revise") {
        this.openVillage("修改小区");
      } else {
        this.mergeDialog = true;
      }
    },
    //关闭右键菜单
    closeMenu() {
      this.show = false;
    },
    //右键参数
    contextMenuParam(event) {
      let e = event || window.event;
      this.show = false;
      this.rightMenuX =
        e.clientX +
        document.documentElement.scrollLeft -
        document.documentElement.clientLeft;
      this.rightMenuY =
        e.clientY +
        document.documentElement.scrollTop -
        document.documentElement.clientTop;
      event.preventDefault();
      event.stopPropagation();
      this.$nextTick(() => {
        this.show = true;
      });
    },

    // 删除
    openDelete() {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(this.urls + "setting/community/delete/" + this.pitch)
            .then(res => {
              if (res.data.code === "10040") {
                this.$message({
                  type: "success",
                  message: res.data.msg + "!"
                });
                this.myData(this.form.pages);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg + "!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //*************************合并小区**************************
    getVillage(val) {
      this.villageDialog = false;
      if (val) {
        this.mergeName = val.village_name;
        this.mergeParams.id = val.id;
      }
    },
    isConfirmMerge() {
      let msg = `<div>
                      此操作将会将<b style="color: #e4393c">${
                        this.oldVillageName
                      }</b>合并到<b style="color: #e4393c">${
        this.mergeName
      }</b>,
                      <b style="color: #e4393c">${
                        this.oldVillageName
                      }</b>下的所有房屋以及合同将会转移到<b style="color: #e4393c">${
        this.mergeName
      }</b>下,是否继续?
                  </div>`;
      this.$confirm(msg, "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.confirmMerge();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消合并"
          });
        });
    },
    confirmMerge() {
      this.$http
        .put(
          globalConfig.server + "setting/community/merge/" + this.pitch,
          this.mergeParams
        )
        .then(res => {
          if (res.data.code === "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.mergeDialog = false;
            this.myData(1);
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    }
  },
  created() {
    // this.newChooseProvince();
    this.newChooseCity();
    this.getDepartment();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#community {
  .blue {
    color:  #409eff;
  }
  .activeHeght {
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    .collapse {
      position: absolute;
      bottom: 0;
      right: 0;
     
    }
  }
  .el-table .cell {
    position: relative;
  }
  .urban-division {
    // position: relative;
    // overflow: hidden;
    height: 710px;
    table:first-of-type {
      th {
        height: 37px;
        line-height: 37px;
        .cell {
          height: 37px;
          line-height: 37px;
        }
      }
    }
    table:last-of-type {
      height: 710px;
      th {
        padding: 12px;
      }
    .cell {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 110px;
    }
      }
  }
  .city {
    .el-table__body-wrapper {
      // display: none;
    }
  }
  .highSearch {
    position: relative;
    .managementBtn {
      position: absolute;
      top: 0;
      left: 27%;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
