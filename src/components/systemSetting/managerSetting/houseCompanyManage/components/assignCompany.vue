<template>
    <div id="editCompany">
        <el-dialog
            title="重新分配"
            :visible.sync="assignCompanyDialogVisible"
            width="60%"
            :close-on-click-modal="false">
            <div>
                <el-form  ref="form" label-width="80px">
                    <el-form-item label='公司' required>
                        <el-select v-model="params.corp_id" placeholder="请选择公司" @change='selectCorpName'>
                            <el-option
                            v-for="item in companyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.company_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
             </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="assignCompanyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="assignConfirmed">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['assignCompanyDialog', 'houseInfo'],
    data(){
        return{
            assignCompanyDialogVisible: false,
            companyList: [],                        //公司列表
            params:{
                house_id:'',                        //房屋id
                corp_id:511,                        //公司id(默认)
                corp_name:'南京乐伽商业管理有限公司', //公司名称(默认)
            }
        }
    },
    watch:{
        assignCompanyDialog(val){
            if(val){
                this.assignCompanyDialogVisible = true;
                this.getCompany();
            }
        },
        assignCompanyDialogVisible(val){
            if(!val){
                this.$emit('close');
                this.init()
            }
        },
        houseInfo(val){
            this.params.house_id = val.id
        }
    },
    methods:{
        //确认修改
        assignConfirmed(){
            this.$http.put(globalConfig.server + '/organization/other/house-corp-update', this.params)
            .then(res => {
                if(res.data.code === '700280'){
                    this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        duration: 1000,
                        type: 'success'
                    });
                    this.$nextTick(() => {
                        this.assignCompanyDialogVisible = false;
                        this.init()
                    })
                    
                }else if(res.data.code === '700210'){
                    this.$notify.error({
                        title: '警告',
                        message: res.data.msg,
                    });
                }
            })
            .catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: res.data.msg
                });
            })
        },
        //初始化数据
        init(){
            this.params.house_id = '';
            this.params.corp_id = 511;
            this.params.corp_name = '南京乐伽商业管理有限公司';
        },
        //查询分公司
        getCompany(){
            this.$http.get(globalConfig.server + '/organization/org/company').then(res => {
                if(res.data.code === '20010'){
                    this.companyList = res.data.data
                }
            })
        },
        //选择公司
        selectCorpName(item){
            this.companyList.forEach(i => {
                if(i.company_id === item){
                    this.params.corp_name = i.name
                }
            })
        }
    }
}
</script>
<style scoped>

</style>

