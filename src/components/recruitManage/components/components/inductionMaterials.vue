<template>
    <div id="inductionMaterials">
        <el-dialog :visible.sync="inductionMaterialsDialogVisible" width="60%">
            <div>
                <el-form size="small" :model="params" label-width="100px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="面试表">
                                <UPLOAD v-if="allow_edit" :ID="'resume'" :isClear="isClear" :editImage="resume" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in resume' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="保密协议">
                                <UPLOAD v-if="allow_edit" :ID="'con_agree'" :isClear="isClear" :editImage="con_agree" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in con_agree' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="证件照">
                                <UPLOAD v-if="allow_edit" :ID="'doc_photo'" :isClear="isClear" :editImage="doc_photo" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in doc_photo' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="学历复印件">
                                <UPLOAD v-if="allow_edit" :ID="'education'" :isClear="isClear" :editImage="education" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in education' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="承诺书">
                                <UPLOAD v-if="allow_edit" :ID="'commitment'" :isClear="isClear" :editImage="commitment" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in commitment' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="上家公司离职证明">
                                <UPLOAD v-if="allow_edit" :ID="'resignation'" :isClear="isClear" :editImage="resignation" @getImg="getImgData"></UPLOAD>
                                 <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in resignation' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="劳动合同">
                                <UPLOAD v-if="allow_edit" :ID="'labor_contract'" :isClear="isClear" :editImage="labor_contract" @getImg="getImgData"></UPLOAD>
                                 <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in labor_contract' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="银行卡">
                                <UPLOAD v-if="allow_edit" :ID="'bank'" :isClear="isClear" :editImage="bank" @getImg="getImgData"></UPLOAD>
                                <el-col :span='4' v-if="!allow_edit" v-for='(value, key) in bank' :key='key'>
                                    <img :src='value'  data-magnify :data-src='value' class='img'/>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="inductionMaterialsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd" v-if='allow_edit'>确 定</el-button>
                <el-button type="primary" @click="inductionMaterialsDialogVisible = false" v-if='!allow_edit'>确定</el-button>
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
                pic_list: ['resume', 'resignation', 'labor_contract', 'education', 'doc_photo', 'con_agree', 'commitment', 'bank'],
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
                bank: {},
                allow_edit: true,
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
                    $('.imgItem').remove();
                        setTimeout(() => {
                            this.isClear = false;
                    });
                }else{
                    this.isClear = true;
                    this.pic_list.forEach(item => {
                        this.params.update.image_info[item] = [];
                    })
                    if(this.$store.state.platform.active_name === 'fourth'){
                        this.allow_edit = false;
                    }else{
                        this.allow_edit = true;
                    }
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
                        this.isClear = true;
                        $('.imgItem').remove();
                            setTimeout(() => {
                                this.isClear = false;
                        }, 300);
                        this.init();
                        this.inductionMaterialsDialogVisible = false;
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            init(){
                this.pic_list.forEach(item => {
                    this[item] = {};
                });
            },
            //照片修改
            edit_pic(imgInfo, obj){
                if(imgInfo){
                    for(let key in imgInfo){
                        this.pic_list.forEach(i => {
                            if(key === i){
                                obj[i] = [];
                                imgInfo[key].forEach(item => {
                                    this[i][item.id] = item.uri;
                                    obj[i].push(Number(item.id))
                                });
                                this[i] = Object.assign({}, this[i])
                            }
                        })
                    }
                }    
            },
            getImgData(val){
                switch (val[0]) {
                    case 'resume':
                        this.params.update.image_info.resume = this.toNum(val[1]);
                        break;
                    case 'con_agree':
                        this.params.update.image_info.con_agree = this.toNum(val[1])
                        break;
                    case 'doc_photo':
                        this.params.update.image_info.doc_photo = this.toNum(val[1])
                        break;
                    case 'education':
                        this.params.update.image_info.education = this.toNum(val[1])
                        break;
                    case 'commitment':
                        this.params.update.image_info.commitment = this.toNum(val[1])
                        break;
                    case 'resignation':
                        this.params.update.image_info.resignation = this.toNum(val[1])
                        break;
                    case 'labor_contract':
                        this.params.update.image_info.labor_contract = this.toNum(val[1])
                        break;
                    case 'bank':
                        this.params.update.image_info.bank = this.toNum(val[1])
                        break;
                    default:
                        break;
                }
            },
            //string类型转number
            toNum(arr){
                return arr.map(item => Number(item))
            }
        }
    }
</script>
<style lang="scss" scoped>
    .img{
        width: 120px;
        height: 120px;
    }
</style>
