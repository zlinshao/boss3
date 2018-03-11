<template>
    <div>

      <img data-magnify="" data-caption="图片查看器"
           data-src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg"
           src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg" alt="">



      <img data-card="" src="http://imgstore.cdn.sogou.com/app/a/100540002/513711.jpg" alt="">
    </div>


</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img{
      width: 300px;
    }
</style>
