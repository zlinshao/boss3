<template>
  <div id="messageCenterDetail">
    <el-dialog :close-on-click-modal="false" title="问答中心" :visible.sync="messageCenterDetailDialogVisible" width="60%">
      <div class="scroll_bar">
        <div class="title">问答详情</div>
        <div class="describe_border">
          <el-form size="small" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <div class="content" v-if="messageCenterDetail.create_time">{{messageCenterDetail.create_time}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="标题">
                  <div class="content" v-if="messageCenterDetail.title">{{messageCenterDetail.title}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="问题类型">
                  <div class="content" v-if="messageCenterDetail.type && messageCenterDetail.type.value">
                    {{messageCenterDetail.type.value}}
                  </div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="描述">
                  <div class="content" v-if="messageCenterDetail.description">{{messageCenterDetail.description}}</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="提问者">
                  <div class="content">
                    <span v-if="messageCenterDetail.is_anonymous">匿名</span>
                    <span v-else>
                       <span v-if="messageCenterDetail.asker && messageCenterDetail.asker.name">{{messageCenterDetail.asker.name}}</span>
                       <span v-else>暂无</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职位">
                  <div class="content">
                    <span v-if="messageCenterDetail.is_anonymous">匿名</span>
                    <span v-else>
                      <span
                        v-if="messageCenterDetail.asker && messageCenterDetail.asker.role && messageCenterDetail.asker.role.length>0">
                        <span v-for="v in messageCenterDetail.asker.role">
                          {{v.display_name}}&nbsp;&nbsp;&nbsp;</span>
                        </span>
                      <span v-else>暂无</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <div class="content">
                    <span v-if="messageCenterDetail.is_anonymous">匿名</span>
                    <span v-else>
                      <span
                        v-if="messageCenterDetail.asker && messageCenterDetail.asker.org && messageCenterDetail.asker.org.length>0">
                        <span v-for="v in messageCenterDetail.asker.org">
                          {{v.name}}&nbsp;&nbsp;&nbsp;</span>
                        </span>
                      <span v-else>暂无</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="被分配者">
                  <div class="content">
                    <span v-if="messageCenterDetail.replier && messageCenterDetail.replier.length>0 ">
                      <span v-for="v in messageCenterDetail.replier">
                          {{v.name}}&nbsp;&nbsp;&nbsp;
                      </span>
                    </span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="被分配者部门">
                  <div class="content">
                    <span v-if="messageCenterDetail.replier_org && messageCenterDetail.replier_org.length>0">
                      <span v-for="v in messageCenterDetail.replier_org">
                          {{v.name}}&nbsp;&nbsp;&nbsp;
                      </span>
                    </span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否公开">
                  <div class="content">
                    <span v-if="messageCenterDetail.is_open">公开</span>
                    <span v-else-if="messageCenterDetail.is_open == false">非公开</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否上架">
                  <div class="content">
                    <span v-if="messageCenterDetail.is_drop">下架</span>
                    <span v-else-if="messageCenterDetail.is_drop == false">上架</span>
                    <span v-else>暂无</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'message-center-detail',
    props: ['messageCenterDetailDialog', 'messageCenterId'],
    data() {
      return {
        messageCenterDetailDialogVisible: false,
        reimDetail: {},  //报销单详情
        messageCenterDetail: {},
      };
    },
    watch: {
      messageCenterDetailDialog(val) {
        this.messageCenterDetailDialogVisible = val;
      },
      messageCenterDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.messageCenterDetail = {};
        } else {
          this.getDetail();
        }
      },
    },
    methods: {
      getDetail() {
        this.$http.get(globalConfig.server + 'qa/back/' + this.messageCenterId).then((res) => { //
          if (res.data.code === "70110") {
            this.messageCenterDetail = res.data.data;
          } else {
            this.messageCenterDetail = {};
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #messageCenterDetail {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
  }
</style>
