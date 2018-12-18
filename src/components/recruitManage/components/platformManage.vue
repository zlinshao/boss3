<template>
    <div id="platform">
        <el-dialog :visible.sync="platformDialogVisible" width="30%" title='发布平台'>
            <div>
                <div v-for='(value, key) in platform' :key="key" class="main">
                    <div class='container'>
                        <el-button @click="editPlatform(value,key)"></el-button>
                        <span v-if="editing_platform_val !== value">
                            <span>{{key}}</span>
                            <span>{{value}}</span>
                        </span>
                        <span class='edit-playform' v-if="is_editing && editing_platform_val === value">
                            <el-input size='mini' v-model="platform_name"></el-input>
                            <el-input size='mini' v-model="platform_host"></el-input>
                            <i @click="cancelEdit" class='el-icon-circle-close'></i>
                            <i @click="saveEdit(value, key)" class="el-icon-circle-check"></i>
                            <i @click="deletePlatform(value, key)" class="el-icon-delete"></i>
                        </span>
                    </div>
                </div>
                <div v-if="is_adding" class="new-platform">
                    <!-- <el-button @click="editPlatform" size='mini'></el-button> -->
                    <el-input size='mini' class='input' v-model="platform_name" placeholder="请输入平台" @blur='confirmPlatform'></el-input>
                    <el-input size='mini' class='input' v-model="platform_host" placeholder="请输入地址" @blur='confirmPlatform'></el-input>
                    <el-button size='mini' @click="cancelAddPlatform">取消</el-button>
                </div>
                <div class="main" v-if="!is_adding">
                    <el-button class='add-platform' size="mini" @click='addNewPlatform'>添加平台</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size='small' @click="cancelAdd">取 消</el-button>
                <el-button size='small' type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'platform',
    props: ['platformDialog'],
    data(){
        return{
            platformDialogVisible: false,
            is_adding:false,
            is_editing:false,
            editing_platform_val:'',
            platform_name: '',
            platform_host:'',
            platform:{},
            id:'',
        }
    },
    watch:{
        platformDialog(val){
            // console.log(val)
            if(val){
                this.platformDialogVisible = true
            }
        },
        platformDialogVisible(val){
            if(!val){
                this.$emit('close')
            }else{
                this.platform = Object.assign({},this.$store.state.platform.platform_obj)
                this.id = this.$store.state.platform.id;
                console.log(this.platform)
            }
        }
    },
    created(){
        // console.log(this.$store)
    },
    methods:{
        //编辑
        editPlatform(value, key){
            this.is_adding = false;
            this.is_editing = true;
            this.editing_platform_val = value;
            this.platform_name = key;
            this.platform_host = value;
        },
        //取消编辑
        cancelEdit(){
            this.is_editing = false;
            this.editing_platform_val = '';
            this.platform_name = '';
            this.platform_host = '';
        },
        //保存编辑
        saveEdit(value, key){
            delete this.platform[key];
            this.platform[this.platform_name] = this.platform_host;
            this.platform = Object.assign({}, this.platform);
            this.is_editing = false;
            this.editing_platform_val = '';
        },
        //删除品台
        deletePlatform(value, key){
            delete this.platform[key];
            this.platform_name = '';
            this.platform_host = '';
            this.platform = Object.assign({}, this.platform)
        },
        //添加平台
        addNewPlatform(){
            this.platform_name = "";
            this.platform_host = "";
            this.editing_platform_val = "";
            this.platform = Object.assign({}, this.platform)
            this.is_editing = false;
            this.is_adding = true;
        },
        //确定平台
        confirmPlatform(){
            if(this.platform_name && this.platform_host){
                if(Object.keys(this.platform).includes(this.platform_name) || Object.values(this.platform).includes(this.platform_host)){
                    alert('地址已经添加')
                }else{
                    this.platform[this.platform_name] = this.platform_host;
                    this.platform = Object.assign({}, this.platform);
                    this.is_adding = false;
                    this.platform_name = '';
                    this.platform_host = '';
                }
            }
        },
        //取消新加
        cancelAddPlatform(){
            this.is_adding = false;
            this.platform_name = '';
            this.platform_host = '';
        },
        //确定添加
        confirmAdd(){
            this.platform[this.platform_name] = this.platform_host
            this.$http.put(globalConfig.server + 'hrm/recruitment/' + this.id, {
                update:{
                    platform: this.platform
                }
            }).then(res => {
                if(res.data.code === '10030'){
                    this.$notify({
                        title :'成功',
                        message: res.data.msg,
                        type: 'success',
                        duration: 1000
                    });
                    this.platformDialogVisible = false;
                    this.is_editing = false;
                    this.is_adding = false;
                }else{
                    this.$notify({
                        title :'警告',
                        message: res.data.msg,
                        type: 'warning',
                        duration: 1000
                    })
                }
            })
        },
        //取消
        cancelAdd(){
            this.platformDialogVisible = false;
            this.is_editing = false;
            this.editing_platform_val = '';
        }
    }
}
</script>
<style  scoped>
    .main{
        padding: 0 0 0 180px;
        /* text-align: center; */
        margin: 20px 0;
    }
    .main span{
        margin: 0 10px;
    }
    .main .container{
        display:  flex;
        justify-content: flex-start;
    }
    .add-platform{
        margin: 0 auto;
    }
    .new-platform{
        display: flex;
        width: 300px;
        justify-content: space-around;
        margin: 0 auto;
    }
    .new-platform .input{
        margin: 0 10px;
    }
    .edit-playform{
        display: flex;
        width: 200px;
        justify-content: space-around;
        align-items: center;
    }
    .edit-playform i{
        font-size: 20px !important;
    }
    .edit-playform .el-input__inner{
        width: 120px;
    }
</style>

