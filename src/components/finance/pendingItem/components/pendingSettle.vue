<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="报备详情" :visible.sync="dialogVisible" width="50%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <el-form :inline="true" size="mini" label-width="80px">
        <el-form-item label="事件类型">
          <el-select v-model="form.item_type" size="mini" clearable>
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收退款类型">
          <el-select v-model="form.receive_pay" size="mini" clearable>
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input placeholder="请输入内容" v-model="customers_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋地址">
          <el-input placeholder="请输入内容" v-model="house_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="水费">
          <el-input placeholder="请输入内容" v-model="form.water_fee" clearable></el-input>
        </el-form-item>
        <el-form-item label="差额">
          <el-input placeholder="请输入内容" v-model="form.diff_fee" clearable></el-input>
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
          <el-input placeholder="请输入内容" v-model="form.refund_diff" clearable></el-input>
        </el-form-item>
        <el-form-item label="实际退款">
          <el-input placeholder="请输入内容" v-model="form.refund_real" clearable></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select v-model="form.receive_pay" size="mini" clearable>
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算账户">
          <el-input placeholder="请输入内容" v-model="form.account_num" clearable></el-input>
        </el-form-item>
        <el-form-item label="签约人">
          <el-input placeholder="请输入内容" v-model="form.staff_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input placeholder="请输入内容" v-model="form.department_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="结算人">
          <el-input placeholder="请输入内容" v-model="form.operator_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="付款时间">
          <el-input placeholder="请输入内容" v-model="form.settle_date" clearable></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-input placeholder="请输入内容" v-model="form.subject_id" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pending-settle",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        fullLoading: false,

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
        customers_name: '上官海棠',
        house_name: '城市绿洲花园3期1-1-1001',
        values: ['待入账', '待结清', '已结清', '已超额'],
      }
    },
    mounted() {
    },
    activated() {
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
    methods: {},
  }
</script>

<style lang="scss">

</style>
