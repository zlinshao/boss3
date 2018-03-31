<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="75%" style="min-width:1110px;">
      <div class="goodsall">
        <span class="topmassage">物品增配（点击下方按钮切换添加模式）</span>
        <el-button type="primary" @click="openModalDialogx('addGoodsDialog')">物品设置</el-button>
        <div class="goodtable">
          <el-form :model="form" style="width: 100%">
            <el-row>
              <el-col :span="4">
                增加日期
              </el-col>
              <el-col :span="8">
                {{value}}
              </el-col>
              <el-col :span="4">
                增加人
              </el-col>
              <el-col :span="8">
                {{personal.name}}
              </el-col>
            </el-row>

          </el-form>
          <el-table
            :data="tableData"
            border
            height="304"
            style="width: 100%">
            <el-table-column label="物品来源">
              <template slot-scope="scope">
                <el-select v-model="form.comeform[scope.$index]" placeholder="请选择物品来源">
                  <el-option v-for="item in forms" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="物品位置">
              <template slot-scope="scope">
                <el-select v-model="form.house[scope.$index]" placeholder="请选择物品位置">
                  <el-option v-for="item in houselist" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="物品名称">
              <template slot-scope="scope">
                <el-select v-model="form.good[scope.$index]" placeholder="请选择物品名称">
                  <el-option v-for="item in goods" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="单价（元）">
              <template slot-scope="scope">
                <el-input v-model="form.price[scope.$index]" v-on:input="pricechange(scope.$index)"
                          placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input v-model="form.num[scope.$index]" v-on:input="numchange(scope.$index)"
                          placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column label="总价（元）">
              <template slot-scope="scope">
                <el-input v-model="form.sum[scope.$index]"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80px">
              <template slot-scope="scope">
                <i @click="deletex(scope.$index)" class="iconfont icon-shibai"
                   style="color: #6a8dfb;font-size:27px;line-height:34px; margin-left:12px;cursor: pointer;"></i>
              </template>
            </el-table-column>

          </el-table>
          <span class="goodsCount">
  <i @click="addone" class="iconfont icon-zengjia"
     style="color: #6a8dfb;font-size:30px; line-height:44px;cursor: pointer;"></i> </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="savex">保 存</el-button>
      </span>

    </el-dialog>
    <AddGoodsResources :addGoodsDialog="addGoodsDialog" @close="closeAddGoodsResources"
                       @addGoodsOk="addGoodsOk"></AddGoodsResources>
  </div>
</template>

<script>
  import AddGoodsResources from '../components/AddGoodsResources.vue' //增加物品页面
  export default {
    props: ['goodsConfigDialog', 'value'],
    components: {
      AddGoodsResources
    },
    data() {
      return {
        increaseGoodsDialogVisible: false,
        form: {
          comeform: [],
          house: [],
          good: [],
          price: [],
          num: [],
          sum: []
        },

        index: -1,
        sums: 0,
        formlen: 1,
        configflag: true,  //物品增配标识
        urls: globalConfig.server,
        addGoodsDialog: false,
        time: '',
        houselist: [], //物品位置
        forms: [],  //物品来源
        goods: [],   //物品名称
        tableData: [{}],
        personal: {},
      };
    },
    watch: {
      value(val){
        console.log(val);
      },
      goodsConfigDialog(val){
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
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let day = date.getDay()
        let month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }

        this.time = year + seperator1 + month + seperator1 + day;

        this.personal = JSON.parse(localStorage.getItem("personal"));
        //房间编号
        this.$http.get(this.urls + 'setting/dictionary/298').then((res) => {
          if (res.data.code === '30010') {
            this.houselist = res.data.data;
          }
        })
        //物品来源
        this.$http.get(this.urls + 'setting/dictionary/319').then((res) => {
          if (res.data.code === '30010') {
            this.forms = res.data.data;
          }
        })
        this.goodsmore();
      },
      openModalDialogx(){
        this.addGoodsDialog = true;
      },
      closeAddGoodsResources(){
        this.addGoodsDialog = false;
      },
      //改变价格
      pricechange(index){
        this.index = index;
        if (this.form.num[index] * this.form.price[index]) {
          this.form.sum[index] = this.form.num[index] * this.form.price[index];
        }
        else {
          this.form.sum[index] = 0
        }
      },
      //改变数量
      numchange(index){
        this.index = index;
        if (this.form.num[index] * this.form.price[index]) {
          this.form.sum[index] = this.form.num[index] * this.form.price[index];
        }
        else {
          this.form.sum[index] = 0
        }
      },
      //删除一行
      deletex(index){
        this.tableData.splice(index, 1);
        this.form.comeform.splice(index, 1);
        this.form.house.splice(index, 1);
        this.form.good.splice(index, 1);
        this.form.price.splice(index, 1);
        this.form.num.splice(index, 1);
        this.form.sum.splice(index, 1);
        this.formlen--;
      },
      //增加一行
      addone(){

        this.configflag = true;
        this.validate();
        if (this.configflag) {
          this.formlen++;
          this.tableData.push({});
        }
      },
      savex(){
        this.configflag = true;
        if (this.formlen == 0) {
          this.configflag = false;
          this.$notify({
            title: '警告',
            message: '未增配任何物品',
            type: 'warning'
          });
        }
        {
          this.validate();
        }


        if (this.configflag) {
          this.$notify({
            title: '成功',
            message: '物品增配完成',
            type: 'success'
          });
          this.increaseGoodsDialogVisible = false;
          this.$emit('goodsconfig-changed', this.form)
        }
      },
      //校验信息 house,good,price,num
      validate(){
        for (let i = 0; i <= this.formlen - 1; i++) {
          if (!this.form.house[i] && this.configflag == true) {
            this.configflag = false;
            this.$notify({
              title: '警告',
              message: '物品位置为必选选项',
              type: 'warning'
            });
          }
          if (!this.form.good[i] && this.configflag == true) {
            this.configflag = false;
            this.$notify({
              title: '警告',
              message: '物品名称为必选选项',
              type: 'warning'
            });
          }
          if (!this.form.price[i] && this.configflag == true) {
            this.configflag = false;
            this.$notify({
              title: '警告',
              message: '物品单价为必选选项',
              type: 'warning'
            });
          }
          if (!this.form.num[i] && this.configflag == true) {
            this.configflag = false;
            this.$notify({
              title: '警告',
              message: '物品数量为必选选项',
              type: 'warning'
            });
          }
        }
      },
      //合计
      getSummaries(param) {

        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      //物品设置成功
      addGoodsOk(val){

        if (val) {
          this.goodsmore()
        }

      },
      //物品类型接口
      goodsmore(){
        //物品类型
        this.$http.get(this.urls + 'setting/dictionary/265').then((res) => {
          if (res.data.code === '30010') {
            this.goods = res.data.data;
          }
        })
      }
    },
    created: function () {

    },
    computed: {}

  };
</script>
<style lang="scss" scoped="">
  .goodsall {
    height: 500px;
    margin: 10px auto 0;
    border: 1px #ccc solid;
    position: relative;
  }

  .goodsall .topmassage {
    width: 304px;
    height: 32px;
    line-height: 32px;
    color: #409EFF;
    font-size: 16px;
    display: block;
    position: absolute;
    top: -16px;
    left: 50px;
    text-indent: 10px;
    background: #fff;
  }

  .goodsall .el-button--primary {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .goodsall .el-col-8, .goodsall .el-col-4 {
    margin: 0;
    border: 1px #ebeef5 solid;
    text-align: center;
    line-height: 40px;
  }

  .goodsall .goodtable {
    width: 96%;
    height: 345px;
    position: absolute;
    left: 25px;
    top: 70px;
  }

  .goodsall .is-leaf {
    background: #fff !important;
  }

  .goodsall .goodsCount {

    height: 42px;
    font-size: 16px;
    line-height: 42px;
    text-align: center;
    display: block;
    border: 1px #ebeef5 solid;
    border-top: 0;
  }


</style>
