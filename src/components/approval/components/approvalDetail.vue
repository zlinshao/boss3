<template>
    <div id="approvalDetail">
      <el-dialog
        title="审批详情"
        :visible.sync="innerVisible"
        @close="handleClose"
      >
        <div class="container">
            <div class="detail" v-for="(item,key) in detail">
              <div v-if="key !== '附件上传'">
                {{key}} : <div class="content">{{item ? item : '无'}}</div>
              </div>
              <div v-else>
                附件上传 :
                <div v-if="detail['附件上传'] && detail['附件上传'].length>0" class="content">
                <img style="width: 20%;" v-for="value in detail['附件上传']" :src="value"
                data-magnify="" :data-src="value">
                </div>
                <div v-else class="content">暂无</div>
              </div>
            </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "approvalDetail",
      data() {
        return {
          innerVisible: false,
          detailData: '',
        }
      },
      props: ['approvalVisible','detail'],
      watch:{
        approvalVisible:function (val) {
          this.innerVisible = val;
        },
        detail: function (val) {
          this.detailData = val;
        }
      },
      methods: {
        handleClose() {
          this.$emit('approvalClose');
        }
      }
    }
</script>

<style scoped lang="scss">
  #approvalDetail{
    .container{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .detail{
      width: 30%;
      line-height: 30px;
      text-align: left;
      .content{
        padding: 0 10px;
        min-height: 32px;
        line-height: 32px;
        background: #eef3fc;
        border-radius: 4px;
        font-size: 12px;
        color: #727479;
      }
    }
  }
</style>
