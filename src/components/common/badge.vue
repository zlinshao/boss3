<template>
  <div>

    <div class="badgeup" >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badgeup{
position: fixed;
top: 50%;
left: 50%;
transform:translate(-50%,-50%);
z-index: 999;
display: block;
width: 445px;
height: 446px;
margin-left:-30px;
background: url("../../assets/images/badge.png");
}
</style>
