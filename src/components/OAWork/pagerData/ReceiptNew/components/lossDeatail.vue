<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="丢失收据详情" :visible.sync="contractLossDialogVisible">
      <div  class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="申报人">
                  <div class="content" v-if="detailInfo.simple_staff">{{detailInfo.simple_staff.real_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <div class="content">{{department}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="丢失时间">
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
        <div class="title">已丢失收房收据</div>
        <div class="describe_border">
          <el-row>
            <el-col  v-for="item in detailInfo.receipt_numbers" :key="item" :span="6">
              {{item}}
            </el-col>
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
        <el-button size="small" @click="contractLossDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="contractLossDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElInput from "../../../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    props:['contractLossDialog','lossEditId_detail'],
    data() {
      return {
        contractLossDialogVisible:false,
        tableData:[],
        detailInfo:{},
        department:'',
        dictionaryx:[]
      };
    },
    watch:{
      contractLossDialog(val){
        this.contractLossDialogVisible = val
      },
      contractLossDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      lossEditId_detail(val){
        this.getDetail();
      },
    },
    mounted(){
      this.getDictionary();
    },
    methods:{
      getDictionary(){
        this.dictionary(306,1).then((res) => {
          this.dictionaryx = res.data;
        });
      },
      getDetail(){
        this.$http.get(globalConfig.server+'receipt/loss/'+this.lossEditId_detail).then((res) => {
          if(res.data.code === '21000'){
            this.detailInfo = res.data.data;
            this.department = res.data.data.department.name;
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped="">
  .content {
    padding: 0 10px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
    min-height: 32px;
    line-height: 32px;
  }
</style>
