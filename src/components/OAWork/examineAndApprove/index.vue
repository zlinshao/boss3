<template>
    <div id="examineAndApprove">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的审批" name="first">
          <div class="myApplication">
            <div>
              <div class="head">
                <div class="title">积分申请（1）</div>
                <div class="open_close" @click="retract(1)">
                  <span v-if="isOpen_1">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_1">
                <div class="content_item">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">积分申请</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">住宿（2）</div>
                <div class="open_close" @click="retract(2)">
                  <span v-if="isOpen_2">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_2">
                <div class="content_item" v-for="item in 2">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">住宿</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">报销</div>
                <div class="open_close" @click="retract(3)">
                  <span v-if="isOpen_3">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_3">
                <div class="content_item" v-for="item in 6">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">报销</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">离职申请</div>
                <div class="open_close" @click="retract(4)">
                  <span v-if="isOpen_4">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_4">
                <div class="content_item">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">离职申请</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">交通工具申请</div>
                <div class="open_close" @click="retract(5)">
                  <span v-if="isOpen_5">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_5">
                <div class="content_item">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">交通工具申请</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">请假</div>
                <div class="open_close" @click="retract(6)">
                  <span v-if="isOpen_6">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_6">
                <div class="content_item" v-for="item in 3">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">请假</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">客服部问题申报</div>
                <div class="open_close" @click="retract(7)">
                  <span v-if="isOpen_7">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_7">
                <div class="content_item" v-for="item in 8">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">客服部问题申报</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">出勤休假</div>
                <div class="open_close" @click="retract(8)">
                  <span v-if="isOpen_8">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_8">
                <div class="content_item" v-for="item in 3">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">出勤休假</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="head">
                <div class="title">其他</div>
                <div class="open_close" @click="retract(9)">
                  <span v-if="isOpen_9">收起</span>
                  <span v-else="">展开</span>
                </div>
              </div>
              <div class="content" v-if="isOpen_9">
                <div class="content_item" v-for="item in 10">
                  <div>
                    <div class="item_icon"></div>
                    <div class="item_name">其他</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <el-badge  slot="label" is-dot="" class="item">代办事项</el-badge>
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="date"

                type="selection">
              </el-table-column>
              <el-table-column
                prop="date"
                label="审批标题">
              </el-table-column>
              <el-table-column
                label="审批摘要">
                <template slot-scope="scope">
                  <div>{{scope.row.city}}</div>
                  <div>{{scope.row.address}}</div>
                  <div>{{scope.row.zip}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="province"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="状态">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <el-badge  slot="label" :is-dot="false" class="item">已完成事项</el-badge>
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="date"

                type="selection">
              </el-table-column>
              <el-table-column
                prop="date"
                label="审批标题">
              </el-table-column>
              <el-table-column
                label="审批摘要">
                <template slot-scope="scope">
                  <div>{{scope.row.city}}</div>
                  <div>{{scope.row.address}}</div>
                  <div>{{scope.row.zip}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="province"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="状态">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我发起的" name="fourth">
          <el-badge  slot="label" is-dot="" class="item">我发起的</el-badge>
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="date"

                type="selection">
              </el-table-column>
              <el-table-column
                prop="date"
                label="审批标题">
              </el-table-column>
              <el-table-column
                label="审批摘要">
                <template slot-scope="scope">
                  <div>{{scope.row.city}}</div>
                  <div>{{scope.row.address}}</div>
                  <div>{{scope.row.zip}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="province"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="状态">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="fifth">
          <el-badge  slot="label" :is-dot="false" class="item">抄送我的</el-badge>
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="date"

                type="selection">
              </el-table-column>
              <el-table-column
                prop="date"
                label="审批标题">
              </el-table-column>
              <el-table-column
                label="审批摘要">
                <template slot-scope="scope">
                  <div>{{scope.row.city}}</div>
                  <div>{{scope.row.address}}</div>
                  <div>{{scope.row.zip}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="province"
                label="发起时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="状态">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        isOpen_1:true,
        isOpen_2:true,
        isOpen_3:true,
        isOpen_4:true,
        isOpen_5:true,
        isOpen_6:true,
        isOpen_7:true,
        isOpen_8:true,
        isOpen_9:true,
        tableData:[
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
        ],
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      retract(flag){
          if(flag === 1){
            this.isOpen_1 = !this.isOpen_1;
          }else if(flag === 2){
            this.isOpen_2 = !this.isOpen_2;
          }else if(flag === 3){
            this.isOpen_3 = !this.isOpen_3;
          }else if(flag === 4){
            this.isOpen_4 = !this.isOpen_4;
          }else if(flag === 5){
            this.isOpen_5 = !this.isOpen_5;
          }else if(flag === 6){
            this.isOpen_6 = !this.isOpen_6;
          }else if(flag === 7){
            this.isOpen_7 = !this.isOpen_7;
          }else if(flag === 8){
            this.isOpen_8 = !this.isOpen_8;
          }else if(flag === 9){
            this.isOpen_9 = !this.isOpen_9;
          }
      },
      dblClickTable(){
        this.$router.push('/sthToDoDetail')
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .myApplication{
    padding: 0 20px;
    >div{
      border-bottom: 1px solid #e3e3e3;
      .head{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .title{
          color: #409EFF;
          font-size: 16px;
        }
        .open_close{
          cursor: pointer;
          &:hover{
            color: #6a8dfb;
          }
        }
      }
      .content{
        margin-bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        .content_item{
          width: 190px;
          height: 100px;
          margin: 5px;
          border: 1px solid #6a8dfb;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
            border: 1px solid #fb4699;
            .item_icon{
              background: #fb4699;
            }
          }
          .item_icon{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 5px auto;
            background: #6a8dfb;
          }
          .item_name{
            text-align: center;
          }
        }
      }
    }
  }
</style>
