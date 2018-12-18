<template>
  <div id="pendingSettle">
    <el-dialog :close-on-click-modal="false" title="结算" :visible.sync="dialogVisible" width="40%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <el-form :inline="true" size="mini" label-width="88px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="事件类型">
              <el-select v-model="form.item_type" size="mini" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="(key,index) in event_type" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收退款类型">
              <el-select v-model="form.receive_pay" size="mini" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="(key,index) in receive_pay" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input placeholder="请输入内容" v-model="customer_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="房屋地址">
              <el-input placeholder="请输入内容" v-model="detailed_address" disabled></el-input>
            </el-form-item>
            <el-form-item label="水费">
              <el-input placeholder="请输入内容" v-model="form.water_fee" type="number" clearable></el-input>
            </el-form-item>
            <el-form-item label="差额">
              <el-input placeholder="请输入内容" v-model="form.diff_fee" type="number" clearable></el-input>
            </el-form-item>
            <el-form-item label="电费">
              <el-input placeholder="请输入内容" v-model="form.elec_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="燃气费">
              <el-input placeholder="请输入内容" v-model="form.gas_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="物业费">
              <el-input placeholder="请输入内容" v-model="form.property_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="网络费">
              <el-input placeholder="请输入内容" v-model="form.net_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="转租费用">
              <el-input placeholder="请输入内容" v-model="form.sublet_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="管理费">
              <el-input placeholder="请输入内容" v-model="form.manage_fee" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物业校验">
              <el-input placeholder="请输入内容" v-model="form.check_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="违约金">
              <el-input placeholder="请输入内容" v-model="form.penalty_fee" clearable></el-input>
            </el-form-item>
            <el-form-item label="应退">
              <el-input placeholder="请输入内容" v-model="form.refund_should" clearable></el-input>
            </el-form-item>
            <el-form-item label="实际扣款">
              <el-input placeholder="请输入内容" v-model="refund_diff" disabled></el-input>
            </el-form-item>
            <el-form-item label="实际退款">
              <el-input placeholder="请输入内容" v-model="refund_real" disabled></el-input>
            </el-form-item>
            <el-form-item label="结算方式">
              <el-select v-model="form.account_type" size="mini" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="(key,index) in account_type" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算账户">
              <el-input placeholder="请输入内容" v-model="form.account_num" clearable></el-input>
            </el-form-item>
            <el-form-item label="签约人">
              <el-input placeholder="请输入内容" v-model="staff_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-input placeholder="请输入内容" v-model="department_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="结算日期">
              <div class="block">
                <el-date-picker
                  v-model="form.settle_date"
                  type="date"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                   value-format="yyyy-MM-dd">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="科目">
              <el-input v-model="subject_name" @focus="openSubjectTree" placeholder="请选择"
                                readonly>
                  <template slot="append">
                    <div style="cursor: pointer;" @click="clearSubjectTree">清空</div>
                  </template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"  placeholder="请填写备注" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" v-if="showBtn" type="primary" @click="settleAccount">结&nbsp;算</el-button>
      </div>
    </el-dialog>

   <subjectTree :subjectDialog="subjectVisible"  :types="subjectType" @close="closeSubjectTree"
                    @selectSubject="selectSubject"></subjectTree>

  </div>
</template>

<script>

    import subjectTree from '../components/subjectTree.vue'

  export default {
    name: "pending-settle",
    components: {subjectTree},
    props: ['module','detailData'],
    data() {
      return {
        subjectVisible:false,
        dialogVisible: false,
        subjectType:'next',
        fullLoading: false,
        showBtn:true,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        form: {
          collect_rent: '',           //收 租
          item_type: '',              //事件类型
          receive_pay: '',            //收退款
          customer_id: '',            //客户id
          house_id: '',               //房屋id
          water_fee: '',              //水费
          diff_fee: '',               //差额
          elec_fee: '',               //电费
          gas_fee: '',                //燃气
          property_fee: '',           //物业费
          net_fee: '',                //网络费
          sublet_fee: '',             //转租费用
          manage_fee: '',             //管理费
          check_fee: '',              //物业校验
          refund_should: '',          //应退
          refund_diff: '',            //实际扣款
          refund_real: '',            //实际退款
          account_type: '',           //结算方式
          account_num: '',            //结算账户
          penalty_fee: '',            //违约金
          staff_id: '',               //开单人id
          department_id: '',          //部门id
          settle_date: '',            //付款时间
          operator_id: '',            //结算人
          subject_id: '',             //科目
          remark: '',                 //备注
          start_date: '',             //开始日期
          end_date: '',               //结束日期
          status: '',                 //状态
        },
        customer_name: '',
        detailed_address: '',
        staff_name: '',
        department_name: '',
        event_type: ['违约', '转租', '调租', '退租','收房炸单','租房炸单'],
        receive_pay:['收款','退款'],
        account_type:['银行卡','支付宝','微信','存折','现金'],
        subject_name:'',
        id:''
      }
    },
    mounted() {
    },
    activated() {
    },
    computed:{
        refund_diff:function(){
            return Number(this.form.water_fee)
            +Number(this.form.diff_fee)
            +Number(this.form.elec_fee)
            +Number(this.form.gas_fee)
            +Number(this.form.property_fee)
            +Number(this.form.net_fee)
            +Number(this.form.sublet_fee)
            +Number(this.form.manage_fee)
            +Number(this.form.check_fee)
            +Number(this.form.penalty_fee);
        },
        refund_real:function(){
          return Number(this.form.refund_should)-this.refund_diff;
        }
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
      detailData(val){
        this.setData(val);
      }
    },
    methods: {
      //赋值
      setData(data){
          this.customer_name=data.customer_name;
          this.detailed_address=data.detailed_address;
          this.staff_name=data.staff_name;
          this.department_name=data.department_name;
          this.form.water_fee=data.water_fee;
          this.form.diff_fee=data.diff_fee;
          this.form.elec_fee=data.elec_fee;
          this.form.gas_fee=data.gas_fee;
          this.form.property_fee=data.property_fee;
          this.form.net_fee=data.net_fee;
          this.form.sublet_fee=data.sublet_fee;
          this.form.manage_fee=data.manage_fee;
          this.form.check_fee=data.check_fee;
          this.form.penalty_fee=data.penalty_fee;
          this.form.refund_should=data.refund_should;
          // this.form.refund_diff=data.refund_diff;
          // this.form.refund_real=data.refund_real;
          this.form.account_num=data.account_num;
          this.form.collect_rent=data.collect_rent;
          this.form.staff_id=data.staff_id;
          this.form.department_id=data.department_id;
          this.form.house_id=data.house_id;
          this.form.customer_id=data.customer_id;
          this.form.start_date=data.start_date;
          this.form.end_date=data.end_date;
          this.form.status=data.status;
          this.id=data.id;
          if(data.status===2){
            this.showBtn=false;
          }else{
            this.showBtn=true;
          }
      },
      // 结算
      settleAccount() {
        this.form.refund_diff=this.refund_diff;
        this.form.refund_real=this.refund_real;
        this.$http.post(globalConfig.finance_server+'account/pending/settle/'+this.id,this.form).then((res)=>{
            if(res.data.success){
              this.prompt('success', res.data.msg);
              this.dialogVisible=false;
              this.$emit('close','success');
            }else{
              this.prompt('warning', res.data.message);
            }
        });
      },
       closeSubjectTree(){
        this.subjectVisible=false;
      },
      clearSubjectTree(){
         this.form.subject_id='';
        this.subject_name='';
      },
      openSubjectTree(){
        this.subjectVisible=true;
      },
      selectSubject(val){
        this.form.subject_id=val.id;
        this.subject_name=val.name;
      },
    },
  }
</script>

<style lang="scss">
  #pendingSettle {
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      display: flex;
      display: -webkit-flex;
    }
  }

</style>
