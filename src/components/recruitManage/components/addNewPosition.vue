<template>
    <div id="newPosition">
        <el-dialog title="新增招聘职位" :visible.sync="newPositionVisible" width="40%">
            <div>
                <el-form ref="form" :model="form" size='mini' label-width="80px">
                    <el-form-item label="部门">
                        <el-input v-model="department_name" @focus="chooseDepart" placeholder="请选择部门" readonly>
                        <template slot="append">
                            <div style="cursor: pointer;" @click="closeDepart">清空</div>
                        </template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="duty_id" placeholder="请选择职位" @change="selectDuty" :disabled="duty.length < 1">
                            <el-option v-for="(item, index) in duty" :key='index' :label='item.name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="岗位名称">
                        <el-select v-model="form.position_id" placeholder="请选择岗位" :disabled="position.length < 1">
                            <el-option v-for="(item, index) in position" :key='index' :label='item.name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄范围">
                        <el-col :span="11">
                            <el-input type='number' v-model="form.year.min"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type='number' v-model="form.year.max"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.gender" placeholder="">
                            <el-option v-for="(item, index) in sex" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="薪资范围">
                        <el-col :span="11">
                            <el-input type='number' v-model="form.salary.min"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type='number' v-model="form.salary.max"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作经验">
                        <el-select v-model="form.experience" placeholder="">
                            <el-option v-for="(item, index) in experience" :key="index" :label="item.dictionary_name" :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历">
                        <el-select v-model="form.education" placeholder="">
                            <el-option v-for="(item, index) in education" :key="index" :label="item.dictionary_name" :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="需求人数">
                        <el-col :span="11">
                            <el-input type='number' v-model="form.number.min"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type='number' v-model="form.number.max"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="岗位职责">
                        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.content" :disabled="editorDisabled"></vue-editor>
                    </el-form-item>
                    <!-- <el-form-item label="任职要求">
                        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="positionRequire" :disabled="editorDisabled"></vue-editor>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newPositionVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
        <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize" @selectMember="selectMember"></organization>
    </div>
</template>
<script>
    import {VueEditor} from 'vue2-editor'
    import Organization from '../../common/organization.vue';
    export default {
        name:'addNewPosition',
        props: ['newPositionDialog'],
        components: {VueEditor, Organization},
        data(){
            return{
                newPositionVisible: false,
                organizeVisible: false,
                organizeType:'',
                department_name: '',
                duty_id:'',
                duty:[],
                position:[],
                form:{
                    org_id:'',
                    position_id: '',
                    year:{
                        min:'',
                        max:''
                    },
                    gender: '',
                    salary: {
                        min: '',
                        max: ''
                    },
                    experience: '',
                    education: '',
                    number: {
                        min: '',
                        max: '',
                    },
                    content: '',
                    create_time :'',
                    users:'',
                    status:''

                },
                sex:[],
                experience:[],
                education: [],
                editorDisabled: false,
                positionRespons:'',
                // positionRequire:'',
                file:{},
            }
        },
        watch: {
            newPositionDialog(val){
                // console.log(val);
                if(val){
                    this.newPositionVisible = true;
                    this.getDictionary()
                }
            },
            newPositionVisible(val){
                // console.log(val);
                if(!val){
                    this.$emit('close');
                    this.init()
                }
            }
        },
        methods:{
            //获取职位
            getPosition(id) {
                this.$http.get(globalConfig.server + 'organization/duty?org_id=' + id).then((res) => {
                    if (res.data.code === '20000') {
                        this.duty = res.data.data.data;
                        // console.log(res.data.data.data)
                    }
                });
            },
            //获取岗位
            getPositions(id) {
                this.$http.get(globalConfig.server  + 'organization/position?duty_id=' + id).then((res) => {
                    if (res.data.code === '20000') {
                        this.position = res.data.data.data;
                    }
                });
            },
            //选择职位
            selectDuty(item){
                this.position = []
                this.form.position_id = '';
                this.duty_id = item;
                this.getPositions(this.duty_id)
            },
            //选择部门
            chooseDepart(){
                this.organizeVisible = true;
            },
            //关闭组织架构
            closeOrganize(){
                this.organizeVisible = false
            },
            //选择部门
            selectMember(val){
                this.duty = [];
                this.duty_id = '';
                this.position = []
                this.form.position_id = '';
                this.form.org_id = val[0].id;
                this.department_name = val[0].name;
                this.getPosition(this.form.org_id);
            },
            //清空部门
            closeDepart(){
                this.form.org_id = '';
                this.department_name = '';
                this.duty = [];
                this.duty_id = '';
                this.position = [];
                this.form.position_id = '';
                this.form.org_id = '';
            },
            //提交表单
            confirmAdd(){
                // this.form.content = this.positionRespons + '</br>' + this.positionRequire;
                // this.form.create_time = this.timestampToTime(new Date());
                // this.form.users = JSON.parse(localStorage.personal).id;
                // this.form.status = '招聘中';
                this.$http.post(globalConfig.server + 'hrm/recruitment', this.form)
                    .then(res => {
                        if(res.data.code === '10010'){
                            this.$notify({
                                title:'成功',
                                message:res.data.msg,
                                type: 'success'
                            });
                            this.newPositionVisible = false;
                            this.init();
                        }else if(res.data.code == '10012'){
                            this.$notify({
                                title: '警告',
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                // console.log(this.form)
            },
            //初始化表单
            init(){
                this.positionRespons = ''
                // this.positionRequire = ''
                this.department_name = '';
                this.duty_id = '';
                this.file = {};
                this.duty = [];
                this.position = [];
                this.form.org_id = '';
                this.form.position_id = '';
                this.form.year.min = '';
                this.form.year.max = '';
                this.form.gender = '';
                this.form.salary.min = '';
                this.form.salary.max = '';
                this.form.experience = '';
                this.form.education = '';
                this.form.number.min = '';
                this.form.number.max = '';
                this.form.content = '';
                this.form.create_time = '';
                this.form.users = '';
                this.form.status = '';
            },
            //字典
            getDictionary(){
                //性别
                this.dictionary(713).then(res => {
                    if(res.code === '30010'){
                        this.sex = res.data
                    }
                });
                //学历
                this.dictionary(714).then((res) => {
                    if(res.code === '30010'){
                        this.education = res.data
                    }
                });
                //工作年限
                this.dictionary(715).then((res) => {
                    if(res.code === '30010'){
                        this.experience = res.data
                    }
                });
                //状态
                this.dictionary(731).then((res) => {
                    // console.log(res)
                });
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader){
                let formData = new FormData();
                formData.append('file', file);

                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                if (file.size > 1024 * 1024 * 2) {
                    this.$notify.warning({
                        title: '警告',
                        message: '只能上传jpg/png文件，且不超过2M'
                    })
                } else {
                    this.$http.post(globalConfig.server + 'api/v1/upload-indirect', formData, config).then((res) => {
                        if (res.data.code === '110100') {
                        Editor.insertEmbed(cursorLocation, 'image', res.data.data.uri);
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>

