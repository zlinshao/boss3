<template>
  <div id="staffManage" >
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="border left">
          <div class="top">
            <div>
              组织架构
            </div>

          </div>
          <div id="dragTree">
            <el-tree ref="expandMenuList" class="expand-tree"
                     :data="setTree"
                     node-key="id"
                     highlight-current
                     accordion
                     check-strictly
                     @node-click="nodeClick"
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
                     :default-expanded-keys="defaultExpandKeys"
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     :render-content="renderContent">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="border right">


          <div class="rightdiv" style="padding: 10px;">
            <el-button @click="updatestute" type="primary">上传</el-button>
            <el-button @click="lookingstute" type="primary">预览</el-button>
            <div v-if="lookingflag">
            <div v-if="arr[a] ==index" class="imgdiv" v-for="(key,index) in form.image_pic" :key="key.id">
              <img :src="pic.uri" v-for="pic in key" :key="pic.id" />
            </div>

            <div style="height:40px; margin-top: 10px">
              <div v-if="len">
              <el-button v-show="a <= len-1 && a>0 " class="elbuttom1" size="small" @click="preimg" type="primary">上一张</el-button>
              <el-button v-show="a == 0" class="elbuttom1" size="small" type="info">上一张</el-button>
              <el-button v-show="a < len - 1" class="elbuttom2" size="small" @click="nextimg" type="primary">下一张</el-button>
              <el-button v-show="a == len -1" class="elbuttom2" size="small"  type="info">下一张</el-button>
              </div>
 
            </div>
            </div>
            <div v-show="updateflag">
            <div style="width:140px;">
              <Dropzone :ID="'cover'" @getImg="photo_success" :editImage="cover_pic" :isClear="isClear"></Dropzone>
            </div>
            <div style="margin-top:10px;margin-left:45%;"><el-button type="primary" @click="save">保存</el-button></div>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
    <EditDepart :editDepartDialog="editDepartDialog" :departId="departId" :departName="departName" :topId="topId" @close="closeEditDepart"></EditDepart>
    <AddDepart :addDepartDialog="addDepartDialog" :parentId="parentId" :parentName="parentName"  @close="closeAddDepart"></AddDepart>

  </div>
</template>

<script>
  import TreeRender from './components/treeRender.vue'
  import Dropzone from '../../../common/UPLOAD.vue'
  import EditDepart from './components/editdepar.vue'
  import AddDepart from './components/addDepart.vue'

  export default{
    name: 'tree',
    components:{EditDepart,AddDepart,Dropzone},
    data(){
      return{ 
        cover_pic: {}, 
        a:0,
        len:null,
        setTree: [],
        uploadStatus: false,
        defaultProps: {
          children: "son",
          label: "title"
        },
        defaultExpandKeys: [],//默认展开节点列表
        updateflag:false,
        lookingflag:false,
        form:{
          id:'',
          title:'',
          type:'',
          image_pic:[],
          pid:''
        },
        //......................

        editDepartDialog:false, //编辑部门模态框
        addDepartDialog:false, //新建部门模态框
        totalStaffNum : 0,
        departId:null,
        departName:null,
        topId:null,
        parentId:null,
        parentName:null,
        loading:true,
        onlyPositionId:'',  //职位id
        isClear: false,
        department_id:'',  //y用于监听部门变化
        department_name:"",
        arr:[],
        cover_id:[],
      }
    },
    mounted(){
    
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getDepart();
    },
    watch:{
    },
    methods: {
      preimg(){
        this.a = this.a-1;
      },
      nextimg(){
        this.a = this.a+1;
      },
      updatestute(){
        this.updateflag = true;
        this.lookingflag = false;
        this.cover_pic=[];
        this.$http.get(globalConfig.server+'des/info/' + this.form.id).then((res) => {
          let pic = res.data.data.album;
          let arrm = {};
          this.cover_id = [];
          for (let key in pic) {
            this.cover_id.push(key);
            for (let i = 0; i < pic[key].length; i++) {
            arrm[key] = pic[key][i].uri;
            }
          }
          this.cover_pic = arrm;    
        })
      },
      lookingstute(){
        this.a =0;
        this.len=null;
        this.lookingflag = true;
        this.updateflag = false;
        this.arr=[];
        this.form.image_pic=[];
        this.$http.get(globalConfig.server+'des/info/' + this.form.id).then((res) => {
          this.form.image_pic = res.data.data.album;
          for( let key in this.form.image_pic)
          this.arr.push(key);
          this.len = this.arr.length;
        })
      },
      // 上传成功
      photo_success(val) {
        if(val){
          this.form.image_pic = val[1];
          this.uploadStatus = val[2];
        }
      },
      //**************部门操作函数********************
      //获取部门数据
      getDepart(){
        this.$http.get(globalConfig.server+'des/tree').then((res) => {
          this.setTree = res.data.data;
          this.form.id = res.data.data[0].id;
          this.form.pid = res.data.data[0].pid;
          this.form.title = res.data.data[0].title;
          this.defaultExpandKeys.push(res.data.data[0].id)
        })
      },

      //点击节点
      nodeClick(data,node,store){
        this.isClear=!this.isClear;
        this.cover_pic=[];
        this.a =0;
        this.len=null;
        this.form.id = data.id;
        this.form.pid = data.pid;
        this.form.title = data.title;
        this.updateflag = false;
        this.lookingflag = false;
      },
      nodeExpand(data,node,store){
      },
      nodeCollapse(data,node,store){
      },
      handleAdd(s,d,n){//增加节点
        this.addDepart(d);
      },
      handleEdit(s,d,n){//编辑节点
        this.editDepart(d);
      },
      handleDelete(s,d,n){//删除节点
        this.$confirm('您确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDpr(d.id);
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消删除'
          });
        });
      },
      //新建部门
      addDepart(data){
        this.parentId = data.id;
        this.parentName = data.title;
        this.addDepartDialog = true
      },
      closeAddDepart(val){
        this.addDepartDialog = false;
        this.parentId = null;
        this.parentName = null;
        if(val === 'success'){
          this.getDepart();
        }
      },
      //删除部门
      deleteDpr(id){
        this.$http.get(globalConfig.server+'des/del/'+id).then((res) =>{
          if(res.data.code === '188200'){
            this.$notify({
              title: '成功',
              message: '删除成功',
              type:'success'
            });
            
            this.getDepart();
          }else {
            this.$notify({
              title: '警告',
              message: res.data.msg,
              type:'warning'
            });
          }
        })
      },
      save(){
        if(this.uploadStatus){
          this.$notify.warning({
            title: '警告',
            message: '图片上传中，请稍后'
          });
          return;
        }
        this.$http.put(globalConfig.server+'des/update',this.form).then((res) =>{
          if(res.data.code === '188200'){
            this.$notify({
              title: '成功',
              message: '保存成功',
              type:'success'
            });
            this.isClear=!this.isClear;
            this.updateflag = false
          }else {
            this.$notify({
              title: '警告',
              message: res.data.msg,
              type:'warning'
            });
          }
        })        
      },
      //编辑部门
      editDepart(data){
        this.departId = data.id;
        this.departName= data.title;
        this.topId=data.pid;
        this.editDepartDialog = true;
      },
      //编辑部门回调
      closeEditDepart(val){
        this.editDepartDialog = false;
        this.departId = null;
        if(val === 'success'){
          this.getDepart();
        }
      },

      //********************员工操作函数****************



      //********************树配置操作函数****************
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },


      //************列表变色************
      tableRowClassName({row, rowIndex}) {
        if (row.id === this.onlyPositionId) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="" lang="scss">
  #staffManage{
    min-height: 790px;
    .border{
      border: 1px solid #f0f7ff;
      border-radius: 4px;
      min-height: 790px;
      .top{
        padding:0 10px;
        height: 40px;
        background: #dfe6fb;
        color: #787a7e;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

    }


    .right{
      .top{
        display: flex;
        justify-content: space-between;
      }
      .filter{
        padding: 10px 10px 0 10px;
      }
      .rightdiv{
        .elbuttom1{
          float: left;
          margin-left:15%;
        }
        .elbuttom2{
          float: right;
          margin-right: 15%;
        }
        .imgdiv{
          margin-top:20px;
        }
        .imgdiv img{
          max-width:850px;
          max-height: 550px;
          width:100%;
          height:100%;     
          margin:0 auto;
          display: block;
        }
      }
    }
  }
</style>
