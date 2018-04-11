<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="上缴合同详情" :visible.sync="contractHandInDialogVisible">
      <div  class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上缴人">
                  <div class="content" v-if="detailInfo.simple_staff">{{detailInfo.simple_staff.real_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <div class="content">{{department}}</div>
                </el-form-item>
              </el-col><el-col :span="8">
              <el-form-item label="城市">
                <div class="content">{{city_name}}</div>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上缴时间">
                  <div class="content">{{detailInfo.report_time}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="操作时间">
                  <div class="content">{{detailInfo.report_time}}</div>
                </el-form-item>
              </el-col><el-col :span="8">
              <el-form-item label="操作人">
                <div class="content" v-if="detailInfo.operator">{{detailInfo.operator.real_name}}</div>
              </el-form-item>
            </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">已上缴收房合同</div>
        <div class="describe_border">
          <el-row v-for="(val,key) in detailInfo.collects" :key="key" style="padding: 5px;font-size: 14px">
            <el-form label-width="80px">
              <el-col :span="4">
                {{val}}
              </el-col>
              <el-col :span="7">
                <span style="color:#409EFF;">地址：</span>{{rentHandinAddress[key]}}
              </el-col>
              <el-col :span="8">
                <el-checkbox style="font-size: 12px" disabled="" v-model="handover[key]" name="type">交接单</el-checkbox>
                <el-checkbox style="font-size: 12px" disabled="" v-model="receipt[key]" name="type">收据</el-checkbox>
                <el-checkbox style="font-size: 12px" disabled="" v-model="keyCode[key]" name="type">钥匙</el-checkbox>
              </el-col>
              <el-col :span="5">
                <span v-if="passed[key]" class="passButton">{{passed[key]}}</span>
                <el-button size="mini" type="primary" v-else="" href="javascript:;" @click="pass(val,key)">审核</el-button>
              </el-col>
            </el-form>
          </el-row>
        </div>

        <div class="title">已上缴租房合同</div>
        <div class="describe_border">
          <el-row v-for="(val,key) in detailInfo.rents" :key="key" style="padding: 5px;font-size: 14px">
            <el-form label-width="80px">
              <el-col :span="4">
                {{val}}
              </el-col>
              <el-col :span="7">
                <span style="color:#409EFF;">地址：</span>{{rentHandinAddress[key]}}
              </el-col>
              <el-col :span="8">
                <el-checkbox style="font-size: 12px" disabled="" v-model="handover[key]" name="type">交接单</el-checkbox>
                <el-checkbox style="font-size: 12px" disabled="" v-model="receipt[key]" name="type">收据</el-checkbox>
                <el-checkbox style="font-size: 12px" disabled="" v-model="keyCode[key]" name="type">钥匙</el-checkbox>
              </el-col>
              <el-col :span="5">
                <span v-if="passed[key]" class="passButton">{{passed[key]}}</span>
                <el-button size="mini" type="primary" v-else="" href="javascript:;" @click="pass(val,key)">审核</el-button>
              </el-col>
            </el-form>
          </el-row>
        </div>

        <div class="title">截图</div>
        <div class="describe_border">
          <div v-if="detailInfo.screenshot.length>0" v-for="item in detailInfo.screenshot" style="display: inline-block">
            <img style="width: 100px;height: 100px;border-radius: 6px;margin: 0 10px 10px 0" :src="item.uri" alt=""
                  data-magnify="" :data-src="item.uri">
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="contractHandInDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="contractHandInDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElInput from "../../../../../../node_modules/element-ui/packages/input/src/input";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElCol,
      ElInput},
    props:['contractHandInDialog','handInEditId_detail'],
    data() {
      return {
        contractHandInDialogVisible:false,
        tableData:[],
        detailInfo:{},
        department:'',
        dictionary:[],
        city_name:'',

        //公司合同备用字段
        rentHandinAddress:{},
        handover:{},
        receipt:{},
        keyCode:{},
        passed:{},
        checkBox:[],
      };
    },
    watch:{
      contractHandInDialog(val){
        this.contractHandInDialogVisible = val
      },
      contractHandInDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      handInEditId_detail(val){
        this.getDetail();
      },
    },
    mounted(){
      this.getDictionary();
    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/306').then((res) => {
          this.dictionary = res.data.data;
        });
      },

      getDetail(){
        this.$http.get(globalConfig.server+'contract/handin/'+this.handInEditId_detail).then((res) => {
          if(res.data.code === '20010'){
            this.detailInfo = res.data.data.full;
            this.rentHandinAddress = res.data.data.address;
            this.handover = res.data.data.handover;
            this.receipt = res.data.data.receipt;
            this.keyCode = res.data.data.key;
            this.passed = res.data.data.passed;
            this.department = res.data.data.department.name;
            this.dictionary.forEach((item) => {
              if(item.variable.city_code === this.detailInfo.city_code){
                this.city_name = item.dictionary_name;
                return false;
              }
            })
          }
        });
      },
      pass(val,key){
        this.$confirm('您确定将 '+ val +' 这条合同通过审核吗?', this.rentHandinAddress[key], {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server+'contract/handin/pass/'+key).then((res) => {
            if(res.data.code === '20010'){
              this.getDetail();
              this.$notify.success({
                title:'成功',
                message:res.data.msg
              })
            }
          });
        }).catch(() => {

        });

      }
    }
  };
</script>
<style lang="scss" scoped="">
  .passButton{
    color: #409EFF;
    &:hover{
      color: #6a8dfb;
    }
  }
  .content {
    padding: 0 10px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
    min-height: 32px;
  }
</style>
