<template>
    <div id="inductionMaterials">
        <el-dialog :visible.sync="inductionMaterialsDialogVisible" width="60%">
            <div>
                <el-form size="small" :model="params" label-width="100px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="面试表">
                                <UPLOAD :ID="'resume'" :isClear="isClear" :editImage="resume" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="保密协议">
                                <UPLOAD :ID="'con_agree'" :isClear="isClear" :editImage="con_agree" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="证件照">
                                <UPLOAD :ID="'doc_photo'" :isClear="isClear" :editImage="doc_photo" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="学历复印件">
                                <UPLOAD :ID="'education'" :isClear="isClear" :editImage="education" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="承诺书">
                                <UPLOAD :ID="'commitment'" :isClear="isClear" :editImage="commitment" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="上家公司离职证明">
                                <UPLOAD :ID="'resignation'" :isClear="isClear" :editImage="resignation" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="劳动合同">
                                <UPLOAD :ID="'labor_contract'" :isClear="isClear" :editImage="labor_contract" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="银行卡">
                                <UPLOAD :ID="'bank'" :isClear="isClear" :editImage="bank" @getImg="getImgData"></UPLOAD>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="inductionMaterialsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import UPLOAD from '../../../common/UPLOAD.vue'
    export default {
        name: 'inductionMaterials',
        components: {UPLOAD},
        props: ['inductionMaterialsDialog', 'induction_info', 'id'],
        data(){
            return{
                inductionMaterialsDialogVisible: false,
                isClear: false,
                params:{
                    update: {
                        image_info: {
                            resume: [],
                            con_agree: [],
                            doc_photo: [],
                            education: [],
                            commitment: [],
                            resignation: [],
                            labor_contract: [],
                            bank: [],
                        }
                    }
                },
                resume: {},
                con_agree: {},
                doc_photo: {},
                education: {},
                commitment: {},
                resignation: {},
                labor_contract: {},
                bank: {}

            }
        },
        watch: {
            inductionMaterialsDialog(val){
                if(val){
                    this.inductionMaterialsDialogVisible = true;
                    this.$nextTick(() => {
                        this.edit_pic(this.induction_info.image_info, this.params.update.image_info)
                    })
                }
            },
            inductionMaterialsDialogVisible(val){
                if(!val){
                    this.init();
                    this.$emit('close');
                }else{
                    this.isClear = true;
                }
            }
        },
        methods: {
            //确认提交
            confirmAdd(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.id, this.params).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.$nextTick(() => {
                            this.isClear = true;
                            this.init()
                        })
                        this.inductionMaterialsDialogVisible = false;
                    }
                })
            },
            init(){
                this.resume = {};
                this.con_agree = {};
                this.doc_photo = {};
                this.education = {};
                this.commitment = {};
                this.resignation = {};
                this.labor_contract = {};
                this.bank = {};
            },
            //照片修改
            edit_pic(imgInfo, obj){
                if(imgInfo){
                    for(let key in imgInfo){
                        if(key === 'resume'){
                            obj.resume = [];
                            imgInfo[key].forEach(item => {
                                this.resume[item.id] = item.uri;
                                obj.resume.push(item.id)
                            });
                            this.resume = Object.assign({}, this.resume)
                        }
                        if(key === 'resignation'){
                            obj.resignation = [];
                            imgInfo[key].forEach(item => {
                                this.resignation[item.id] = item.uri;
                                obj.resignation.push(item.id)
                            });
                            this.resignation = Object.assign({}, this.resignation)
                        }
                        if(key === 'labor_contract'){
                            obj.labor_contract = [];
                            imgInfo[key].forEach(item => {
                                this.labor_contract[item.id] = item.uri;
                                obj.labor_contract.push(item.id)
                            });
                            this.labor_contract = Object.assign({}, this.labor_contract)
                        }
                        if(key === 'education'){
                            obj.education = [];
                            imgInfo[key].forEach(item => {
                                this.education[item.id] = item.uri;
                                obj.education.push(item.id)
                            });
                            this.education = Object.assign({}, this.education)
                        }
                        if(key === 'doc_photo'){
                            obj.doc_photo = [];
                            imgInfo[key].forEach(item => {
                                this.doc_photo[item.id] = item.uri;
                                obj.doc_photo.push(item.id)
                            });
                            this.doc_photo = Object.assign({}, this.doc_photo)
                        }
                        if(key === 'con_agree'){
                            obj.con_agree = [];
                            imgInfo[key].forEach(item => {
                                this.con_agree[item.id] = item.uri;
                                obj.con_agree.push(item.id)
                            });
                            this.con_agree = Object.assign({}, this.con_agree)
                        }
                        if(key === 'commitment'){
                            obj.commitment = [];
                            imgInfo[key].forEach(item => {
                                this.commitment[item.id] = item.uri;
                                obj.commitment.push(item.id)
                            });
                            this.commitment = Object.assign({}, this.commitment)
                        }
                        if(key === 'bank'){
                            obj.bank = [];
                            imgInfo[key].forEach(item => {
                                this.bank[item.id] = item.uri;
                                obj.bank.push(item.id)
                            });
                            this.bank = Object.assign({}, this.bank)
                        }
                    }
                }
                
            },
            getImgData(val){
                switch (val[0]) {
                    case 'resume':
                        this.params.update.image_info.resume = val[1];
                        break;
                    case 'con_agree':
                        this.params.update.image_info.con_agree = val[1];
                        break;
                    case 'doc_photo':
                        this.params.update.image_info.doc_photo = val[1];
                        break;
                    case 'education':
                        this.params.update.image_info.education = val[1]
                        break;
                    case 'commitment':
                        this.params.update.image_info.commitment = val[1]
                        break;
                    case 'resignation':
                        this.params.update.image_info.resignation = val[1]
                        break;
                    case 'labor_contract':
                        this.params.update.image_info.labor_contract = val[1]
                        break;
                    case 'bank':
                        this.params.update.image_info.bank = val[1]
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
