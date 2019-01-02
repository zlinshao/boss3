<template>
    <div id="landlordManage">

    </div>
</template>

<script>
    export default {
        name: "landlordManage",
      data() {
          return {
            url: globalConfig.finance_server
          }
      },
      mounted() {
          this.getLandLordList();
      },
      methods: {
        getLandLordList() {
          this.$http.get(this.url + 'customer/landlord/index').then(res => {
            console.log(res);
          })
        }
      }
    }
</script>

<style scoped>
  #landlordManage{

  }
</style>
