<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="增配时间" required>
                <el-date-picker v-model="value2" align="right" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品来源" required>
                <el-select v-model="form.come" placeholder="请选择物品来源">
                  <el-option v-for="item in forms" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="物品名称" required>
            <el-input type="textarea" v-model="allall" @click.native="openModalDialog('goodsConfigDialog')"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="原物品去向" required>
                <el-select v-model="form.gone" placeholder="请选择活动区域">
                  <el-option v-for="item in goodsgoing" :key="item.id" :label="item.dictionary_name"
                             :value="item.dictionary_name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savelast">保 存</el-button>
      </span>
    </el-dialog>
    <GoodsConfigResources :value="value2" :allall="toALL" :goodsConfigDialog="goodsConfigDialog" @close="closeGoodsConfigResources"
                          :events="demoEvents" @goodsconfig-changed="goodsconfigformchange"></GoodsConfigResources>
  </div>
</template>

<script>

  import GoodsConfigResources from '../components/GoodsConfigResources.vue' //物品增配页面
  export default {
    props: ['increaseGoodsDialog','collectHouseId'],
    components: {
      GoodsConfigResources
    },
    data() {
      return {
        increaseGoodsDialogVisible: false,
        goodsConfigDialog: false,     //物品增配
        demoEvents: [],
        allall: '',
        toALL:'',
        data: {},
        list: [],
        urls: globalConfig.server,
        houselist: [],
        goods: [],
        saveflag: true,  //保存校验标识
        goodsgoing: [],  //物品去向字典
        goddsname: [],
        personal: {},
        form: {
          come: '',
          time: '',
          gone: ''
        },
        forms: [],
        value2: '',
        success:true,
      };
    },
    watch: {
      increaseGoodsDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if (!val) {
          this.$emit('close')
        } else {
          this.getInfo()
        }
      }
    },
    methods: {
      getInfo(){

        this.personal = JSON.parse(localStorage.getItem("personal"));
        //物品来源
        this.$http.get(this.urls + 'setting/dictionary/319').then((res) => {
          if (res.data.code === '30010') {
            this.forms = res.data.data;
          }
        })
        //房间编号
        this.$http.get(this.urls + 'setting/dictionary/298').then((res) => {
          if (res.data.code === '30010') {
            this.houselist = res.data.data;
          }
        })

        //物品类型
        this.$http.get(this.urls + 'setting/dictionary/265').then((res) => {
          if (res.data.code === '30010') {
            this.goods = res.data.data;
          }
        })
        //物品去向
        this.$http.get(this.urls + 'setting/dictionary/323').then((res) => {

          if (res.data.code === '30010') {
            this.goodsgoing = res.data.data;
          }
        })
      },
      openModalDialog(){
        this.goodsConfigDialog = true;
        this.toALL= this.allall;
      },
      closeGoodsConfigResources(){
        this.goodsConfigDialog = false;
      },
      goodsconfigformchange(data){
        this.data = data;

        let len = this.goods.length;
        this.allall = '';
        for (let i = 0; i < data.good.length; i++) {
          for (let j = 0; j < len; j++) {
            if (data.good[i] == this.goods[j].id) {
              this.allall += "物品名称：" + this.goods[j].dictionary_name;
              this.allall += "，"
            }
          }
          this.allall += "物品单价：" + data.price[i] + "，" + "物品数量：" + data.num[i] + "；";

        }
      },
      //保存
      savelast(){
        if (this.data.good) {

          for (let i = 0; i < this.data.good.length; i++) {
            this.list.push({"room": this.data.house[i], "category": this.data.good[i], "amount": this.data.num[i]})

          }
        }
        this.saveflag = true;
        if (this.value2 == '' && this.saveflag == true) {
          this.saveflag = false;
          this.$notify({
            title: '警告',
            message: '增配时间不能为空',
            type: 'warning'
          });
        }
        if (this.form.come == '' && this.saveflag == true) {
          this.saveflag = false;
          this.$notify({
            title: '警告',
            message: '物品来源不能为空',
            type: 'warning'
          });
        }
        if (this.list == '' && this.saveflag == true) {
          this.saveflag = false;
          this.$notify({
            title: '警告',
            message: '物品名称不能为空',
            type: 'warning'
          });
        }
        if (this.form.gone == '' && this.saveflag == true) {
          this.saveflag = false;
          this.$notify({
            title: '警告',
            message: '原物品去向不能为空',
            type: 'warning'
          });
        }
        if (this.saveflag) {
          this.$http.post(this.urls + 'house/asset_in', {
            house_id: this.collectHouseId,
            operate_time: this.value2,
            source: this.form.come,
            ownership: 318,
            content: this.list,
            "dest": this.form.gone
          }).then((res) => {
            //this.$emit("success", this.success);
            if (res.data.code == "20010") {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              });
            }
            else {
              this.$notify.error({
                title: '错误',
                message: '操作失败'
              });
            }
            this.increaseGoodsDialogVisible = false;
            this.allall = '';
            this.value2 = '';
            this.form = {come: '', time: '', gone: ''}
            this.list = [];


          })
        }

      }
    },
    created: function () {

    }


  };
</script>
<style lang="scss" scoped="">

</style>
