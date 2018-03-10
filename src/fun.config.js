let address = 'http://test.v3.api.boss.lejias.cn/';
export default {
  zidian(val) {
    this.$http.get(address + 'setting/dictionary/' + val).then((res) => {

    })
  }
}
