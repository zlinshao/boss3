<template>
  <div class="modalFrame">
    <el-dialog
      title="选择部门"
      :visible.sync="departmentVisible"
      width="40%">
        <el-row :gutter="10">
          <el-col :span="14">
            <div class="search">
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="search">
              <div class="selectTitle">组织架构</div>
              <div class="selectButt">
                <el-button type="text">组织架构</el-button>
              </div>
              <div class="selectList">
                <div class="selectCheck">
                  <el-checkbox v-model="checked"></el-checkbox>
                  <div class="company">南京乐伽商业管理有限公司</div>
                </div>
                <div class="numbers">300人</div>
              </div>
            </div>

          </el-col>
        </el-row>
      <span slot="footer">
        <el-button  size="small" @click="closeFrame">关闭</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "department",
    props: ['module'],
    data () {
      return {
        state4: '',
        checked: false,
        departmentVisible: false,
      }
    },
    mounted(){

    },
    watch:{
      module(val){
        this.departmentVisible = val;
      },
      departmentVisible(val){
        if(!val){
          this.$emit('close');
        }
      }
    },
    computed:{

    },
    methods: {
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      handleSelect(item) {
        // console.log(item);
      },
      closeFrame(){
        this.departmentVisible = false;
      },
    }
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  .search {
    min-height: 400px;
    padding: 10px;
    border: 1px solid #cccccc;
    @include border_radius(5px);
  }
  .selectTitle {
    width: 100%;
    text-align: center;
    color: #797979;
    font-size: 16px;
  }
  .selectButt {
    width: 100%;
    text-align: left;
  }
  .selectList {
    @include flex;
    justify-content: space-between;
    .company {
      margin-left: 10px;
      cursor: pointer;
    }
    .selectCheck {
      @include flex;
      justify-content: left;
    }
  }
</style>
