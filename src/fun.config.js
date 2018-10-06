
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

    Vue.prototype.timestampToTime = function (timestamp) {
      let date =String(timestamp).length>10?new Date(timestamp): new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y+M+D+h+m+s;
    };
    Vue.prototype.timestampToDate = function (timestamp) {
      let date = String(timestamp).length>10? new Date(timestamp) : new Date(timestamp * 1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate();
      return Y+M+D;
    }
    Vue.prototype.addMoneySum = function (form) {
      let deposit = form.deposit_payed
      let front_money = form.front_money
      let rent_money = form.rent_money
      
      deposit ? deposit : 0
      front_money ? front_money : 0
      rent_money ? rent_money : 0

      form.money_sum = Number(deposit)+Number(front_money)+Number(rent_money)
      
      return form.money_sum;
    }
  }
}
