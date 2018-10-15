<template>
<!-- 文本卡片 -->
    <div ref="chartId" class="textContent">
      <span>1,138.82<b>元</b></span>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        chartData:[]
      }
    },
    methods:{
      drawChart() {
      },
    },
    mounted () {
      this.drawChart()
    }
  }
</script>
<style scoped lang="scss">
.textContent {
    text-align: center;
    line-height: 260px;
    span {
      font-size: 50px;
    }
    b{
      font-size: 30px;
    }
}
</style>