<template>
  <div id="increaseGoods">
    <el-dialog title="收房交接单" :visible.sync="increaseGoodsDialogVisible" width="60%">
      <div class="scroll_bar">
        <div v-for="(houses,x) in houselist" :key="x">
          <span class="title">{{houses.dictionary_name}}</span>
          <div class="form_border">
            <el-form :model="form[x]" size="mini">
              <el-row>
                <el-col :span="6" :key="index" v-for="(val,index) in userList[x].goodsx">
                  <el-form-item label-width="80px" :label="val.dictionary_name">
                    <el-input v-model="form[x].addnum[index]" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="20px">
                    <a type="text" @click="openModalDialogx('addGoodsDialog',x)" class="el-icon-circle-plus addMore"></a>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label-width="80px" size="small" label="备注">
                  <el-input type="textarea" :rows="2"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="delieverysave">保 存</el-button>
      </span>
    </el-dialog>
    <AddGoodsResourcesx :addGoodsDialogx="addGoodsDialog" @close="closeAddGoodsResources"
                        @addgoodsx="addgoodsx"></AddGoodsResourcesx>

  </div>

</template>

<script>
  import AddGoodsResourcesx from '../components/AddGoodsResourcesx.vue' //增加物品页面

  export default {
    props: ['deliveryDialog', 'value'],
    components: {
      AddGoodsResourcesx
    },
    data() {
      return {
        increaseGoodsDialogVisible: false,
        urls: globalConfig.server,
        deliveryFlag: false,  //物流增加成功标识
        time: '',
        form: [],
        list: [],
        lenxx: 20,
        addGoodsDialog: false,
        userList: [],
        midlist: [],
        houselist: [],
        houselen: [],
        noth: ''  //点击的第几行
      };
    },
    watch: {
      deliveryDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if (!val) {
          this.$emit('close')
        }
      }
    },
    methods: {
      openModalDialogx(val, x){
        this.noth = x;
        console.log(val)
        this.addGoodsDialog = true;
      },
      closeAddGoodsResources(){
        this.addGoodsDialog = false;
      },

      //收房交接单保存
      delieverysave(){

        this.list = [];
        for (let x = 0; x < this.houselist.length; x++) {
          if (this.form[x].addnum.length > 0 && this.houselist[x].id) {
            for (let i = 0; i < this.form[x].addnum.length; i++) {
              if (parseInt(this.form[x].addnum[i])) {
                this.list.push({
                  "room": this.houselist[x].id,
                  "category": this.userList[x].goodsx[i].id,
                  "amount": this.form[x].addnum[i]
                });
              }
            }
          }
        }

        this.$http.post(this.urls + 'house/asset_handover', {
          house_id: 1,
          operate_time: this.time,
          content: this.list
        }).then((res) => {

          if (res.data.code == "20010") {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.allall = '';
            for (let i = 0; i < this.houselist.length; i++) {
              this.form[i].check = [];
              this.form[i].addgoods = [];
              this.form[i].addnum = [];
            }
            this.deliveryFlag = true;
            this.$emit('deliveryFlag', this.addGoodsFlag)
            this.increaseGoodsDialogVisible = false;
          }
          else {
            this.$notify.error({
              title: '错误',
              message: '操作失败'
            });
          }
        })

      },
      //物品设置成功
      addgoodsx(val){
        if (this.noth !== '') {
          let len = this.userList[this.noth].goodsx.length;
          if (val) {
            for (let k = 0; k < val.length; k++) {
              for (let i = 0; i < this.midlist.length; i++)
                if (val[k] == this.midlist[i].id) {
                  this.userList[this.noth].goodsx[len] = this.midlist[i]
                  len++;
                }
            }
          }
        }
      },
      //物品类型接口
      goodsmore(){
        //物品类型
        this.$http.get(this.urls + 'setting/dictionary/265').then((res) => {
          if (res.data.code === '30010') {
            this.midlist = res.data.data;
            let lengoods = this.value ? this.value : this.lenxx;
            for (let k = 0; k < lengoods; k++) {
              for (let i = 0; i < 10; i++) {
                this.userList[k].goodsx[i] = res.data.data[i]
              }
            }

          }

        })
      }
    },
    created: function () {
      this.goodsmore();

      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let day = date.getDay()
      let month = date.getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      for (let i = 0; i < 20; i++) {
        this.userList.push({"goodsx": []});
      }
      this.time = year + seperator1 + month + seperator1 + day;
      this.personal = JSON.parse(localStorage.getItem("personal"));
      //房间编号

      this.$http.get(this.urls + 'setting/dictionary/298').then((res) => {
        if (res.data.code === '30010') {
          this.houselist = res.data.data;
          this.houselen = this.houselist.length;
          for (let i = 0; i < this.houselist.length; i++) {
            this.form.push({"check": [], "addgoods": [], "addnum": []})
          }
        }
      })


    }
  };
</script>
<style lang="scss" scoped="">
  .addMore{
    font-size: 18px;
    color: #409EFF;
    cursor: pointer;
    &:hover{
      color: #6a8dfb;
    }
  }
</style>
