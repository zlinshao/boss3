<template>
    <div id="recruitManage">
        <div class="header">
            <el-form :inline="true" :model="formInline" size='small' class="demo-form-inline" :disabled='is_editing'>
                <el-form-item label="">
                    <el-select v-model="params.status" placeholder="" @change='search'>
                        <el-option 
                            v-for="(item, index) in status"
                            :key="index"
                            :value="item.id"
                            :label="item.dictionary_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="公司">
                    <el-input v-model="formInline.company" placeholder=""></el-input>
                </el-form-item> -->
                <el-form-item label="部门">
                    <el-input v-model="department_name_search" @focus="chooseDepart" placeholder="请选择部门" readonly>
                        <template slot="append">
                            <div style="cursor: pointer;" @click="closeDepart">清空</div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-input v-model="params.keywords" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addNewPosition">新增招聘职位</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--招聘详情开始-->
        <div class="positionList"  v-loading="loadingRecruit"  element-loading-text="加载中" element-loading-spinner="el-icon-loading">
            <div class='positionItem' v-for="(item, index) in positionList" :key="index">
                <el-container>
                    <el-header>
                        <el-row :gutter="20" class="positionTitle">
                            <el-col :span="4">
                                <span v-if='item.org.corp'>{{item.org.corp.name}}</span>
                                <span v-if='!item.org.corp'>/</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{item.org.name}}</span>
                            </el-col>
                            <el-col :span="4">
                                <span>{{item.statuss.dictionary_name}}</span>
                            </el-col>
                        </el-row>
                    </el-header>
                    <el-main>
                        <el-row class='position-info'>
                            <el-col :span='2' v-if='(edit_index !== index)'>
                                <span class='position'>{{item.role.name}}</span>
                            </el-col>
                            <el-col :span='2' v-if='is_editing && (edit_index === index)'>
                                <el-input size='mini' v-model='position_name' v-if='is_editing && (edit_index === index)' @focus="openSelectPositionDialog"></el-input>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span>{{item.year.min}}~{{item.year.max}}岁</span>
                            </el-col>
                            <el-col :span='3' v-if='is_editing && (edit_index === index)'>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.year.min" size='mini'></el-input>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.year.max" size='mini'></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span v-if='item.genders'>{{item.genders.dictionary_name}}</span>
                                <span v-if='!item.genders'>/</span>
                            </el-col>
                            <el-col :span='3' v-if='is_editing && (edit_index === index)'>
                                <el-select size='mini' v-model='form.gender'>
                                    <el-option v-for='(item, index) in sex' :key='index' :value='item.id' :label='item.dictionary_name'></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span>{{item.salary.min}}~{{item.salary.max}}元/月</span>
                            </el-col>
                            <el-col :span='4' v-if='is_editing && (edit_index === index)'>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.salary.min" size='mini'></el-input>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.salary.max" size='mini'></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span v-if="item.experiences">{{item.experiences.dictionary_name}}</span>
                                <span v-if="!item.experiences">/</span>
                            </el-col>
                            <el-col :span='3' v-if='is_editing && (edit_index === index)'>
                                <el-select size='mini' v-model='form.experience'>
                                    <el-option v-for='(item, index) in experience' :key='index' :value='item.id' :label='item.dictionary_name'></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span v-if='item.educations'>{{item.educations.dictionary_name}}</span>
                                <span v-if='!item.educations'>/</span>
                            </el-col>
                            <el-col :span='3' v-if='is_editing && (edit_index === index)'>
                                <el-select size='mini' v-model='form.education'>
                                    <el-option v-for='(item, index) in education' :key='index' :value='item.id' :label='item.dictionary_name'></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span='3' v-if='(edit_index !== index)'>
                                <span>{{item.number.min}}~{{item.number.max}}人</span>
                            </el-col>
                            <el-col :span='3' v-if='is_editing && (edit_index === index)'>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.number.min" size='mini'></el-input>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span='8'>
                                    <el-input type='number' v-model="form.number.max" size='mini'></el-input>
                                </el-col>
                            </el-col>
                            <el-button size="mini" @click="editPosition(index)" v-if='(edit_index !== index)' :disabled='is_editing'>编辑职位信息</el-button>
                            <el-button size="mini" @click="togglePosition(index)" v-if='(edit_index !== index)' :disabled='is_editing'>
                                <span v-if='item.status === 732'>结束该职位招聘</span>
                                <span v-if='item.status === 733'>开始该职位招聘</span>
                            </el-button>
                            <el-button size="mini" @click="saveEdit(item.id)" v-if='is_editing && (edit_index === index)'>保存修改</el-button>
                            <el-button size="mini" @click="cancelEdit" v-if='is_editing && (edit_index === index)'>取消修改</el-button>
                        </el-row>
                        <el-row class="text-editor">
                            <el-col v-html='item.content' v-if='(edit_index !== index)'></el-col>
                            <vue-editor v-if='is_editing && (edit_index === index)' id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.content" :disabled="editorDisabled"></vue-editor>
                        </el-row>
                    </el-main>
                    <el-footer>
                        <el-row :gutter="20" class='data-preview'>
                            <el-button class='button' :span="6" @click='platformManage(item, index)'>
                                {{item.platform ? Object.keys(item.platform).length : 0}}
                                个平台已发布
                            </el-button>
                            <el-button class='button first' :span="6" @click='processManage(item, index, $event)'>
                                {{item.wait_interview ? item.wait_interview : 0}}
                                人已约面试
                            </el-button>
                            <el-button class='button second' :span="6" @click='processManage(item, index, $event)'>
                                {{item.after_interview ? item.after_interview : 0}}
                                人面试完毕
                            </el-button>
                            <el-button class='button third' :span="6" @click='processManage(item, index, $event)'>
                                {{item.wait_entry ? item.wait_entry : 0}}
                                人等待入职
                            </el-button>
                            <el-button class='button fourth' :span="6" @click='processManage(item, index, $event)'>
                                {{item.after_entry ? item.after_entry : 0}}
                                人已入职
                            </el-button>
                        </el-row>
                    </el-footer>
                </el-container>
                <div class='dotted-line'></div>
            </div>
        </div>
        <!--招聘详情结束-->
        <div class="empty" v-if="!positionList.length && !loadingRecruit">暂无数据</div>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <!--切换招聘状态dialog开始-->
        <el-dialog :visible.sync="togglePositionDialogVisible" width="30%" center>
            <div class='close-tips' v-if='position_status === 732'>确定结束该岗位的招聘吗</div>
            <div class='close-tips' v-if='position_status === 733'>确定开始该岗位的招聘吗</div>
            <span slot="footer" class="dialog-footer">
                <el-button size='small' @click="togglePositionDialogVisible = false">取 消</el-button>
                <el-button size='small' type="primary" @click="confirmTogglePosition(positionList[position_index].id)">确 定</el-button>
            </span>
        </el-dialog>
        <!--切换招聘状态dialog结束-->
        <!--选择岗位dialog开始-->
        <el-dialog :visible.sync="selectPositionDialogVisible" width="30%" center>
            <el-form ref="form" :model="form" label-width="80px" inline>
                <el-form-item label="部门">
                    <el-input v-model="department_name_form" @focus="chooseDepart" placeholder="请选择部门" readonly>
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
                    <el-select v-model="form.position_id" placeholder="请选择岗位" :disabled="position.length < 1" @change='selectPositionName'>
                        <el-option v-for="(item, index) in position" :key='index' :label='item.name' :value='item.id'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size='small' @click="cancelPositionInfo">取 消</el-button>
                <el-button size='small' type="primary" @click="savePositionInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!--选择岗位dialog结束-->
        <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize" @selectMember="selectMember"></organization>
        <AddNewPosition :newPositionDialog="newPositionDialog" @close="closeModal"></AddNewPosition>
        <Platform :platformDialog="platformDialog" @close="closeModal"></Platform>
        <ProcessManage :processDialog="processDialog" :id='id' :active_name='active_name' @close="closeModal"></ProcessManage>
    </div>
</template>
<script>
    import {VueEditor} from 'vue2-editor';
    import Organization from '../common/organization.vue';
    import AddNewPosition from './components/addNewPosition.vue';
    import { setTimeout } from 'timers';
    import Platform from './components/platformManage.vue';
    import ProcessManage from './components/processManage.vue';
    export default {
        name:'recruitManage',
        components: {Organization, AddNewPosition, VueEditor, Platform, ProcessManage},
        data(){
            return{
                active_name:'first',
                page: 1,
                total:0,
                loadingRecruit: true,
                newPositionDialog: false,
                editorDisabled: false,
                is_editing:false,
                edit_index:'',
                togglePositionDialogVisible:false,
                selectPositionDialogVisible:false,
                position_index:'',
                position_status:'',
                duty_id:'',
                duty:[],
                position:[],
                file:{},
                formInline: {
                    company: '',
                    department_id: '',
                    position: '',
                    status: 732,
                },
                params:{
                    limit: '12',
                    page:1,
                    keywords:'',
                    org_id:'',
                    status:732,
                },
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
                },
                department_name_search:'',
                department_name_form:'',
                position_name:'',
                position_name_fake:'',
                status:[],
                sex:[],
                education:[],
                experience:[],
                organizeVisible: false,
                organizeType: '',
                positionList:[],
                /** 平台*/
                platformDialog: false,
                /** 流程**/
                processDialog: false,
                id:'',
                /***面试**********/
            }
        },
        watch: {
            togglePositionDialogVisible(val){
                // console.log(val);
                if(!val){
                    this.position_index = '';
                    this.position_status = '';
                }
            },
        },
        created(){
            this.getPositionList();
            this.getDictionary();
        },
        methods:{
            //分頁
            handleSizeChange(){

            },
            handleCurrentChange(pagers){
                this.params.page = pagers;
                this.search();
                this.$nextTick(() => {
                    document.documentElement.scrollTop = 0;
                })
            },
            //搜索
            search(){
                this.getPositionList();
            },
            //新增职位
            addNewPosition(){
                this.newPositionDialog = true;
            },
            //编辑职位
            editPosition(index){
                this.is_editing = true;
                this.edit_index = index;
                this.position_name = this.positionList[index].role.name;
                this.form.org_id = this.positionList[index].org_id;
                this.form.position_id = this.positionList[index].position_id;
                this.form.year.min = this.positionList[index].year.min;
                this.form.year.max = this.positionList[index].year.max;
                this.form.gender = this.positionList[index].gender;
                this.form.salary.min = this.positionList[index].salary.min;
                this.form.salary.max = this.positionList[index].salary.max;
                this.form.experience = this.positionList[index].experience;
                this.form.education = this.positionList[index].education;
                this.form.number.min = this.positionList[index].number.min;
                this.form.number.max = this.positionList[index].number.max;
                this.form.content = this.positionList[index].content;
            },
            //保存职位修改
            saveEdit(id){
                this.$http.put(globalConfig.server + 'hrm/recruitment/' + id, this.form).then(res => {
                    if(res.data.code === '10030'){
                        this.$notify({
                            title:'成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.initData();
                        this.getPositionList();
                    }else if(res.data.code == '10032'){
                        this.$notify({
                            title:'警告',
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            //取消职位修改
            cancelEdit(){
                this.initData()
            },
            //打开开始/结束招聘对话框
            togglePosition(index){
                this.position_index = index;
                this.position_status = this.positionList[index].status;
                this.togglePositionDialogVisible = true;
            },
            //确定开始/结束职位招聘
            confirmTogglePosition(id){
                this.$http.put(globalConfig.server + 'hrm/recruitment/' + id, {'update':'status'}).then(res => {
                    if(res.data.code === '10030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.togglePositionDialogVisible = false;
                        this.getPositionList()
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.data.msg,
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.togglePositionDialogVisible = false;
                        },1500)
                    }
                })
            },
            //初始化form级修改相关信息
            initData(){
                this.is_editing = false;
                this.edit_index = '';
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
            },
            //获取招聘列表
            getPositionList(){
                this.positionList = [];
                this.loadingRecruit = true;
                this.$http.get(globalConfig.server + 'hrm/recruitment', {params:this.params}).then(res => {
                    if(res.data.code === '10000' || res.data.code === '70000'){
                        this.loadingRecruit = false;
                        this.total = res.data.data.count;
                        this.positionList = res.data.data.data;
                        this.positionList.forEach(item => {
                        });
                    }else{
                        this.loadingRecruit = false;
                        this.total = 0;
                        this.positionList = [];
                    }
                })
            },
            //获取已约面试/面试结束/等待入职/已经入职数据
            getInterviewDated(){
                if(this.recruitID.length){
                    this.recruitID.forEach((item, index) => {
                        //已约面试
                        this.$http.get(globalConfig.server + 'hrm/interview?search=&status=1&recruitment_id=' + item).then(res => {
                            if(res.data.code === '20000'){
                                this.$set(this.positionList[index], 'interviewDated', res.data.data.count)
                            }
                        });
                        //面试完毕
                        this.$http.get(globalConfig.server + 'hrm/interview?search=&status=2&recruitment_id=' + item).then(res => {
                            if(res.data.code === '20000'){
                                this.$set(this.positionList[index], 'interviewFinished', res.data.data.count)
                            }else{
                                this.interviewFinished = {}
                            }
                        });
                        //等待入职
                        this.$http.get(globalConfig.server + 'hrm/interview?search=&status=3&recruitment_id=' + item).then(res => {
                            if(res.data.code === '20000'){
                                this.$set(this.positionList[index], 'toInduct', res.data.data.count)
                            }else{
                                this.toInduct = {}
                            }
                        });
                        //已经入职
                        this.$http.get(globalConfig.server + 'hrm/interview?search=&status=4&recruitment_id=' + item).then(res => {
                            if(res.data.code === '20000'){
                                this.$set(this.positionList[index], 'inducted', res.data.data.count)
                            }else{
                                this.inducted = {}
                            }
                        });
                    })
                }
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
                    if(res.code === '30010'){
                        this.status = res.data
                    }
                });
            },
            //状态
            getStatus(_id){
                let str = ''
                this.status.forEach(item => {
                    if(item.id === _id){
                        // console.log(item.dictionary_name)
                        str = item.dictionary_name;
                        return str 
                    }
                })
            },
            //打开组织架构
            chooseDepart(){
                this.organizeVisible = true;
            },
            //清空部门
            closeDepart(){
                if(!this.selectPositionDialogVisible){
                    this.params.org_id = '';
                    this.department_name_search = '';
                }else{
                    this.form.org_id = '';
                    this.department_name_form = ''
                }
                
            },
            //选择部门
            selectMember(val){
                if(!this.selectPositionDialogVisible){
                    // console.log(val);
                    this.params.org_id = val[0].id;
                    this.department_name_search = val[0].name;
                }else{
                    this.duty = [];
                    this.duty_id = '';
                    this.position = []
                    this.form.position_id = '';
                    this.form.org_id = val[0].id;
                    this.department_name_form = val[0].name;
                    this.getPosition(this.form.org_id);
                }
            },
            //获取部门
            getPosition(id) {
                this.$http.get(globalConfig.server + 'organization/duty?org_id=' + id).then((res) => {
                    if (res.data.code === '20000') {
                        this.duty = res.data.data.data;
                        // console.log(res.data.data.data)
                    }
                });
            },
            //获取职位
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
            //打开选择岗位弹框
            openSelectPositionDialog(){
                this.selectPositionDialogVisible = true;
                this.form.position_id = '';
                this.form.org_id = '';
            },
            //保存职位相关信息
            savePositionInfo(){
                this.position_name = this.position_name_fake;
                this.selectPositionDialogVisible = false;
                this.duty = [];
                this.duty_id = '';
                this.position = [];
                this.department_name_form = '';
            },
            //取消保存
            cancelPositionInfo(){
                this.selectPositionDialogVisible = false;
                this.duty = [];
                this.duty_id = '';
                this.position = [];
                this.department_name_form = '';
                this.editPosition(this.edit_index);
            },
            //选择岗位名称
            selectPositionName(item){
                this.position.forEach(i => {
                    if(i.id === item){
                        this.position_name_fake = i.name
                    }
                })
            },
            //关闭组织架构
            closeOrganize(){
                this.organizeVisible = false
            },
            //关闭弹框
            closeModal(){
                this.newPositionDialog = false;
                this.platformDialog = false;
                this.processDialog = false;
                this.getPositionList();
            },
           /************************* 平台相关*************************************/
           platformManage(item, index){
               this.platformDialog = true;
               this.$store.dispatch('toEdit',item)
           },
           /************************* 流程管理*************************************/
           processManage(item, index, event){
            //    console.log(item)
               this.$store.dispatch('savePositionInfo', item)
               this.id = item.id;
               this.processDialog = true;
               if(event.path[1].className.indexOf('first') > -1 || event.target.classList.contains('first')){
                   this.active_name = 'first'
               }
               if(event.path[1].className.indexOf('second') > -1 || event.target.classList.contains('second')){
                   this.active_name = 'second'
               }
               if(event.path[1].className.indexOf('third') > -1 || event.target.classList.contains('third')){
                   this.active_name = 'third'
               }
               if(event.path[1].className.indexOf('fourth') > -1 ||  event.target.classList.contains('fourth')){
                   this.active_name = 'fourth'
               }
           }
        }
    }
</script>
<style lang="scss" scoped>
    #recruitManage{
        min-height: 790px;
        position: relative;
        height: 100%;
        padding: 0 30px;
        .positionTitle{
            font-weight: 700;
            font-size: 16px;
            font-weight: 700;
            font-size: 16px;
            color: rgb(16, 16, 16);
            font-style: normal;
            letter-spacing: 0px;
            line-height: 24px;
        }
        .position-info{
            font-family: SourceHanSansSC;
            font-weight: 400;
            font-size: 14px;
            color: #555;
            font-style: normal;
            letter-spacing: 0px;
            line-height: 20px;
            text-decoration: none;
        }
        .position{
            font-weight: 700;
        }
        .positionList{
            margin-top: 50px;
        }
        .text-editor{
            margin: 20px 0;
        }
        .close-tips{
            text-align: center;
        }
        .empty{
            text-align: center;
            padding: 100px 0;
            height: 100%;
        }
        .data-preview{
            .button{
                border: none;
                color: rgb(0, 150, 136);
                margin: 0 60px 0 0;
            }
        }
        .dotted-line{
            border-bottom: dotted 1px rgba(187, 187, 187, 1);
            margin-bottom: 50px;
        }
        .el-header{
            height: 40px !important;
        }
        .el-pagination {
            text-align: right;
        }
        .block{
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
</style>

