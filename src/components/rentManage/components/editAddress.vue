<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="修改地址" :visible.sync="editAddressDialogVisible" width="30%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-form-item label="房屋地址" required="">
            <el-input v-model="house_address" @focus="houseDialog = true" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editAddressDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <AddressModal :houseDialog="houseDialog" @close="closeAddressModal"></AddressModal>
  </div>
</template>

<script>
  import AddressModal from '../../common/houseSearch.vue'
  export default {
    props:['editAddressDialog','rentContractId','collectHouseId','houseAddress'],
    components:{AddressModal},
    data() {
      return {
        editAddressDialogVisible:false,
        params:{
          house_id : '',
        },
        house_address : '',
        houseDialog : false,
      };
    },
    watch:{
      editAddressDialog(val){
        this.editAddressDialogVisible = val
      },
      editAddressDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
        }
      },
      houseAddress(val){
        this.house_address = val;
      },
      collectHouseId(val){
        this.params.house_id = val;
      }
    },
    mounted(){
    },
    methods:{
      closeAddressModal(val){
        this.houseDialog = false;
        console.log(val)
        if(val){
          this.house_address = val.name;
          this.params.house_id = val.id;
        }
      },
      //确认提交
      confirmAdd(){
        this.$http.put(globalConfig.server + 'lease/rent/house/'+this.rentContractId,this.params).then((res)=>{
          if(res.data.code === '61110'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.$emit('close','updateRent');
            this.editAddressDialogVisible = false;
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },

    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp{

  }

</style>
