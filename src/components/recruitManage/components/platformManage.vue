<template>
    <div id="platform">
        <el-dialog :visible.sync="platformDialogVisible" width="40%" title='发布平台'>
            <div>
                <div v-for='(value, key) in platform' :key="key" class="main">
                    <div class='container'>
                        <el-button class='edit-platform'></el-button>
                        <div class='platform-info'>
                            <div class='platform-name'>
                                <span v-if="editing_platform_val !== value">{{key}}</span>
                                <el-input size='mini' v-model="platform_name" class='edit-name'  v-if="is_editing && editing_platform_val === value"></el-input>
                            </div>
                            <div class='platform-href'>
                                <span>岗位链接</span>
                                <div class='wrap'>
                                    <span class='platform-location' @click='turnto(value)' v-if="editing_platform_val !== value">{{value}}</span>
                                    <el-input size='mini' v-model="platform_host" v-if="is_editing && editing_platform_val === value" class='input-host'></el-input>
                                </div>
                                <i @click="cancelEdit" v-if="is_editing && editing_platform_val === value" class='el-icon-circle-close'></i>
                                <i @click="saveEdit(value, key)" v-if="is_editing && editing_platform_val === value" class="el-icon-circle-check"></i>
                                <i @click="deletePlatform(value, key)" v-if="is_editing && editing_platform_val === value" class="el-icon-delete"></i>
                                <i class='el-icon-edit'  @click="editPlatform(value, key)" v-if="editing_platform_val !== value"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="is_adding" class="new-platform">
                    <div class="main">
                        <div class='container'>
                            <el-button class='edit-platform'></el-button>
                            <div class='platform-info'>
                                <div class='platform-name'>
                                    <el-input size='mini' v-model="platform_name" class='edit-name'></el-input>
                                </div>
                                <div class='platform-href'>
                                    <span>岗位链接</span>
                                    <div>
                                        <el-input size='mini' v-model="platform_host" class='input-host'></el-input>
                                    </div>
                                    <i @click="cancelAddPlatform"  class='el-icon-circle-close'></i>
                                    <i @click="confirmPlatform"  class="el-icon-circle-check"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-btn" v-if="!is_adding">
                    <el-button class='add-platform' size="mini" @click='addNewPlatform'>添加平台</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size='mini' @click="cancelAdd">取 消</el-button>
                <el-button size='mini' type="primary" @click="confirmAdd">确 定</el-button>
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
            if(val){
                this.platformDialogVisible = true
            }
        },
        platformDialogVisible(val){
            if(!val){
                this.$emit('close');
                this.is_editing = false;
                this.is_adding = false;
                this.platform_host = '';
                this.platform_name = '';
                this.editing_platform_val = '';
            }else{
                this.platform = Object.assign({},this.$store.state.platform.platform_obj)
                this.id = this.$store.state.platform.id;
            }
        }
    },
    created(){
        
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
            if(Object.keys(this.platform).filter(item => item != key).includes(this.platform_name) || Object.values(this.platform).filter(item => item != value).includes(this.platform_host)){
                this.$alert('平台或地址已经存在', '', {
                    confirmButtonText: '确定',
                });
            }else{
                delete this.platform[key];
                this.platform[this.platform_name] = this.platform_host;
                this.platform = Object.assign({}, this.platform);
            }
            this.is_editing = false;
            this.editing_platform_val = '';
        },
        //删除平台
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
                    this.$alert('平台或地址已经存在', '', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.platform[this.platform_name] = this.platform_host;
                    this.platform = Object.assign({}, this.platform);
                    this.is_adding = false;
                    this.platform_name = '';
                    this.platform_host = '';
                }
            }
        },
        //跳转
        turnto(item){
            window.open(item)
        },
        //取消新加
        cancelAddPlatform(){
            this.is_adding = false;
            this.platform_name = '';
            this.platform_host = '';
        },
        //确定添加
        confirmAdd(){
            // this.platform[this.platform_name] = this.platform_host
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
<style lang="scss" scoped>
    #platform{
        .main{
            padding: 0 0 0 50px;
            /* text-align: center; */
            margin: 20px 0;
            height: 30px;
        }
        .main span{
            margin: 0 10px;
        }
        .main .container{
            display:  flex;
            justify-content: flex-start;
        }
        .add-btn{
            display: flex;
            justify-content: center;
        }
        .add-platform{
            border: none;
            font-family: SourceHanSansSC;
            font-weight: 700;font-size: 14px;
            color: rgba(23, 52, 213, 1);
            font-style: normal;
            letter-spacing: 0px;
            line-height: 20px;
            text-decoration: none;
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
        .dialog-footer{
            display: flex;
            justify-content: center;
        }
        .edit-platform{
            background-color: rgb(179, 178, 178);
        }
        .platform-info{
            width: 100%;
            display: flex;
            justify-content: flex-start;
        }
        .platform-name{
            font-size: 22px;
            line-height: 30px;
            width: 200px;
            margin: 0 10px;
        }
        .edit-name{
            font-size: 22px;
            line-height: 30px;
            width: 150px !important;
        }
        .platform-href{
            font-size: 14px;
            line-height: 30px;
            width: 350px;
            height: 30px;
            display: flex;
            justify-content: space-between;
        }
        .platform-href i{
            line-height: 30px;
        }
        .wrap{
            height: 30px;
        }
        .input-name{
            width: 160px !important;
        }
        .imput-host{
            width: 160px !important;
        }
        .el-icon-edit,.el-icon-circle-close, .el-icon-circle-check, .el-icon-delete, .platform-location{
            cursor: pointer;
        }
        .platform-location{
            width: 200px;
            display: inline-block;
            height: 30px;
            max-width: 200px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>

