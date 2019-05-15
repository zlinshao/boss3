<!--<template>-->
  <!--<div @click="show = false" @contextmenu="closeMenu">-->
    <!--<div class="highRanking">-->
      <!--<div class="highSearch">-->
        <!--<el-form :model="params" :inline="true" size="mini">-->
          <!--<el-form-item>-->
            <!--<el-input placeholder="请输入员工姓名" v-model="params.keywords" size="mini" @keyup.enter.native="search"-->
                      <!--clearable>-->
              <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="highRanking">-->
      <!--<div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">-->
        <!--<el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">-->
          <!--<div class="filterTitle">-->
            <!--<i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索-->
          <!--</div>-->
          <!--<el-row class="el_row_border">-->
            <!--<el-col :span="12">-->
              <!--<el-row>-->
                <!--<el-col :span="8">-->
                  <!--<div class="el_col_label">部门</div>-->
                <!--</el-col>-->
                <!--<el-col :span="16" class="el_col_option">-->
                  <!--<el-form-item>-->
                    <!--<el-input placeholder="请选择" @focus="openOrgan('org_id', 'depart')" v-model="organData.org_id"-->
                              <!--size="mini">-->
                      <!--<el-button slot="append" @click="emptyDepart('org_id')">清空</el-button>-->
                    <!--</el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<div class="btnOperate">-->
            <!--<el-button size="mini" type="primary" @click="search">搜索</el-button>-->
            <!--<el-button size="mini" type="primary" @click="resetting">重置</el-button>-->
            <!--<el-button size="mini" type="primary" @click="highGrade">取消</el-button>-->
          <!--</div>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div>-->
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--:empty-text='tableStatus'-->
        <!--v-loading="tableLoading"-->
        <!--element-loading-text="拼命加载中"-->
        <!--element-loading-spinner="el-icon-loading"-->
        <!--element-loading-background="rgba(255, 255, 255, 0)"-->
        <!--@cell-dblclick='dblClickTable'-->
        <!--@row-contextmenu='openContextMenu'-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="部门">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="departPosition">-->
              <!--<span v-for="(item,index) in scope.row.org">-->
                <!--<b v-if="index !== 0">,</b>-->
                <!--{{item.name}}-->
              <!--</span>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="职位">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="departPosition">-->
              <!--<span v-for="(item,index) in scope.row.position">-->
                <!--<b v-if="index !== 0">,</b>-->
                <!--{{item.name}}-->
              <!--</span>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="staff_extend.enroll"-->
          <!--label="入职时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="试用期">-->
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.staff_extend.try_out_time}}个月-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="staff_extend.expected_formal"-->
          <!--label="预计转正日期">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="phone"-->
          <!--label="手机号码">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="email"-->
          <!--label="个人邮箱">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="是否转正">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="primary" size="mini" @click="becomeFull(scope.row)">转正</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <!--<div class="block pages">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="params.page"-->
        <!--:page-sizes="[15, 20, 25, 30]"-->
        <!--:page-size="params.limit"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="totalNum">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <!--&lt;!&ndash;右键&ndash;&gt;-->
    <!--<RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"-->
               <!--@clickOperate="clickEvent"></RightMenu>-->
    <!--&lt;!&ndash;组织架构&ndash;&gt;-->
    <!--<Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"-->
                  <!--@close="closeOrgan" @selectMember="selectMember"></Organization>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import RightMenu from '../../../common/rightMenu.vue';//右键-->
  <!--import Organization from '../../../common/organization.vue';//组织架构-->
  <!--export default {-->
    <!--name: "index",-->
    <!--components: {RightMenu, Organization},-->
    <!--data() {-->
      <!--return {-->
        <!--url: globalConfig.server,-->
        <!--rightMenuX: 0,-->
        <!--rightMenuY: 0,-->
        <!--show: false,-->
        <!--lists: [],-->

        <!--isHigh: false,-->

        <!--organModule: false,-->
        <!--organizeType: '',-->
        <!--lengths: 0,-->
        <!--organDivision: '',          //组织架构字段名-->

        <!--tableStatus: ' ',-->
        <!--tableLoading: false,-->
        <!--totalNum: 0,-->
        <!--tableData: [],-->
        <!--params: {-->
          <!--limit: 12,-->
          <!--page: 1,-->
          <!--org_id: '',-->
          <!--keywords: '',-->
        <!--},-->
        <!--organData: {},-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.becomeFormal();-->
    <!--},-->
    <!--activated() {-->
    <!--},-->
    <!--watch: {},-->
    <!--computed: {},-->
    <!--methods: {-->
      <!--// 列表-->
      <!--becomeFormal(page) {-->
        <!--this.tableStatus = ' ';-->
        <!--this.tableLoading = true;-->
        <!--this.params.page = page || 1;-->
        <!--this.$http.get(this.url + 'hrm/User/turnPositiveList', {-->
          <!--params: this.params,-->
        <!--}).then(res => {-->
          <!--this.tableLoading = false;-->
          <!--if (res.data.code === '90000') {-->
            <!--this.tableData = res.data.data.data;-->
            <!--this.totalNum = res.data.data.count;-->
          <!--} else {-->
            <!--this.emptyList();-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--// 列表无数据-->
      <!--emptyList() {-->
        <!--this.totalNum = 0;-->
        <!--this.tableData = [];-->
        <!--this.tableStatus = '暂无数据';-->
        <!--return false;-->
      <!--},-->
      <!--// 转正-->
      <!--becomeFull(row) {-->
        <!--this.$confirm('是否转正员工 ' + row.name + ' 不可逆转操作，是否继续?', '提示', {-->
          <!--confirmButtonText: '确定',-->
          <!--cancelButtonText: '取消',-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--this.$http.put(this.url + 'hrm/User/affirm', {-->
            <!--id: row.id-->
          <!--}).then(res => {-->
            <!--if (res.data.success) {-->
              <!--this.prompt('success', res.data.msg);-->
              <!--this.becomeFormal(this.params.page);-->
            <!--} else {-->
              <!--this.prompt('warning', res.data.msg);-->
            <!--}-->
          <!--});-->
        <!--}).catch(() => {-->
        <!--});-->
      <!--},-->
      <!--// 搜索-->
      <!--search() {-->
        <!--this.isHigh = false;-->
        <!--this.becomeFormal();-->
      <!--},-->
      <!--// 高级-->
      <!--highGrade() {-->
        <!--this.isHigh = !this.isHigh;-->
      <!--},-->
      <!--// 重置-->
      <!--resetting() {-->
        <!--this.params = {-->
          <!--limit: 12,-->
          <!--page: 1,-->
          <!--org_id: '',-->
          <!--keywords: '',-->
        <!--};-->
        <!--this.organData = {};-->
      <!--},-->
      <!--// 分页-->
      <!--handleSizeChange(val) {-->
        <!--this.params.limit = val;-->
        <!--this.becomeFormal();-->
        <!--console.log(`每页 ${val} 条`);-->
      <!--},-->
      <!--handleCurrentChange(val) {-->
        <!--this.becomeFormal(val);-->
      <!--},-->
      <!--// 打开组织架构-->
      <!--openOrgan(val, type) {-->
        <!--this.organDivision = val;-->
        <!--this.organModule = true;-->
        <!--this.organizeType = type;-->
        <!--this.lengths = '';-->
      <!--},-->
      <!--// 清空部门-->
      <!--emptyDepart(val) {-->
        <!--this.params[val] = '';-->
        <!--this.organData[val] = '';-->
        <!--this.organData = Object.assign({}, this.organData);-->
      <!--},-->
      <!--// 关闭组织架构-->
      <!--closeOrgan() {-->
        <!--this.organDivision = '';-->
        <!--this.organModule = false;-->
        <!--this.organizeType = '';-->
        <!--this.lengths = 0;-->
      <!--},-->
      <!--// 确认部门-->
      <!--selectMember(val) {-->
        <!--let organ = this.organDivision;-->
        <!--this.params[organ] = val[0].id;-->
        <!--this.organData[organ] = val[0].name;-->
      <!--},-->
      <!--// 双击-->
      <!--dblClickTable() {-->

      <!--},-->
      <!--// 右键-->
      <!--openContextMenu(row) {-->
        <!--this.lists = [-->
          <!--{clickIndex: 'first', headIcon: 'el-icon-edit-outline', label: '编辑基本信息'},-->
        <!--];-->
        <!--this.contextParams();-->
      <!--},-->
      <!--// 右键回调-->
      <!--clickEvent(val) {-->
        <!--switch (val) {-->
          <!--case 'formal':-->
            <!--console.log(val);-->
            <!--break;-->
          <!--case 'transfer':-->
            <!--console.log(val);-->
            <!--break;-->
          <!--case 'dimission':-->
            <!--console.log(val);-->
            <!--break;-->
        <!--}-->
      <!--},-->
      <!--//关闭右键菜单-->
      <!--closeMenu() {-->
        <!--this.show = false;-->
      <!--},-->
      <!--//右键参数-->
      <!--contextParams() {-->
        <!--let e = event || window.event;let event = window.event;-->
        <!--this.show = false;-->
        <!--this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;-->
        <!--this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;-->
        <!--event.preventDefault();-->
        <!--event.stopPropagation();-->
        <!--this.$nextTick(() => {-->
          <!--this.show = true-->
        <!--})-->
      <!--},-->
    <!--},-->
  <!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->

<!--</style>-->
