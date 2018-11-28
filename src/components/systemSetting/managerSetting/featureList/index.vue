<template>
    <div id="featureList">
      <div style="width:100%;height: 40px;text-align: right;">
        <el-button type="primary" size="mini" @click="addBill = true">添加记录</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          :empty-text="emptyText"
          v-loading="Loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
        >
          <el-table-column
            label="名称"
            prop="name"
          ></el-table-column>
          <el-table-column
            label="路径"
            prop="path"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="status"
          ></el-table-column>
          <el-table-column
            label="操作"
            prop="status"
          >
            <template slot-scope="scope">
              <div>
                <el-button :type="scope.row.status === 1 ? 'primary' : 'success'" size="mini" @click="handleClickShow(scope.row)">{{scope.row.status === 1 ? '隐藏' : '显示'}}</el-button>
                <el-button type="danger" size="mini" @click="deletePath(scope)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align: right;">
          <el-pagination
            layout="total,prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="limit"
            :total="count">
          </el-pagination>
        </div>
      </div>
      <div>
        <el-dialog
          title="添加记录"
          :visible.sync="addBill"
          width="30%"
        >
          <div style="width: 70%;margin: 0 auto;">
            <el-form :model="params" :rules="rules" label-width="100px" ref="params">
              <el-form-item label="名称" prop="name">
                <el-input size="mini" v-model="params.name" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="path">
                <el-input size="mini" v-model="params.path" placeholder="请输入路径"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="params.status"
                  size="mini"
                >
                  <el-option :value="1" label="显示"></el-option>
                  <el-option :value="0" label="隐藏"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div style="text-align: right;width: 100%;">
                  <el-button size="mini" @click="handleCancel('params')">取消</el-button>
                  <el-button type="primary" size="mini" @click="submitForm('params')">确定</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          url: globalConfig.server,
          tableData: [],
          emptyText: "",
          Loading: false,
          switchShow: '',
          addBill: false,
          params: {
            name: '',
            status: '',
            path: ''
          },
          rules:{
            name: [
              {required:true,message:'name required',trigger:'blur'}
            ],
            path: [
              {required:true,message:'path required',trigger:'blur'}
            ],
            status: [
              {required:true,message:'status required',trigger:'blur'}
            ]
          },
          deleteVisiable: false,
          page: 1,
          limit: 26,
          all: '',
          count: 0,
        }
      },
      mounted() {
        this.getBillList();
      },
      methods: {
        handleCurrentChange(page) {
          this.page = page;
          this.getBillList();
        },
        getBillList() {
          this.Loading = true;
          this.emptyText = " ";
          this.$http.get(this.url + 'setting/mobile/index',{
            params:{
              page: this.page,
              limit: this.limit
            }
          }).then(res => {
            if(res.data.code === '30000'){
              this.tableData = res.data.data.data;
              this.count = res.data.data.count;
              this.Loading = false;
              this.emptyText = " ";
            }else {
              this.tableData = [];
              this.emptyText = "暂无数据";
              this.Loading = false;
            }
          }).catch(err => {
            console.log(err);
          })
        },
        changeStatus(row) {
          let status = row.status === 1 ? 0 : 1;
          this.$http.put(this.url + 'setting/mobile/mobileUpdate', {
              id:row.id,
              status
          }).then(res => {
            if(res.data.code === "30030"){
              this.$notify.success({
                title:"成功",
                message: "修改成功！"
              });
              this.getBillList();
            }else {
              this.$notify.warning({
                title:"失败",
                message: "修改失败！"
              });
            }
          }).catch(err => {
            console.log(err);
            console.log(err);
          })
        },
        handleClickShow(row) {
          let enable = row.status === 0 ? '显示' : '隐藏';
          this.$confirm('此操作将' + enable + '功能, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeStatus(row);
          }).catch(() => {
          })
        },
        deletePath(scope) {
          this.$confirm('此操作将删除路径，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.goDelete(scope.row);
          })
        },
        goDelete(row) {
          this.$http.put(this.url + `setting/mobile/mobileDelete/delete`,{id:row.id}).then(res => {
            if(res.data.code === '30040'){
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getBillList();
            }else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          }).catch(err => {
            console.log(err);
          })
        },
        submitForm(params) {
          this.$refs[params].validate((valid)=>{
            if(valid){
              if(this.params){
                this.$http.post(this.url + 'setting/mobile/mobileSave',this.params).then(res => {
                  if(res.data.code === '30020'){
                    this.$notify.success({
                      title: '成功',
                      message: res.data.msg
                    });
                    this.handleCancel(params);
                    this.getBillList();
                  }else {
                    this.$notify.warning({
                      title: '失败',
                      message: res.data.msg
                    });
                    this.handleCancel(params);
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }else{
              console.log('error submit!');
              return false;
            }
          })
        },
        handleCancel(params) {
          this.addBill = false;
          this.$refs[params].resetFields();
        }
      }
    }
</script>

<style scoped lang="scss">
  #featureList{
    width: 100%;
  }
</style>
