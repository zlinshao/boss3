<template>
    <div id="resignationManagement" @click="show = false" @contextmenu="closeMenu">
      <div class="top">
        <el-form ref="params" :model="params" label-width="80px">
          <el-row>
            <el-col :span="6">
              <!-- 无意义仅占位 -->
              <div style="visibility: hidden;">无意义仅占位</div>  
            </el-col>
            <el-col :span="5">
              <el-form-item label="部门">
                <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal()" size="mini">
                  <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="离职时间">
                <el-date-picker v-model="params.leave_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-col :span="16">
                <el-form-item>
                  <el-input v-model="params.keywords" placeholder="请输入关键字" size="mini" @keyup.enter.prevent.native="getResignationEmploye" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-button type="primary" size="mini" @click="getResignationEmploye">搜 索</el-button>
                  <el-button type="primary" size="mini" @click="resignationSMS">离职短信</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table 
          :data="resignationData" 
          border 
          style="width: 100%" 
          v-loading="Loading"
          :empty-text="emptyText"  
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @row-contextmenu="openContextMenu">
          <el-table-column prop="name" label="姓名" >
            <template slot-scope="scope">
              <span @click="lookResigntionElempoly(scope.row.id)">{{scope.row.name}}</span>
              &nbsp;&nbsp;&nbsp;
               <i class="el-icon-edit" @click="editSecondaryEmployment(scope.row.id)" style="cursor: pointer;"></i>
            </template>
          </el-table-column>
          <el-table-column prop="orgStr" label="部门" ></el-table-column>
          <el-table-column prop="roleStr" label="岗位" ></el-table-column>
          <el-table-column prop="enroll" label="入职时间" ></el-table-column>
          <el-table-column prop="dismiss_time" label="离职时间" ></el-table-column>
          <el-table-column prop="is_on_job" label="离职操作时间" ></el-table-column>
          <el-table-column prop="phone" label="手机号码" ></el-table-column>
          <el-table-column prop="dismiss_type" label="离职类型" ></el-table-column>
          <el-table-column prop="dismiss_mess" label="离职备注" ></el-table-column>
          <el-table-column label="离职交接单" >
            <template slot-scope="scope">
              <el-button type="text" @click="addUploadFiles('1', scope.row)">编 辑</el-button>
              <!-- <el-button type="text" @click="addUploadFiles('1', scope.row)" v-if="!scope.row.resignation_form">添 加</el-button>
              <el-button type="text" @click="lookDeparture(scope.row)" v-else>查 看</el-button> -->
              <!-- <el-button type="text" @click="editDeparture(scope.row)" >修 改</el-button> -->
            </template>
          </el-table-column>
          <el-table-column label="合同" >
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="addUploadFiles('2', scope.row)" v-if="!scope.row.staff_extends.image_info || scope.row.staff_extends.image_info.length == 0">添 加</el-button> -->
              <el-button type="text" @click="getImagesContract(scope.row)">查 看</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="离职短信">
            <template slot-scope="scope">
              <el-button type="text" @click="messageList(scope.row.id)">查 看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 离职短信 -->
      <el-dialog title="离职短信" :visible.sync="messageDialogVisible" width="60%">
        <div class="blueTable">
        <el-table
          :data="tableData"
          :empty-text='tableStatus'
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          style="width: 100%">
          <el-table-column
            prop="create_time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="staffs.name"
            label="离职员工">
          </el-table-column>
          <el-table-column
            prop="operators.name"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="operators"
            label="操作人部门">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.operators.org" :key="index">{{item.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">发送失败</div>
              <div v-if="scope.row.status === 2">发送成功</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="messageDialogVisible = false" size="mini">取 消</el-button> -->
          <el-button type="primary" @click="messageDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 组织架构 -->
      <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></Organization>
      <!-- 上传文件 -->
      <el-dialog :title="titleName" :visible.sync="upLoadDialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="离职类型">
            <el-input v-model="dismiss_type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="离职原因">
            <el-input v-model="dismiss_mess" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上传离职图片">
            <UpLoad :ID="'editImageID'" :isClear="isClear" :editImage="editImage"  @getImg="upLoadFiles"></UpLoad>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="upLoadDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addResigntionTable" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看离职交接表 -->
      <!-- <el-dialog title="查看离职交接表" :visible.sync="viewResignationFrom" width="30%">
        <div style="margin-top: 10px;" v-if="imagesResignationList && imagesResignationList.length>0" class="lookImg">
          <img v-for="(img, index) in imagesResignationList" :src="img" :key="index" data-magnify="" :data-src="img" style="width: 30%;height: 100px; margin-left: 10px;"> 
        </div>
        <div v-else>暂无数据</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="viewResignationFrom = false" size="mini">确 定</el-button>
        </span>
      </el-dialog> -->
      <!-- 查看合同 -->
      <el-dialog title="查看合同" :visible.sync="viewContract" width="30%">
        <div style="margin-top: 10px;" v-if="imagesList && imagesList.length>0" class="lookImg">
          <img v-for="(img, index) in imagesList" :src="img" :key="index" data-magnify="" :data-src="img" style="width: 30%;height: 100px; margin-left: 10px;">
        </div>
        <div v-else>暂无数据</div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="viewContract = false">取 消</el-button> -->
          <el-button type="primary" @click="viewContract = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 离职员工详情 -->
      <RetiredEmployeeDetails :ids="ids" :lookResigntion="lookResigntion" @close="closeResigntion"></RetiredEmployeeDetails>
      <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 右键 -->
      <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show" @clickOperateMore="clickEvent"></RightMenu>
      <!-- 编辑员工 -->
      <SecondaryEmployment :editId="editId" :isEdit="isEdit" :lookSecondary="lookSecondary" @close="closeSecondary" :editor="editor"></SecondaryEmployment>
    </div>
    </div>
</template>

<script>
import Organization from '../../common/organization'  // 组织架构
import UpLoad from "../../common/UPLOAD"   // 上传文件
import RetiredEmployeeDetails from "./components/retiredEmployeeDetails"  // 离职员工详情
import RightMenu from "../../common/rightMenu"  // 右键
import SecondaryEmployment from "./components/secondaryEmployment"  // 编辑员工
export default {
  components: {Organization, UpLoad, RetiredEmployeeDetails, RightMenu, SecondaryEmployment},
  data() {
    return {
      tableStatus: ' ',
      messageParams: {
        staff_id: "",
        page: 1,
        limit: 12,
        time: [],
        search: '',   //模糊搜索
      },
      tableLoading: false,
      tableData: [],
      messageDialogVisible: false,
      editImage: {},
      emptyText: " ",
      Loading: false,
      isEdit: false,   // 编辑
      lookSecondary: false,
      editId: "",
      editor: false,   // 编辑接口
      secondaryID: "",  // 员工id
      rightMenuX: 0,
      rightMenuY: 0,
      lists: [],  // 右键列表
      show: false,  // 右键
      ids: "",
      lookResigntion: false,
      viewResignationFrom: false,
      imagesResignationList: [],
      viewContract: false,
      imagesList: [],
      dismiss_mess: "",
      dismiss_type: "",
      form: {
        resignation_form: [],
        user_id: "",
        dismiss_time: "",
        dismiss_reason: "",
        dismiss_mess: "",
        // is_ob_job: "",
        // dismiss_type: "",
      },
      titleName: "",
      upLoadDialogVisible: false,
      isClear: false,
      follow_name: "", //跟进人
      follow_id: "", // 部门ID
      organizationDialog: false,
      type: "",
      length: 0,
      params: {
        infinite: 20,  // 需要权限
        leave_time: [],
        keywords: "",
        org_id: 1,
        is_dimission: 1,
        limit: 12,
        page: 1,
        user_id: "",
        resignation_form: 1,
      },
      resignationData: [],
      total: 0,
    }
  },
  mounted() {
    this.getResignationEmploye();
  },
  watch: {
    isClear: function (val) {
      this.isClear = val;
    },
    upLoadDialogVisible(val) {
      if(!val) {
        this.isClear = !this.isClear;
        this.dismiss_mess = "";
        this.dismiss_type = "";
      }
    },
    editImage: {
      deep: true,
      handler(val) {
        console.log(val)
        this.editImage = val;
      }
    },
    viewResignationFrom(val) {
      if(!val) {
        this.imagesResignationList = [];
      }
    },
    viewContract(val) {
      if(!val) {
        this.imagesList = [];
      }
    }
  },
  methods: {
    // 离职短信表格
    messageList(id) {
      this.messageDialogVisible = true;
      this.tableLoading = true;
      this.tableStatus = ' ';
      this.messageParams.staff_id = id;
      this.$http.get(globalConfig.server + 'core/customer/smslist', {params: this.messageParams}).then((res) => {
        this.isHigh = false;
        this.tableLoading = false;
        if (res.data.code === '10000') {
          this.tableData = res.data.data.data;
          this.totalNum = res.data.data.count;
          if (res.data.data.data.length < 1) {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        } else {
          this.tableStatus = '暂无数据';
          this.tableData = [];
          this.totalNum = 0;
        }
      });
    },
    // 离职短信
    resignationSMS() {
      this.$router.push({path: "/leaveOffice"})
    },
    // 二次入职
    secondaryEmployment() {
      this.$confirm('将该员工的状态改为二次入职吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editSecondaryEmployment()
      })
    },
    // 右键
    openContextMenu(row, event) {
      this.secondaryID = row.id;
      this.lists = [
        {clickIndex: 'edit', headIcon: 'iconfont el-icon-edit', label: '二次入职'},  
      ];
      this.contextMenuParam(event);
    },
    // 右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'edit':
            this.secondaryEmployment();
          break;
        }
      },
     //关闭右键菜单
    closeMenu() {
      this.show = false;
    },
    //右键参数
    contextMenuParam(event) {
      let e = event || window.event;
      this.show = false;
      this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
      this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
      event.preventDefault();
      event.stopPropagation();
      this.$nextTick(() => {
        this.show = true
      })
    },
    // 二次编辑入职
    editSecondaryEmployment(id) {
      this.lookSecondary = true;
      this.isEdit = true;
      if(id) {
        this.editId = id;
        this.editor = true;
      } else {
        this.editId = this.secondaryID;
        // this.editor = false;
      }
    },
    closeSecondary() {
       this.lookSecondary = false;
        this.isEdit = false;
        this.editor = false;
       this.getResignationEmploye();
    },
    // 查看离职员工详情
    lookResigntionElempoly(id) {
      this.lookResigntion = true;
      this.ids = id;
    },
    closeResigntion() {
      this.lookResigntion = false;
      this.ids = "";
      this.getResignationEmploye();
    },
    // 上传文件
    upLoadFiles(val) {
      // console.log(val, "44444")
      this.form.resignation_form = val[1];
      // console.log(this.form.resignation_form, "55555")
    },
    addUploadFiles(val, row) {
      this.editImage = {};
      // console.log(row, "666666")
      this.form.user_id = row.id;
      let dismiss_reason = row.staffs.dismiss_reason;
      this.form.dismiss_reason = row.staffs.dismiss_reason;
      this.form.dismiss_time = row.staffs.dismiss_time;
      let obj  = {};
      if(row.resignation_form) {
        row.resignation_form.forEach((item, index) => {
          this.form.resignation_form.push(item.id)
          obj[item.id] = item.uri;
        })
      }
      for (let key in dismiss_reason) {
        if(key == "dismiss_mess") {
          this.dismiss_mess = row.dismiss_mess;
          this.form.dismiss_mess = row.dismiss_mess;
        } else if(key == "dismiss_type") {
          if(dismiss_reason[key] == "1") {
            this.dismiss_type = "主动离职";
          } else if(dismiss_reason[key] == "2") {
            this.dismiss_type = "旷工离职";
          } else if(dismiss_reason[key] == "3") {
            this.dismiss_type = "劝退";
          } else if(dismiss_reason[key] == "4") {
            this.dismiss_type = "开除";
          }
          // this.form.dismiss_type = dismiss_reason[key];
        }
      }
      if(val == "1") {
        this.titleName = "上传离职交接单";
      } else if(val == "2") {
        this.titleName = "上传合同";
      }
      this.upLoadDialogVisible = true;
      if(this.upLoadDialogVisible) {
        this.editImage = obj;
      } else {
        this.editImage = [];
      }
    },
    // 添加离职表格
    addResigntionTable() {
      this.$http.post(globalConfig.server + 'organization/staff/dismisse/' + this.form.user_id, {
        dismiss_time: this.form.dismiss_time,
        dismiss_reason: this.form.dismiss_reason,
        resignation_form: this.form.resignation_form
      }).then(res => {
        if (res.data.code === '710418') {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          })
          this.getResignationEmploye();
          // this.isClear = true;
          this.upLoadDialogVisible = false;
        } else {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          })
        }
      })
    },
    
    // 查看离职表
    lookDeparture(row) {
    // window.open(row.resignation_form)
      row.resignation_form.forEach((item, index) => {
        this.imagesResignationList.push(item.uri)
      })
      this.viewResignationFrom = true;
    },
    // 查看合同图片
    getImagesContract(row) {
      if(row.staff_extends.image_info || !row.staff_extends.image_info instanceof Array) {
         if( row.staff_extends.image_info.labor_contract) {
          row.staff_extends.image_info.labor_contract.forEach((item, index) => {
            this.imagesList.push(item.uri)
          })
        }
      }
      this.viewContract = true;
    },
    // 获取合同图片
    // getImagesContract(user_id) {
    //   // this.params.user_id = id;
    //   this.viewContract = true;
    //   // let user_id = row.id;
    //   this.$http.get(globalConfig.server + 'hrm/User/userInfo',{params: {user_id}}).then(res => {
    //     if(res.data.code == "90010") {
    //       if(res.data.data.image_info) {
    //         for(let key in res.data.data.image_info) {
    //           if(key == "labor_contract") {
    //             this.imagesList =  res.data.data.image_info[key]
    //           }
    //         }
    //       }
    //     }
    //   })
    // },
    // 获取数据
    getResignationEmploye() {
      this.resignationData = [];
      this.Loading = true;
      this.$http.get(globalConfig.server + 'organization/other/staff-list', {params: this.params}).then(res => {
        if(res.data.code == "70010") {
          this.emptyText = " ";
          this.resignationData = res.data.data.data;
          this.total = res.data.data.count;
          let strArr = [];
          res.data.data.data.forEach((item, index) => {
            let orgStr = "";
            let roleStr = "";
            item.org.forEach((val, key) => {
             orgStr += val.name + " ";
             this.resignationData[index].orgStr = orgStr;
            })
            item.roles.forEach((val, key) => {
              roleStr += val.display_name + " ";
              this.resignationData[index].roleStr = roleStr;
            })

            let dismiss_reason = item.staffs.dismiss_reason;
            for(let key in dismiss_reason) {
              if(key == "dismiss_mess") {
                this.resignationData[index].dismiss_mess = dismiss_reason[key];
              }
              if(key == "dismiss_type" && dismiss_reason[key]) {
                if(dismiss_reason[key] == "1") {
                  this.resignationData[index].dismiss_type = "主动离职";
                } else if(dismiss_reason[key] == "2") {
                  this.resignationData[index].dismiss_type = "旷工离职";
                } else if(dismiss_reason[key] == "3") {
                  this.resignationData[index].dismiss_type = "劝退";
                } else if(dismiss_reason[key] == "4") {
                  this.resignationData[index].dismiss_type = "开除";
                }
              }
            }

          })
          this.Loading = false;
            // console.log(this.resignationData)
        } else if(res.data.code == "70011" || res.data.code == "70088") {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          })
          this.emptyText = "暂无数据";
          this.resignationData = [];
          this.total = 0;
          this.Loading = false;
        } 
      })
    },
    //选人组件
    openOrganizeModal(id) {
      this.params.org_id = id;
      // this.follow_name = '';
      this.organizationDialog = true;
      this.type = "depart";
      this.length = 1;
    },
    selectMember(val) {
      this.type = "";
      this.length = "";
      this.follow_id = "";
      this.follow_name = "";
      val.forEach(item => {
        this.follow_id += item.id + ",";
        this.follow_name = item.name + ",";
      });
      this.params.org_id = this.follow_id.substring(
        0,
        this.follow_id.length - 1
      );
      // this.params.org_id = this.follow_id;
      this.follow_name = this.follow_name.substring(
        0,
        this.follow_name.length - 1
      );
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
      // this.params.org_id = this.follow_id
    },
    emptyFollowPeople() {
      this.follow_id = "";
      this.params.org_id = "";
      this.follow_name = "";
    },
    // 分页
    handleSizeChange(val) {
      this.params.limit = val;
      this.getResignationEmploye(this.params.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getResignationEmploye(this.params.page);
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang="scss">
  #resignationManagement {
    .top {
      .el-button--mini {
        margin-top: 7px;
        margin-left: 10px;
      }
    }
  }
</style>
