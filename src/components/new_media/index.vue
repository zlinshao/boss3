<template>
    <div id="new_media">
      <div style="width: 100%;text-align: right;">
        <el-input @keyup.enter.native="getInviteList" v-model="params.search" style="width: 250px;" size="mini" placeholder="请输入需要搜索的内容" clearable>
          <template slot="append">
            <i class="el-icon-search" style="cursor: pointer;" @click="getInviteList"></i>
          </template>
        </el-input>
        <el-button size="mini" type="primary" @click="isHigh = !isHigh">高级</el-button>
      </div>
      <div style="margin-top: 20px;">
        <el-table
          :data="mediaList"
        >
          <el-table-column label="提交人" prop="user_name"></el-table-column>
          <el-table-column label="手机号" prop="user_phone"></el-table-column>
          <el-table-column label="微信号" prop="user_account"></el-table-column>
          <el-table-column label="好友姓名" prop="recommend_name"></el-table-column>
          <el-table-column label="好友手机号" prop="recommend_phone"></el-table-column>
          <el-table-column label="服务类别" prop="recommend_type">
            <template slot-scope="scope">
              <span v-text="scope.row.recommend_type === 1 ? '租房' : '托管'"></span>
            </template>
          </el-table-column>
          <el-table-column label="房屋需求" prop="house_where">
            <template slot-scope="scope">
              <a class="textStyle" @click="textDetail(scope.row)">{{scope.row.house_where}}</a>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="recommend_status">
            <template slot-scope="scope">
              <span v-text="scope.row.recommend_status === 1 ? '未签约' : scope.row.recommend_status === 2 ? '已签约' : '已结算'"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditStatus(scope.row)">修改</el-button>
              <el-button type="text" @click="handleDeleteInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--高级搜索内容-->
      <div class="highRanking" style="position:static !important;">
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">服务类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-select v-model="params.recommend_type" size="small">
                      <el-option :value="1" label="租房"></el-option>
                      <el-option :value="2" label="托管"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">推荐状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-select v-model="params.recommend_status" size="mini">
                      <el-option :value="1" label="未签约"></el-option>
                      <el-option :value="2" label="已签约"></el-option>
                      <el-option :value="3" label="已结算"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>

      <el-dialog
        :visible.sync="statusVisible"
        title="状态修改"
        width="15%"
      >
        <el-select v-model="currentStatus" size="mini">
          <el-option :value="1" label="未签约"></el-option>
          <el-option :value="2" label="已签约"></el-option>
          <el-option :value="3" label="已结算"></el-option>
        </el-select>
        <div style="margin-top: 15px;text-align: right;">
          <el-button size="mini" @click="statusVisible = !statusVisible">取消</el-button>
          <el-button size="mini" type="primary" @click="handleChangeStatus">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            url: globalConfig.server,
            params: {
              search: '',
              recommend_type: '',
              recommend_status: '',
            },
            mediaList: [],
            isHigh: false,
            statusVisible: false,
            currentStatus: '',
            currentId: '',
          }
      },
      mounted() {
          this.getInviteList();
      },
      methods: {
        handleDeleteInfo(row) {
          this.$confirm('您确定删除吗?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(this.url + `/recommend/fellow/${row.id}`).then(res => {
              if (res.data.code === '20000') {
                this.$notify.success({
                  title: '成功',
                  message: res.data.msg
                });
                this.getInviteList();
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg
                })
              }
            }).catch(err =>{
              console.log(err);
            })
          }).catch(() => { })
        },
        textDetail(row) {
          this.$alert(`${row.house_where}`,'文本详情',{
            confirmButtonText: '确定'
          }).catch(() => { })
        },
        handleChangeStatus() {
          this.$http.put(this.url + `/recommend/fellow/${this.currentId}`,{
            recommend_status: this.currentStatus
          }).then(res => {
            if (res.data.code === '20000') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.statusVisible = false;
              this.getInviteList();
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          }).catch(err => {
            console.log(err);
          })
        },
        handleEditStatus(row) {
          this.currentStatus = row.recommend_status;
          this.currentId = row.id;
          this.statusVisible = true;
        },
        getInviteList() {
          this.$http.get(this.url + '/recommend/fellow',{
            params: this.params
          }).then(res => {
            if(res.data.code === '20000') {
              this.mediaList = res.data.data;
              this.highGrade();
            }else {
              this.mediaList = [];
            }
          }).catch(err => {
            console.log(err);
          })
        },
        goSearch() {
          this.getInviteList();
        },
        resetting() {
          this.params = {
            search: '',
            recommend_type: '',
            recommend_status: ''
          };
        },
        highGrade() {
          this.isHigh = false;
        },
      }
    }
</script>

<style lang="scss">
  body{
    padding-right: 0 !important;
  }
  #new_media{
    width: 100% !important;
    position: relative;
    .textStyle{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #409EFF;
    }
  }
</style>
