<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="新建部门" :visible.sync="addDepartDialogVisible" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级部门">
                <el-input placeholder="请输入内容" disabled="" v-model="parent_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择城市" v-if="cityStatus">
                <el-select v-model="params.city_id" size="mini" clearable>
                  <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='部门名称'>
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否为公司" required>
                <el-switch
                  v-model="is_corp"
                  active-color="#409EFF">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="企业微信id" required>
                <el-input placeholder="请输入企业微信id" v-model="params.corp_wx"></el-input>
              </el-form-item>
            </el-col>
            <!--新加-->
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="社会统一信用代码" required>
                <el-input placeholder="请输入社会统一信用代码" v-model="params.cods_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="is_corp">
              <el-form-item label="联系方式" required>
                <el-input placeholder="请输入联系方式" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
            <!--新加-->
            <el-col :span="24">
              <el-form-item label='排序'>
                <el-input-number v-model="params.order"></el-input-number>
                <span style="color: #fb435e;margin-left: 15px">注意：数值越大，排序越靠前！</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDepartDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['addDepartDialog', 'parentId', 'parentName'],
    data() {
      return {
        urls: globalConfig.server,
        addDepartDialogVisible: false,
        params: {
          parent_id: '',
          name: '',
          order: '',
          is_corp: '0',
          corp_wx: '',
          cods_id: '',
          phone: '',
          city_id: '',
        },
        cityStatus: false,
        cities: false,
        is_corp: false,
        parent_name: '',
      };
    },
    watch: {
      addDepartDialog(val) {
        this.addDepartDialogVisible = val
      },
      addDepartDialogVisible(val) {
        if (!val) {
          this.closeModal();
          this.$emit('close');
        }
      },
      is_corp(val) {
        this.params.corp_wx = '';
        this.params.cods_id = '';
        this.params.phone = '';
        this.params.is_corp = val ? '1' : '0';
      },
      parentId(val) {
        if (val) {
          this.params.parent_id = val;
          this.$http.get(this.urls + 'organization/org/relation-city?parent_id=' + val).then(res => {
            if (res.data.code === '200820') {
              let data = res.data.data;
              if (data === 1) {
                this.cityStatus = true;
                this.$http.get(this.urls + 'organization/other/city-list').then(res => {
                  if (res.data.code === '700180') {
                    this.cities = res.data.data.data;
                  } else {
                    this.prompt('warning', res.data.msg);
                  }
                })
              } else {
                this.cityStatus = false;
              }
            } else {
              this.prompt('warning', res.data.msg);
            }
          })
        }
      },
      parentName(val) {
        if (val) {
          this.parent_name = val;
        }
      }
    },
    methods: {
      confirmEdit() {
        this.$http.post(this.urls + 'organization/org', this.params).then((res) => {
          if (res.data.code === '20010') {
            this.$emit('close', 'success');
            this.closeModal();
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      closeModal() {
        this.params = {
          parent_id: '',
          name: '',
          order: '',
          is_corp: '0',
          corp_wx: '',
          cods_id: '',
          phone: '',
          city_id: '',
        };
        this.cityStatus = false;
        this.is_corp = false;
      }
    }
  };
</script>

<style lang="scss" scoped="">

</style>
