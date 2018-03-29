document.body.addEventListener('DOMSubtreeModified', function (e) {
  if (document.getElementsByClassName('v-modal').length > 0) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});

export default {
  install(Vue, options) {
    Vue.prototype.dictionary = function (data) {
      let dict = [];
      this.$http.get(globalConfig.server + 'oa/portal/?dict_id=144').then((res) => {
        if(res.data.code === '80000'){
          dict = res.data.data.data;
        }
      })
    };
  }
}
