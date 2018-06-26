<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="消息详情" :visible.sync="messageDialogVisible">
      <div class="messageContent scroll_bar">
        <div class="massageHead">
          <div >
            <img src="../../assets/images/boss.png" style="width: 50px;height: 50px;border-radius: 50%;">
          </div>
          <div class="head">
            <div>boss小秘书</div>
            <div>{{messageInfo.created_at}}</div>
          </div>
        </div>

        <div class="messageBody">
          <div class="bodyTitle">
            <div style="font-weight: bold" v-if="messageInfo.content">{{messageInfo.content.title}}</div>
            <div>{{messageInfo.created_at}}</div>
          </div>

          <div class="messageDescribe">
            <div v-if="messageInfo.content">{{messageInfo.content.content}}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="messageDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="messageDialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'addFollowUp',
    props: ['messageDialog', 'messageDetail'],
    data() {
      return {
        messageDialogVisible: false,
        formInline: {},
        FormVisible: false,
        messageInfo:[],
      };
    },
    watch: {
      messageDialog(val){
        this.messageDialogVisible = val
      },
      messageDialogVisible(val){
        if (!val) {
          this.$emit('close')
        }
      },
      'messageDetail': {
        handler(val, oldVal){
          this.messageInfo = val
        }
      }
    },
    methods: {}
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp {
    .messageContent {
      height: 500px;
      overflow: auto;
      margin: 0;
      padding: 0;
      font-size: 14px;
      .massageHead {
        width: 100%;
        /*height: 90px;*/
        display: flex;
        .head {
          padding: 0 10px;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .messageBody{
        margin: 20px 20px 0 60px;
        border-top: 1px solid #eee;

        .bodyTitle{
          display: flex;
          align-items: center;
          margin-top: 20px;
          justify-content: space-between;
        }
        .messageDescribe{
          margin-top: 5px;
          line-height:150%;
          text-align:justify;
          text-justify:inter-ideograph;
        }
      }
    }
  }

</style>
