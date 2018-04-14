<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="作废合同详情" :visible.sync="contractCancelDialogVisible">
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
              </el-col><el-col :span="8">
              <el-form-item label="城市">
                <div class="content">{{city_name}}</div>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="作废时间">
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
        <div class="title">已作废收房合同</div>
        <div class="describe_border">
          <el-row>
            <el-col  v-for="item in detailInfo.collects" :key="item" :span="6">
              {{item}}
            </el-col>
          </el-row>
        </div>

        <div class="title">已作废租房合同</div>
        <div class="describe_border">
          <el-row>
            <el-col  v-for="item in detailInfo.rents" :key="item" :span="6">
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

        <div class="title">备注</div>
        <div class="describe_border">
          <div v-if="detailInfo.remarks.length>0" v-for="item in detailInfo.remarks">
            <el-form size="mini" label-width="80px">
              <el-row>
                <el-col :span="16">
                  <el-form-item label="备注内容">
                    <div class="content">{{item.content}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <div class="content">{{item.create_time}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="contractCancelDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="contractCancelDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ElInput from "../../../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    props:['contractCancelDialog','cancelEditId_detail'],
    data() {
      return {
        contractCancelDialogVisible:false,
        tableData:[],
        detailInfo:{},
        department:'',
        cityDictionary:[],
        city_name:'',
      };
    },
    watch:{
      contractCancelDialog(val){
        this.contractCancelDialogVisible = val
      },
      contractCancelDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      cancelEditId_detail(val){
        this.getDetail();
      },
    },
    mounted(){
      this.getDictionary();
    },
    methods:{
      getDictionary(){
        this.dictionary(306, 1).then((res) => {
          this.cityDictionary = res.data;
        });
      },
      getDetail(){
        this.$http.get(globalConfig.server+'contract/invalidate/'+this.cancelEditId_detail).then((res) => {
          if(res.data.code === '20010'){
            this.detailInfo = res.data.data.full;
            this.department = res.data.data.department.name;
            this.cityDictionary.forEach((item) => {
              if(item.variable.city_code === this.detailInfo.city_code){
                this.city_name = item.dictionary_name;
                return false;
              }
            })
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
  }
</style>
