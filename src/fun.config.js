
document.body.addEventListener('DOMSubtreeModified',function (e) {
  if(document.getElementsByClassName('v-modal').length>0){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});

export default {
  install(Vue, options) {
    //获取个人信息
    Vue.prototype.getPersonalInfo = function () {
      this.$http.get(globalConfig.server + "special/special/loginInfo").then((res) => {
        localStorage.setItem('personal', JSON.stringify(res.data.data));
        globalConfig.personal = res.data.data.data;
      });
    };

    Vue.prototype.dictionary = function (data,flag) {
      return new Promise((resolve, reject) => {
        this.$http.get(globalConfig.server + 'setting/dictionary/' +data,{params:{status:flag}}).then( (res) => {
          if(res.data.code === '30010'){
            resolve(res.data)
          }
        })
      })
    };

    Vue.prototype.$exportData = function (data) {
      let url =  window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'a';
      link.href = url;
      link.setAttribute('download', 'excel.xls');
      document.body.appendChild(link);
      link.click();
    };
  }
}
