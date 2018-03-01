<template>
  <div id="villageDetail">
    <div class="scroll_bar">
      <div class="title">
        <router-link :to="{path: '/villageManage', query: {term: this.terms,status: 1}}">返回上一页</router-link>

      </div>
      <div class="title">个人信息</div>
      <div class="form_border">
        <el-form size="mini" label-width="110px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="小区名称">
                <div class="special">{{myData.village_name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋数">
                <div class="special">{{myData.total_buildings}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区地址">
                <div class="special">{{myData.address}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="小区类型">
                <div class="special">{{myData.house_type}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区别名">
                <div class="special">{{myData.village_alias}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物业费">
                <div class="special">{{myData.property_fee}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="建造年限">
                <div class="special">{{myData.built_year}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地铁线路">
                <div class="special">{{myData.content}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="照片">
                <div class="special imgs">
                  <img src="../../../assets/images/情人节.png" alt="">
                  <img src="../../../assets/images/情人节.png" alt="">
                  <img src="../../../assets/images/情人节.png" alt="">
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="title">小区简介</div>
      <div class="form_border">
        <el-form size="mini" label-width="110px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="周边配套">
                <div class="special">房贷首付</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小区简介">
                <div class="special">房贷首付克里斯蒂</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="title">周边信息</div>
      <div class="form_border">
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "village-detail",
    props: ['formList'],
    data() {
      return {
        myData: {},
        terms: {}
      }
    },
    mounted() {
      this.terms = this.$route.query.term;
      this.$http.get('setting/community/' + this.$route.query.ids).then((res) => {
        this.myData = res.data.data;
      });
      let map = new AMap.Map('container', {
        resizeEnable: true,
      });
    },
    watch: {},
    methods: {},
  }
</script>

<style lang="scss">
  #container {
    width: 100%;
    height: 360px;
  }

  #villageDetail {
    @mixin border_ {
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
    }
    .title {
      color: #409EFF;
      opacity: .7;
      font-size: 12px !important;
      line-height: 24px;
      &:before {
        border-radius: 2px;
        margin-right: 5px;
        background: #409EFF;
        border-left: 1px solid #409EFF;
        content: '|';
      }
    }

    .special {
      min-height: 28px;
      padding: 0 20px;
      background-color: #eef3fc;
      @include border_;
      img {
        width: 120px;
        height: 80px;
        @include border_;
      }
    }
    .special.imgs {
      padding: 10px;
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
