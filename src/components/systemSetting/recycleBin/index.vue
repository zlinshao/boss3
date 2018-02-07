<template>
  <div id="recycleBin">
    <div class="topTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-table
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
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <div class="filter">
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
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <el-table
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
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">
          <div class="filter">
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
        </el-tab-pane>
      </el-tabs>
    </div>

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
        activeName: 'first',
        currentPage: 1,
        form: {
          address: '',
        },
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
      // tabs标签页
      handleClick(tab, event) {
        console.log(tab, event);
      },
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
