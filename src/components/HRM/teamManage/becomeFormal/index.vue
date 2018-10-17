<template>
  <div @click="show = false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入员工姓名" v-model="params.keywords" size="mini" @keyup.enter.native="search"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请选择" @focus="openOrgan('org_id', 'depart')" v-model="organData.org_id"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('org_id')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="search">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue';//右键
  import Organization from '../../../common/organization.vue';//组织架构
  export default {
    name: "index",
    components: {RightMenu, Organization},
    data() {
      return {
        url: globalConfig.server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableStatus: ' ',
        tableLoading: false,
        isHigh: false,
        organModule: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',          //字段名

        organData: {},
        params: {
          limit: 12,
          page: 1,
          org_id: '',
          keywords: '',
        }
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      becomeFormal() {
        this.$http.get(this.url + 'hrm/User/turnPositiveList', {
          params: this.params,
        })
      },
      // 搜索
      search() {
        this.isHigh = false;
        this.staffList(1);
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = {
          limit: 12,
          page: 1,
          org_id: '',
          keywords: '',
        };
        this.organData = {};
      },
      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = '';
      },
      // 清空部门
      emptyDepart(val) {
        this.params[val] = '';
        this.organData[val] = '';
        this.organData = Object.assign({}, this.organData);
      },
      // 关闭组织架构
      closeOrgan() {
        this.organDivision = '';
        this.organModule = false;
        this.organizeType = '';
        this.lengths = 0;
      },
      // 确认部门
      selectMember(val) {
        let organ = this.organDivision;
        this.params[organ] = val[0].id;
        this.organData[organ] = val[0].name;
      },
      // 双击
      dblClickTable() {

      },
      // 右键
      openContextMenu(row, event) {
        this.lists = [
          {clickIndex: 'first', headIcon: 'el-icon-edit-outline', label: '编辑基本信息'},
          {clickIndex: 'second', headIcon: 'el-icon-edit-outline', label: '编辑辅助信息'},
          {clickIndex: 'reviseRecord', headIcon: 'iconfont icon-xibaoguanli', label: '编辑奖惩记录'},
          {clickIndex: 'record', headIcon: 'iconfont icon-xibaoguanli', label: '新增奖惩记录'},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        switch (val) {
          case 'formal':
            console.log(val);
            break;
          case 'transfer':
            console.log(val);
            break;
          case 'dimission':
            console.log(val);
            break;
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
    },
  }
</script>

<style lang="scss" scoped>

</style>
