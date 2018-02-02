<template>
  <div id="rentingDetail">

    <div class="stepLine">
      <el-steps direction="vertical" :active="steps" style="cursor: pointer">
        <el-step title="房源信息" @click.native="changeStep(0)"></el-step>
        <el-step title="房东信息" @click.native="changeStep(1)"></el-step>
        <el-step title="合同信息" @click.native="changeStep(2)"></el-step>
        <el-step title="财务信息" @click.native="changeStep(3)"></el-step>
        <el-step title="回访记录" @click.native="changeStep(4)"></el-step>
        <el-step title="操作历史" @click.native="changeStep(5)"></el-step>
      </el-steps>
    </div>

    <div class="container">
      <div class="top">
        <h3>仙居雅苑8-104详情</h3>
        <h3>
          <el-button size="mini" type="primary">已回访</el-button>
          <el-button size="mini" type="danger">未回访</el-button>
          <el-button size="mini" type="warning">驳回</el-button>
          <el-button size="mini" type="success">通过</el-button>
        </h3>
      </div>
      <div id="mainContent" class="main scroll_bar" @click.stop="getText($event)">
        <div class="houseInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="小区名称">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小区地址">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="门牌地址">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="房型">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建筑面积">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装修">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="楼层">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋类型">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房屋特色">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="建筑类型">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="楼层数">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="门卡数">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="水表卡号">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电表卡号">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="气表卡号">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="水表底数">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电表底数">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="气表底数">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="卫生情况">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="小区名称">
                  <div class="content">
                    仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑仙居雅苑
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="房屋照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 8">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;"></div>

        <div class="ownerInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="房东姓名">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="尊称">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="附属房东">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="国籍">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="房屋照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 3">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;"></div>

        <div class="contractInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同性质">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款方式">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="签约时长">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同开始时间">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同结束时间">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="空置时长">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="空置开始时间">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="空置结束时间">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="个人/中介">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中介费">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资料补齐时间">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="月单价">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押金">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="打房租日期">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="第一次打房租时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第二次打房租时间">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="尾款补齐时间">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="待签约日期">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开单人">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核人">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="汇款方式">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收款人姓名">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="支行">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账号">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="合同照片">
                  <div class="image">
                    <img src="../../assets/images/head.jpg" v-for="item in 8">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证件照片">
                  <div>
                    <el-tabs type="border-card">
                      <el-tab-pane label="水表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="电表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="燃气表照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 1">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="产权证照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 4">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="水卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="电卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="燃气卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 5">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="交接单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 2">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="押金收条">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 1">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="委托书">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="退租交接单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="退租结算单">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="银行卡照片">
                        <div class="image">
                          <img src="../../assets/images/head.jpg" v-for="item in 3">
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;"></div>

        <div class="financialInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="房租期数">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已结算期数">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="剩余期数">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="上次付/收款时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应收/付款金额">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实付/收款金额">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="剩余金额">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次付/收款时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下次应付/收款时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;"></div>

        <div class="returnVisitInfo">
          <el-form size="small" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="回访时间">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访结果">
                  <div class="content">玄武湖125-5号</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="回访满意度">
                  <div class="content">8-104</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <div class="content">仙居雅苑</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="border-bottom: 1px solid #ccc;margin: 50px 0 50px 150px;"></div>

        <div class="operateHistoryInfo">
          <el-form size="small" label-width="180px" >
            <el-row>
              <el-col :span="24">
                <el-form-item label="操作历史">
                  <div class="content">
                    操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史操作历史
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

  export default {
    data() {
      return {
        steps: 0,
        sizeForm: {}
      }
    },
    mounted(){
      document.getElementById('mainContent').addEventListener('scroll', () => {
        let scroll_top = document.getElementById('mainContent').scrollTop;
        if (scroll_top > 500 && scroll_top < 760) {
          this.steps = 1;
        } else if (scroll_top > 760 && scroll_top < 1530) {
          this.steps = 2;
        } else if (scroll_top > 1530 && scroll_top < 1700) {
          this.steps = 3;
        } else if (scroll_top > 1700 && scroll_top < 1750) {
          this.steps = 4;
        } else if (scroll_top > 1700) {
          this.steps = 5;
        } else {
          this.steps = 0;
        }
      });
      document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
      window.onresize = function () {
        document.getElementById('mainContent').style.height = window.innerHeight - 240 + 'px';
      }
    },
    methods: {
      changeStep(step){
        this.steps = step;
        switch (step) {
          case 0:
            document.getElementById('mainContent').scrollTop = 0;
            break;
          case 1:
            document.getElementById('mainContent').scrollTop = 540;
            break;
          case 2:
            document.getElementById('mainContent').scrollTop = 800;
            break;
          case 3:
            document.getElementById('mainContent').scrollTop = 1560;
            break;
          case 4:
            document.getElementById('mainContent').scrollTop = 1710;
            break;
          case 5:
            document.getElementById('mainContent').scrollTop = 1800;
            break;
        }
      },
      getText(e){
        console.log(e.target.innerText)
      }
    },
  }
</script>

<style scoped lang="scss">
  #rentingDetail {
    height: 100%;
    overflow: hidden;
    background: #ffffff;

    @media screen and (min-width: 1280px) {
      .stepLine {
        height: 70%;
        position: fixed;
        top: 150px;
        left: 10%;
        z-index: 1000
      }
    }
    @media screen and (max-width: 1279px) {
      .stepLine {
        height: 75%;
        position: fixed;
        top: 150px;
        left: 1%;
        z-index: 1000
      }
    }

    .el-button--mini {
      width: 80px;
    }
    .el-button--primary {
      background-color: #6a8dfb;
      border-color: #6a8dfb;
      box-shadow: 0 2px 8px 0 #6a8dfb;
    }
    .el-button--danger {
      background-color: #fb4694;
      border-color: #fb4694;
      box-shadow: 0 2px 8px 0 #fb4694;
    }
    .el-button--warning {
      background-color: #fdca41;
      border-color: #fdca41;
      box-shadow: 0 2px 8px 0 #fdca41;
    }
    .el-button--success {
      background-color: #58d788;
      border-color: #58d788;
      box-shadow: 0 2px 8px 0 #58d788;
    }
    @media screen and (min-width: 1280px) {
      .top {
        padding: 0 200px;
      }
    }
    @media screen and (max-width: 1279px) {
      .top {
        padding: 0 50px;
      }
    }
    .top {
      height: 100px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      > h3 {
        &:first-child {
          color: #7696fb;
          padding-left: 30px;
          border-left: 5px solid #7696fb;
        }
      }
    }
    @media screen and (min-width: 1280px) {
      .main {
        width: 76%;
      }
    }
    @media screen and (max-width: 1279px) {
      .main {
        width: 95%;
      }
    }
    .main {
      overflow: auto;
      margin: 50px auto;
      padding: 0 50px;
      > div {
        /*margin-bottom: 90px;*/
        &:last-child {
          margin-bottom: 0;
        }
        .content {
          padding: 0 10px;
          background: #eef3fc;
          border-radius: 4px;
          font-size: 12px;
          color: #727479;
        }
        .image {
          img {
            width: 120px;
            height: 80px;
            border-radius: 4px;
            margin-right: 10px;

          }
        }
      }
    }
  }
</style>
