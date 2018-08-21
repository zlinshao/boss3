<template>
  <div id="applicationManage">
    <div class="highRanking">
      <div class="tabsSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item v-if="activeName === 'first'">
            <el-input placeholder="" @keyup.enter.native="search()" placeholder="请输入关键字"
                      v-model= "params_first.search" class="search_input" clearable>
              <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-else-if="activeName === 'second'">
            <el-input placeholder="" @keyup.enter.native="search()" placeholder="请输入关键字"
                      v-model= "params_second.search" class="search_input" clearable>
              <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-else-if="activeName === 'third'">
            <el-input placeholder="" @keyup.enter.native="search()" placeholder="请输入关键字"
                      v-model= "params_third.search" class="search_input" clearable>
              <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <div v-if="activeName === 'first'">
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_first.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.variable.city_id" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">房屋状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_first.status" clearable placeholder="请选择">
                        <el-option value="1" label="未添加">未添加</el-option>
                        <el-option value="2" label="已上线">已上线</el-option>
                        <el-option value="3" label="已下架">已下架</el-option>
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
                    <div class="el_col_label">装修状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable placeholder="请选择" v-model="params_first.decoration" value="">
                        <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-if="activeName === 'second'">
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_second.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.variable.city_id" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">装修状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable placeholder="请选择" v-model="params_second.decoration" value="">
                        <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-if="activeName === 'third'">
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_third.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.variable.city_id" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">装修状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable placeholder="请选择" v-model="params_third.decoration" value="">
                        <el-option v-for="item in decorate_dic" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="btnOperate">
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
            <el-button type="primary" size="mini" @click="resetAll">重置</el-button>
            <el-button type="primary" size="mini" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部房源" name="first">
            <WholeHouse v-if="activeName === 'first'" :params="params_first" :search="search_first"></WholeHouse>
          </el-tab-pane>
          <el-tab-pane label="线上房源" name="second">
            <OnlineHouse v-if="activeName === 'second'" :params="params_second" :search="search_second"></OnlineHouse>
          </el-tab-pane>
          <el-tab-pane label="下架房源" name="third">
            <UnderHouse v-if="activeName === 'third'" :params="params_third" :search="search_third"></UnderHouse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="type" :length="length"
                  @close="closeModal" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../common/organization.vue';
  import WholeHouse from './components/wholeHouse'
  import OnlineHouse from './components/onlineHouse'
  import UnderHouse from './components/underHouse'

  export default {
    name: 'hello',
    components: {Organization ,WholeHouse ,OnlineHouse,UnderHouse},
    data() {
      return {
        organizationDialog : false,
        type : '',
        length : '',
        totalNumbers : 0,
        activeName : 'first',
        isHigh : false,
        params_first :{
          page:1,
          limit:10,
          search :'',
          status :'',
          city : '',
          decoration : '',
        },
        params_second:{
          page:1,
          limit:10,
          status :'2',
          city : '',
          search : '',
          decoration : '',
        },
        params_third :{
          page:1,
          limit:10,
          search :'',
          status :'3',
          city : '',
          decoration : '',
        },
        search_first : false,
        search_second : false,
        search_third : false,
        city_dic : [],
        decorate_dic : [],
      }
    },
    mounted() {
      this.getDictionary();
    },
    watch: {

    },
    methods: {
      //获取字典
      getDictionary(){
        this.dictionary(306, 1).then((res) => {
          this.city_dic = res.data;
        });
        this.dictionary(404,1).then((res) => {this.decorate_dic = res.data});
      },
      handleSizeChange(val){},
      handleCurrentChange(val){},
      search(){
        this.isHigh = false;
        switch (this.activeName){
          case 'first':
            this.params_first.page = 1;
            this.search_first = !this.search_first;
            break;
          case 'second':
            this.params_second.page = 1;
            this.search_second = !this.search_second;
            break;
          case 'third':
            this.params_third.page = 1;
            this.search_third = !this.search_third;
            break;
        }
      },
      closeModal(){},
      selectMember(){

      },
      highSearch(){

      },
      resetAll(){
        switch (this.activeName){
          case 'first':
            this.params_first.status = '';
            this.params_first.city = '';
            this.params_first.decoration = '';
            break;
          case 'second':
            this.params_second.city = '';
            this.params_second.status = 2;
            break;
          case 'third':
            this.params_third.city = '';
            this.params_third.status = 3;
            break;
        }
      },
      highGrade(){
        this.isHigh = !this.isHigh;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">


</style>
