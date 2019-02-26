<template>
  <div id="handover_info">
    <el-dialog :visible="handoverVisible" title="交接详情" @close="handleClose" width="30%">
      <div>
        <div style="padding-left: 30px" class="scroll_bar">
          <div v-for="(item,key) in handoverInfo" :key="key">
            交接人：<span style="color: #409EFF">{{ item.user_name }}</span> 部门：<span style="color: #409EFF">{{ item.org_name }}</span>
            交接时间：<span style="color: #409EFF">{{ item.handover_time }}</span>
            <Upload :ID="'handImg' + key" :editImage="img_info[key]" @getImg="handleGetImage" :isClear="handoverIsClear"></Upload>
          </div>
        </div>
        <div style="text-align: right;padding-right: 20px">
          <el-button size="mini" type="primary" @click="handleOk">确定</el-button>
          <el-button size="mini" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    name: "index",
    components: {Upload},
    props: ['handVisible', 'handInfo','houseId'],
    data() {
      return {
        house_id: '',
        handoverIsClear: false,
        handoverVisible: false,
        handoverInfo: [],
        img_info: []
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      handVisible(val) {
        this.handoverVisible = val;
      },
      handInfo: {
        handler(val) {
          this.handoverInfo = val;
          this.setImg(val);
        },
        deep: true
      },
      houseId(val){
        this.house_id = val;
      }
    },
    computed: {},
    methods: {
      handleCancel() {
        this.handoverVisible = false;
        this.$emit('close');
      },
      handleOk() {
        console.log(this.handoverInfo);
        this.$http.put(globalConfig.server + `coreproject/houses/add_handover_album/${this.house_id}`,{handover_info: this.handoverInfo}).then(res => {
          console.log(res);
          if (res.data.code === '20020') {
            this.$notify.success({
              title: '成功',
              message: '添加成功'
            });
            this.handleCancel();
          } else {
            this.$notify.warning({
              title: '失败',
              message: '添加失败'
            });
            this.handleCancel();
          }
          this.handoverIsClear = true;
        }).catch(err => {
          console.log(err);
        })
      },
      setImg(data) {
        this.$nextTick( () => {
          data.map((item) => {
            var obj = Object.assign({},item.handover_album);
            this.img_info.push(obj);
          });
        });
        console.log(this.img_info);
      },
      handleGetImage(val) {
        var ids = val[0].slice(7);
        this.handoverInfo[ids].album = val[1];
      },
      handleClose() {
        this.handoverVisible = false;
        this.handoverInfo = [];
        this.img_info = [];
        this.$emit('close');
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
