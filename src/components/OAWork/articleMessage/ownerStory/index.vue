<template>
  <div>
    业主故事
    <el-button type="success" @click="publicArticle">发布文章</el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        moduleType: 'ownerStory',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    methods: {
      // 文章发布
      publicArticle() {
        this.$store.dispatch('deleteArticleId');
        this.$router.push({path: '/publicArticle', query: {moduleType: this.moduleType, from: 'publicArticleBtn'}});
        this.$store.dispatch('moduleType', this.moduleType);
      },
    },
  }
</script>

<style lang="scss">

</style>
