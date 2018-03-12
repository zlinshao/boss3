<template>
  <div id="register">
    <el-form size="mini">
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-row :gutter="2">
              <el-col :span="8">
                <div @click="openFrames('departmentVisible')">
                  <el-input placeholder="点击选择部门" size="mini" v-model="input4" readonly>
                    <template slot="append">清空</template>
                  </el-input>
                </div>
              </el-col>

              <el-col :span="8">
                <div @click="openFrames('personnelVisible')">
                  <el-input placeholder="点击选择人员" size="mini" v-model="input4" readonly>
                    <template slot="append">清空</template>
                  </el-input>
                </div>

              </el-col>

              <el-col :span="8">
                <el-select v-model="value8" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>

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
          <div id="map-container"></div>
        </div>
      </el-col>
    </el-row>

    <Department :module="departmentVisible" @close='closeFrame'></Department>
    <Personnel :module="personnelVisible" @close='closeFrame'></Personnel>
  </div>
</template>

<script>

  import Department from './comments/department.vue'
  import Personnel from './comments/personnel.vue'

  export default {
    name: "index",
    components:{
      Department,
      Personnel,
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
        value5: [],
        input4: '',
        value8: '',
        currentPage3: 1,
        myData : [],


        isShow: false,              //暂无数据
        departmentVisible: false,   //选择部门
        personnelVisible: false,   //选择人员
      }
    },
    mounted() {

    },
    watch: {},
    methods: {
      openFrames(type) {
        switch (type) {
          case 'departmentVisible':
            this.departmentVisible = true;
            break;
          case 'personnelVisible':
            this.personnelVisible = true;
            break;
        }
      },
      closeFrame(){
        this.departmentVisible = false;
        this.personnelVisible = false;
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },



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
    overflow-y: auto;
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
  }
</style>
