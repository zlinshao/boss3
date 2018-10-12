<template >
  <div id="wareHouseData">
    <!-- 图表展示 -->
    <div>
      <el-row :gutter="20" >
          <el-col :span="8" >
            <!-- 图表卡片 -->
            <chartCard></chartCard>
          </el-col>
        </el-row>
    </div>
    <!-- 筛选框 -->
    <div class="filterBox">
      <el-input
        class="inputFlt"
        placeholder="请输入查询指标"
        suffix-icon="el-icon-search"
        v-model="searchQuotaVal"
        >
      </el-input>
      <el-select placeholder="全部" class="selectFil" v-model="selectClassValue">
        <el-option
          v-for="item in classSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import chartCard from "./chartCard.vue"
export default {
  components:{chartCard},
  data(){
    return {
      searchQuotaVal:"",//输入框查询指标
      selectClassValue:"",//选择框选择类型
      classSelect:[{    //指标类型选择
        value: '选项0',
        label: '全部'
      }, {
        value: '选项1',
        label: '业务'
      }, {
        value: '选项2',
        label: '财务'
      }, {
        value: '选项3',
        label: '人力'
      }, {
        value: '选项4',
        label: '客服'
      }, {
        value: '选项5',
        label: '行政'
      }],
      
    }
  }
  
}
</script>
<style scoped lang="scss">
// 筛选框
.filterBox{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-10%,-60%);
  height: 100px;
  margin: 5px;
}

</style>
<style lang="scss">
#wareHouseData{
  position: relative;
  // 筛选框
  .filterBox{
    .selectFil{
      float:right;
      width: 120px;
      padding-right: 20px;
      input{
        border-radius:50px;
        height: 30px;
        line-height: 30px;
      }
      i{
        line-height: 30px;
      }
    }
    .inputFlt{
      float:right;
      width: 200px;
      input{
        border-radius:50px;
        height: 30px;
        line-height: 30px;
      }
      i{
        line-height: 30px;
      }
    }
  }
 
}
</style>
