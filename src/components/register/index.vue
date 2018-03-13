<template>
  <div id="register">
    <el-form size="mini">
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-row :gutter="2">
              <el-col :span="8">
                <el-input placeholder="点击选择部门" size="mini" @click.native="openFrames('departmentVisible')" readonly>
                  <el-button slot="append" @click="clearSelect(1)">清空</el-button>
                </el-input>
              </el-col>

              <el-col :span="8">
                <el-input placeholder="点击选择人员" size="mini" @click.native="openFrames('personnelVisible')" readonly>
                  <el-button slot="append" @click="clearSelect(2)">清空</el-button>
                </el-input>
              </el-col>

              <!--<el-col :span="8">-->
                <!--<el-select v-model="value8" filterable placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-col>-->

            </el-row>

          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-row :gutter="30">
      <el-col :span="10">
          <div class="registerList">
            <div class="personnelInfo">
              <div class="name_pic">
                <div class="personnelPIc">
                  <img src="../../assets/images/university/ph1852-p01924.png" alt="">
                </div>
                <div class="personnelName">乐伽公寓</div>
              </div>
              <div class="remarks">备注：吃饭</div>
              <div class="register_position">
                <i class="el-icon-location"></i>
                <div class="positionInfo">江苏省苏州市虎丘区枫桥街道福建沙县特色小吃(华山路)富康新村</div>
              </div>
              <div class="date_time">
                <i class="el-icon-time"></i>
                <div class="registerDate">2017-11-17 09:43:28</div>
              </div>
            </div>
            <div class="personnelInfo">
              <div class="name_pic">
                <div class="personnelPIc">
                  <img src="../../assets/images/university/ph1852-p01924.png" alt="">
                </div>
                <div class="personnelName">乐伽公寓</div>
              </div>
              <div class="remarks">备注：擦皮鞋</div>
              <div class="register_position">
                <i class="el-icon-location"></i>
                <div class="positionInfo">江苏省苏州市虎丘区枫桥街道福建沙县特色小吃(华山路)富康新村</div>
              </div>
              <div class="date_time">
                <i class="el-icon-time"></i>
                <div class="registerDate">2017-11-17 09:43:28</div>
              </div>
            </div>
            <div class="personnelInfo">
              <div class="name_pic">
                <div class="personnelPIc">
                  <img src="../../assets/images/university/ph1852-p01924.png" alt="">
                </div>
                <div class="personnelName">乐伽公寓</div>
              </div>
              <div class="register_position">
                <i class="el-icon-location"></i>
                <div class="positionInfo">江苏省苏州市虎丘区枫桥街道福建沙县特色小吃(华山路)富康新村</div>
              </div>
              <div class="date_time">
                <i class="el-icon-time"></i>
                <div class="registerDate">2017-11-17 09:43:28</div>
              </div>
            </div>
            <div class="personnelInfo">
              <div class="name_pic">
                <div class="personnelPIc">
                  <img src="../../assets/images/university/ph1852-p01924.png" alt="">
                </div>
                <div class="personnelName">乐伽公寓</div>
              </div>
              <div class="register_position">
                <i class="el-icon-location"></i>
                <div class="positionInfo">江苏省苏州市虎丘区枫桥街道福建沙县特色小吃(华山路)富康新村</div>
              </div>
              <div class="date_time">
                <i class="el-icon-time"></i>
                <div class="registerDate">2017-11-17 09:43:28</div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
            </div>
          </div>
        <div class="noList"  v-if="isShow">
          &nbsp;暂无签到记录
        </div>
      </el-col>
      <el-col :span="14">
        <div class="registerMap">
          <el-amap id="mapcointainer">

          </el-amap>
        </div>
      </el-col>
    </el-row>

    <!--<Department :module="departmentVisible" @close='closeFrame'></Department>-->
    <!--<Personnel :module="personnelVisible" @close='closeFrame'></Personnel>-->
    <Organization :organizationDialog="organizationDialog"></Organization>
  </div>
</template>

<script>

  import {lazyAmapApiLoaderInstanse} from 'vue-amap';


  // import Department from './comments/department.vue'
  // import Personnel from './comments/personnel.vue'
  import Organization from '../common/organization'

  export default {
    name: "index",
    components:{
      // Department,
      // Personnel,
      Organization
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value5: [],
        value8: '',
        departments: [],
        personnels: [],
        currentPage3: 1,
        organizationDialog:false,


        isShow: false,              //暂无数据
        departmentVisible: false,   //选择部门
        personnelVisible: false,   //选择人员
      }
    },
    mounted() {
      this.map = new AMap.Map('mapcointainer', {
        resizeEnable:true,
        zoom:11,
        center:[118.790681,32.04792]
      })
    },
    watch: {},
    methods: {
      openFrames(type) {
        alert(2)
        this.organizationDialog = true;
        // switch (type) {
        //   case 'departmentVisible':
        //     this.departmentVisible = true;
        //     break;
        //   case 'personnelVisible':
        //     this.personnelVisible = true;
        //     break;
        // }
      },
      // closeFrame(){
      //   this.departmentVisible = false;
      //   this.personnelVisible = false;
      // },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
// 清空
      clearSelect(num){
        if (num==1){
          if (this.departments.length==0){
            return
          }
          // this.params.department_id = '';
          this.departments = [];
        } else {
          if (this.personnels.length==0){
            return
          }
          // this.params.staff_id = '';
          this.personnels = [];
        }

        this.search();
      }
    },
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  .registerList {
    padding: 20px 30px;
    height: 650px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: auto;
    border: 1px solid #cccccc;
    .personnelInfo {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px dashed #cccccc;
      color: #667A8F;
      .name_pic {
        @include flex;
        justify-content: left;
        .personnelPIc {
          width: 50px;
          height: 50px;
          @include border_radius(50%);
          img {
            width: 100%;
            height: 100%;
            @include border_radius(50%);
          }
        }
        .personnelName {
          line-height: 50px;
          margin-left: 20px;
        }
        &:hover {
          .personnelName {
            color: #6a8dfb;
          }
        }
      }
      .remarks {
        margin-top: 15px;
      }
      .register_position {
        @include flex;
        justify-content: left;
        margin-top: 15px;
        i {
          line-height: 19px;
        }
        .positionInfo {
          margin-left: 10px
        }
      }
      .date_time {
        @include flex;
        justify-content: left;
        margin-top: 15px;
        i {
          line-height: 19px;
        }
        .registerDate {
          margin-left: 10px;
        }
      }
    }
    .pagination {
      margin-top: 10px;
      text-align: right;
    }
  }
  .registerMap {
    height: 650px;
    border: 1px solid #cccccc;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
