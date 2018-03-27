

document.body.addEventListener('DOMSubtreeModified',function (e) {
  if(document.getElementsByClassName('v-modal').length>0){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});
export default {
  install(Vue, options) {
    Vue.prototype.dictionary = function (data) {
      return new Promise((resolve, reject) => {
        this.$http.get(globalConfig.server + 'setting/dictionary/' +data).then( (res) => {
          if(res.data.code === '30010'){
            resolve(res.data)
          }
        })
      })
    };
  }
}
