<template>
  <div>
    <el-dialog title="新增小区" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-form-item label="小区位置">
          <el-select v-model="form.city" clearable>
            <el-option label="江苏省" value="1"></el-option>
            <el-option label="浙江省" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="小区名称">
              <el-input @focus="openAddress" v-model="form.villageName" placeholder="请选择小区" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小区地址">
              <el-input v-model="form.villageAddress" placeholder="小区地址" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="小区别名">
              <el-input v-model="form.otherName" placeholder="请输入小区别名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="amount">
              <i class="el-icon-circle-plus-outline"></i>
              <i class="el-icon-remove-outline"></i>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑年限">
              <el-select v-model="form.markYear" clearable>
                <el-option label="建造年限" value=""></el-option>
                <el-option v-for="(key,index) in yearValues" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑年限">
              <el-select v-model="form.houseType" clearable>
                <el-option label="房屋类型" value=""></el-option>
                <el-option v-for="(key,index) in houseValues" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总栋数">
              <el-input type="number" v-model="form.allBuilding" placeholder="请输入总栋数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物业费">
              <el-input type="number" v-model="form.propertyFee" placeholder="金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="小区照片">
          <el-input v-model="form.addressId" :disabled="true"></el-input>
          <!--<Dropzone :id="'addr'" :url="'http://test.v2.api.boss.lejias.cn/picture/upload'"></Dropzone>-->
        </el-form-item>
        <el-form-item label="周边配套">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入配套情况" v-model="form.configure"></el-input>
        </el-form-item>
        <el-form-item label="小区简介">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入简介" v-model="form.villageIntroduce"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>

    <MapSearch :FormVisible="mapVisible" @close="closeAddress"></MapSearch>
  </div>
</template>

<script>
  import MapSearch from '../../common/mapSearch'
  import Dropzone from '../../common/dropzone'

  export default {
    name: "add-village",
    components: {MapSearch, Dropzone},
    props: ['module'],
    data() {
      return {
        mapVisible: false,
        dialogVisible: false,
        form: {
          city: '',
          villageName: '',
          villageAddress: '',
          otherName: '',
          markYear: '',
          houseType: '',
          allBuilding: '',
          propertyFee: '',
          addressId: '',
          configure: '',
          villageIntroduce: '',
        },
        yearValues: ['1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990', '1990'],
        houseValues: ['住宅', '公寓', '酒店公寓', '商住两用', '平方', '别墅', '其他'],
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
    },
    methods: {
      openAddress() {
        this.mapVisible = true;
      },
      closeAddress() {
        this.mapVisible = false;
      }
    },
  }
</script>

<style scoped lang="scss">
  .amount {
    i {
      cursor: pointer;
      font-size: 22px;
      margin: 4px 6px 0;
    }
    i:first-of-type {
      margin-left: 12px;
    }
  }
</style>
