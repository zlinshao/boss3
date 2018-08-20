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
          <el-form-item v-else="">
            <el-input placeholder="" @keyup.enter.native="search()" placeholder="请输入关键字"
                      v-model= "params_fourth.search" class="search_input" clearable>
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
                    <div class="el_col_label">提交时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                          v-model="params_first.addtime"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_first.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.dictionary_name" :key="index"></el-option>
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
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_first.state" clearable placeholder="请选择">
                        <el-option value="1" label="审核中">审核中</el-option>
                        <el-option value="2" label="已受理">已受理</el-option>
                        <el-option value="3" label="已失效">已失效</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_first.visitstatus" clearable placeholder="请选择">
                        <el-option value="0" label="未回访">未回访</el-option>
                        <el-option value="1" label="已回访">已回访</el-option>
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
                    <div class="el_col_label">提交时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                          v-model="params_second.addtime"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_second.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.dictionary_name" :key="index"></el-option>
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
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_second.state" clearable placeholder="请选择">
                        <el-option value="1" label="审核中">审核中</el-option>
                        <el-option value="2" label="已受理">已受理</el-option>
                        <el-option value="3" label="已失效">已失效</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_second.visitstatus" clearable placeholder="请选择">
                        <el-option value="0" label="未回访">未回访</el-option>
                        <el-option value="1" label="已回访">已回访</el-option>
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
                    <div class="el_col_label">提交时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                          v-model="params_third.addtime"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_third.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.dictionary_name" :key="index"></el-option>
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
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_third.state" clearable placeholder="请选择">
                        <el-option value="1" label="审核中">审核中</el-option>
                        <el-option value="2" label="已受理">已受理</el-option>
                        <el-option value="3" label="已失效">已失效</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_third.visitstatus" clearable placeholder="请选择">
                        <el-option value="0" label="未回访">未回访</el-option>
                        <el-option value="1" label="已回访">已回访</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div v-if="activeName === 'fourth'">
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">提交时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                          v-model="params_fourth.addtime"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">小区所在城市</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_fourth.city" clearable placeholder="请选择">
                        <el-option v-for="(val,index) in city_dic" :label="val.dictionary_name"
                                   :value="val.dictionary_name" :key="index"></el-option>
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
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_fourth.state" clearable placeholder="请选择">
                        <el-option value="1" label="审核中">审核中</el-option>
                        <el-option value="2" label="已受理">已受理</el-option>
                        <el-option value="3" label="已失效">已失效</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params_fourth.visitstatus" clearable placeholder="请选择">
                        <el-option value="0" label="未回访">未回访</el-option>
                        <el-option value="1" label="已回访">已回访</el-option>
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
          <el-tab-pane label="业主入驻" name="first">
            <OwnerEnter :params="params_first" :search="search_first"></OwnerEnter>
          </el-tab-pane>
          <el-tab-pane label="预约看房" name="second">
            <Preview :params="params_second" :search="search_second"></Preview>
          </el-tab-pane>
          <el-tab-pane label="预约租房" name="third">
            <PreRent :params="params_third" :search="search_third"></PreRent>
          </el-tab-pane>
          <el-tab-pane label="乐伽找房" name="fourth">
            <SearchHouse :params="params_fourth" :search="search_fourth"></SearchHouse>
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
  import OwnerEnter from './components/ownerEnter'
  import Preview from './components/previewManage'
  import PreRent from './components/prerentManage'
  import SearchHouse from './components/searchHouseManage'

  export default {
    name: 'hello',
    components: {Organization , OwnerEnter,Preview, PreRent, SearchHouse},
    data() {
      return {
        organizationDialog : false,
        type : '',
        length : '',
        totalNumbers : 0,
        activeName : 'first',
        isHigh : false,
        params_first :{
          page : 1,
          limit: 10,
          state : '',
          visitstatus : '',
          city : '',
          search : '',
          addtime : []
        },
        params_second:{
          page : 1,
          limit: 10,
          state : '',
          visitstatus : '',
          city : '',
          search : '',
          addtime : []
        },
        params_third :{
          page : 1,
          limit: 10,
          state : '',
          visitstatus : '',
          city : '',
          search : '',
          addtime : []
        },
        params_fourth :{
          page : 1,
          limit: 10,
          state : '',
          visitstatus : '',
          city : '',
          search : '',
          addtime : []
        },
        search_first : false,
        search_second : false,
        search_third : false,
        search_fourth : false,
        city_dic : [],
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
          case 'fourth':
            this.params_fourth.page = 1;
            this.search_fourth = !this.search_fourth;
            break;
        }
      },
      closeModal(){

      },
      selectMember(){

      },
      resetAll(){
        switch (this.activeName){
          case 'first':
            this.params_first.state = '';
            this.params_first.visitstatus = '';
            this.params_first.city = '';
            this.params_first.addtime = [];
            break;
          case 'second':
            this.params_second.state = '';
            this.params_second.visitstatus = '';
            this.params_second.city = '';
            this.params_second.addtime = [];
            break;
          case 'third':
            this.params_third.state = '';
            this.params_third.visitstatus = '';
            this.params_third.city = '';
            this.params_third.addtime = [];
            break;
          case 'fourth':
            this.params_fourth.state = '';
            this.params_fourth.visitstatus = '';
            this.params_fourth.city = '';
            this.params_fourth.addtime = [];
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
