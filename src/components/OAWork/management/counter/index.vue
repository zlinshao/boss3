<template>
  <div id="counter">
    <div class="term">
      <div class="termTitle">计算条件</div>
      <div class="termTable">
        <el-form label-width="100px" size="mini">
          <el-row>
            <el-col :span="12">
              <div class="setTitle">
                <span class="chooseTitle">套餐选择</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="setTitle" style="margin-left: 10px">
                <span class="chooseTitle">充公方</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="mealChoose">
                <el-row>

                    <el-col :span="8">
                      <div class="signDate" style="margin-top: 18px">
                        <el-form-item label="套餐选择">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>


                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mealChoose confiscate">
                <el-form-item>
                  <el-checkbox-group v-model="checkedCities1" style="margin-top: 18px;">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="setTitle condition">
                <span class="chooseTitle">收房条件</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="setTitle condition" style="margin-left: 10px">
                <span class="chooseTitle">租房条件</span>
                <span style="color: #fb529f">*</span>
              </div>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <div class="mealChoose">
                <el-row>
                  <div style="margin-top: 18px">
                    <el-col :span="8">
                      <div class="signDate">
                        <el-form-item label="签约日期">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="签约时长">
                          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="月单价">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>

                  </div>

                </el-row>
                <!--2-->
                <el-row>
                  <!--<div class="aaa">-->
                    <el-col :span="8">
                      <div class="signDate">
                        <el-form-item label="付款方式">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="第一次付款时间">
                          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="中介费">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                  <!--</div>-->

                </el-row>
                <!--3-->
                <el-row>

                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="保修期">
                          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                </el-row>

              </div>
            </el-col>

            <el-col :span="12">
              <div class="mealChoose" style="margin-left: 10px;height: 159px">
                <el-row>
                  <div style="margin-top: 18px">
                    <el-col :span="8">
                      <div class="signDate">
                        <el-form-item label="签约日期">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="signTime">
                        <el-form-item label="月单价">
                          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="8">
                      <div class="monthPrice">
                        <el-form-item label="付款方式">
                          <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                  </div>

                </el-row>
                <!--2-->
                <el-row>
                  <el-col :span="8">
                    <div class="signDate">
                      <el-form-item label="中介费">
                        <el-select v-model="value" placeholder="请选择" size="mini">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>

                  <el-col :span="8">
                    <div class="signTime">
                      <el-form-item label="第一次付款时间">
                        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>

                  <el-col :span="8">
                    <div class="monthPrice">
                      <el-form-item label="中介费">
                        <el-select v-model="value" placeholder="请选择" size="mini">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-form>
<!--计算按钮-->
        <el-row>
          <el-col :span="24">
            <div class="countButton">
              <el-button type="primary" size="medium">计算业绩</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="fruit term">
      <div class="chooseTitle">计算结果</div>
      <div class="termTable">
        <el-row>
          <el-col :span="24">
            <span class="hint">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dignissimos dolor eligendi esse et ex, excepturi expedita illo ipsum iste laudantium magni non optio praesentium rem sequi, tenetur voluptas voluptatibus.</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="setTitle" style="margin-top: 10px">
              <span class="chooseTitle">收房</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="tableData"
              style="width: 100%;margin-top: 10px">
              <el-table-column
                prop="date"
                label="当月总溢出业绩">
              </el-table-column>
              <el-table-column
                prop="name"
                label="提成">
              </el-table-column>
              <el-table-column
                prop="address"
                label="空置期奖励">
              </el-table-column>
              <el-table-column
                prop="date"
                label="价格差奖励">
              </el-table-column>
              <el-table-column
                prop="name"
                label="收方付款方式奖励">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收房年限奖励">
              </el-table-column>
              <el-table-column
                prop="date"
                label="保修期奖励">
              </el-table-column>
              <el-table-column
                prop="name"
                label="年限涨价扣款">
              </el-table-column>
              <el-table-column
                prop="address"
                label="空置期扣款">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="setTitle" style="margin-top: 10px">
              <span class="chooseTitle">租房</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="greenTable" style="margin-top: 10px">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="当月总溢出业绩">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="提成">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="空置期奖励">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="价格差奖励">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
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

        checkedCities1: ['无'],
        cities: ['无', '收房人', '租房人'],

        form: {
          type: []
        },

        input: '',

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style scoped="" lang="scss">
  #counter {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    .chooseTitle {
      color: #409EFF;
    }
    .term {
      .termTitle {
        color: #409EFF;
      }
      .termTable {
        border: 1px solid #dfe6fb;
        @include border_radius(4px);
        padding: 10px;
        margin-top: 10px;
        .mealChoose {
          border: 1px solid #dfe6fb;
          @include border_radius(4px);
          margin-top: 10px;
          .signDate, .signTime, .monthPrice {
            @include flex;
            justify-content: right;
            margin-right: 20px;
          }
        }
        .confiscate {
          margin-left: 10px;
          height: 63px;
        }
        .condition {
          margin-top: 8px;
        }
      }
      .countButton {
        @include flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
    .fruit {
      margin-top: 20px;
      .termTable {
        .hint{
          color: #fb529f;
        }
      }
    }

  }
</style>
