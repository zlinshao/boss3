<template>
  <div id="reportDetail">
    <el-dialog title="报备详情" :visible.sync="reportVisible" width="70%">
      <el-form size="mini" label-width="110px">
        <el-row v-if="JSON.stringify(show_content) !== '{}'">
          <el-col :span="8" v-for="(key,index) in show_content" :key="index"
                  v-if="index !== '领导报备截图' && index !== '款项结清截图' && index !== '特殊情况领导截图' && index !== '合同照片' && index !== '截图' && index !== '组长同意截图'">
            <el-form-item v-if="!Array.isArray(key)" :label="index">
              <div class="special">{{key}}</div>
            </el-form-item>
            <el-form-item v-if="Array.isArray(key)" :label="index">
              <div class="special">
                <span style="display: block;" v-for="(item,index) in key">
                  {{item.msg}}&nbsp;&nbsp;&nbsp;{{item.period}}
                </span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-else>
            <el-form-item :label="index">
              <div class="special imgs">
                <span v-for="(p,index) in key">
                  <img data-magnify="" data-caption="图片查看器" :data-src="p" :src="p">
                </span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-else style="text-align: center">无相关记录</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="reportVisible = false">关&nbsp;闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "report-detail",
    props: ['module', 'ids'],
    data() {
      return {
        address: globalConfig.server_user,
        reportVisible: false,
        show_content: {},
        processId: '',
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.reportVisible = val;
      },
      ids(val) {
        if (this.processId !== val) {
          this.show_content = {};
          this.processId = val;
          this.process(val);
        }
      },
      reportVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods: {
      process(val) {
        this.$http.get(this.address + 'process/' + val).then((res) => {
          if (res.data.status === 'success' && res.data.data.length !== 0) {
            this.show_content = res.data.data.process.content.show_content;
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  #reportDetail {
    @mixin border_ {
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .special {
      min-height: 28px;
      padding: 0 20px;
      background-color: #eef3fc;
      @include border_;
      img {
        width: 120px;
        height: 80px;
        margin: 10px 0 0 10px;
        @include border_;
      }
    }
    .special.imgs {
      padding: 0;
    }
    .scroll_bar {
      padding-right: 10px;
      overflow-x: auto;
      .form_border {
        padding: 15px;
        border: 1px solid #dfe6fb;
        @include border_;
        margin-bottom: 12px;
      }
    }
  }
</style>
