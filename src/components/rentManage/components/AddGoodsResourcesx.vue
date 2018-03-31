<template>
  <div id="increaseGoods">
    <el-dialog title="增加物品" :visible.sync="increaseGoodsDialogVisible" width="28%">
      <div>
        <el-form size="mini" :model="form" label-width="80px">
          <el-row :key="index" v-for="(line,index) in linelist">
            <el-col :span="12">
              <el-form-item label="选择物品">
                <el-select v-model="form.hourse[index]" filterable placeholder="请选择物品">
                  <el-option v-for="item in houselist" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <span><i @click="addLine()" class="iconfont icon-zengjia"
                       style="margin-left: 20px;cursor: pointer;color: #6a8dfb;font-size:19px; line-height:30px;"></i></span>
              <span v-if="index !=0"><i @click="deletex(index)" class="iconfont icon-shibai"
                                        style="margin-left: 22px;cursor: pointer;color: #6a8dfb;font-size:22px; line-height:30px;"></i></span>
            </el-col>
            <el-col :span="6">
              <el-button size="small" type="primary" @click="openModalDialogx('addGoodsDialog')">增加物品</el-button>
            </el-col>

          </el-row>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
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
    props: ['addGoodsDialogx'],
    components: {
      AddGoodsResources
    },
    data() {
      return {
        increaseGoodsDialogVisible: false,
        urls: globalConfig.server,
        addGoodsDialog: false,
        addGoodsFlag: false,  //物品是否增加成功标识
        lenx: 7,
        linelist: [{}],
        form: {
          hourse: [],
        },

        houselist: []
      };
    },
    watch: {
      addGoodsDialogx(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if (!val) {
          this.$emit('close')
        }
      }
    },
    methods: {
      savex(){
        this.increaseGoodsDialogVisible = false;
        this.$emit('addgoodsx', this.form.hourse);
        this.linelist = [{}];
        this.form = {hourse: []}
      },
      openModalDialogx(){
        this.addGoodsDialog = true;
        this.goodsmore();
      },
      closeAddGoodsResources(){
        this.addGoodsDialog = false;
      },
      //物品设置成功
      addGoodsOk(val){
        if (val) {
          this.goodsmore()
        }

      },
      goodsmore(){
        //物品类型
        this.$http.get(this.urls + 'setting/dictionary/265').then((res) => {
          if (res.data.code === '30010') {
            this.houselist = res.data.data;
          }
        })
      },
      //增加行
      addLine(){
        this.linelist.push({});
      },
      //删除一行
      deletex(index){
        this.linelist.splice(index, 1);
        this.form.hourse.splice(index, 1);
      },
    },
    mounted(){

    }
  };
</script>
<style lang="scss" scoped="">

</style>
