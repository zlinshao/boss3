<template>
  <div id="contrastDialog">
    <el-dialog :close-on-click-modal="false" title="对比报备信息" width="60%" :visible.sync="contrastDialogVisible">
      <el-form size="mini" label-width="140px">
        <el-row :gutter="10" v-if="Object.keys(selfReportData).length>0">
          <el-col :span="12">
            <div class="title">
              {{selfReportData['报备类型']}}
            </div>
            <div class="scroll_bar" id="oldReport" style="border: 1px solid #6a8dfb;border-radius: 6px;">
              <div id="oldReportContent">
                <div v-for="(val,key) in selfReportData" @click="signSP(key,$event)">
                  <div v-if="printScreen.indexOf(key) === -1">
                    <el-form-item v-if="!Array.isArray(val)" :label="key+' : '">
                      <div class="special" :class="{theSameBack:theSamePoint===key}" v-if="key !== '房屋类型'">{{val}}</div>
                      <div class="special" :class="{theSameBack:theSamePoint===key}" v-if="key === '房屋类型'">{{val.name}}</div>
                    </el-form-item>
                    <el-form-item v-if="Array.isArray(val)" :label="key+' : '">
                      <div class="special" :class="{theSameBack:theSamePoint===key}">
                        <span v-if="key === '定金和收款方式' || key === '补交定金和收款方式'" v-for="item in val">{{item}}</span>
                        <span v-else>
                        <span style="margin-right: 20px;color: #409EFF">{{item.msg}}</span>
                        <span>{{item.period}}</span>
                      </span>
                      </div>
                    </el-form-item>
                  </div>

                  <div v-else>
                    <el-form-item :label="key+' : '">
                      <div class="imgs special" :class="{theSameBack:theSamePoint===key}">
                      <span v-for="img in val">
                        <img data-magnify="" data-caption="图片查看器" :data-src="img.uri" :src="img.uri" v-if="!img.is_video">
                        <video :src="img.uri" controls v-if="img.is_video" width="140px" height="80px"></video>
                      </span>
                      </div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-col>


          <el-col :span="12">
            <div class="title self_title" style="color: #fb4699">
              {{aboutReportData['报备类型']}}
            </div>
            <div class="scroll_bar" id="newReport" v-loading="isLoading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(255, 255, 255, 0)"
                 style="border: 1px solid #fb4699;border-radius: 6px;padding: 10px">
              <div>
                <div v-for="(val,key) in aboutReportData" @click="signSP(key,$event)">
                  <div v-if="printScreen.indexOf(key) === -1">
                    <el-form-item v-if="!Array.isArray(val)" :label="key+' : '">
                      <div class="special" :class="{theSameBack:theSamePoint===key}" v-if="key !== '房屋类型'">{{val}}</div>
                      <div class="special" :class="{theSameBack:theSamePoint===key}" v-if="key === '房屋类型'">{{val.name}}</div>
                    </el-form-item>
                    <el-form-item v-if="Array.isArray(val)" :label="key+' : '">
                      <div class="special" :class="{theSameBack:theSamePoint===key}">
                        <span v-if="key === '定金和收款方式' || key === '补交定金和收款方式'" v-for="item in val">{{item}}</span>
                        <span v-else>
                        <span style="margin-right: 20px;color: #409EFF">{{item.msg}}</span>
                        <span>{{item.period}}</span>
                      </span>
                      </div>
                    </el-form-item>
                  </div>
                  <div v-else>
                    <el-form-item :label="key+' : '">
                      <div class="imgs special" :class="{theSameBack:theSamePoint===key}">
                      <span v-for="img in val">
                        <img data-magnify="" data-caption="图片查看器" :data-src="img.uri" :src="img.uri" v-if="!img.is_video">
                        <video :src="img.uri" controls v-if="img.is_video" width="140px" height="80px"></video>
                      </span>
                      </div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['selfReport','aboutReportId','contrastDialog'],
    data() {
      return {
        contrastDialogVisible:false,
        tableData:[],
        selfReportData:{},
        aboutReportData:{},
        isLoading : false,
        theSamePoint : '',
        printScreen: ['款项结清截图', '特殊情况领导截图', '特殊情况截图', '特殊情况同意截图', '领导报备截图', '凭证截图', '合同照片', '截图', '领导同意截图', '房屋影像', '房屋照片', '退租交接单'],
      };
    },
    watch:{
      contrastDialog(val){
        this.contrastDialogVisible = val
      },
      contrastDialogVisible(val){
        if(!val){
          this.$emit('close');
          this.clearData();
        }else {
          this.getData();
        }
      },
      selfReport(val){
        if(val){
          this.selfReportData = val;
        }
      },
    },
    mounted(){

    },
    methods:{
      getData(){
        this.isLoading = true;
        this.$http.get(globalConfig.server_user + 'process/' + this.aboutReportId).then((res) => {
          this.isLoading = false;
          if (res.data.status === 'success' && res.data.data.length !== 0) {
            this.aboutReportData = JSON.parse(res.data.data.process.content.show_content_compress);
          } else {
            this.aboutReportData = {};
          }
        });
      },
      clearData(){
        this.aboutReportData = {};
      },

      signSP(key,ev){
        this.theSamePoint = key;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  img {
    width: 120px;
    height: 80px;
    margin: 10px 0 0 10px;
    border-radius: 6px;
  }


  /*.el-form-item--mini.el-form-item{*/
    /*margin-bottom: 6px !important;*/
    /*border-bottom: 1px solid #eeeeee;*/
  /*}*/
  .el-form-item__label{
    color: #6a8dfb !important;
  }

  .special {
    min-height: 32px;
    padding: 0 20px;
    background-color: #eef3fc;
    border-radius: 5px;
    img {
      width: 120px;
      height: 80px;
      margin: 10px 0 0 10px;
      border-radius: 5px;
    }
  }

  .theSameBack{
    border:1px solid #fb4699;
    box-sizing: border-box;
  }
  .self_title{
    &:before{
      border-radius: 2px;
      margin-right: 5px;
      background: #fb4699 !important;
      border-left: 1px solid #fb4699 !important;
      content: '|';
    }
  }
</style>
