<template>
  <div id="recycleBin">
    <div class="topTabs">
      <el-form :inline="true" size="mini" style="margin: 10px 0;">
        <el-button v-for="(key,index) in tabs" :class="{'btn': isActive === index}"
                   @click="onSubmit(index)" size="mini" :key="index">{{key}}
        </el-button>
      </el-form>
    </div>

    <div class="filter" v-if="isActive == 1">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item label="物业地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="物业地址">
          <el-select v-model="form.address" clearable>
            <el-option v-for="(key,index) in options" :label="key.label" :value="key.label" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-if="isActive == 0"
      :data="tableData0"
      width="100%">
      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="模块"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-if="isActive == 1"
      :data="tableData1"
      width="100%">
      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="模块"
        prop="module">
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
  </div>
</template>

<script>
  export default {
    name: 'recycle-bin',
    data() {
      return {
        currentPage: 1,
        form: {
          address: '',
        },
        tabs: ['超小按钮', '超小按钮', '超小按钮', '超小按钮', '超小按钮', '超小按钮', '超小按钮', '超小按钮',],
        isActive: 0,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项52',
          label: '北京烤鸭'
        }],
        tableData0: [
          {
            id: 1,
            describe: '1发挥到了萨菲航空斯大林饭卡上的',
            module: '1Manger',
          },
        ],
        tableData1: [
          {
            id: 2,
            describe: '2发挥到了萨菲航空斯大林饭卡上的',
            module: '2Manger',
          },
        ],
      }
    },
    methods: {
      onSubmit(val) {
        this.isActive = val;
        if (val === 0) {

        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #recycleBin {

  }
</style>
