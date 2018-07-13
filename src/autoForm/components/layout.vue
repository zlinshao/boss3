<template>
  <div>
    <el-button class="item" @click="addLayout(1)">
      <span>一行一列</span>
    </el-button>
    <el-button class="item" @click="addLayout(2)">
      <span>一行二列</span>
    </el-button>
    <el-button class="item" @click="addLayout(3)">
      <span>一行三列</span>
    </el-button>
    <el-button class="item" @click="addLayout(4)">
      <span>一行四列</span>
    </el-button>
    <el-button class="item" @click="addLayout(6)">
      <span>一行六列</span>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "layout",
    methods:{
      addLayout(lay){
        this.$emit('addLay', lay);
      },
    }
  }
</script>

<style scoped lang="scss">
  .item{
    margin: 5px;
  }
</style>
