<template>
  <div @click="show=false" @contextmenu="closeMenu" id="customerManage">
    <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="params.search" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
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
                  <div class="el_col_label">支付方式</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.payWay" clearable>
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="银行卡" value="1"></el-option>
                      <el-option label="支付宝" value="2"></el-option>
                      <el-option label="微信" value="3"></el-option>
                      <el-option label="现金" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="房东管理" name="first">
        <LandLordManage></LandLordManage>
      </el-tab-pane>
      <el-tab-pane label="租客管理" name="second">租客管理</el-tab-pane>
    </el-tabs>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'               //右键
  import LandLordManage from './landlordManage.vue';

  export default {
    name: "index",
    components: { RightMenu , LandLordManage },
    data() {
      return {
        url: globalConfig.server,

        //右击菜单
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        //房东
        params: {
          search: '',
          payWay: '',
        },
        //高级
        isHigh: false,

        activeName: 'first'
      }
    },
    mounted() {

    },
    methods: {
      handleTabClick(val) {
        this.activeName = val.name;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {

      },
      // 右键
      customerMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
          {clickIndex: 'pendTenant', headIcon: 'iconfont icon-fangdongtuifang', label: '转为待处理项',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        }
        if (val === 'revise') {
          this.openAccount();
        }
        if (val === 'pendTenant') {
          this.pendTenant();
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      // 转为待处理项
      pendTenant(){
        this.$confirm('此操作将转为待处理项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="scss">
  #customerManage{

  }
</style>
