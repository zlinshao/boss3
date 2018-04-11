<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="制度上传" :visible.sync="moduleVisible" width="40%">
      <div>
        <el-form size="small" label-width="100px" :modal="formInline">
          <el-row>
            <el-col :span="22">
              <el-form-item label="标题" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="作者" required>
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="知识类型" required>
                <el-select v-model="formInline.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="文件上传" required>
                <Dropzone :id="'know'" :photo="photos" @finish="photo_success"
                          @remove="photo_remove"></Dropzone>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="所属部门" required>
                <el-input readonly placeholder="请输入内容" @focus="openModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="可查看人员" required>
                <el-input readonly placeholder="请输入内容" @focus="openModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="moduleVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="moduleVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  import Dropzone from '../../../common/dropzone.vue'

  export default {
    props: ['addKnowledgeDialog'],
    components: {Organization, Dropzone},
    data() {
      return {
        moduleVisible: false,
        organizationDialog: false,
        formInline: {
          region: ''
        },
        photos: {
          pic_id: [],
          pic_url: {},
        },
      };
    },
    watch: {
      addKnowledgeDialog(val) {
        this.moduleVisible = val
      },
      moduleVisible(val) {
        if (!val) {
          this.$emit('close');
          document.getElementById('know').innerHTML = '';
          this.photos.pic_id = [];
          this.photos.pic_url = {};
        }
      },
    },
    methods: {
      // 上传成功
      photo_success(val) {
        this.photos.pic_id = val;
      },
      // 删除图片
      photo_remove(val) {
        this.photos.pic_id = val;
      },

      openModal() {
        this.organizationDialog = true;
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
    }
  };
</script>
<style lang="scss" scoped="">

</style>
