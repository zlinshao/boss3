<template>
  <div>
    <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="跟进时间">
      </el-table-column>
      <el-table-column
        width="150"
        label="房屋评分">
        <template slot-scope="scope">
          <span v-if="scope.row.house_rating">
            <el-rate disabled v-model="scope.row.house_rating" style="line-height: 37px"></el-rate>
          </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房屋状态">
        <template slot-scope="scope">
          <span v-if="scope.row.house_status">{{matchDictionary(scope.row.house_status)}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="vacant_time"
        label="空置期(天)">
      </el-table-column>
      <el-table-column
        label="预警状态">
        <template slot-scope="scope">
          <div v-if="scope.row.warning_status == 1" class="label success">正常</div>
          <div v-if="scope.row.warning_status == 2" class="label yellow">黄色预警</div>
          <div v-if="scope.row.warning_status == 3" class="label orange">橙色预警</div>
          <div v-if="scope.row.warning_status == 4" class="label red">红色预警</div>
        </template>
      </el-table-column>
      <el-table-column
        label="负责人">
        <template slot-scope="scope">
          <span v-if="scope.row.user&&scope.row.user.name">{{scope.row.user.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属部门">
        <template slot-scope="scope">
          <span v-if="scope.row.user&&scope.row.user.org&&scope.row.user.org.length>0
                 &&scope.row.user.org[0].name">{{scope.row.user.org[0].name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="跟进方式">
        <template slot-scope="scope">
          <span v-if="scope.row.follow_type">{{matchDictionary(scope.row.follow_type)}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="截图">
        <template slot-scope="scope">
          <el-popover
            ref="popover4"
            placement="top"
            width="400"
            trigger="click">
            <img v-for="(val,key) in scope.row.album.album_file" :src="val[0].uri"
                 data-magnify="" :data-src="val[0].uri">
          </el-popover>
          <el-button type="text" v-if="scope.row.album && scope.row.album.album_file"  v-popover:popover4>查看</el-button>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="follow_content"
        label="跟进记录">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    props:['houseId','activeName','all_dic'],
    data () {
        return {
          tableData:[],
          params:{
            page:1,
            limit:3,
            id:'',
          },
          totalNumber:0,
          emptyContent: ' ',
          tableLoading: false,
        }
    },
    watch:{
      activeName(val){
        if(val === 'first'){
          this.getData();
        }
      },
      houseId(val){
        this.getData();
        this.params.id = val;
      }
    },
    methods:{
      currentChange(val){
        this.params.page = val;
        this.getData();
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
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.tableData = [];
        this.totalNumber = 0;
        this.$http.get(globalConfig.server + 'core/follow', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '20000') {
            this.totalNumber = res.data.data.count;
            this.tableData = res.data.data.data;
          } else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      dd(){
          alert(32)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .label {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    color: #ffffff;
  }
  .success {
    background: #409EFF;
  }
  .yellow {
    background: #FFCC00
  }
  .orange {
    background: #FF9900
  }
  .red {
    background: #FF3900
  }
  img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }
</style>
