<template>
    <div id="rentAchv">
        <div class="highRanking"  style=" position: absolute; top: 120px; right: 20px;">
            <div class="highSearch">
                <el-form onsubmit="return false" :inline="true" size="mini">
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="exportData">导出</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="highRanking">
            <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -60px;">
                <el-form :inline="true" :model="form" size="mini" label-width="100px">
                    <div class="filterTitle">
                        <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
                    </div>
                    <el-row class="el_row_border">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="8">
                                    <div class="el_col_label">部门</div>
                                </el-col>
                                <el-col :span="16" class="el_col_option">
                                    <el-form-item>
                                        <el-input v-model="depart_name" @focus="chooseDepart" placeholder="请选择部门"
                                                  readonly>
                                            <template slot="append">
                                                <div style="cursor: pointer;" @click="closeDepart">清空</div>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="8">
                                    <div class="el_col_label">员工</div>
                                </el-col>
                                <el-col :span="16" class="el_col_option">
                                    <el-form-item>
                                        <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择员工"
                                                  readonly>
                                            <template slot="append">
                                                <div style="cursor: pointer;" @click="closeStaff">清空</div>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row class="el_row_border">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="8">
                                    <div class="el_col_label">日期</div>
                                </el-col>
                                <el-col :span="16" class="el_col_option">
                                    <el-form-item>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="date"
                                                    type="daterange"
                                                    align="right"
                                                    unlink-panels
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    :picker-options="pickerOptions"
                                                    value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div class="btnOperate">
                        <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
                        <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                        <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <el-table
                :data="tableData"
                :empty-text='collectStatus'
                v-loading="collectLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                width="100%">
            <el-table-column label="租房人" prop="signUser.name" ></el-table-column>
            <el-table-column label="地址" prop="house.name"></el-table-column>
            <el-table-column label="出租类型" prop="lord_new_rent">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord_new_rent=='new'">新收新租</span>
                    <span v-else-if="scope.row.lord_new_rent=='second'">二次出租</span>
                    <span v-else="scope.row.lord_new_rent==''">未知</span>
                </template>
            </el-table-column>
            <el-table-column label="租房月单价" prop="renter.rent_month_price"></el-table-column>
            <el-table-column label="付款方式"  prop="renter.rent_pay_way"></el-table-column>
            <el-table-column label="租房空置期" prop="renter.rent_vacancy_date"></el-table-column>
            <el-table-column label="租房渠道费" prop="rent_agency_count">
                <template slot-scope="scope">
                    <span v-if="scope.row.renter.rent_agency_count==''">0</span>
                    <span v-else>{{scope.row.renter.rent_agency_count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="签约时长" prop="renter.rent_sign_month"></el-table-column>

            <el-table-column label="收房月单价" prop="lord.lord_month_price"></el-table-column>
            <el-table-column label="收房年限" prop="lord.lord_duration"></el-table-column>
            <el-table-column label="付款方式"  prop="lord.lord_pay_way"></el-table-column>
            <el-table-column label="收房空置期" prop="lord.lord_vacancy_date"></el-table-column>
            <el-table-column label="收房渠道费" prop="lord_agency_count">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord.lord_agency_count==''">0</span>
                    <span v-else>{{scope.row.lord.lord_agency_count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="基本业绩" prop="basic_achievement">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord_new_rent=='new'">{{scope.row.res.rent.basic_achievement}}</span>
                    <span v-else-if="scope.row.lord_new_rent=='second'">{{scope.row.res.all.basic_achievement}}</span>
                    <span v-else="scope.row.lord_new_rent==''">0</span>
                </template>
            </el-table-column>
            <el-table-column label="溢出业绩" prop="overflow">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord_new_rent=='new'">{{scope.row.res.rent.overflow}}</span>
                    <span v-else-if="scope.row.lord_new_rent=='second'">{{scope.row.res.all.overflow}}</span>
                    <span v-else="scope.row.lord_new_rent==''">0</span>
                </template>
            </el-table-column>
            <el-table-column label="综合金额" prop="push_money">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord_new_rent=='new'">{{scope.row.res.rent.push_money}}</span>
                    <span v-else-if="scope.row.lord_new_rent=='second'">{{scope.row.res.all.push_money}}</span>
                    <span v-else="scope.row.lord_new_rent==''">0</span>
                </template>
            </el-table-column>
            <el-table-column label="实际到手" prop="real_money">
                <template slot-scope="scope">
                    <span v-if="scope.row.lord_new_rent=='new'">{{scope.row.res.rent.real_money}}</span>
                    <span v-else-if="scope.row.lord_new_rent=='second'">{{scope.row.res.all.real_money}}</span>
                    <span v-else="scope.row.lord_new_rent==''">0</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block pages">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="form.page"
                    :page-size="12"
                    layout="total, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>
        <!--组织架构-->
        <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                      @selectMember="selectMember"></organization>
    </div>

</template>

<script>
    import Organization from '../../../common/organization'
    export default {
        name: "rentAchv",
        components:{Organization},
        data() {
            return {
                isHigh:false,
                form:{
                    page:1,
                    limit:12,
                    depart_ids:[],
                    staff_ids:[],
                    start_time:'',
                    end_time:'',
                    export:0
                },
                depart_name:'',
                staff_name:'',
                date:'',
                tableData:[],
                collectStatus:'',
                collectLoading: false,
                totalNum:0,
                organizeVisible:false,
                organizeType:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        mounted() {
            this.getTableData();
        },
        methods:{
            getTableData(){
                if (this.date){
                    this.form.start_time=this.date[0];
                    this.form.end_time=this.date[1];
                }
                this.collectLoading = true;
                this.collectStatus = ' ';
                this.$http.get(globalConfig.server + 'salary/achv/rentAchv',{params:this.form}).then((res) => {
                    this.isHigh = false;
                    this.collectLoading = false;

                    if (Number(res.data.code) %10 ===0) {
                        this.tableData = res.data.data.data;
                        this.totalNum = Number(res.data.data.count);
                    } else {
                        this.collectStatus = '暂无数据';
                        this.tableData = [];
                        this.totalNum = 0;
                    }
                });
            },
            resetting(){
                this.date='';
            },
            highGrade(){
                this.isHigh = !this.isHigh;
            },
            exportData(){
                this.form.export=1;
                this.$http.get(globalConfig.server + 'salary/achv/rentAchv', {
                    responseType: 'arraybuffer',
                    params: this.form
                }).then((res) => {
                    if (!res.data) {
                        return;
                    }
                    this.$exportData(res.data)
                })
            },
            // 部门筛选
            chooseDepart() {
                this.organizeVisible = true;
                this.organizeType = 'depart';
            },
            // 员工筛选
            chooseStaff() {
                this.organizeVisible = true;
                this.organizeType = 'staff';
            },
            closeOrganize() {
                this.organizeVisible = false;
            },
            // 清空部门
            closeDepart() {
                this.form.depart_ids = [];
                this.depart_name = '';
            },
            // 清空员工
            closeStaff() {
                this.form.staff_ids = [];
                this.staff_name = '';
            },
            selectMember(val) {
                if (this.organizeType === 'depart') {
                    for (var i = 0; i < val.length; i++) {
                        this.depart_name = this.depart_name === "" ? val[i].name : this.depart_name + "," + val[i].name;
                        this.form.depart_ids.push(val[i].id);
                    }
                } else if (this.organizeType === 'staff') {
                    for (var i = 0; i < val.length; i++) {
                        this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
                        this.form.staff_ids.push(val[i].id);
                    }
                }
            },
            handleCurrentChange(val){
                this.form.page=val;
                this.getTableData();
            }
        }
    }
</script>

<style scoped>

</style>
