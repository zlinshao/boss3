<template>
    <div id="backgroundReseach">
        <el-dialog :visible.sync="backgroundDialogVisible" append-to-body width="25%">
            <el-form label-width="180px" center>
                <el-form-item label="工作经验是否与简历所述相符">
                    <template>
                        <el-radio v-model="backgroundRadio.update.background_check.is_experience" label="1">是</el-radio>
                        <el-radio v-model="backgroundRadio.update.background_check.is_experience" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <div v-if='backgroundRadio.update.background_check.is_experience == "2"'>
                    <el-form-item label='描述'>
                        <el-input v-if='is_editing_bg' v-model="backgroundRadio.update.background_check.experience_description" type='textarea'></el-input>
                        <span v-if='!is_editing_bg'>{{backgroundRadio.update.background_check.experience_description}}</span>
                    </el-form-item >
                </div>
                <el-form-item label="岗位内容是否与简历所述相符">
                    <template>
                        <el-radio v-model="backgroundRadio.update.background_check.is_resume" label="1">是</el-radio>
                        <el-radio v-model="backgroundRadio.update.background_check.is_resume" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <div v-if='backgroundRadio.update.background_check.is_resume == "2"'>
                    <el-form-item label='描述'>
                        <el-input v-if='is_editing_bg'  v-model="backgroundRadio.update.background_check.resume_description" type='textarea'></el-input>
                        <span v-if='!is_editing_bg'>{{backgroundRadio.update.background_check.resume_description}}</span>
                    </el-form-item >
                </div>
                <el-form-item label="离职原因是否与简历所述相符">
                    <template>
                        <el-radio v-model="backgroundRadio.update.background_check.is_dismiss" label="1">是</el-radio>
                        <el-radio v-model="backgroundRadio.update.background_check.is_dismiss" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <div v-if='backgroundRadio.update.background_check.is_dismiss == "2"'>
                    <el-form-item label='描述'>
                        <el-input v-if='is_editing_bg'  v-model="backgroundRadio.update.background_check.dismiss_description" type='textarea'></el-input>
                        <span v-if='!is_editing_bg'>{{backgroundRadio.update.background_check.dismiss_description}}</span>
                    </el-form-item >
                </div>
                <div class='edit-result' v-if='is_editing_bg'>
                    <el-button size='mini' @click='cancelEditingBg'>取消</el-button>
                    <el-button size='mini' @click='confirmEditingBg'>确定</el-button>
                </div>
                <div class='edit-result' v-if='!is_editing_bg'>
                    <el-button size='mini' @click='cancelBgReseach'>取消</el-button>
                    <el-button size='mini' @click='confirmBgReseach'>确定</el-button>
                    <el-button size='mini' @click='editBgreseach'>修改</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'backgroundReseach',
        props: ['backgroundDialog', 'id', 'background_info'],
        data(){
            return{
                backgroundDialogVisible: false,
                is_editing_bg: false,
                backgroundRadio: {
                    update: {
                        background_check: {
                            is_experience: '1',
                            is_resume: '1',
                            is_dismiss: '1',
                            experience_description: '',
                            resume_description: '',
                            dismiss_description: ''
                        }
                    }
                },
                backgroundRadio_clone: {},
            }
        },
        watch: {
            backgroundDialog(val){
                if(val){
                    this.backgroundDialogVisible = true;
                }
            },
            backgroundDialogVisible(val){
                if(!val){
                    this.$emit('close')
                }
            },
            background_info(val){
                if(val.background_check){
                    // console.log(val)
                    this.prefill(val.background_check)
                }else{
                    this.initBgParam();
                }
            }
        },
        mounted(){
            
        },
        methods:{
            cancelBgReseach(){
                this.backgroundDialogVisible = false;
                // this.initBgParam();
            },
            //编辑参数
            editParam(){
                if(this.backgroundRadio.update.background_check.is_experience == '1'){
                    this.backgroundRadio.update.background_check.experience_description = '';
                }
                if(this.backgroundRadio.update.background_check.is_resume == '1'){
                    this.backgroundRadio.update.background_check.resume_description = '';
                }
                if(this.backgroundRadio.update.background_check.is_dismiss == '1'){
                    this.backgroundRadio.update.background_check.dismiss_description = '';
                }
            },
            //确定背景调查提交
            confirmBgReseach(){
                this.editParam();
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.id, this.backgroundRadio).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.backgroundDialogVisible = false;
                    }
                })
            },
            //修改背景调查
            editBgreseach(){
                this.is_editing_bg = true;
                this.backgroundRadio_clone = this.deepClone(this.backgroundRadio);
            },
            //取消背景调查修改
            cancelEditingBg(){
                this.is_editing_bg = false;
                this.backgroundRadio = Object.assign({}, this.backgroundRadio_clone);
            },
            //确定背景调查修改
            confirmEditingBg(){
                this.is_editing_bg = false;
            },
            //初始化参数
            initBgParam(){
                this.backgroundRadio.update.background_check.is_experience = '1';
                this.backgroundRadio.update.background_check.is_resume = '1';
                this.backgroundRadio.update.background_check.is_dismiss = '1';
                this.backgroundRadio.update.background_check.experience_description = '';
                this.backgroundRadio.update.background_check.dismiss_description = '';
                this.backgroundRadio.update.background_check.resume_description = '';
            },
            //预填背调信息
            prefill(obj){
                // console.log(obj)
                this.backgroundRadio.update.background_check.is_experience = obj.is_experience + '';
                this.backgroundRadio.update.background_check.is_resume = obj.is_resume + '';
                this.backgroundRadio.update.background_check.is_dismiss = obj.is_dismiss + '';
                this.backgroundRadio.update.background_check.experience_description = obj.experience_description;
                this.backgroundRadio.update.background_check.dismiss_description = obj.dismiss_description;
                this.backgroundRadio.update.background_check.resume_description = obj.resume_description;
            },
            //深拷贝
            deepClone(source){
                let targetObj = source.constructor === Array ? [] : {}; 
                for(let keys in source){ 
                if(source.hasOwnProperty(keys)){
                    if(source[keys] && typeof source[keys] === 'object'){ 
                        targetObj[keys] = source[keys].constructor === Array ? [] : {};
                        targetObj[keys] = this.deepClone(source[keys]);
                        }else{ 
                        targetObj[keys] = source[keys];
                        }
                    } 
                }
                return targetObj;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .edit-result{
        display: flex;
        justify-content: center;
    }
    .edit-condition{
        display: flex;
        justify-content: center;
    }
</style>
