<template>
    <div id="process">
        <el-dialog  :visible.sync="processManageDialog" width="80%">
           <el-tabs v-model="activeName" @tab-click="handleClick" class='el-tabs'>
               <el-form inline size='mini' class="search-info">
                    <el-form-item label="">
                        <el-input v-model='params.search' @keyup.enter.prevent.native='search' placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click='search'>搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-tab-pane label="已约面试" name="first">
                    <el-table
                        :data="interviewDatedData"
                        v-loading="loading1"
                        element-loading-text="加载中"
                        element-loading-spinner="el-icon-loading"
                        @cell-click='cellClick'
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id'>{{scope.row.name}}</span>
                                <el-input size='small' v-if='is_editing_id === scope.row.id' v-model='interviewParams.name'></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="genders"
                            label="性别">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id && scope.row.genders'>{{scope.row.genders.dictionary_name}}</span>
                                <span v-if='is_editing_id !== scope.row.id && !scope.row.genders'>/</span>
                                <el-select v-if='is_editing_id === scope.row.id' size='small' v-model="interviewParams.gender" placeholder="">
                                    <el-option v-for="(item, index) in genders" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="educations"
                            label="学历">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id && scope.row.educations'>{{scope.row.educations.dictionary_name}}</span>
                                <span v-if='is_editing_id !== scope.row.id && !scope.row.educations'>/</span>
                                <el-select v-if='is_editing_id === scope.row.id' size='small' v-model="interviewParams.education" placeholder="">
                                    <el-option v-for="(item, index) in education" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="experience"
                            label="经验">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id && scope.row.experiences'>{{scope.row.experiences.dictionary_name}}</span>
                                <span v-if='is_editing_id !== scope.row.id && !scope.row.experiences'>/</span>
                                <el-select v-if='is_editing_id === scope.row.id' size='small' v-model="interviewParams.experience" placeholder="">
                                    <el-option v-for="(item, index) in experience" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系方式">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id'>{{scope.row.phone}}</span>
                                <el-input size='small' v-if='is_editing_id === scope.row.id' v-model='interviewParams.phone'></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interview_time"
                            label="面试时间">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id'>{{scope.row.interview_time}}</span>
                                <el-date-picker 
                                    v-if='is_editing_id === scope.row.id' 
                                    v-model="interviewParams.interview_time" 
                                    type="datetime" 
                                    size='small'
                                    value-format='yyyy-MM-dd-HH-mm-ss'
                                    placeholder="选择日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="resume_sources"
                            label="简历来源">
                            <template slot-scope="scope">
                                <span v-if='is_editing_id !== scope.row.id && scope.row.resume_sources'>{{scope.row.resume_sources.dictionary_name}}</span>
                                <span v-if='is_editing_id !== scope.row.id && !scope.row.resume_sources'>/</span>
                                <el-select v-if='is_editing_id === scope.row.id' size='small' v-model="interviewParams.resume_source" placeholder="">
                                    <el-option v-for="(item, index) in source" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="album"
                            label="原始简历"
                            width='80px'
                            class-name='font-color'>
                            <template slot-scope="scope">
                                <span v-if='scope.row.album.length'>查看</span>
                                <span v-if='!scope.row.album.length'>上传</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="edit"
                            label="操作"
                            width='150px'>
                            <template slot-scope="scope">
                                <el-button v-if='is_editing_id !== scope.row.id' size='mini'>修改</el-button>
                                <el-button v-if='is_editing_id === scope.row.id' size='mini' @click.stop='cancelEdit'>取消</el-button>
                                <el-button v-if='is_editing_id === scope.row.id' size='mini' @click.stop='confirmEdit(scope.row)'>确定</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interview_status"
                            label="是否面试">
                            <template slot-scope="scope">
                                <span v-if='is_editing_interview_status !== scope.row.id'>{{scope.row.interview_statuss.dictionary_name}}</span>
                                <el-select 
                                    v-if='is_editing_interview_status === scope.row.id' 
                                    size='small' 
                                    v-model="updateParams.update.interview_status"
                                    @change='updateStatus(scope.row)' 
                                    placeholder="">
                                    <el-option v-for="(item, index) in interview_unfinished" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class='add-interviewer'>
                        <el-button class='font-color' size='mini' icon="el-icon-plus" @click='addInterviewerDialog = true'>添加面试人</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="面试完毕" name="second">
                    <el-table
                        :data="interviewFinishedData"
                        v-loading="loading2"
                        element-loading-text="加载中"
                        element-loading-spinner="el-icon-loading"
                        @cell-click='interviewResEdit'
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="album"
                            label="原始简历"
                            width='80px'>
                            <template slot-scope="scope">
                                <span v-if="scope.row.album.length">查看</span>
                                <span v-if="!scope.row.album.length">/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interviewers"
                            label="面试官">
                            <template slot-scope="scope">
                                <span v-if="scope.row.interviewers && scope.row.interviewers.name">{{scope.row.interviewers.name}}</span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="salary"
                            label="期望薪资">
                           <template slot-scope="scope">
                                <span v-if='scope.row.salary && scope.row.salary.expect'>{{scope.row.salary.expect}}</span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="salary"
                            label="所谈薪资">
                           <template slot-scope="scope">
                                <span v-if='scope.row.salary && scope.row.salary.actual'>{{scope.row.salary.actual}}</span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系方式">
                            <template slot-scope="scope">
                                <span v-if='scope.row.phone'>{{scope.row.phone}}</span>
                                <span v-if='!scope.row.phone'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interview_time"
                            label="面试时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.interview_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="resume_sources"
                            label="简历来源">
                            <template slot-scope="scope">
                                <span v-if='scope.row.resume_sources'>{{scope.row.resume_sources.dictionary_name}}</span>
                                <span v-if='!scope.row.resume_sources'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interview_statuss"
                            label="面试结果">
                            <template slot-scope="scope">
                                <span v-if='scope.row.interview_statuss && is_editing_interview_finished !== scope.row.id'>{{scope.row.interview_statuss.dictionary_name}}</span>
                                <el-select 
                                    v-if='is_editing_interview_finished === scope.row.id' 
                                    size='small' 
                                    v-model="updateParams_finished.update.interview_status"
                                    @change='selectStatus(scope.row)' 
                                    placeholder="">
                                    <el-option v-for="(item, index) in interview_finished" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="entry_statuss"
                            label="人资沟通">
                            <template slot-scope="scope">
                                <span v-if='scope.row.entry_statuss && scope.row.interview_status === 739'>{{scope.row.entry_statuss.dictionary_name}}</span>
                                <!-- <el-select 
                                    v-if='is_edit_humansource === scope.row.id' 
                                    size='small' 
                                    v-model="updateParams_finished.update.interview_status"
                                    @change='selectStatus(scope.row)' 
                                    placeholder="">
                                    <el-option v-for="(item, index) in humanresource" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待入职" name="third">
                    <el-table
                        :data="toInductData"
                        v-loading="loading3"
                        element-loading-text="加载中"
                        element-loading-spinner="el-icon-loading"
                        @cell-click='checkoutEvent'
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="album"
                            label="原始简历">
                            <template slot-scope="scope">
                                <span v-if='scope.row.album.length'>查看</span>
                                <span v-if='!scope.row.album.length'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interviewers"
                            label="面试官">
                            <template slot-scope="scope">
                                <span v-if='scope.row.interviewers'>{{scope.row.interviewers.name}}</span>
                                <span v-if='!scope.row.interviewers'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="entry_other"
                            label="入职条件">
                            <template slot-scope="scope">
                                <span v-if='scope.row.entry_other'>查看</span>
                                <span v-if='!scope.row.interviewers'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="入职时间">
                            <template slot-scope="scope">
                                <span v-if='scope.row.entry_other && scope.row.entry_other.entry_time.length'>
                                    {{scope.row.entry_time}}
                                </span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="background_check"
                            label="背景调查">
                            <template slot-scope="scope">
                                <span v-if='scope.row.background_check'>查看</span>
                                <span v-if='!scope.row.background_check'>添加</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="image_info"
                            label="入职材料">
                            <template slot-scope="scope">
                                <span v-if='scope.row.image_info'>查看</span>
                                <span v-if='!scope.row.image_info'>添加</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="basic_info"
                            label="基本信息">
                            <template slot-scope="scope">
                                <span v-if='scope.row.basic_info'>查看</span>
                                <span v-if='!scope.row.basic_info'>添加</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="entry_statuss"
                            label="入职结果">
                            <template slot-scope="scope">
                                <span v-if='is_editing_entry_statuss !== scope.row.id'>{{scope.row.entry_statuss.dictionary_name}}</span>
                                <el-select 
                                    v-if='is_editing_entry_statuss === scope.row.id' 
                                    size='small' 
                                    v-model="entryStatus.update.entry_status"
                                    @change='selectEntryStatus(scope.row)'
                                    placeholder="">
                                    <el-option v-for="(item, index) in humanresource_entry" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已入职" name="fourth">
                    <el-table
                        :data="inductedData"
                        v-loading="loading4"
                        element-loading-text="加载中"
                        element-loading-spinner="el-icon-loading"
                        @cell-click='checkoutEvent'
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="album"
                            label="原始简历">
                            <template slot-scope="scope">
                                <span v-if='scope.row.album.length'>查看</span>
                                <span v-if='!scope.row.album.length'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="interviewers"
                            label="面试官">
                            <template slot-scope="scope">
                                <span v-if='scope.row.interviewers'>{{scope.row.interviewers.name}}</span>
                                <span v-if='!scope.row.interviewers'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系方式">
                            <template slot-scope="scope">
                                <span v-if='scope.row.phone'>{{scope.row.phone}}</span>
                                <span v-if='!scope.row.phone'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="entry_other"
                            label="入职条件">
                            <template slot-scope="scope">
                                <span v-if='scope.row.entry_other'>查看</span>
                                <span v-if='!scope.row.interviewers'>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="入职时间">
                            <template slot-scope="scope">
                                <span v-if='scope.row.entry_other && scope.row.entry_other.entry_time.length'>
                                    {{scope.row.entry_time}}
                                </span>
                                <span v-else>/</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="background_check"
                            label="背景调查">
                            <template slot-scope="scope">
                                <span v-if='scope.row.background_check'>查看</span>
                                <span v-if='!scope.row.background_check'>添加</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="image_info"
                            label="入职材料">
                            <template slot-scope="scope">
                                <span v-if='scope.row.image_info'>查看</span>
                                <span v-if='!scope.row.image_info'>添加</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="basic_info"
                            label="基本信息">
                            <template slot-scope="scope">
                                <span v-if='scope.row.basic_info'>查看</span>
                                <span v-if='!scope.row.basic_info'>添加</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="12"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-tabs>
            <!--添加面试人开始-->
            <el-dialog width="30%"  :visible.sync="addInterviewerDialog" append-to-body>
                <el-form  label-width="80px" size='mini' center>
                    <el-form-item label="姓名" required>
                        <el-input v-model="newInterviewParams.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" required>
                        <el-select v-model="newInterviewParams.gender" placeholder="">
                            <!-- <el-option v-for="(item, index) in genders" :key='index' :label='item.dictionary_name' :value='item.id'></el-option> -->
                            <el-option label='男' value='716'></el-option>
                            <el-option label='女' value='717'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历" required>
                        <el-select v-model="newInterviewParams.education" placeholder="">
                            <el-option v-for="(item, index) in education" :key="index" :label="item.dictionary_name" :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经验" required>
                        <el-select v-model="newInterviewParams.experience" placeholder="">
                            <el-option v-for="(item, index) in experience" :key="index" :label="item.dictionary_name" :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系方式" required>
                        <el-input v-model="newInterviewParams.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="面试时间" required>
                        <el-date-picker 
                            v-model="newInterviewParams.interview_time" 
                            type="datetime" 
                            size='small'
                            value-format='yyyy-MM-dd-HH-mm-ss'
                            placeholder="选择日期"
                            default-time="12:00:00">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="简历来源" required>
                        <el-select v-model="newInterviewParams.resume_source" placeholder="">
                            <el-option v-for="(item, index) in source" :key="index" :label="item.dictionary_name" :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="原始简历" required>
                        <UPLOAD :ID="'first'" :isClear="isClear" @getImg="getImgData"></UPLOAD>
                    </el-form-item>
                    <el-form-item class='add-interview'>
                        <el-button type="primary" @click='confirmAddInterviewer'>确定</el-button>
                        <el-button @click='cancelAdd'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--添加面试人结束-->
            <!--原始简历开始-->
            <el-dialog  :visible.sync="lookUpResumeDialog" append-to-body>
                <div v-for='(item, index) in album' :key='index'>
                    <embed class='embed' :src="item.uri" />
                </div>
            </el-dialog>
            <!--原始简历结束-->
            <!--未面试开始-->
            <el-dialog :visible.sync="uninterviewDialog" append-to-body width="25%">
                <el-form label-width="170px" center>
                    <el-form-item label="姓名">
                        <span>{{uninterviewObj.name}}</span>
                    </el-form-item>
                    <el-form-item label="面试结果">
                        <span v-if='!is_editResult'>{{uninterviewObj.interview_status}}</span>
                         <el-select 
                            v-if='is_editResult' 
                            size='small' 
                            v-model="updateParams.update.interview_status"
                            @change='confirmIsinterview'
                            placeholder="">
                            <el-option v-for="(item, index) in interview_unfinished" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="原因">
                        <span v-if='!is_editResult'>{{uninterviewObj.interview_result}}</span>
                        <el-input v-if='is_editResult' type="textarea" v-model="uninterviewObj.interview_result"></el-input>
                    </el-form-item>
                </el-form>
                <div class='edit-result'>
                    <el-button size='mini' @click='cancelEditResult'>取消</el-button>
                    <el-button size='mini' @click='confirmEditResult'>确定</el-button>
                    <el-button size='mini' @click='editResult'>修改</el-button>
                </div>
            </el-dialog>
            <!--未面试结束-->
            <!--已面试信息开始-->
            <el-dialog :visible.sync="interviewedDialog" append-to-body width="25%">
                <el-form label-width="80px" center>
                    <el-form-item label="姓名">
                        <span>{{interviewedObj.name}}</span>
                    </el-form-item>
                    <el-form-item label="性别">
                        <span>{{interviewedObj.gender}}</span>
                    </el-form-item>
                    <el-form-item label="面试官">
                        <el-input v-model="interviewedObj.interviewer_name" @focus="chooseStaff" placeholder="请选择" readonly>
                        <template slot="append">
                            <div style="cursor: pointer;" @click="closeStaff">清空</div>
                        </template>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="期望薪资">
                        <el-input size='mini' v-model="interviewedObj.expect"></el-input>
                    </el-form-item>
                    <el-form-item label="所谈薪资">
                        <el-input size='mini' v-model="interviewedObj.actual"></el-input>
                    </el-form-item>
                </el-form>
                <div class='edit-result'>
                    <el-button size='mini' @click='cancelInterviewedInfo'>取消</el-button>
                    <el-button size='mini' @click='confirmInterviewedInfo'>确定</el-button>
                </div>
            </el-dialog>
            <!--已面试信息结束-->
            <!--面试通过或未通过开始-->
            <el-dialog :visible.sync="passInterviewDialog" append-to-body width="25%">
                <el-form label-width="80px" center>
                    <el-form-item label="姓名">
                        <span>{{interviewedObj_finished.name}}</span>
                    </el-form-item>
                    <el-form-item label="面试结果">
                        <span>{{passOrNotStr}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="interviewedObj_finished.interview_result" type='textarea'>
                    </el-input>
                    </el-form-item>
                </el-form>
                <div class='edit-result'>
                    <el-button size='mini' @click='cancelPassInterview'>取消</el-button>
                    <el-button size='mini' @click='confirmPassInterview'>确定</el-button>
                </div>
            </el-dialog>
            <!--面试通过或未通过结束-->
            <!--查看面试未通过开始-->
            <el-dialog :visible.sync="unpassInterviewDialog" append-to-body width="25%">
                <el-form label-width="80px" center>
                    <el-form-item label="姓名">
                        <span>{{unpassInterviewObj.name}}</span>
                    </el-form-item>
                    <el-form-item label="面试结果">
                        <span v-if='!is_editing_unpass'>{{unpassInterviewObj.interview_status_str}}</span>
                        <el-select  
                            size='small' 
                            v-if='is_editing_unpass'
                            v-model="updateParams_finished.update.interview_status"
                            @change='editInterviewStatus' 
                            placeholder="">
                            <el-option v-for="(item, index) in interview_finished" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span v-if='!is_editing_unpass'>{{unpassInterviewObj.interview_result}}</span>
                        <el-input v-if='is_editing_unpass' v-model="unpassInterviewObj.interview_result" type='textarea'>
                    </el-input>
                    </el-form-item>
                </el-form>
                <div class='edit-result'>
                    <el-button size='mini' @click='cancelEditFromUnpass'>取消</el-button>
                    <el-button size='mini' @click='confirmEditFromUnpass'>确定</el-button>
                    <el-button size='mini' @click='editFromUnpass'>修改</el-button>
                </div>
            </el-dialog>
            <!--人资沟通弹框开始-->
            <el-dialog :visible.sync="IsEntryDialog" append-to-body width="30%">
                <el-form label-width="80px" center>
                    <el-form-item label="姓名">
                        <span>{{humansourceObj.name}}</span>
                    </el-form-item>
                    <el-form-item label="面试结果">
                        <span>{{humansourceObj.interview_status}}</span>
                    </el-form-item>
                    <el-form-item label="人资沟通">
                        <template>
                            <el-radio v-model="is_agree" label='1'>同意入职</el-radio>
                            <el-radio v-model="is_agree" label='0'>不同意入职</el-radio>
                        </template>
                    </el-form-item>
                    <div v-if='is_agree == "1"'>
                        <el-form-item label="薪资">
                            <el-input v-if='is_editing_condition' size='mini' v-model="agreeInductParams.update.entry_other.salary" ></el-input>
                            <span v-if='!is_editing_condition'>{{agreeInductParams.update.entry_other.salary}}</span>
                        </el-form-item>
                        <el-form-item label="入职时间">
                            <el-date-picker v-if='is_editing_condition' size='mini' v-model="agreeInductParams.update.entry_other.entry_time" type="date" placeholder="选择日期"></el-date-picker>
                            <span v-if='!is_editing_condition'>
                                {{agreeInductParams.update.entry_other.entry_time ? this.timestampToDate(agreeInductParams.update.entry_other.entry_time) : ''}}
                            </span>
                        </el-form-item>
                        <el-form-item label="试用期">
                            <el-input v-if='is_editing_condition' size='mini' v-model="agreeInductParams.update.entry_other.probation" ></el-input>
                            <span v-if='!is_editing_condition'>{{agreeInductParams.update.entry_other.probation}}</span>
                        </el-form-item>
                        <el-form-item label="其他条件">
                            <el-input v-if='is_editing_condition' v-model="agreeInductParams.update.entry_other.other" type='textarea'></el-input>
                            <span v-if='!is_editing_condition'>{{agreeInductParams.update.entry_other.other}}</span>
                        </el-form-item>
                        <div class='edit-condition' v-if='is_editing_condition'>
                            <el-button size='mini' @click='cancelEditCondition'>取消</el-button>
                            <el-button size='mini' @click='is_editing_condition = false'>确定</el-button>
                        </div>
                    </div>
                    <div v-if='is_agree == "0"'>
                        <el-form-item label="原因">
                            <el-input v-if='is_editing_condition' v-model="disAgreeInductParams.update.entry_result" type='textarea'></el-input>
                            <span v-if='!is_editing_condition'>{{disAgreeInductParams.update.entry_result}}</span>
                        </el-form-item>
                        <div class='edit-condition' v-if='is_editing_condition'>
                            <el-button size='mini' @click='cancelEditCondition'>取消</el-button>
                            <el-button size='mini' @click='is_editing_condition = false'>确定</el-button>
                        </div>
                    </div>
                </el-form>
                <div class='edit-result' v-if='!is_editing_condition'>
                    <el-button size='mini' @click='cancelIsEntry'>取消</el-button>
                    <el-button size='mini' @click='confirmIsEntry'>确定</el-button>
                    <el-button size='mini' @click='editIsEntry'>修改</el-button>
                </div>
            </el-dialog>
            <!--人资沟通弹框结束-->
            <!--入职条件开始-->
            <el-dialog :visible.sync="failEntryDialog" append-to-body width="25%">
                <el-form label-width="80px" center>
                    <el-form-item label="姓名">
                        <span>{{failEntryObj.name}}</span>
                    </el-form-item>
                    <el-form-item label="入职结果">
                        <span v-if='!is_editing_fail_result'>{{failEntryObj.entry_status}}</span>
                        <el-select 
                            v-if='is_editing_fail_result' 
                            size='small' 
                            v-model="entryStatus.update.entry_status"
                            @change='confirmIsEntry_'
                            placeholder="">
                            <el-option v-for="(item, index) in humanresource_entry" :key='index' :label='item.dictionary_name' :value='item.id'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="原因">
                        <span v-if='!is_editing_fail_result'>{{failEntryObj.entry_result}}</span>
                        <el-input v-if='is_editing_fail_result' v-model="failEntryObj.entry_result" type='textarea'></el-input>
                    </el-form-item>
                    <div class='edit-condition' v-if='is_editing_fail_result'>
                        <el-button size='mini' @click='cancelEditFailResult'>取消</el-button>
                        <el-button size='mini' @click='is_editing_fail_result = false'>确定</el-button>
                    </div>
                    <div class='edit-result' v-if='!is_editing_fail_result'>
                        <el-button size='mini' @click='cancelFailEntry'>取消</el-button>
                        <el-button size='mini' @click='confirmFailEntry'>确定</el-button>
                        <el-button size='mini' @click='editFailEntry'>修改</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <!--入职条件结束-->
            <!--上传简历开始-->
            <el-dialog :visible.sync="uploadResumeDialog" append-to-body width="25%">
                <el-form label-width="80px" center>
                    <el-form-item label="上传简历" required>
                        <UPLOAD :ID="'first'" :isClear="isClear" @getImg="regetImgData"></UPLOAD>
                    </el-form-item>
                    <div class='edit-result'>
                        <el-button size='mini' @click='cancelUpload'>取消</el-button>
                        <el-button size='mini' @click='confirmUpload'>确定</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <!--上传简历结束-->
        </el-dialog>
        <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize" @selectMember="selectMember"></organization>
        <BackgroundReseach :backgroundDialog='backgroundDialog' :is_editing_bg_='is_editing_bg_' :id='background_id' :background_info='background_info' @close='closeModal'></BackgroundReseach>
        <InductionMaterials :inductionMaterialsDialog='inductionMaterialsDialog' :id='induction_id' :induction_info='induction_info' @close='closeModal'></InductionMaterials>
        <BasicInfo :addStaffDialog='addStaffDialog' :id='basicInfo_id' :basicInfo_info='basicInfo_info' :isAdd='isAdd' @close='closeModal'></BasicInfo>
        <!-- <BasicDetail :basicDetailDialog='basicDetailDialog' :basicDetail='basicDetail' :id='basicDetail_id'  @close='closeModal'></BasicDetail> -->
    </div>
</template>
<script>
    import UPLOAD from '../../common/UPLOAD.vue'
    import Organization from '../../common/organization.vue';
    import InductionMaterials from './components/inductionMaterials.vue';
    import BackgroundReseach from './components/backgroundReseach.vue';
    import BasicInfo from './components/basicInfo.vue';
    // import BasicDetail from './components/BasicDetail.vue';
    export default {
        name: 'process',
        components: {UPLOAD, Organization, InductionMaterials, BackgroundReseach, BasicInfo},
        props: ['processDialog', 'id', 'active_name'],
        data(){
            return{
                organizeVisible: false,
                organizeType:'',
                processManageDialog: false,
                addInterviewerDialog: false,
                uninterviewDialog: false,
                interviewedDialog: false,
                uploadResumeDialog: false,
                uploadResume_id: '',
                isClear: false,
                activeName:'first',
                loading1: true,
                loading2: true,
                loading3: true,
                loading4: true,
                page: 1,
                total: 0,
                interviewDatedData:[],
                interviewFinishedData:[],
                toInductData:[],
                inductedData:[],
                params: {
                    search: '',
                    status: '',
                    limit: 12,
                    page: 1,
                },
                is_editing:false,
                is_editResult: false,
                is_editing_id:'',
                is_editing_interview_status:'',
                is_editing_interview_status_id: '',
                lookUpResumeDialog : false,
                album:[],
                interviewParams: {
                    name: '',
                    gender: '',
                    education: '',
                    experience: '',
                    phone: '',
                    interview_time: '',
                    resume_source: '',
                    album: []
                },
                newInterviewParams: {
                    recruitment_id:'',
                    name: '',
                    gender: '',
                    education: '',
                    experience: '',
                    phone: '',
                    interview_time: '',
                    resume_source: '',
                    album: []
                },
                updateParams: {
                    update: {
                        interview_status : ''
                    }
                },
                uninterviewObj:{
                    id: '',
                    name: '',
                    genter: '',
                    interview_status: '',
                    interview_result: '',
                },
                interviewedObj:{
                    id: '',
                    name: '',
                    gender: '',
                    interviewer_name:'',
                    interviewer_id: '',
                    expect: '',
                    actual: '',
                },
                /**面试完毕*/
                passInterviewDialog: false,
                unpassInterviewDialog: false,
                IsEntryDialog: false,
                is_editing_condition: false,
                is_editing_interview_finished: '',
                is_editing_interview_finished_id: '',
                is_agree: '1',                           //是否同意入职 1是0否
                passOrNotStr:'',
                updateParams_finished: {
                    update: {
                        interview_status : ''
                    }
                },
                interviewedObj_finished: {
                    id: '',
                    name: '',
                    interview_result: ''
                },
                is_editing_unpass: false,
                unpassInterviewObj: {
                    name: '',
                    id: '',
                    interview_status_str: '',
                    interview_status:'',
                    interview_result: '',
                },
                humansourceObj: {
                    id: '',
                    name: '',
                    interview_status:'',
                },
                agreeInductParams: {
                    update: {
                        entry_other: {
                            salary: "",
                            entry_time: "",
                            probation: "",
                            other: ""
                        }
                    }
                },
                agreeInductParams_clone:{},
                disAgreeInductParams: {
                    update: {
                        entry_result: '',
                    }
                },
                disAgreeInductParams_clone: {},
                is_edit_humansource:'',
                /***********待入职******************/
                inductionMaterialsDialog: false,
                backgroundDialog: false,
                addStaffDialog: false,
                basicDetailDialog: false,
                background_id:'',
                induction_id: '',
                basicInfo_id:'',
                basicDetail_id: '',
                induction_info: {},
                background_info: {},
                basicInfo_info: {},
                basicDetail: {},
                failEntryDialog: false,
                is_editing_entry_statuss:'',
                is_editing_entry_statuss_id: '',
                entry_other: {
                    entry_time: '',
                    other: '',
                    probation: '',
                    salary: '',
                },
                isAdd: '',
                is_editing_bg_: true,
                //入职失败/成功状态
                entryStatus: {
                    update: {
                        entry_status:''
                    }
                },
                failEntryObj: {
                    name: '',
                    entry_status: '',
                    entry_result: ''
                },
                failEntryObj_clone: {},
                is_editing_fail_result: false,
                /**字典*/
                interview:[],               //面试状态
                interview_unfinished: [],
                interview_finished: [],     //过滤掉未面试状态
                source:[],                  //简历来源
                genders: [],                //性别
                education: [],              //学历
                experience: [],             //经验
                humanresource: [],          //人资
                humanresource_entry: [],    //入职成功/失败
            }
        },
        watch:{
            processDialog(val){
                if(val){
                    this.processManageDialog  = true
                }
            },
            processManageDialog(val){
                if(!val){
                    this.params.search = '';
                    this.is_editing_id = '';
                    this.$emit('close');
                }else{
                    this.activeName = this.active_name;
                    this.getAllData(this.id)
                }
            },
            id(val){
                this.getAllData(val)
            },
            lookUpResumeDialog(val){
                if(!val){
                    this.album = []
                }
            },
            interviewedDialog(val){
                if(!val){
                    this.is_editing_interview_status = '';
                }
            },
            IsEntryDialog(val){
                if(val){
                    this.editIsEntry();
                }else{
                    this.cancelEditCondition()
                }
            }
        },
        created(){
            this.getDictionary()
        },
        methods: {
            handleClick(){
                console.log(this.activeName);
                this.params.search = '';
                this.params.limit = 12;
                this.params.page = 1;
                this.getAllData(this.id)
            },
            //分頁
            handleCurrentChange(val){
                this.params.page = val;
                this.getAllData(this.id)
            },
            handleSizeChange(){

            },
            //搜索
            search(){
                let _status = '';
                switch (this.activeName){
                    
                    case 'first' :
                        _status = 1;
                        break;
                    case 'second' :
                        _status = 2;
                        break;
                    case 'third' :
                        _status = 3;
                        break;
                    case 'fourth' :
                        _status = 4;
                        break;
                }
                this.$http.get(globalConfig.server + 'hrm/interview?search=' + this.params.search + '&status=' + _status + '&recruitment_id=' + this.id).then(res => {
                    if(this.activeName === 'first'){
                        if(res.data.code === '20000'){
                            this.interviewDatedData = res.data.data.data
                        }else{
                            this.interviewDatedData = []
                        }
                    }
                    if(this.activeName === 'second'){
                        if(res.data.code === '20000'){
                            this.interviewFinishedData = res.data.data.data
                        }else{
                            this.interviewFinishedData = []
                        }
                    }
                    if(this.activeName === 'third'){
                        if(res.data.code === '20000'){
                            this.toInductData = res.data.data.data
                        }else{
                            this.toInductData = []
                        }
                    }
                    if(this.activeName === 'fourth'){
                        if(res.data.code === '20000'){
                            this.inductedData = res.data.data.data
                        }else{
                            this.inductedData = []
                        }
                    }
                    
                });
            },
            //获取数据
            getAllData(id){
                console.log(this.activeName);
                if(this.activeName === 'first'){
                    //已约面试
                    this.params.status = 1;
                    this.$http.get(globalConfig.server + 'hrm/interview?recruitment_id=' + id, {params: this.params}).then(res => {
                        if(res.data.code === '20000'){
                            this.interviewDatedData = res.data.data.data;
                            this.total = res.data.data.count;
                            this.loading1 = false;
                        }else{
                            this.interviewDatedData = [];
                            this.total = 0;
                            this.loading1 = false;
                        }
                    });
                }
                if(this.activeName === 'second'){
                    //面试完毕
                    this.params.status = 2;
                    this.$http.get(globalConfig.server + 'hrm/interview?recruitment_id=' + id, {params: this.params}).then(res => {
                        if(res.data.code === '20000'){
                            this.interviewFinishedData = res.data.data.data;
                            this.total = res.data.data.count;
                            this.loading2 = false;
                        }else{
                            this.interviewFinishedData = [];
                            this.total = 0;
                            this.loading2 = false;
                        }
                    });
                }
                if(this.activeName === 'third'){
                    //待入职
                    this.params.status = 3;
                    this.$http.get(globalConfig.server + 'hrm/interview?recruitment_id=' + id, {params: this.params}).then(res => {
                        if(res.data.code === '20000'){
                            this.toInductData = res.data.data.data;
                            this.total = res.data.data.count;
                            this.loading3 = false;
                            this.toInductData.forEach(item => {
                                if(item.entry_other.entry_time && item.entry_other.entry_time.length){
                                    item.entry_time = this.timestampToDate(item.entry_other.entry_time)
                                }
                            })
                        }else{
                            this.toInductData = [];
                            this.total = 0;
                            this.loading3 = false;
                        }
                    });
                }
                if(this.activeName === 'fourth'){
                     //已入职
                     this.params.status = 4;
                    this.$http.get(globalConfig.server + 'hrm/interview?recruitment_id=' + id, {params: this.params}).then(res => {
                        if(res.data.code === '20000'){
                            this.inductedData = res.data.data.data;
                            this.total = res.data.data.count;
                            this.loading4 = false;
                            this.inductedData.forEach(item => {
                                if(item.entry_other.entry_time && item.entry_other.entry_time.length){
                                    item.entry_time = this.timestampToDate(item.entry_other.entry_time)
                                }
                            })
                        }else{
                            this.inductedData = [];
                            this.total = 0;
                            this.loading4 = false;
                        }
                    });
                }
            },
            //修改预填数据/查看简历/面试状态
            cellClick(row, column, cell, event){
                if(column.property === 'edit'){
                    let id = row.id;
                    this.is_editing = true;
                    this.is_editing_id = row.id;
                    this.interviewParams.name = row.name;
                    this.interviewParams.phone = row.phone;
                    this.interviewParams.gender = row.gender;
                    this.interviewParams.education = row.education;
                    this.interviewParams.experience = row.experience;
                    this.interviewParams.interview_time = row.interview_time;
                    this.interviewParams.resume_source = row.resume_source;
                }
                if(column.property === 'album' && row.album.length){
                    this.lookUpResumeDialog = true;
                    this.album = row.album;
                }
                if(column.property === 'album' && !row.album.length){
                    this.uploadResumeDialog = true;
                    this.uploadResume_id = row.id;
                    this.interviewParams.name = row.name;
                    this.interviewParams.phone = row.phone;
                    this.interviewParams.gender = row.gender;
                    this.interviewParams.education = row.education;
                    this.interviewParams.experience = row.experience;
                    this.interviewParams.interview_time = row.interview_time;
                    this.interviewParams.resume_source = row.resume_source;
                }
                //未面试
                if(column.property === 'interview_status'){  
                    this.is_editing_interview_status_id = row.id;
                    if(row.interview_status === 736){
                        this.uninterviewDialog = true;
                        this.uninterviewObj.id = row.id;
                        this.uninterviewObj.gender = row.gender;
                        this.uninterviewObj.name = row.name;
                        this.uninterviewObj.interview_status = row.interview_statuss.dictionary_name;
                        this.uninterviewObj.interview_result = row.interview_result;
                    }else{
                        this.is_editing_interview_status = row.id;
                        this.updateParams.update.interview_status = row.interview_status;
                    }
                }
            },
            //取消修改
            cancelEdit(){
                this.is_editing_id = '';
                this.interviewParams.name ='';
                this.interviewParams.phone = '';
                this.interviewParams.gender = '';
                this.interviewParams.education = '';
                this.interviewParams.experience = '';
                this.interviewParams.interview_time = '';
                this.interviewParams.resume_source = '';
            },
            //保存修改
            confirmEdit(item){
                this.interviewParams.album = [];
                if(item.album.length){
                    item.album.forEach(i => {
                        this.interviewParams.album.push(i.id)
                    })
                }
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.is_editing_id, this.interviewParams).then( res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.is_editing_id = '';
                        this.getAllData(this.id)
                    }else{
                        this.notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //选择面试状态
            updateStatus(item){
                if(this.updateParams.update.interview_status === 737){
                    this.interviewedDialog = true;
                    this.interviewedObj.id = item.id;
                    this.interviewedObj.name = item.name;
                    this.interviewedObj.gender = item.genders.dictionary_name;
                }else if(this.updateParams.update.interview_status === 735){
                    this.is_editing_interview_status = '';
                }else{
                    this.confirmUpdateStatus();
                }
            },
            //修改面试状态
            confirmUpdateStatus(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.is_editing_interview_status_id, this.updateParams).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.uninterviewDialog = false;
                        this.is_editing_interview_status = '';
                        this.getAllData(this.id);
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        });
                        this.is_editing_interview_status = '';
                    }
                })
            },
            //已面试薪资信息提交
            confirmInterviewedInfo(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.interviewedObj.id, {
                    update: {
                        salary: {
                            expect: this.interviewedObj.expect,
                            actual: this.interviewedObj.actual,
                        },
                        interviewer_id:this.interviewedObj.interviewer_id
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.interviewedDialog = false;
                        this.confirmUpdateStatus();
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //取消
            cancelInterviewedInfo(){
                this.interviewedDialog = false;
            },
            //修改未面试原因
            editResult(){
                this.is_editResult = true;
                this.updateParams.update.interview_status = this.uninterviewObj.interview_status;
            },
            //修改未面试状态-->已面试
            confirmIsinterview(item){
                console.log(item)
                if(item === 737){
                    this.interviewedDialog = true;
                    this.interviewedObj.name = this.uninterviewObj.name;
                    this.interviewedObj.gender = this.uninterviewObj.gender == '716' ? '男' : '女';
                    this.interviewedObj.id = this.uninterviewObj.id;
                }
            },
            //提交未面试信息
            confirmEditResult(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.uninterviewObj.id, {
                    update: {
                        interview_result: this.uninterviewObj.interview_result
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.is_editResult = false;
                        this.uninterviewDialog = false;
                        this.getAllData(this.id)
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //取消修改未面试信息
            cancelEditResult(){
                this.is_editResult = false;
                this.uninterviewDialog = false;
                this.uninterviewObj.id = '';
                this.uninterviewObj.name = '';
                this.uninterviewObj.interview_status = '';
                this.uninterviewObj.interview_result = '';
            },
            //添加面试人
            confirmAddInterviewer(){
                this.newInterviewParams.recruitment_id = this.id;
                this.$http.post(globalConfig.server + 'hrm/interview', this.newInterviewParams).then(res => {
                    if(res.data.code === '20010'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.addInterviewerDialog = false;
                        this.getAllData(this.id);
                        this.initNewInterviewerParams();
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //取消添加面试人
            cancelAdd(){
                this.initNewInterviewerParams()
            },
            //初始化表单信息
            initNewInterviewerParams(){
                this.addInterviewerDialog = false;
                this.isClear = true;
                this.newInterviewParams.recruitment_id = '';
                this.newInterviewParams.name = '';
                this.newInterviewParams.gender = '';
                this.newInterviewParams.education = '';
                this.newInterviewParams.experience = '';
                this.newInterviewParams.phone = '';
                this.newInterviewParams.interview_time = '';
                this.newInterviewParams.resume_source = '';
                this.newInterviewParams.album = [];
            },
            getImgData(val){
                // console.log(val);
                this.newInterviewParams.album = val[1]
            },
            regetImgData(val){
                this.interviewParams.album = val[1]
            },
            //取消重新上传简历
            cancelUpload(){
                this.initUpload();
                this.uploadResumeDialog = false;
            },
            //初始化重新上传参数
            initUpload(){
                this.interviewParams.name = '';
                this.interviewParams.phone = '';
                this.interviewParams.gender = '';
                this.interviewParams.education = '';
                this.interviewParams.experience = '';
                this.interviewParams.interview_time = '';
                this.interviewParams.resume_source = '';
                this.interviewParams.album = [];
            },
            //确定重新上传简历
            confirmUpload(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.uploadResume_id, this.interviewParams).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getAllData(this.id);
                        this.uploadResumeDialog = false;
                        this.initUpload();
                    }
                })
            },
            /*********************** 面试完毕********************************/
            interviewResEdit(row, column, cell, event){
                if(column.property === 'interview_statuss'){
                    this.is_editing_interview_finished_id = row.id;
                    if(row.interview_status === 737){
                        this.is_editing_interview_finished = row.id;
                    }else if(row.interview_status === 738){
                        this.unpassInterviewDialog = true;
                        this.unpassInterviewObj.name = row.name;
                        this.unpassInterviewObj.id = row.id;
                        this.unpassInterviewObj.interview_status_str = row.interview_statuss.dictionary_name;
                        this.unpassInterviewObj.interview_status = row.interview_status;
                        this.unpassInterviewObj.interview_result = row.interview_result;
                    }
                }else if(column.property === 'entry_statuss' && row.interview_status !== 738){
                    this.is_edit_humansource = row.id;
                    this.is_editing_interview_finished = '';
                    if(row.entry_status === 741 && row.interview_status === 739){
                        this.IsEntryDialog = true;
                        this.is_editing_condition = true;
                        this.humansourceObj.id = row.id;
                        this.humansourceObj.name = row.name;
                        this.humansourceObj.interview_status = row.interview_statuss.dictionary_name;
                    }
                    //沟通失败再次选择是否入职
                    if(row.entry_status === 742){
                        this.IsEntryDialog = true;
                        this.is_agree = '0';
                        this.humansourceObj.id = row.id;
                        this.humansourceObj.name = row.name;
                        this.humansourceObj.interview_status = row.interview_statuss.dictionary_name;
                        this.disAgreeInductParams.update.entry_result = row.entry_result
                    }
                }else if(column.property === 'album'){
                    this.lookUpResumeDialog = true;
                    this.album = row.album;
                }
            },
            //确定是否入职
            confirmIsEntry(){
                if(this.is_agree == '1'){
                    this.$http.put(globalConfig.server + 'hrm/interview/' + this.humansourceObj.id, this.agreeInductParams).then(res => {
                        if(res.data.code === '20030'){
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success'
                            })
                            this.updateHumanResource()
                        }
                    })
                }
                if(this.is_agree == '0'){
                    this.$http.put(globalConfig.server + 'hrm/interview/' + this.humansourceObj.id, this.disAgreeInductParams).then(res => {
                        if(res.data.code === '20030'){
                            this.$notify({
                                title: '成功',
                                message: res.data.msg,
                                type: 'success'
                            })
                            this.updateHumanResource()
                        }
                    })
                }
            },
            //更新人资沟通状态接口
            updateHumanResource(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.humansourceObj.id, {
                    update: {
                        entry_status: this.is_agree == '1' ? 743 : 742
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        })
                    }
                    this.IsEntryDialog = false;
                    this.getAllData(this.id);
                    this.initHumanSource();
                })
            }, 
            //编辑入职条件/不入职原因
            editIsEntry(){
                this.is_editing_condition = true;
                this.agreeInductParams_clone = this.deepClone(this.agreeInductParams);
                this.disAgreeInductParams_clone = this.deepClone(this.disAgreeInductParams);
                this.agreeInductParams_clone.update.entry_other.entry_time = this.agreeInductParams.update.entry_other.entry_time
            },
            //取消编辑同意入职/不同意入职条件
            cancelEditCondition(){
                this.agreeInductParams = Object.assign({}, this.agreeInductParams_clone);
                this.disAgreeInductParams = Object.assign({}, this.disAgreeInductParams_clone);
                this.is_editing_condition = false;
                // console.log(this.agreeInductParams.update.entry_other.entry_time);
            },
            //取消人资沟通
            cancelIsEntry(){
                this.initHumanSource()
            },
            //初始化人资沟通参数
            initHumanSource(){
                this.is_agree = '1';
                this.agreeInductParams.update.entry_other.entry_time = '';
                this.agreeInductParams.update.entry_other.salary = '';
                this.agreeInductParams.update.entry_other.probation = '';
                this.agreeInductParams.update.entry_other.other = '';
                this.disAgreeInductParams.update.entry_result = '';
                this.humansourceObj.id = '';
                this.humansourceObj.name = '';
                this.humansourceObj.interview_status = '';
                this.IsEntryDialog = false;
            },
            //选择面试状态
            selectStatus(row){
                // console.log(row)
                this.interview_finished.forEach(i => {
                    if(i.id === this.updateParams_finished.update.interview_status){
                        this.passOrNotStr = i.dictionary_name
                    }
                });
                this.passInterviewDialog = true;
                this.interviewedObj_finished.name = row.name;
                this.interviewedObj_finished.id = row.id;
                
            },
            //确认修改面试状态
            confirmEditStatus(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.is_editing_interview_finished_id, this.updateParams_finished).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.is_editing_interview_finished = '';
                        this.updateParams_finished.update.interview_status = '';
                        this.getAllData(this.id)
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //确认通过/未通过面试
            confirmPassInterview(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.interviewedObj_finished.id, {
                    update: {
                        interview_result: this.interviewedObj_finished.interview_result
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.passInterviewDialog = false;
                        this.confirmEditStatus();
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //取消通过面试
            cancelPassInterview(){
                this.passInterviewDialog = false;
            },
            //取消修改面试未通过的修改
            cancelEditFromUnpass(){
                this.unpassInterviewDialog = false;
                this.is_editing_unpass = false;
            },
            //确定修改面试未通过的修改
            confirmEditFromUnpass(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.unpassInterviewObj.id, {
                    update: {
                        interview_result: this.unpassInterviewObj.interview_result
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.passInterviewDialog = false;
                        this.unpassInterviewDialog = false;
                        if(this.updateParams_finished.update.interview_status === 739){
                            this.confirmUndateFromUnpass()
                        }else{
                            this.getAllData(this.id)
                        }
                        
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //修改未通过信息之后----->修改状态
            confirmUndateFromUnpass(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.unpassInterviewObj.id, this.updateParams_finished).then(res => {
                    if(res.data.code === '20030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.is_editing_interview_finished = '';
                        this.updateParams_finished.update.interview_status = '';
                        this.unpassInterviewDialog = false;
                        this.getAllData(this.id)
                    }else{
                        this.$notify({   
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //修改面试未通过信息
            editFromUnpass(){
                this.is_editing_unpass = true;
                this.updateParams_finished.update.interview_status = this.unpassInterviewObj.interview_status;
            },
            //从面试未通过修改面试通过状态
            editInterviewStatus(item){
                console.log(item)
                if(item === 739){
                    
                }
            },
            /*********************** 待入职*********************************/
            checkoutEvent(row, column, cell, event){
                // console.log(row, column)
                if(column.property === 'album'){
                    this.lookUpResumeDialog = true;
                    this.album = row.album
                }
                if(column.property === 'entry_statuss'){
                    this.is_editing_entry_statuss_id = row.id;
                }
                if(column.property === 'entry_other' && row.entry_other){
                    this.IsEntryDialog = true;
                    this.agreeInductParams.update.entry_other.salary = row.entry_other.salary;
                    this.agreeInductParams.update.entry_other.entry_time = row.entry_other.entry_time.length ? row.entry_other.entry_time : '';
                    this.agreeInductParams.update.entry_other.probation = row.entry_other.probation;
                    this.agreeInductParams.update.entry_other.other = row.entry_other.other;
                    this.humansourceObj.name = row.name;
                    this.humansourceObj.interview_status = row.interview_statuss.dictionary_name;
                    this.humansourceObj.id = row.id;
                    this.is_agree = '1';
                }
                if(column.property === 'entry_statuss' && row.entry_status === 743){
                    this.is_editing_entry_statuss = row.id;
                }
                if(column.property === 'entry_statuss' && row.entry_status === 744){
                    this.failEntryDialog = true;
                    this.failEntryObj.name = row.name;
                    this.failEntryObj.entry_status = row.entry_statuss.dictionary_name;
                    this.failEntryObj.id = row.id;
                    this.failEntryObj.entry_result = row.entry_result;
                    this.entryStatus.update.entry_status = row.entry_status;
                }
                //背景调查
                if(column.property === 'background_check'){
                    if(!row.background_check){
                        console.log(1234)
                        this.is_editing_bg_ = true;
                    }else{
                        this.is_editing_bg_ = false;
                    }
                    this.backgroundDialog = true;
                    this.background_id = row.id;
                    this.background_info = row;
                }
                //入职材料
                if(column.property === 'image_info'){
                    this.inductionMaterialsDialog = true;
                    this.induction_id = row.id;
                    this.induction_info = row;
                }
                //基本信息
                if(column.property === 'basic_info'){
                    console.log(row)
                    this.addStaffDialog = true;
                    this.basicInfo_id = row.id;
                    this.basicInfo_info = row;
                    this.basicDetail = row;
                    this.basicDetail_id = row.id;
                    if(row.basic_info){
                        this.isAdd = false;
                    }else{
                        this.isAdd = true;
                    }
                }
            },
            //选择入职状态
            selectEntryStatus(item){
                if(this.entryStatus.update.entry_status === 744){
                    let _id = this.entryStatus.update.entry_status
                    this.failEntryDialog = true;
                    this.is_editing_fail_result = true;
                    this.failEntryObj.name = item.name;
                    this.failEntryObj.id = item.id;
                    this.failEntryObj.entry_status = this.humanresource_entry.filter(item => item.id === _id)[0].dictionary_name;
                    this.editFailEntry();
                }
                if(this.entryStatus.update.entry_status === 745){
                    this.confirmEntrySuccess()
                }
            },
            //确定入职成功
            confirmEntrySuccess(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.is_editing_entry_statuss_id, this.entryStatus).then(res => {
                    if(res.data.code == '20030' || res.data.code === '71030'){
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.getAllData(this.id);
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                    this.entryStatus.update.entry_status = '';
                    this.is_editing_entry_statuss = '';
                    this.failEntryDialog = false;
                })
            },
            //确定入职失败信息
            confirmFailEntry(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.failEntryObj.id, {
                    update: {
                        entry_result: this.failEntryObj.entry_result
                    }
                }).then(res => {
                    if(res.data.code === '20030'){
                        this.updateEntryStatus();
                        this.failEntryDialog = false;
                        this.is_editing_entry_statuss = false;
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            //更新入职失败状态
            updateEntryStatus(){
                this.$http.put(globalConfig.server + 'hrm/interview/' + this.failEntryObj.id, this.entryStatus).then(res => {
                    if(res.data.code == '20030'){
                        console.log('调用此接口')
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                    this.getAllData(this.id);
                })
            },
            //从入职失败信息重新更新入职状态
            confirmIsEntry_(){
                this.confirmEntrySuccess()
            },
            //编辑入职失败原因
            editFailEntry(){
                this.is_editing_fail_result = true;
                this.failEntryObj_clone = Object.assign({}, this.failEntryObj);
            },
            //取消入职失败修改
            cancelFailEntry(){
                this.is_editing_fail_result = false;
                this.failEntryDialog = false;
                this.is_editing_entry_statuss = false;
                this.failEntryObj.entry_result = '';
            },
            //取消编辑入职失败原因
            cancelEditFailResult(){
                this.is_editing_fail_result = false;
                this.failEntryObj = Object.assign({}, this.failEntryObj_clone)
            },







            /*********************** 公共***********************************/
            //选择成员
            selectMember(val){
                // console.log(val);
                this.interviewedObj.interviewer_id = val[0].id;
                this.interviewedObj.interviewer_name = val[0].name;
            },
            //打开组织架构
            chooseStaff(){
                this.organizeType = 'staff';
                this.organizeVisible = true;
            },
            //关闭组织架构
            closeOrganize(){
                this.organizeVisible = false
            },
            //清空
            closeStaff(){
                this.interviewedObj.interviewer_id = '';
                this.interviewedObj.interviewer_name = '';
            },
            //字典
            getDictionary(){
                //性别
                this.dictionary(713).then(res => {
                    if(res.code === '30010'){
                        this.genders = res.data
                    }
                });
                //学历
                this.dictionary(714).then((res) => {
                    if(res.code === '30010'){
                        this.education = res.data
                    }
                });
                //工作年限
                this.dictionary(715).then((res) => {
                    if(res.code === '30010'){
                        this.experience = res.data
                    }
                });
                //状态
                this.dictionary(731).then((res) => {
                    // console.log(res)
                });
                //面试状态
                this.dictionary(734).then((res) => {
                    if(res.code === '30010'){
                        this.interview = res.data;
                        res.data.forEach(item => {
                            if(item.id === 738 || item.id === 739){
                                this.interview_finished.push(item);
                            }else{
                                this.interview_unfinished.push(item)
                            }
                        })
                    }
                    // console.log(res)
                });
                //简历来源
                this.dictionary(746).then((res) => {
                    if(res.code === '30010'){
                        this.source = res.data
                    }
                    // console.log(res)
                });
                //人资沟通
                this.dictionary(740).then((res) => {
                    if(res.code === '30010'){
                        this.humanresource = res.data;
                        res.data.forEach(item => {
                            if(item.id === 744 || item.id === 745){
                                this.humanresource_entry.push(item)
                            }
                        })
                    }
                    // console.log(res)
                });
            },
            //关闭弹框
            closeModal(){
                this.inductionMaterialsDialog = false;
                this.is_editing_id = '';
                this.backgroundDialog = false;
                this.addStaffDialog = false;
                this.isAdd = '';
                this.basicDetailDialog = false;
                this.is_editing_entry_statuss = '';
                this.entryStatus.update.entry_status = '';
                this.is_editing_bg_ = false;
                this.getAllData(this.id)
            },
            deepClone(source){
                let targetObj = source.constructor === Array ? [] : {}; 
                for(let keys in source){ 
                if(source.hasOwnProperty(keys)){
                    if(source[keys] && typeof source[keys] === 'object'){ 
                        targetObj[keys] = source[keys].constructor === Array ? [] : {};
                        targetObj[keys] = this.deepClone(source[keys]);
                        }else{ 
                        targetObj[keys] = source[keys];
                        }
                    } 
                }
                return targetObj;
            },
        }
    }
</script>
<style lang="scss">
    .add-interviewer{
        text-align: center;
        margin: 10px 0 0 0;
        border: none;
    }
    .edit-result{
        display: flex;
        justify-content: center;
    }
    .edit-condition{
        display: flex;
        justify-content: center;
    }
    .el-tabs{
        position: relative;
    }
    .search-info{
        position: absolute;
        right: 35px;
        top: 0;
    }
    .add-interview{
        display: flex;
        justify-content: center;
    }
    .font-color{
        color: rgba(63, 81, 181, 1);
        font-size: 14px;
        border: none;
    }
    .el-pagination {
        padding-right: 50px;
        text-align: right;
    }
    .embed{
        max-width: 100%;
    }
</style>


