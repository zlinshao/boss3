<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="filter">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item>
          <el-select v-model="form.belongTo" size="mini" clearable>
            <el-option label="所有归属" value=""></el-option>
            <el-option v-for="(key,index) in belongValue" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.subjectType" size="mini" clearable>
            <el-option label="所有类型" value=""></el-option>
            <el-option v-for="(key,index) in typeValue" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyWords" placeholder="房屋地址/租房人">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openSubject"><i class="el-icon-plus"></i>&nbsp;新增科目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      width="100%"
      @row-contextmenu="houseMenu">
      <el-table-column
        label="归属"
        prop="name">
      </el-table-column>
      <el-table-column
        label="项目"
        prop="address">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="otherName">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="houseType">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

  <SubjectModule :FormVisible="addSubjectModule" @close="closeSubject"></SubjectModule>
  </div>
</template>

<script>
  import RightMenu from '../../common/contextMenu/rightMenu.vue'    //右键
  import SubjectModule from './subjectModule'
  export default {
    name: "index",
    components: {RightMenu,SubjectModule},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        currentPage: 1,

        addSubjectModule: false,
        form: {
          belongTo: '',
          subjectType: '',
          keyWords: '',
        },
        belongValue: ['收房', '租房'],
        typeValue: ['收入', '支出'],
        tableData: [
          {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            otherName: '发的沙发沙发沙发',
            houseType: '住宅',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            otherName: '发的沙发沙发沙发',
            houseType: '住宅',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            otherName: '发的沙发沙发沙发',
            houseType: '住宅',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            otherName: '广是广泛大概高手高手',
            houseType: '住宅',
          },
        ]
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      openSubject() {
        this.addSubjectModule = true;
      },
      closeSubject() {
        this.addSubjectModule = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          console.log(val);
          this.openDelete();
        } else {
          this.openSubject();
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
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  }
</script>

<style lang="scss">

</style>
