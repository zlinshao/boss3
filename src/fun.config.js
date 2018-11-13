document.body.addEventListener('DOMSubtreeModified', function (e) {
  if (document.getElementsByClassName('v-modal').length > 0) {
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
    // 字典
    Vue.prototype.dictionary = function (data, flag = 1) {
      return new Promise((resolve, reject) => {
        this.$http.get(globalConfig.server + 'setting/dictionary/' + data, {params: {status: flag}}).then((res) => {
          if (res.data.code === '30010') {
            resolve(res.data)
          }
        })
      })
    };
    // 数组拼接
    Vue.prototype.montage = function (arr) {
      arr = Array.from(new Set(arr));
      return arr.join(',');
    };
    Vue.prototype.$exportData = function (data) {
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'a';
      link.href = url;
      link.setAttribute('download', 'excel.xls');
      document.body.appendChild(link);
      link.click();
    };
    Vue.prototype.account_ids = function (data, dict) {
      let account = [];
      data.forEach((res, index) => {
        account.push('');
        dict.forEach(item => {
          if (res === item.bank_info) {
            account[index] = item.id;
          }
        })
      });
      return account;
    };
    Vue.prototype.timestampToTime = function (timestamp) {
      let date = String(timestamp).length > 10 ? new Date(timestamp) : new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    };
    Vue.prototype.timestampToDate = function (timestamp) {
      let date = String(timestamp).length > 10 ? new Date(timestamp) : new Date(timestamp * 1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate();
      return Y + M + D;
    };
    Vue.prototype.addMoneySum = function (form) {
      let deposit = form.deposit_payed;
      let front_money = form.front_money;
      let rent_money = form.rent_money;

      deposit ? deposit : 0;
      front_money ? front_money : 0;
      rent_money ? rent_money : 0;

      form.money_sum = Number(deposit) + Number(front_money) + Number(rent_money);

      return form.money_sum;
    };
    Vue.prototype.getChartDate = function (params) {
      let endDate = new Date();
      let startDate = new Date(endDate.getTime() - 3600 * 1000 * 24 * 30);
      let date = new Date(endDate.getTime() - 3600 * 1000 * 24);

      let startY = startDate.getFullYear();
      let endY = endDate.getFullYear();
      let dateY = date.getFullYear();

      let startM = startDate.getMonth() + 1;
      let endM = endDate.getMonth() + 1;
      let dateM = date.getMonth() + 1;

      let startD = startDate.getDate();
      let endD = endDate.getDate();
      let dateD = date.getDate();


      params.start_date = startY + '-' + startM + '-' + startD;
      params.end_date = endY + '-' + endM + '-' + endD;
      params.date = dateY + '-' + dateM + '-' + dateD;

      return params;
    };
    Vue.prototype.prompt = function (val, msg) {
      switch (val) {
        case 'success':
          this.$notify.success({
            title: '成功',
            duration: 2000,
            message: msg
          });
          break;
        case 'warning':
          this.$notify.warning({
            title: "警告",
            duration: 2000,
            message: msg,
          });
          break;
        case 'error':
          this.$notify.error({
            title: "错误",
            duration: 2000,
            message: msg,
          });
          break;
      }
    };
    Vue.prototype.getPics = function (url,process_id,callback) {
      this.$http.get(globalConfig.server + url + process_id).then(res=>{
        callback(res);
      })
    }
  }
}
