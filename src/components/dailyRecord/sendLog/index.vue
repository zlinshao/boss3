<template>
  <div>
    <div class="tabs">
      <div>选择模板</div>
      <div style="margin: 10px 0;">
        <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                   v-for="(key,index) in buttonVal" :key="index">{{key}}
        </el-button>
      </div>
    </div>

    <div class="sendLog">
      <div class="sendTitle">今日完成工作</div>
      <el-input type="textarea" placeholder="请输入文字"></el-input>
    </div>
    <div class="sendLog">
      <div class="sendTitle">未完成工作</div>
      <el-input type="textarea" placeholder="请输入文字"></el-input>
    </div>
    <div class="sendLog">
      <div class="sendTitle">需协调工作</div>
      <el-input type="textarea" placeholder="请输入文字"></el-input>
    </div>
    <div class="sendLog">
      <div class="sendTitle">备注</div>
      <el-input type="textarea" placeholder="请输入文字"></el-input>
    </div>
    <div class="sendLog">
      <div class="sendTitle">增加照片</div>

    </div>
    <div class="sendLog">
      <div class="sendTitle">发送给</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        buttonVal: ['日报', '周报', '月报', '业绩日报'],
        active: 0,
      }
    },
    methods:{
      // 按钮切换
      tagClick(val) {
        this.active = val;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .tabs {
    padding: 0 10px;
    div {
      button + button {
        margin-left: 10px;
      }
    }
    .primary {
      background: #409EFF;
      border-color: #409EFF;
      color: #ffffff;
    }
  }
  .sendLog {
    div.sendTitle {
      margin: 18px 0 6px;
    }
  }
</style>
