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
                  <el-form-item label="小区别名">
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
                  <el-form-item label="房屋特色">
                    <div class="content">
                      <span v-if="detailData.house_feature">{{matchDictionary(detailData.house_feature)}}</span>
                    </div>
                  </el-form-item>
                </el-col>
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
                      <span v-if="detailData.house_goods.wardrobe_remark">是</span>
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
        <!--<el-button @click="downLoad">sss</el-button>-->
        <div class="describe_border">

          <div v-if="detailData.house_goods&&detailData.house_goods.photo">
            <div class="title">
              {{detailData.create_time}}
            </div>
            <div class="describe_border">
              <div v-if="detailData.house_goods&&detailData.house_goods.photo"
                   v-for="item in detailData.house_goods.photo" style="display: inline-block">
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
            </div>
            <div class="describe_border">
              <div v-if="albumArray.album&&albumArray.album.album_file&&albumArray.album.album_file.length>0"
                   v-for="item in albumArray.album.album_file" style="display: inline-block">
                <img v-if="item.info.mime&&item.info.mime.indexOf('image')>-1"
                     :src="item.uri" data-magnify="" :data-src="item.uri">
                <img v-if="!item.info.mime" :src="item.uri" data-magnify="" :data-src="item.uri">
                <video v-if="item.info.mime&&item.info.mime.indexOf('video')>-1"
                       v-for="item in albumArray.album.album_file"
                       class="video-js" controls preload="auto" width="200" height="120"
                       data-setup="{}">
                  <source :src="item.uri" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        detailData: {},
        albumData: [],
        allDictionary: [],
        listInfo: {},
        tableLoading: false,

        imgArray:[],
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
          this.detailData = [];
          this.albumData = {};
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
      downLoad() {
        this.imgArray.map( (img) => {
          fetch(img).then(res => res.blob().then(blob => {
            console.log(blob)
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename = '';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }))
        })
      },
      getData() {
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'house/album/' + this.houseId).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '30070') {
            this.detailData = res.data.data.detail;
            this.albumData = res.data.data.album;
            this.imgArray = [];
            if(this.albumData.length>0){
              this.albumData.forEach((item) => {
                item.album.album_file.forEach((img)=>{
                  this.imgArray.push(img.uri);
                })
              })
            }
            if(this.detailData.house_goods&&this.detailData.house_goods.photo.length>0){
              this.detailData.house_goods.photo.forEach((img)=>{
                this.imgArray.push(img.uri);
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
    }
  };
</script>
<style lang="scss" scoped="">
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

  .content {
    padding: 0 10px;
    min-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
  }
</style>
