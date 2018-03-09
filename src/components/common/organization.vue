<template>
  <div id="organizationId">
    <el-dialog title="选人" :visible.sync="organizationVisible" width="785px" center :modal="false">
      <div class="content">

        <div class="content_left" @click="inputFocus">
          <div style="display:flex;flex-wrap: wrap;">
            <div v-for="item in selectMember" style="height: 40px;line-height: 40px">
              <el-tag type="info" closable size="medium" @close="handleClose(item)" style="margin-left:10px">{{item.name}}</el-tag>
            </div>
            <div style="flex-grow:1">
              <el-input id="search" placeholder="请输入企业联系人" @keyup.native="remoteMethod"
                        @keydown.8.native="backSpace" v-model="keywords" style="border: none"
                        @keydown.down.native="changeDown" @keydown.up.native="changeUp" @keydown.13.native='keyDownAdd'></el-input>
            </div>
          </div>
          <div class="searchItems">
            <ul class="scroll_bar" id="searchList" v-if="searchItems.length>0">
              <li v-for="(item,index) in searchItems" @click="selectSearchItem(item)" :class="{'hov':active_li==index}">
                <div style="display: flex;">
                  <div class="head">
                    <img src="../../assets/images/head.jpg" :class="selectIdMember.indexOf(item.id)>-1?'':'gray'">
                  </div>
                  <div class="infoBox">
                    <div class="info">{{item.name}}</div>
                    <div class="info">{{item.phone}}</div>
                  </div>
                </div>

                <i class="el-icon-check" style="float: right" v-if="selectIdMember.indexOf(item.id)>-1"></i>

              </li>
            </ul>
          </div>
        </div>
        <div class="content_right">
          <div class="box">
            <div class="boxHead">{{highestDepart}}</div>

            <div class="breadcrumb-wrapper scroll_bar">
              <div class="breadcrumb">
                <a>
                  <span @click="breadcrumbSearch(1)">{{highestDepart}}</span>
                </a>
                <a v-for="(item,index) in breadcrumbList" @click="breadcrumbSearch(item,index)">
                  <span>&nbsp;&gt;&nbsp;{{item.name}}</span>
                </a>
              </div>
              <div class="box-body">
                <ul>
                  <!--<li>-->
                    <!--<el-checkbox>全选</el-checkbox>-->
                  <!--</li>-->
                  <li v-for="item in organizeList">
                    <!--<div @click="getNextLevel(item,$event)">-->
                    <!--<el-checkbox ></el-checkbox>-->
                    <!--<span style="margin-left: 6px">{{item.name}}</span>-->
                    <!--</div>-->
                    <!--<div>({{item.users}}人)</div>-->

                    <el-checkbox-group v-model="checkedIdBox" @change="checkDepart(item,$event)">
                      <el-checkbox  :disabled="noDepart" :label="item.id" :key="item.id">{{item.name}} ({{item.users}}人)</el-checkbox>
                    </el-checkbox-group>

                    <el-button type="text" :disabled="checkedIdBox.indexOf(item.id)>-1" class="lowerLevel"
                               @click="getNextLevel(item,$event)">丨 下级</el-button>
                  </li>
                  <li v-for="item in departmentStaff" @click="selectStaff(item)">
                    <div>
                      <div class="head">
                        <img src="../../assets/images/head.jpg" alt="">
                        <!--对号-->
                        <span class="el-icon-check" v-if="selectIdMember.indexOf(item.id)>-1"></span>
                        <!--遮罩-->
                        <span class="shade" v-if="selectIdMember.indexOf(item.id)>-1"></span>
                      </div>
                      <div class="infoBox">
                        <div class="info">{{item.name}}</div>
                        <div class="info">{{item.org[0].name}}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="buttonStatus" @click="confirmSelect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['organizationDialog','length','type'],
    data () {
      return {
        organizationVisible: false,
        buttonStatus :true,   //确认按钮禁用状态

        searchItems: [],    //搜索到人员
        keywords : '',

        organizeList:[],    //组织架构部门列表
        departmentStaff:[],//右侧员工聊表
        breadcrumbList:[],  //面包屑列表

        selectMember: [],     //已选数组
        selectIdMember:[],    //左侧选择id
        checkedIdBox:[],//已选部门id数组
        //键盘
        active_li: -1,  //键盘上下被选中li
        hoverMember:[], //键盘悬浮成员
        highestDepart:'',   //最高级岗位

        noStaff:true,
        noDepart:false,
        memberLength:0,
      }
    },
    mounted() {

    },
    watch:{
      organizationDialog(val){
        this.organizationVisible = val;
        this.getDepartment(1);
      },
      organizationVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      keywords(val){
        if (val){
          this.$http.get(globalConfig.server_user+'api/v1/users?q='+this.keywords).then((res) => {
            if(res.data.status === 'success'){
              this.searchItems = res.data.data;
            }
          })
        }else {
          this.searchItems = [];
        }
      },
      type(val){
        if(val){
          if(val==='depart'){
            this.noStaff = true;
            this.noDepart = false;
          }else if(val==='staff'){
            this.noStaff = false;
            this.noDepart = true;
          }else {
            this.noStaff = false;
            this.noDepart = false;
          }
        }
      },
      length(val){
        if(val){
            this.memberLength = val;
        }
      },
      selectMember(val){
        this.buttonStatus = !val.length;
        if(val.length>0){
          if(val[val.length-1].hasOwnProperty("phone") && this.noStaff){
            this.selectMember.pop();
            this.selectIdMember.pop();
            this.$notify({
              title: '警告',
              message: '选择超过限制（不可以选择员工）',
              type: 'warning'
            });
          }

          if(val.length>this.memberLength&&this.memberLength){
            this.selectMember.pop();
            this.selectIdMember.pop();
            this.checkedIdBox.pop();
            this.$notify({
              title: '警告',
              message: '选择超过限制(最多选择'+this.memberLength+'个)',
              type: 'warning'
            });
          }
        }
      }
    },
    methods:{
      getDepartment(id){
        this.$http.get(globalConfig.server_user+'api/v1/organizations/1').then((res) => {
          if(res.data.status === 'success'){
            this.highestDepart = res.data.data.name;
          }
        });
        this.$http.get(globalConfig.server_user+'api/v1/organizations?parent_id='+id).then((res) => {
          if(res.data.status === 'success'){
            this.organizeList = res.data.data;
          }
        });
        this.$http.get(globalConfig.server_user+'api/v1/users?org_id='+id).then((res) => {
          if(res.data.status === 'success'){
            this.departmentStaff = res.data.data;
          }
        })
      },

      //*******************左侧********************
      //搜索列表选择
      selectSearchItem(item){
        let isExist = null;
        isExist = this.isExist(item,this.selectMember);
        if(isExist){
          this.filterSelectMember(item);
        }else {
          this.selectMember.push(item)
          this.selectIdMember.push(item.id)
        }
      },

      //删除标签页
      handleClose(item){
        this.filterSelectMember(item);
      },
      //回车删除事件
      backSpace(){
        this.hoverMember = [];
        if (this.keywords === '' && this.selectMember.length > 0) {
          this.selectMember.pop();
          this.selectIdMember.pop();
          this.checkedIdBox.pop();

        }
      },
      //键盘向下事件
      changeDown(){
        if (this.searchItems.length !== 0) {
          this.active_li++;
          if (this.active_li === this.searchItems.length) this.active_li = this.searchItems.length - 1;
          this.hoverMember = this.searchItems[this.active_li];
          if (this.active_li > 2) document.getElementById('searchList').scrollTop += 50;
        }
      },
      //键盘向上事件
      changeUp(){
        if (this.searchItems.length !== 0) {
          this.active_li--;
          if (this.active_li <= -1) {
            this.active_li = -1;
            this.hoverMember = [];
          } else if (this.active_li > -1) {
            this.hoverMember = this.searchItems[this.active_li];
          }
          if (this.active_li < this.searchItems.length - 4) document.getElementById('searchList').scrollTop -= 50;
        }
      },
      //键盘添加事件
      keyDownAdd(){
        if(!Array.isArray(this.hoverMember)){
          let isExist = null;
          isExist = this.isExist(this.hoverMember,this.selectMember);
          if(isExist){
            this.filterSelectMember(this.hoverMember);
          }else {
            this.selectMember.push(this.hoverMember)
            this.selectIdMember.push(this.hoverMember.id)
          }
        }
      },
      isExist(select, selectMember){     //判断该id是否已经被选中
        for (let i = 0; i < selectMember.length; i++) {
          if (select.id === selectMember[i].id && select.name === selectMember[i].name) {
            return true;
          }
        }
        return false;
      },
      //filter
      filterSelectMember(item){
        for(let i=0; i<this.selectMember.length;i++){
          if(item.id===this.selectMember[i].id && item.name===this.selectMember[i].name){
            this.selectMember.splice(i,1)
            this.selectIdMember.splice(i,1)
            this.checkedIdBox.splice(i,1)
          }
        }
      },

      //***************右侧组织架构********************
      //选取部门
      checkDepart(item,e){
        let isExist = null;
        isExist = this.isExist(item,this.selectMember);
        if(isExist){
          for(let i=0; i<this.selectMember.length;i++){
            if(item.id===this.selectMember[i].id && item.name===this.selectMember[i].name){
              this.selectMember.splice(i,1)
            }
          }
        }else {
          this.selectMember.push(item)
        }
      },
      //搜索下级部门
      getNextLevel(item,event){
        if(event.target.className!=='el-checkbox__inner'&&event.target.className!=='el-checkbox__original'){
          this.getDepartment(item.id);
          this.breadcrumbList.push(item)
        }

      },
      //面包屑搜索
      breadcrumbSearch(item,index){
        if(item === 1){
          this.getDepartment(1);
          this.breadcrumbList = [];
        }else {
          this.getDepartment(item.id);
          this.breadcrumbList.splice(index + 1, this.breadcrumbList.length);
        }
      },
      remoteMethod() {

      },

      inputFocus(){
        let _input = document.getElementById('search');
        _input.focus();
      },

      selectStaff(item){
        let isExist = null;
        isExist = this.isExist(item,this.selectMember);
        if(isExist){
          for(let i=0; i<this.selectMember.length;i++){
            if(item.id===this.selectMember[i].id && item.name===this.selectMember[i].name){
              this.selectMember.splice(i,1);
              this.selectIdMember.splice(i,1);
            }
          }
        }else {
          this.selectMember.push(item);
          this.selectIdMember.push(item.id);
        }
      },

      //确定选择并发送
      confirmSelect(){
        this.organizationVisible = false;
        this.$emit('selectMember',this.selectMember);

        this.selectMember = [];       //已选数组
        this.selectIdMember = [];     //左侧选择id
        this.checkedIdBox = [];       //已选部门id数组
        this.noStaff = false;
        this.noDepart = false;
        this.memberLength = 0;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .gray {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }

  .hov {
    background: #f5f7fa;
  }
  #organizationId{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          .content{
            height: 442px;
            font-size: 0;
            .content_left{
              font-size: 14px;
              float: left;
              width: 440px;
              height: 440px;
              background: #fff;
              margin-right: 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-sizing: border-box;
              /*overflow: hidden;*/
              &:hover{
                border-color: #83c7ff;
              }
              .searchItems{
                ul {
                  height: 396px;
                  overflow: auto;
                  background: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  li {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    padding: 5px 20px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    &:hover{
                      background: #f5f7fa;
                    }
                    .head {
                      font-size: 12px;
                      float: left;
                      height: 35px;
                      width: 35px;
                      border-radius: 50%;
                      margin-right: 5px;
                      position: relative;
                      img {
                        height: 35px;
                        width: 35px;
                        border-radius: 50%;
                      }
                    }
                    .infoBox {
                      height: 36px;
                      .info {
                        height: 20px;
                        line-height: 20px;
                        font-size: 15px;
                        &:last-child {
                          font-size: 12px;
                          height: 16px;
                          line-height: 16px;
                          color: #999;
                        }
                      }
                    }
                  }
                }
              }
            }
            .content_right{
              font-size: 14px;
              float: right;
              width: 300px;
              height: 440px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-sizing: border-box;
              div{
                max-height: 440px;
                .boxHead{
                  text-align: center;
                  padding: 5px 0;
                }
                .breadcrumb-wrapper{
                  height: 405px;
                  overflow: auto;
                  .breadcrumb{
                    padding: 0 15px;
                    a:not(last-child){
                      color: #409EFF;
                      cursor: pointer;
                    }
                  }
                }
                .box-body{
                  ul{
                    padding: 0;
                    li{
                      padding: 5px 20px;
                      box-sizing: border-box;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;

                      .lowerLevel{
                        color: #bbb;
                        &:hover{
                          color: #6a8dfb;
                        }
                      }
                      &:hover{
                        background: rgb(223, 237, 250);;
                      }
                      list-style-type: none;
                      height: 50px;
                      .head{
                        font-size: 12px;
                        float: left;
                        height: 35px;
                        width: 35px;
                        border-radius: 50%;
                        margin:4px 5px 0 0;
                        position: relative;
                        img{
                          height: 35px;
                          width: 35px;
                          border-radius: 50%;
                        }
                        .el-icon-check{
                          color: #ffffff;
                          font-size: 20px;
                          position: absolute;
                          left: 50%;
                          top: 50%;
                          transform: translate(-50%,-50%);
                          z-index: 1
                        }
                        .shade {
                          width: 35px;
                          height: 35px;
                          background: #777777;
                          position: absolute;
                          left: 0;
                          top: 0;
                          border-radius: 50%;
                          opacity: .6
                        }
                      }
                      .infoBox{
                        float: left;
                        .info{
                          height: 20px;
                          font-size: 15px;
                          &:last-child{
                            font-size: 12px;
                            height: 16px;
                            color: #999;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .el-dialog__footer{
          .dialog-footer{
            .el-button{
              padding: 10px 20px;
              width: 150px;
            }
          }
        }
      }
    }
  }

</style>
