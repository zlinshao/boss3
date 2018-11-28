<template>
  <div id="organization">
    <el-dialog :close-on-click-modal="false" title="组织架构" :visible.sync="organizationVisible" width="785px" center>
      <div class="organPadding">
        <!--搜索-->
        <div class="searchStaff">
          <div class="selectItem">
            <div class="onTags">
              <div class="outer" v-for="item in form">
                <el-tag type="info" closable size="medium" @close="handleClose(item)">
                  {{item.name}}
                </el-tag>
              </div>
            </div>
            <!--@keyup.native.8="backSpace"-->
            <div class="outer" style="flex-grow:1">
              <el-input v-model="params.keywords" @keyup.native.enter="searchStaff" placeholder="请输入企业联系人"
                        size="mini"></el-input>
            </div>
          </div>
          <div>
            <ul class="scroll_bar" :style="leftUl" v-if="staffList.length > 0">
              <li v-for="item in staffList" @click="chooseType(item, staffList)">
                <div class="search">
                  <div class="staffData">
                    <img v-if="item.avatar" :src="item.avatar">
                    <img src="../../assets/images/head.png" v-else>
                    <div>
                      <span>{{item.name}}</span>
                      <span class="span2" v-for="(str, idx) in item.org" v-if="idx === 0">
                        {{str.name}}
                      </span>
                    </div>
                  </div>
                  <i v-if="checkData.indexOf(item.id) > -1" class="el-icon-check"></i>
                </div>
              </li>
            </ul>
            <ul v-if="staffListStatus">
              <li class="notAvailable ">暂无相关数据</li>
            </ul>
          </div>
        </div>
        <!--筛选-->
        <div class="filterOrgan">
          <div class="filterTop" @click="tioOrgan(depart)">
            {{department_name}}
          </div>
          <!--面包屑-->
          <div class="pitchOnData" v-show="pitchOnData.length > 0 && depart !== parent_id">
            <span v-for="(item,index) in pitchOnData" @click="removePitch(item.id, index)">
              <span v-if="pitchOnData.length > 1 && index !== 0">></span>
              {{item.name}}
            </span>
          </div>
          <div
            style="width: 90%;"
            v-loading="fullLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)">
          </div>
          <ul class="scroll_bar checkDepart" :style="rightUl">
            <li v-for="item in list.children">
              <el-checkbox-group v-model="checkDepart" :disabled="organType === 'staff'"
                                 @change="chooseType(item, list.children,  'depart')">
                <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
              <div class="nextLevel" @click="nextLevel(item.id, item)">下级</div>
            </li>
            <li class="listUsers" v-for="item in list.users" @click="chooseType(item, list.users)"
                v-if="organType !== 'depart'">
              <div class="staffData">
                <div class="imgData">
                  <img v-if="item.avatar" :src="item.avatar">
                  <img src="../../assets/images/head.png" v-else>
                  <div v-if="checkData.indexOf(item.id) > -1">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                <div>
                  <span>{{item.name}}</span>
                  <span class="span2" v-for="(str, idx) in item.org" v-if="idx === 0">
                    {{str.name}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" size="small" :disabled="form.length < 1" @click="confirmSelect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "organization",
    props: ['organizationDialog', 'length', 'type', 'depart', 'ids'],
    data() {
      return {
        organizationVisible: false,
        fullLoading: false,
        url: globalConfig.server,
        list: [],                 // 所有数据
        leftUl: {
          height: '',             // 左侧 列表高度
        },
        rightUl: {
          height: '',             // 右侧 列表高度
        },
        params: {
          limit: 20,
          page: 1,
          keywords: '',
          org_id: this.depart,
        },
        staffList: [],            // 员工列表
        staffListStatus: false,   // 员工列表 状态
        parent_id: '',            // 当前层级 id
        pitchOnData: [],          // 面包屑
        checkDepart: [],          // 复选框 部门
        checkData: [],            // 选中员工 css
        form: [],
        lengths: '',
        organType: '',
        department_name: '',
        firstOpen: true,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      organizationDialog(val) {
        this.organizationVisible = val;
        this.depart_id = this.depart;
      },
      organizationVisible(val) {
        if (!val) {
          this.$emit('close');
          this.params.keywords = '';
          // this.close_();
        } else {
          // 所有员工
          // this.$http.get(this.url + 'organization/user?limit=5000').then(res => {
          //   console.log(res.data);
          // if (res.data.code === '20000') {
          //   let data = res.data.data.data;
          //   for (let key of data) {
          //     console.log(key);
          //   }
          // }
          // });
          if (this.firstOpen) {
            console.log(this.ids);
            if (this.ids) {
              this.allDepart(this.ids);
            }
            this.filterOrgan(this.depart);
          }
          this.$nextTick(() => {
            this.leftHeight();
            this.rightHeight();
          });
          // setTimeout(() => {
          //   this.firstOpen = false;
          // }, 100);
        }
      },
      form() {
        this.$nextTick(() => {
          this.leftHeight();
        })
      },
      length(val) {
        this.lengths = val;
      },
      type(val) {
        this.organType = val;
      },
      'params.keywords'(val) {
        if (!val) {
          this.closeStaff();
        }
      },
    },
    computed: {},
    methods: {
      allDepart(ids) {
        this.form = [];
        this.checkDepart = ids;
        this.$http.get(this.url + 'organization/org?limit=1000').then(res => {
          if (res.data.code === '20000') {
            let data = res.data.data.data;
            for (let key of data) {
              let list = {};
              if (ids.includes(key.id)) {
                list.id = key.id;
                list.name = key.name;
                list.org = key.org ? key.org : '';
                this.form.push(list);
                this.checkDepart.push(list);
              }
            }
          }
        });
      },
      // 搜索/员工
      searchStaff() {
        if (this.params.keywords === '') {
          this.closeStaff();
          return;
        }
        this.$http.get(this.url + 'organization/other/staff-list', {
          params: this.params
        }).then(res => {
          if (res.data.code === '70010') {
            this.staffList = res.data.data.data;
          } else {
            this.staffList = [];
            this.staffListStatus = true;
          }
        })
      },
      closeStaff() {
        this.staffList = [];
        this.staffListStatus = false;
      },
      // 顶级部门
      tioOrgan(id) {
        this.pitchOnData = [];
        this.filterOrgan(id);
      },
      // 部门/员工
      filterOrgan(id = 1) {
        if (this.parent_id === id) return;
        this.fullLoading = true;
        this.list = [];
        this.$http.get(this.url + 'organization/other/org-tree?id=' + id).then(res => {
          this.fullLoading = false;
          this.parent_id = id;
          this.rightHeight();
          if (res.data.code === '70050') {
            this.list = res.data.data;
            if (this.depart === id || id === 1) {
              this.department_name = res.data.data.name;
            }
            this.evaluate(this.list.children, this.checkDepart);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 复选框 动态增加选项
      evaluate(list, check) {
        list.forEach((res) => {
          check.forEach((item) => {
            if (res.id === item) {
              this.checkDepart.push(res);
            }
          })
        })
      },
      // 删除标签页
      handleClose(item) {
        let status = this.isExist(item, this.form);
        this.form.splice(status, 1);
        this.checkData.splice(status, 1);
        this.departStaff(item, this.checkDepart);
      },
      //回退删除 标签
      backSpace() {
        if (this.params.keywords === '' && this.checkData.length > 0) {
          this.form.pop();
          this.checkData.pop();
          this.checkDepart.pop();
        }
      },
      // 部门/员工同时存在 删除复选框
      departStaff(item, data) {
        data.forEach((res, index) => {
          if (item.id === res) {
            this.checkDepart.splice(index, 1);
          }
        })
      },
      // 判断是否存在
      isExist(item, data) {
        for (let i = 0; i < data.length; i++) {
          if (item.id === data[i].id) {
            return i;
          }
        }
        return -1;
      },
      // 部门 / 员工
      chooseType(item, data, type = 'staff') {
        this.params.keywords = '';
        if (this.organType) {
          if (type !== this.organType) {
            if (this.organType === 'staff') {
              this.prompt('warning', '请选择员工');
            } else {
              this.prompt('warning', '请选择部门');
            }
            return;
          }
        }
        let status = this.isExist(item, this.form);
        if (status > -1) {
          this.form.splice(status, 1);
          this.checkData.splice(status, 1);
        } else {
          this.chooseData(item, data);
        }
      },
      // 选中
      chooseData(item, data) {
        if (this.lengths === 1) {
          this.checkDepart = [];
          this.checkData = [];
          this.form = [];
          this.checkDepart.push(item.id);
        }
        if (this.form.length > this.lengths - 1 && this.lengths !== '') {
          this.prompt('warning', '超出数量限制');
          this.checkDepart.pop();
          return;
        }
        data.forEach(res => {
          let data = {};
          data.id = res.id;
          data.name = res.name;
          if (res.hasOwnProperty('avatar')) {
            data.org = res.org;
            data.avatar = res.avatar;
          }
          if (item.id === res.id) {
            this.checkData.push(res.id);
            this.form.push(data);
          }
        });
      },
      // 下级 面包屑
      nextLevel(id, item) {
        let data = {};
        data.id = item.id;
        data.name = item.name;
        this.pitchOnData.push(data);
        this.filterOrgan(id);
      },
      // 删除 面包屑
      removePitch(id, index) {
        this.filterOrgan(id);
        this.pitchOnData.splice(index + 1);
      },
      // 确定
      confirmSelect() {
        this.organizationVisible = false;
        this.$emit('selectMember', this.form);
        this.close_();
      },
      close_() {
        this.params.keywords = '';
        this.staffList = [];          //员工列表
        this.pitchOnData = [];        //面包屑
        this.checkDepart = [];        //复选框 部门
        this.checkData = [];          //选中员工 / 部门
        this.form = [];               //返回数据
        this.parent_id = '';          //父级ID
      },
      // ul高度
      leftHeight() {
        let height = $('.selectItem').height();
        this.leftUl.height = (420 - height - 20) + 'px';
      },
      // ul高度
      rightHeight() {
        let height = $('.pitchOnData').height();
        if (height !== 0) {
          this.rightUl.height = (420 - height - 77) + 'px';
        } else {
          this.rightUl.height = (420 - 58) + 'px';
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "../../assets/css/common.scss";

  #organization {
    .el-dialog__body {
      background-color: #f8f8f8;
      padding: 20px;
    }
    .organPadding {
      height: 420px;
      overflow: hidden;
      @include flex-items;
      .searchStaff, .filterOrgan {
        background-color: #fff;
        overflow: hidden;
        height: 99%;
        border: 1px solid #e0e0e0;
        @include border_radius(6px);
        img {
          width: 38px;
          height: 38px;
          margin-right: 12px;
          @include border_radius(50%);
        }
        &:hover {
          border-color: $themeColor;
        }
      }
      /*左*/
      .searchStaff {
        width: 440px;
        margin-right: 10px;
        .selectItem, .onTags {
          @include flex-items;
          flex-wrap: wrap;
        }
        .selectItem {
          padding-bottom: 6px;
        }
        input {
          border: none;
          padding-left: 6px;
        }
        .outer {
          margin: 10px 0 0 10px;
          div {
            width: 100%;
          }
        }
        ul {
          border-top: 1px solid #eee;
          margin: 0 10px;
          overflow: hidden;
          overflow-y: auto;
        }
      }
      .notAvailable {
        text-align: center;
        padding: 18px;
        color: #aaa;
        font-size: 14px;
      }
      /*右*/
      .filterOrgan {
        width: 300px;
        .filterTop {
          text-align: center;
          padding: 10px 0;
          cursor: pointer;
          @include box_shadow(#eee, 10px);
          color: $themeColor;
        }
        .noBtn {
          color: #aaa;
        }
        .pitchOnData {
          background-color: #f5f5f5;
          padding: 10px;
          color: $themeColor;
          > span {
            line-height: 22px;
            cursor: pointer;
            &:hover {
              color: #1D7FFB;
            }
          }
        }
        .checkDepart {
          overflow-x: hidden;
          overflow-y: auto;
          .listUsers {
            height: 50px;
            cursor: pointer;
          }
          li {
            padding: 0 18px;
            height: 42px;
            @include flex-items;
            justify-content: space-between;
            &:hover {
              background-color: rgb(223, 237, 250);
            }
            .el-checkbox {
              @include flex-items;
              .el-checkbox__label {
                max-width: 160px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .nextLevel {
              cursor: pointer;
              padding: 0 10px;
              min-width: 50px;
              border-left: 1px solid #e0e0e0;
              color: #bbb;
              &:hover {
                color: $themeColor;
                border-left: 1px solid $themeColor;
              }
            }
          }
        }
      }
      .staffData {
        @include flex-items;
        .imgData {
          width: 38px;
          height: 38px;
          margin-right: 12px;
          position: relative;
          div {
            position: absolute;
            top: 0;
            color: #fff;
            font-size: 22px;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            @include border_radius(50%);
            @include items-justify;
          }
        }
        div {
          color: #606266;
          margin: 0;
          span {
            line-height: 18px;
            display: block;
          }
          .span2 {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .search {
        @include flex-items;
        justify-content: space-between;
        height: 50px;
        cursor: pointer;
        padding: 0 12px;
        &:hover {
          background-color: rgb(223, 237, 250);
        }
      }
    }
    .el-dialog__footer {
      .dialog-footer {
        .el-button {
          padding: 10px 20px;
          width: 150px;
        }
      }
    }
  }
</style>
