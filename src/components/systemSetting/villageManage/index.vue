<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="小区名称/地址/位置" v-model="form.keywords" @keyup.enter.native="myData(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="myData(1)"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openVillage('add')"><i class="el-icon-plus"></i>&nbsp;新增小区</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">房屋类型{{form.house_type}}</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.house_type" clearable>
                      <el-option v-for="(key,index) in dict" :label="key.dictionary_name" :value="key.id"
                                 :key="index"></el-option>
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
                        <el-option v-for="(key,index) in 151" :label="key + 1969" :value="index + 1969"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">省份</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.province" clearable @change="choose('city',form.province)">
                      <el-option v-for="(item,index) in provinceList" :label="item.province_name"
                                 :value="item.province_id" :key="index"></el-option>
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
                      <el-option v-for="(item,index) in cityList" :label="item.city_name" :value="item.city_id"
                                 :key="index"></el-option>
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
                      <el-option v-for="(item,index) in areaList" :label="item.area_name" :value="item.area_id"
                                 :key="index"></el-option>
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
                      <el-option v-for="(item,index) in regionList" :label="item.region_name" :value="item.id"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">

            <el-button size="mini" type="primary" @click="search()">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-table
      :data="tableData"
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
        prop="village_alias"
        label="小区别名">
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
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="myData"
        :current-page="currentPage"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <VillageModule :module="addVisible" @close="closeVillage" :formList="formList"
                   :province="provinceList" :dict="dict"></VillageModule>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import VillageModule from './villageModule'

  export default {
    name: 'hello',
    components: {RightMenu, VillageModule},
    data() {
      return {
        urls: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        dict: [],
        pitch: '',
        formList: {},
        currentPage: 1,
        paging: 0,

        isHigh: false,
        addVisible: false,
        form: {
          pages: 1,
          house_type: '',
          built_year: '',
          keywords: '',
          province: '',
          city: '',
          area: '',
          region: '',
        },
        tableData: [],

        provinceList: [],
        cityList: [],
        areaList: [],
        regionList: [],
      }
    },
    mounted() {
      this.$http.get(this.urls + 'setting/dictionary/10').then((res) => {
        this.dict = res.data.data;
        if (this.$route.query.status === 1) {
          let term = this.$route.query.term;
          this.form = term;
          this.myData(term.pages);
          if (term.province !== '') {
            this.chooseList('city', term.province);
          }
          if (term.city !== '') {
            this.chooseList('area', term.city);
          }
          if (term.area !== '') {
            this.chooseList('region', term.area);
          }
        } else {
          this.myData(1);
        }
      });
      this.$http.get(this.urls + 'setting/others/province').then((res) => {
        this.provinceList = res.data.data;
      });
    },
    methods: {
      myData(val) {
        this.tableData = [];
        this.form.pages = val;
        this.$http.get(this.urls + 'setting/community/', {
          params: this.form,
        }).then((res) => {
          if (res.data.code === '10000') {
            this.currentPage = val;
            this.tableData = res.data.data.list;
            this.paging = res.data.data.count;
          } else {
            this.paging = 0;
          }
        })
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
      search() {
        this.myData(1);
        this.isHigh = false;
      },
      // 重置
      resetting() {
        this.form.pages = 1;
        this.form.house_type = '';
        this.form.built_year = '';
        this.form.keywords = '';
        this.form.province = '';
        this.form.city = '';
        this.form.area = '';
        this.form.region = '';
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
        if (val === 'revise') {
          this.$http('setting/community/' + this.pitch).then((res) => {
            if (res.data.code === '10020') {
              this.formList = res.data.data;
              this.formList.status = val;
            }
          });
        }
        if (val === 'add') {
          this.formList.status = val;
        }
      },
      closeVillage() {
        this.addVisible = false;
      },
      // 双击
      dblMenu(row) {
        this.$router.push({path: '/villageManage/villageDetail', query: {ids: row.id, term: this.form}});
      },

      // 右键
      houseMenu(row, event) {
        this.pitch = row.id;
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        } else {
          this.openVillage('revise');
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
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },

      // 删除
      openDelete() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('setting/community/delete/' + this.pitch).then((res) => {
            if (res.data.code === '10040') {
              this.$message({
                type: 'success',
                message: res.data.msg + '!'
              });
              this.myData(this.form.pages);
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg + '!'
              });
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #container {
    width: 100%;
    height: 400px;
  }
</style>
