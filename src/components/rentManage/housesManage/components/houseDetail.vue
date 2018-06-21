<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="房屋详情" width="60%" :visible.sync="houseDetailDialogVisible">
      <div class="scroll_bar"
           v-loading="tableLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, .7)">
        <div v-if="!isOnlyPic">
          <div class="title">基本信息</div>
          <div class="describe_border">
            <el-form size="small" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="小区名称">
                    <div class="content">
                      <span v-if="detailData.community">{{detailData.community.name}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="小区地址">
                    <div class="content">
                      <span v-if="detailData.community">{{detailData.community.detailed_address}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产权地址">
                    <div class="content">
                      <span v-if="detailData.community">{{detailData.community.nickname}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="门牌号">
                    <div class="content">
                    <span v-if="detailData.door_address">
                      {{detailData.door_address}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="面积">
                    <div class="content">
                    <span v-if="detailData.area">
                      {{detailData.area}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="装修">
                    <div class="content">
                    <span v-if="detailData.decorate">
                      {{detailData.decorate.name}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="房屋类型">
                    <div class="content">
                      <span v-if="detailData.property_type">{{detailData.property_type.name}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="朝向">
                    <div class="content">
                      <span v-if="detailData.direction">{{detailData.direction.name}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="楼层">
                    <div class="content">
                    <span v-if="detailData.floor">
                      {{detailData.floor.this}}/{{detailData.floor.all}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :span="8">
                  <el-form-item label="建议价格">
                    <div class="content">
                      <span v-if="detailData.price">{{detailData.price}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报备价格">
                    <div class="content">
                      <span
                        v-if="detailData.house_goods&&detailData.house_goods.price">{{detailData.house_goods.price}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否中介">
                    <div class="content">
                      <span v-if="detailData.is_agency">是</span>
                      <span v-else="">否</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人">
                    <div class="content">
                      <span v-if="listInfo.user&&listInfo.user.name">{{listInfo.user.name}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属部门">
                    <div class="content">
                      <span v-if="listInfo.org&&listInfo.org.name">{{listInfo.org.name}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div class="title">房屋物品</div>
          <div class="describe_border">
            <el-form size="small" label-width="140px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="空调">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.air_condition}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="冰箱">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.fridge}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电视">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.television}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="燃气灶">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.gas_stove}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="油烟机">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.hood}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="微波炉">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.microwave}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="洗衣机">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.wash_machine}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="热水器">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.water_heater}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="沙发">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.sofa}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="晾衣架">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.clothe_rack}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="餐桌">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.dining_table}}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="椅子">
                    <div class="content">
                      <span v-if="detailData.house_goods">{{detailData.house_goods.chair}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="暖气">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.heater">有</span>
                      <span v-else="">无</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="天然气">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.gas">有</span>
                      <span v-else="">无</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房屋交接是否干净">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.is_clean">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否每个房间有床+床垫">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.bed">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否每个房间有衣柜">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.wardrobe">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否每个房间有窗帘">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.curtain">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="家电是否齐全">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.is_fill">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房东是否予以配齐">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                      <span v-if="detailData.house_goods.is_lord_fill">是</span>
                      <span v-else="">否</span>
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="其他家具家电">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                     {{detailData.house_goods.other_furniture}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="其他问题">
                    <div class="content">
                    <span v-if="detailData.house_goods">
                     {{detailData.house_goods.other_remark}}
                    </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="title">房屋影像</div>
        <div class="describe_border">

          <div v-if="reportAlbum.length>0">
            <div class="title">
              {{detailData.create_time}}
            </div>
            <div class="describe_border">
              <div v-for="item in reportAlbum" style="display: inline-block">
                <img v-if="item.info.mime&&item.info.mime.indexOf('image')>-1"
                     :src="item.uri" data-magnify="" :data-src="item.uri" alt="">
                <img v-if="!item.info.mime" :src="item.uri" data-magnify="" :data-src="item.uri">
                <video v-if="item.info.mime&&item.info.mime.indexOf('video')>-1"
                       class="video-js" controls preload="auto" width="200" height="120" data-setup="{}">
                  <source :src="item.uri" type="video/mp4">
                </video>
              </div>
            </div>
          </div>

          <div v-if="albumData&&albumData.length>0" v-for="albumArray in albumData">
            <div class="title">
              <span style="margin-right: 30px">{{albumArray.create_time}}</span>
              <span style="margin-right: 30px;color: #444" v-if="albumArray.remark">备注：{{albumArray.remark}}</span>
              <span style="margin-right: 30px;color: #444" v-if="albumArray.staffs&&albumArray.staffs.name">上传人：{{albumArray.staffs.name}}</span>
              <span style="margin-right: 30px;color: #444"
                    v-if="albumArray.staffs&&albumArray.staffs.org&&albumArray.staffs.org.length>0">
                部门：
                <span v-for="item in albumArray.staffs.org">
                  <span>{{item.name}}&nbsp;&nbsp;  </span>
                </span>
              </span>
              <span style="color: #444"
                    v-if="albumArray.staffs&&albumArray.staffs.role&&albumArray.staffs.role.length>0">
                岗位：
                <span v-for="item in albumArray.staffs.role">
                  <span>{{item.display_name}}&nbsp;&nbsp;  </span>
                </span>
              </span>

              <span v-if="albumArray.old_data&&!isOnlyPic" style="float: right;cursor: pointer;user-select: none">
                <span @click="searchOldData(albumArray.old_data)">查看报备详情</span>
              </span>
            </div>
            <div class="describe_border">
              <div v-if="albumArray.album&&albumArray.album.album_file&&albumArray.album.album_file.length>0"
                   v-for="item in albumArray.album.album_file" style="display: inline-block">
                <img v-if="item.info.mime&&item.info.mime.indexOf('image')>-1"
                     :src="item.uri" data-magnify="" :data-src="item.uri">
                <img v-if="!item.info.mime" :src="item.uri" data-magnify="" :data-src="item.uri">
                <video v-if="item.info.mime&&item.info.mime.indexOf('video')>-1"
                       controls preload="auto" width="200" height="120">
                  <source :src="item.uri" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        width="60%"
        title="详情"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="scroll_bar">
          <div class="title">报备详情</div>
          <div class="describe_border">
            <el-form size="small" label-width="140px">

              <el-row>
                <el-col :span="12" v-for="(key,index) in oldData" :key="index"
                        v-if="printScreen.indexOf(index) === -1">
                  <el-form-item v-if="!Array.isArray(key)" :label="index" class="detailTitle">
                    <div class="special" v-if="index !== '房屋类型'">{{key}}</div>
                    <div class="special" v-if="index === '房屋类型'">{{key.name}}</div>
                  </el-form-item>
                  <el-form-item v-if="Array.isArray(key)" :label="index">
                    <div class="special">
                      <span v-if="index === '定金和收款方式' || index === '补交定金和收款方式'" v-for="item in key">{{item}}</span>
                      <span v-else>
                        <span style="margin-right: 20px;color: #409EFF">{{item.msg}}</span>
                        <span>{{item.period}}</span>
                      </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-else>
                  <el-form-item :label="index">
                    <div class="special imgs">
                      <span v-for="(p,index) in key">
                        <img data-magnify="" data-caption="图片查看器" :data-src="p.uri" :src="p.uri" v-if="!p.is_video">
                        <video :src="p.uri" controls v-if="p.is_video" width="120px" height="80px"></video>
                      </span>
                    </div>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-form>
          </div>
        </div>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="houseDetailDialogVisible = false">取 消</el-button>-->
        <!--<el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['houseDetailDialog', 'houseId', 'all_dic', 'isOnlyPic', 'houseDetail'],
    data() {
      return {
        houseDetailDialogVisible: false,
        innerVisible:false,
        detailData: {},
        albumData: [],
        reportAlbum: [],
        allDictionary: [],
        listInfo: {},
        tableLoading: false,

        oldData : {},
        printScreen: ['款项结清截图', '特殊情况领导截图', '特殊情况截图', '特殊情况同意截图', '领导报备截图', '凭证截图', '合同照片', '截图', '领导同意截图', '房屋影像', '房屋照片', '退租交接单'],

      };
    },
    watch: {
      houseDetailDialog(val) {
        this.houseDetailDialogVisible = val
      },
      houseDetailDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.getData();
          this.detailData = {};
          this.albumData = [];
          this.reportAlbum = [];
        }
      },
      innerVisible(val){
        if(!val){
          this.oldData = {};
        }
      },
      all_dic(val) {
        this.allDictionary = val;
      },
      houseDetail(val) {
        this.listInfo = val;
      }
    },
    methods: {

      getData() {
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'house/album/' + this.houseId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30070') {
            this.detailData = res.data.data.detail;
            this.albumData = res.data.data.album;
            let photo = this.detailData.house_goods.photo;
            let imgArray = [];

            if(this.albumData.length>0){
              this.albumData.forEach((item) => {
                item.album.album_file.forEach((img)=>{
                  imgArray.push(img.id);
                })
              })
            }
            if(photo && Array.isArray(photo) && photo.length>0){
              photo.forEach((item)=>{
                if(imgArray.indexOf(item.id)<0){
                  this.reportAlbum = photo;
                }
              })
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg,
            })
          }
        })
      },
      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },

      searchOldData(data){
        this.oldData = data;
        this.innerVisible = true;
      },
    }
  };
</script>
<style lang="scss" scoped="">
  @mixin border_($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }

  video {
    background: #000;
    margin: 10px;
  }
  .special {
    min-height: 32px;
    padding: 0 20px;
    background-color: #eef3fc;
    @include border_(6px);
    img {
      width: 120px;
      height: 80px;
      margin: 10px 0 0 10px;
      @include border_(6px);
    }
  }
  .special.imgs {
    padding: 0;
  }
  .content {
    padding: 0 10px;
    min-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
  }
</style>
