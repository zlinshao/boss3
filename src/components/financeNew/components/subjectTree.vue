<template>
  <div id="subjectTree">
    <el-dialog :close-on-click-modal="false" title="科目选择" :visible.sync="subjectVisible" width="355px" center>
      <div class="subjectPadding">
        <div class="filterSubject">
            <div class="filterTop" @click="filterSubject()">
                所有科目
            </div>
          <!--面包屑-->
          <div class="pitchOnData" v-show="pitchOnData.length > 0">
            <span v-for="(key,index) in pitchOnData" @click="removePitch(key.id, index)">
              <span v-if="pitchOnData.length > 1 && index !== 0">></span>
              {{key.name}}
            </span>
          </div>
          <div
            style="width: 90%;"
            v-loading="fullLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)">
          </div>
          <ul class="scroll_bar checkSubject" :style="rightUl">
            <li v-for="(key,index) in list">
              <el-radio-group v-model="checkSubject" 
                                 @change="chooseType(key,index)">
                <el-radio :label="index">{{key}}</el-radio>
              </el-radio-group>
              <div class="nextLevel" v-if="showNext" @click="nextLevel(key,index)">下级</div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" size="small" :disabled="forms.length < 1" @click="confirmSelect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "subjectTree",
    props: ['subjectDialog','types'],
    data() {
      return {
        subjectVisible: false,
        fullLoading: false,
        url: globalConfig.finance_server,
        list: {},                 // 所有数据
        rightUl: {
          height: '',             // 右侧 列表高度
        },
        pitchOnData: [],          // 面包屑
        form: {},
        forms:[],
        checkSubject:[],
        firstOpen: true,
        showNext:true
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      subjectDialog(val) {
        this.subjectVisible = val;
      },
      subjectVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          if (this.firstOpen) {
            this.filterSubject();
          }
        }
      },
      type(val) {
          console.log(val);
          if (val ==='top'){
              this.showNext=false;
          }else{
              this.showNext=true;
          }
      },
    },
    computed: {},
    methods: {
      // 科目选择
      filterSubject(id = 0) {
        this.fullLoading = true;
        this.list = {};
        this.$http.get(this.url + 'account/subject/next/' + id).then(res => {
          this.fullLoading = false;
          this.rightHeight();
          if (res.data.success) {
            this.list = res.data.data;
          } else {
            // this.prompt('warning', res.data.msg);
          }
        })
      },
     
      // 科目选择
      chooseType(key,index) {
        this.form.id=index;
        this.form.name=key;
        this.forms.push(this.form);
      },
      // 下级 面包屑
      nextLevel(key,index) {
        let data={};
        data.id=index;
        data.name=key;  
        this.pitchOnData.push(data);
        this.filterSubject(index);
      },
      // 删除 面包屑
      removePitch(id, index) {
        this.filterSubject(id);
        this.pitchOnData.splice(index + 1);
      },
      // 确定
      confirmSelect() {
        this.subjectVisible = false;
        this.$emit('selectSubject', this.form);
        this.close_();
      },
      close_() {
        this.pitchOnData = [];        //面包屑
        this.checkSubject = [];        //复选框 部门
        this.form = [];               //返回数据
      },
      // ul高度
      rightHeight() {
        let height = $('.pitchOnData').height();
        if (height !== 0) {
          this.rightUl.height = (420 - height - 77) + 'px';
        } else {
          this.rightUl.height = (420 - 58) + 'px';
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "../../../assets/css/common.scss";

  #subjectTree {
    .el-dialog__body {
      background-color: #f8f8f8;
      padding: 20px;
    }
    .subjectPadding {
      height: 420px;
      overflow: hidden;
      @include flex-items;
       .filterSubject {
        background-color: #fff;
        overflow: hidden;
        height: 99%;
        border: 1px solid #e0e0e0;
        @include border_radius(6px);
        &:hover {
          border-color: $themeColor;
        }
      }
      .filterSubject {
        width: 350px;
        .filterTop {
          text-align: center;
          padding: 10px 0;
          cursor: pointer;
          @include box_shadow(#eee, 10px);
          color: $themeColor;
        }
        .noBtn {
          color: #aaa;
        }
        .pitchOnData {
          background-color: #f5f5f5;
          padding: 10px;
          color: $themeColor;
          > span {
            line-height: 22px;
            cursor: pointer;
            &:hover {
              color: #1D7FFB;
            }
          }
        }
        .checkSubject {
          overflow-x: hidden;
          overflow-y: auto;
          .listUsers {
            height: 50px;
            cursor: pointer;
          }
          li {
            padding: 0 18px;
            height: 42px;
            @include flex-items;
            justify-content: space-between;
            &:hover {
              background-color: rgb(223, 237, 250);
            }
            .el-checkbox {
              @include flex-items;
              .el-checkbox__label {
                max-width: 160px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .nextLevel {
              cursor: pointer;
              padding: 0 10px;
              min-width: 50px;
              border-left: 1px solid #e0e0e0;
              color: #bbb;
              &:hover {
                color: $themeColor;
                border-left: 1px solid $themeColor;
              }
            }
          }
        }
      }
    }
    .el-dialog__footer {
      .dialog-footer {
        .el-button {
          padding: 10px 20px;
          width: 150px;
        }
      }
    }
  }
</style>
