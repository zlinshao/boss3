<template>
  <div>
        <el-form size="mini" >
          <el-row>
            
            <!-- <el-form-item>
              <el-col :span="2" style="color:#409EFF">城市编号</el-col>
              <el-col :span="2" v-for="val in cityList" :key="val.id">{{val.dictionary_name}}&nbsp;&nbsp;{{val.variable.city_code}}</el-col>
              <el-col :span="2">
                <el-button size="mini" type="primary" @click="OpenCityInfo()">编辑</el-button>
              </el-col>
            </el-form-item>      -->
          </el-row>
          <el-row>
            <el-form-item >
              <el-col :span="2" style="color:#409EFF;">总合同数</el-col>
              <el-col :span="10"><el-col v-for="val in consractList" :key="val.id"><el-col :span="2">{{val.city_name}}</el-col><el-col :span="6">总合同数（收）：{{val.collect_sum}}</el-col><el-col :span="4">（租）：{{val.rent_sum}} ；</el-col><el-col :span="6">  剩余合同数（收）：{{val.collect_remain}}</el-col><el-col :span="4">（租）：{{val.rent_remain}}</el-col></el-col></el-col>
              <el-col :span="2">
                <el-button size="mini" @click="contractInfo()" type="primary">编辑</el-button>
              </el-col>
            </el-form-item>  
          </el-row>
          <el-row>
            <el-col :span="2" style="color:#409EFF">总合同领取上限</el-col>
            <el-col :span="2"><el-button size="mini" @click="maxcontractInfo()" type="primary">编辑</el-button></el-col>
          </el-row>
        </el-form>
  <!-- <CityInfo :cityInfoDialog="cityInfoDialog" :ToCityList="ToCityList" @newAddBack="newAddBack" @close="cityInfoDialog = false"></CityInfo> -->
  <contractInfo :contractInfoDialog="contractInfoDialog" :ToCityList="cityList" @contratcadd="contratcadd"  @close="contractInfoDialog = false"></contractInfo>       
  <MaxContractInfo :maxContractInfoDialog="maxContractInfoDialog" :ToCityList="cityList"   @close="maxContractInfoDialog = false"></MaxContractInfo>  
  </div>
</template>

<script>
  // import CityInfo from "./CityInfo.vue";
  import contractInfo from "./contractInfo.vue";
  import MaxContractInfo from "./MaxContractInfo.vue";
  export default {
    name: "index",
    components: {contractInfo,MaxContractInfo},
    data() {
      return {
        //cityInfoDialog:false,
        contractInfoDialog:false,
        maxContractInfoDialog:false,
        cityList:[],
        consractList:[]
      }
    },
    mounted() {
       this.dictionary(306,1).then((res) => {this.cityList = res.data;
       this.getContract(this.cityList);
       });
    },
    watch: {

    },
    methods: {

      //合同总数
      getContract(val){
        this.$http
        .get(globalConfig.server + "contract/reserve")
        .then(res => {
          if (res.data.code === "20000") {
              this.consractList=res.data.data.data;
              for(let i=0;i<val.length;i++){
                for(let j=0;j<res.data.data.data.length;j++){
                  if(res.data.data.data[j].city_code == val[i].variable.city_code)
                  {
                    this.consractList[j].city_name=val[i].dictionary_name
                  }

                }
              }
          }
        });      
      },
      //打开城市编号模态框
      // OpenCityInfo(){
      //   this.cityInfoDialog=true;
      // },
      contractInfo(){
        this.contractInfoDialog=true;
      },
      maxcontractInfo(){
        this.maxContractInfoDialog=true;
      },
      contratcadd(val){
        console.log(1111)
          if(val){
        this.dictionary(306,1).then((res) => {this.cityList = res.data;
       this.getContract(this.cityList);
       });           
          }
      }
    }
  }
</script>

<style scoped>

</style>
