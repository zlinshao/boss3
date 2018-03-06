<template>
  <div id="individual">
      <div class="personInfo">
        <div class="bgPic">
          <!--<img src="../../assets/images/individual/beijing.png" alt="">-->
          <!--<el-row type="flex">-->
            <!--<el-col :span="2" :offset="2">-->
              <!--<div class="headPic">-->
                <!--<img src="../../assets/images/individual/touxiang.png" alt="">-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="headName">-->
                <!--<el-row>-->
                  <!--<el-col :span="4">-->
                    <!--<p class="userName">张琳琳琳</p>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                    <!--<img src="../../assets/images/individual/1.png" alt="">-->
                  <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                  <!--<el-col :span="24">-->
                    <!--<p class="sign">Lorem ipsum dolor sit amet, consectetur adipisicing</p>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <!--</div>-->
            <!--</el-col>-->

            <!--<el-col :span="8" :offset="3">-->
              <!--<div class="userSetting">-->
                <!--<div class="userPhoto">-->
                  <!--<i class="el-icon-picture"></i>-->
                  <!--<el-button type="text" style="color: #FFFFFF">照片</el-button>-->
                <!--</div>-->
                <!--<div class="userFavorite">-->
                  <!--<i class="el-icon-goods"></i>-->
                  <!--<el-button type="text">收藏夹</el-button>-->
                <!--</div>-->
                <!--<div class="userSet">-->
                  <!--<i class="el-icon-setting"></i>-->
                  <!--<el-button type="text">设置</el-button>-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <div class="headPic">
            <img src="../../assets/images/individual/touxiang.png" alt="">
          </div>
          <div class="headName">
            <div style="display: flex">
              <p class="userName">张琳琳琳</p>
              <img src="../../assets/images/individual/1.png" alt="">
            </div>
            <p class="sign">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
          </div>

          <div class="userSetting">
            <div class="userPhoto">
              <i class="el-icon-picture"></i>
              <el-button type="text" style="color: #FFFFFF">照片</el-button>
            </div>
            <div class="userFavorite">
              <i class="el-icon-goods"></i>
              <el-button type="text">收藏夹</el-button>
            </div>
            <div class="userSet">
              <i class="el-icon-setting"></i>
              <el-button type="text">设置</el-button>
            </div>
          </div>

        </div>

      </div>

    <div class="userAdmin">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-row>
            <el-col :span="24">
              <div class="userTitle">个人主页</div>
            </el-col>
          </el-row>
          <div class="userOption">
            <el-row :gutter="20">
              <!--1-->
              <el-col :span="6">
                <div class="optionOne">
                  <el-row>
                    <el-col :span="6">
                      <div class="picOne">
                        <i class="el-icon-goods"></i>
                      </div>
                    </el-col>

                    <el-col :span="11">
                      <div class="words">
                        <el-row>
                          <el-col :span="24">
                            <div class="letters">BACKLOG</div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="infos">
                              <el-button type="text">待办事项</el-button>
                              <span class="numbers">24</span>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="picTwo">
                        <img src="../../assets/images/individual/矩形834.png" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <!--2-->
              <el-col :span="6">
                <div class="optionTwo">
                  <el-row>
                    <el-col :span="6">
                      <div class="picOne">
                        <i class="el-icon-date"></i>
                      </div>
                    </el-col>

                    <el-col :span="11">
                      <div class="words">
                        <el-row>
                          <el-col :span="24">
                            <div class="letters">JOURNAL</div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="infos">
                              <el-button type="text">日志管理</el-button>
                              <span class="numbers">24</span>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="picTwo">
                        <img src="../../assets/images/individual/矩形834拷贝.png" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
<!--3-->
              <el-col :span="6">
                <div class="optionThree">
                  <el-row>
                    <el-col :span="6">
                      <div class="picOne">
                        <i class="el-icon-tickets"></i>
                      </div>
                    </el-col>

                    <el-col :span="11">
                      <div class="words">
                        <el-row>
                          <el-col :span="24">
                            <div class="letters">MAIL LIST</div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="infos">
                              <el-button type="text">通讯录</el-button>
                              <span class="numbers">24</span>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="picTwo">
                        <img src="../../assets/images/individual/矩形834拷贝2.png" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <!--4-->
              <el-col :span="6">
                <div class="optionOne optionFour">
                  <el-row>
                    <el-col :span="6">
                      <div class="picOne">
                        <i class="el-icon-document"></i>
                      </div>
                    </el-col>

                    <el-col :span="11">
                      <div class="words">
                        <el-row>
                          <el-col :span="24">
                            <div class="letters">SCHEDULE</div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="infos">
                              <el-button type="text">日程管理</el-button>
                              <span class="numbers">4</span>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="picTwo">
                        <img src="../../assets/images/individual/矩形834拷贝3.png" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
<!--底部统计图变更-->
          <div class="market" v-if="showUp" >
            <el-row>
              <el-col :span="24">
                <div class="usermanage">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="achievementPic">
                        <el-row>
                          <el-col :span="12">
                            <div class="english">
                              PFRFORMANCE MANAGEMENT
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <div class="manageButt">
                              <el-button type="text">业绩管理</el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="checkManage">
                        <el-row>
                          <el-col :span="24">
                            <el-row>
                              <el-col :span="18">
                                <div class="english">INTEGRAL DETAIL</div>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="18">
                                <div class="manageButt">
                                  <el-button type="text">考勤管理</el-button>
                                </div>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <el-row>
                              <el-col :span="24">
                                <div class="checkTitle">2018年12月考勤</div>
                              </el-col>
                            </el-row>
                            <!--考勤列表-->
                            <div class="checkList">
                              <el-row>
                                <el-col :span="24">
                                  <div class="checkBelate">
                                    <img src="../../assets/images/individual/迟到.png" alt="" class="icos">
                                    <div class="count">
                                      <span class="heading">迟到</span>
                                      <span class="num" style="color: #f0c044">123次</span>
                                    </div>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <div class="checkBelate">
                                    <img src="../../assets/images/individual/早退.png" alt="" class="icos">
                                    <div class="count">
                                      <span class="heading">早退</span>
                                      <span class="num" style="color: #409EFF">123次</span>
                                    </div>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <div class="checkBelate">
                                    <img src="../../assets/images/individual/矿工.png" alt="" class="icos">
                                    <div class="count">
                                      <span class="heading">旷工</span>
                                      <span class="num" style="color: #fb4699">232次</span>
                                    </div>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <div class="checkBelate">
                                    <img src="../../assets/images/individual/出勤.png" alt="" class="icos">
                                    <div class="count" style="border: none">
                                      <span class="heading">考勤天数</span>
                                      <span class="num" style="color: #409EFF">223天</span>
                                    </div>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>

                          </el-col>
                        </el-row>
                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="pointOffice">
                        <el-row>
                          <el-col :span="24">
                            <div class="bgPics">
                              <el-row>
                                <el-col :span="18">
                                  <div class="english">SCHEDULE</div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="16">
                                  <div class="manageButt">
                                    <el-button type="text">积分明细</el-button>
                                  </div>
                                </el-col>
                                <el-col :span="8">
                                  <div class="picThree">
                                    <img src="../../assets/images/individual/积分.png" alt="">
                                    <div class="pointCount">20020</div>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                        </el-row>
                        <!--晋升通道-->
                        <el-row>
                          <el-col :span="24">
                            <div class="officePics">
                              <el-row>
                                <el-col :span="24">
                                  <div class="english">PROMOTION CHANNEL</div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="16">
                                  <div class="manageButt">
                                    <el-button type="text" style="color: #fb4699">晋升通道</el-button>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

          <div id="civilianpost">
            <el-row>
              <el-col :span="24">
                <div class="usermanage">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="checkon">
                        <el-row>
                          <el-col :span="24">
                            <el-row>
                              <el-col :span="12">
                                <div class="english">
                                  PFRFORMANCE MANAGEMENT
                                </div>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="12">
                                <div class="manageButt">
                                  <el-button type="text">考勤管理</el-button>
                                </div>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="24">
                            <el-row>
                              <el-col :span="24">
                                <div class="checkTitles">2018年12月考勤</div>
                              </el-col>
                            </el-row>

                            <el-row>
                              <el-col :span="24">
                                <el-row>
                                  <div class="checkLists">
                                    <el-col :span="24">
                                      <el-row>
                                        <el-col :span="12">
                                          <div class="belateList">
                                            <el-row>
                                              <el-col :span="24">
                                                <el-row>
                                                  <div class="belateHead">
                                                    <el-col :span="10">
                                                      <div class="belateTitle">迟到</div>
                                                    </el-col>
                                                    <el-col :span="4" :offset="12">
                                                      <img src="../../assets/images/individual/chidao.png" alt="" class="imges">
                                                    </el-col>
                                                  </div>
                                                </el-row>

                                              </el-col>
                                            </el-row>

                                            <el-row>
                                              <el-col :span="24">
                                                  <el-row>
                                                    <div class="counts">
                                                      <el-col :sapn="12">
                                                        <div class="numbs">0</div>
                                                      </el-col>
                                                      <el-col :sapn="12">
                                                        <div class="units">次</div>
                                                      </el-col>
                                                    </div>
                                                  </el-row>
                                              </el-col>
                                            </el-row>
                                          </div>
                                        </el-col>
                                        <el-col :span="12">
                                          <div class="belateList">
                                            <el-row>
                                              <el-col :span="24">
                                                <el-row>
                                                  <div class="belateHead">
                                                    <el-col :span="10">
                                                      <div class="belateTitle">早退</div>
                                                    </el-col>
                                                    <el-col :span="4" :offset="12">
                                                      <img src="../../assets/images/individual/早退.png" alt="" class="imges">
                                                    </el-col>
                                                  </div>
                                                </el-row>

                                              </el-col>
                                            </el-row>

                                            <el-row>
                                              <el-col :span="24">
                                                <el-row>
                                                  <div class="counts">
                                                    <el-col :sapn="12">
                                                      <div class="numbs">0</div>
                                                    </el-col>
                                                    <el-col :sapn="12">
                                                      <div class="units">次</div>
                                                    </el-col>
                                                  </div>
                                                </el-row>
                                              </el-col>
                                            </el-row>
                                          </div>
                                        </el-col>
                                      </el-row>
                                      <!--2-->
                                      <div style="margin-top: 18px">
                                        <el-row>
                                          <el-col :span="12">
                                            <div class="belateList" style="border: 1px solid #fb4699">
                                              <el-row>
                                                <el-col :span="24">
                                                  <el-row>
                                                    <div class="belateHead">
                                                      <el-col :span="10">
                                                        <div class="belateTitle" style="color: #fb4699">旷工</div>
                                                      </el-col>
                                                      <el-col :span="4" :offset="12">
                                                        <img src="../../assets/images/individual/矿工.png" alt="" class="imges">
                                                      </el-col>
                                                    </div>
                                                  </el-row>

                                                </el-col>
                                              </el-row>

                                              <el-row>
                                                <el-col :span="24">
                                                  <el-row>
                                                    <div class="counts">
                                                      <el-col :sapn="12">
                                                        <div class="numbs">0</div>
                                                      </el-col>
                                                      <el-col :sapn="12">
                                                        <div class="units">次</div>
                                                      </el-col>
                                                    </div>
                                                  </el-row>
                                                </el-col>
                                              </el-row>
                                            </div>
                                          </el-col>

                                          <el-col :span="12">
                                            <div class="belateList">
                                              <el-row>
                                                <el-col :span="24">
                                                  <el-row>
                                                    <div class="belateHead">
                                                      <el-col :span="10">
                                                        <div class="belateTitle">出勤天数</div>
                                                      </el-col>
                                                      <el-col :span="4" :offset="12">
                                                        <img src="../../assets/images/individual/出勤.png" alt="" class="imges">
                                                      </el-col>
                                                    </div>
                                                  </el-row>

                                                </el-col>
                                              </el-row>
                                              <el-row>
                                                <el-col :span="24">
                                                  <el-row>
                                                    <div class="counts">
                                                      <el-col :sapn="12">
                                                        <div class="numbs">0</div>
                                                      </el-col>
                                                      <el-col :sapn="12">
                                                        <div class="units">次</div>
                                                      </el-col>
                                                    </div>
                                                  </el-row>
                                                </el-col>
                                              </el-row>
                                            </div>
                                          </el-col>
                                        </el-row>
                                      </div>


                                    </el-col>
                                  </div>

                                </el-row>
                              </el-col>
                            </el-row>

                          </el-col>
                        </el-row>


                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="integral">
                        <el-row>
                          <el-col :span="24">
                            <el-row>
                              <el-col :span="18">
                                <div class="english">INTEGRAL DETAIL</div>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="18">
                                <div class="manageButt">
                                  <el-button type="text">积分明细</el-button>
                                </div>
                              </el-col>
                            </el-row>

                            <el-row>
                              <el-col :span="24" :offset="8">
                                <div class="countPic">
                                  <div class="boxs">
                                    <img src="../../assets/images/individual/jifenred.png" alt="">
                                  </div>
                                  <div class="pointCounts">20020</div>
                                </div>

                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>

                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="upgrade">
                        <!--晋升通道-->
                        <el-row>
                          <el-col :span="24">
                            <div class="upgradeShow">
                              <el-row>
                                <el-col :span="24">
                                  <div class="english">PROMOTION CHANNEL</div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="16">
                                  <div class="manageButt">
                                    <el-button type="text" style="color: #fb4699">晋升通道</el-button>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <div class="upgradePic">
                                    <img src="../../assets/images/individual/jingshen.png" alt="">
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-col>

        <el-col :span="6">
          <!--公司公告活动-->
          <el-row>
            <el-col :span="24">
              <div class="company">
                <el-row>
                  <el-col :span="24">
                    <div class="userTitle">公司公告</div>
                  </el-col>
                </el-row>
                <div class="mainPart">
                  <el-row>
                    <el-col :span="24">
                      <div class="announcement">
                        <!--<img src="../../assets/images/individual/gonggao.png" alt="">-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div style="margin-top: 12px">
                        <el-row>
                          <el-col :span="18">
                            <div class="announTitle">恭喜我公司企业Logo注册成功</div>
                          </el-col>
                          <el-col :span="6">
                            <div class="announDate">2018-03-02</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="detailes">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eligendi nobis similique tempore vero. At dicta ea facere maxime? Eos iure nesciunt optio. At autem consequuntur eligendi ullam? A, fugit.
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="footButt">
                        <el-row>
                          <el-col :span="4">
                            <el-button type="primary" plain size="mini" style="margin-left: 10px">新闻</el-button>
                          </el-col>
                          <el-col :span="8" :offset="10">
                            <div class="style1">
                              <div class="surname">
                                <img src="../../assets/images/individual/点赞.png" alt="">
                                <div class="nums">12432</div>
                              </div>
                              <div class="reader">
                                <i class="el-icon-view"></i>
                                <div class="numsTwo">215</div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!--公司活动-->
              <div class="company activities">
                <el-row>
                  <el-col :span="24">
                    <div class="userTitle">公司活动</div>
                  </el-col>
                </el-row>

                <div  class="mainPart">
                  <el-row>
                    <el-col :span="24">
                      <div class="activity">
                        <!--<img src="../../assets/images/individual/gonggao.png" alt="">-->
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div style="margin-top: 12px">
                        <el-row>
                          <el-col :span="18">
                            <div class="announTitle">恭喜我公司企业Logo注册成功</div>
                          </el-col>
                          <el-col :span="6">
                            <div class="announDate">2018-03-02</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="detailes">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eligendi nobis similique tempore vero. At dicta ea facere maxime? Eos iure nesciunt optio. At autem consequuntur eligendi ullam? A, fugit.
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="footButt">
                        <el-row>
                          <el-col :span="4">
                            <el-button type="primary" plain size="mini" style="margin-left: 10px">新闻</el-button>
                          </el-col>
                          <el-col :span="8" :offset="10">
                            <div class="style1">
                              <div class="surname">
                                <img src="../../assets/images/individual/点赞.png" alt="">
                                <div class="nums">5555</div>
                              </div>
                              <div class="reader">
                                <i class="el-icon-view"></i>
                                <div class="numsTwo">123</div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
    export default {
        name: "index",
      data () {
          return {
            showUp: false,
          }
      }
    }
</script>

<style scoped="" lang="scss">
  #individual {
    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @font-face{
      font-family:Impact;//////字体名称
      src:url(../../assets/font/impact-2.ttf);  ////字体路径
    }

    .personInfo {
      .bgPic {
        background: url("../../assets/images/individual/beijing.png") no-repeat;
        -moz-background-size: 100% 100%;
        background-size: 100% 100%;
        @include flex;
        .headPic {
          @include border_radius(50%);
          /*position: absolute;*/

          width: 120px;
          height: 120px;
          margin: 30px 0;
        }
        .headName {
          margin-top: 60px;
          color: #FFFFFF;
          .userName {
            font-size: 20px;
            margin: 0;
          }
          .sign {
            font-size: 16px;
            margin: 0;
          }
        }
        .userSetting {
          @include flex;
          margin-top: 80px;
          div{
            margin-right: 50px;
            font-size: 18px;
            i {
              margin-right: 10px;
            }
          }
          button {
            color: #FFFFFF;
            font-size: 18px;
          }
          .userPhoto {
            color: #FFFFFF;
            i {
              color: #6a8dfb;
            }
          }
          .userFavorite {
            color: #FFFFFF;
            i {
              color: #fb4699;
            }
          }
          .userSet {
            color: #FFFFFF;
            i {
              color: #f0c044;
            }
          }
        }
      }
    }

    .userAdmin {
      margin-top: 24px;
      .userTitle {
        font-size: 12px;
        color: #409EFF;
      }
/*个人主页*/
      .userOption {
        margin-top: 15px;
        .optionOne {
          background: url("../../assets/images/individual/矩形拷贝26.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          .letters {
            font-size: 18px;
            color: #436bca;
          }
        }
        .optionTwo {
          background: url("../../assets/images/individual/矩形拷贝25.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          .letters {
            font-size: 18px;
            color: #c25b60;
          }
        }
        .optionThree {
          background: url("../../assets/images/individual/矩形拷贝12.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          .letters {
            font-size: 18px;
            color: #3895ad;
          }
        }
        .optionFour {
          background: url("../../assets/images/individual/矩形拷贝14.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          .letters {
            font-size: 18px;
            color: #625ac2;
          }
        }
        .picOne {
          width: 54px;
          height: 54px;
          margin: 40px 40px 40px 50px;
          @include border_radius(50%);
          border: 1px solid #FFFFFF;
          color: #FFFFFF;
          font-size: 25px;
          text-align: center;
          overflow: hidden;
          i {
            margin: 14.5px auto;
          }
        }
        .words {
          margin: 42px 0 0 40px;
          .infos {
            color: #FFFFFF;
            button {
              color: #FFFFFF;
              font-size: 14px;
            }
            .numbers {
              margin-left: 10px;
              font-family: 'Impact', sans-serif;
              font-size: 16px;
            }
          }
        }
        .picTwo {
          margin: 25px 0 0 10px;
        }
      }
/*底部统计表市场部*/
      .usermanage {
        margin-top: 12px;
        .english {
          font-size: 16px;
          color: #4b385c;
          margin: 43px 0 0 41px;
        }
        .achievementPic {
          height: 452px;
          background: url("../../assets/images/individual/yeji.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          /*border: 1px solid #dfe6fb;*/
          @include border_radius(4px);
          .manageButt {
            margin-left: 41px;
          }
        }
        .checkManage {
          height: 450px;
          border: 1px solid #dfe6fb;
          @include border_radius(4px);
          .manageButt {
            margin-left: 40px;
          }
          .checkTitle {
            color: #74dc9a;
            margin: 73px 0 0 40px;
            border-bottom: 1px solid #dfe6fb;
            padding-bottom: 5px;
          }

          .checkList {
            .checkBelate {
              @include flex;
              margin-left: 20px;
              .icos {
                padding: 22px;
              }
              .count {
                border-bottom: 1px solid #dfe6fb;
                width: 100%;
                padding: 22px 0;
                font-size: 13px;
                .heading {
                  color: #464748;
                }
                .num {
                  color: #f0c044;
                  margin-left: 2px;
                  font-family: 'Impact', sans-serif;
                }
              }
            }
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
        .pointOffice {
          /*border: 1px solid #dfe6fb;*/
          height: 450px;
          @include border_radius(4px);
          .bgPics {
            height: 220px;
            background: url("../../assets/images/individual/jifeng.png") no-repeat;
            -moz-background-size: 100% 100%;
            background-size: 100% 100%;
            .manageButt {
              margin-left: 40px;
            }
            .picThree {
              @include flex;
              font-size: 16px;
              margin-top: 10px;
              img {
                width: 20px;
                height: 20px;
              }
              .pointCount {
                color: #fb4699;
                margin: 2px 0 0 5px;
                font-family: 'Impact', sans-serif;
                font-size: 16px;
              }
            }
          }

          .officePics {
            height: 220px;
            margin-top: 10px;
            background: url("../../assets/images/individual/jingshen.png") no-repeat;
            -moz-background-size: 100% 100%;
            background-size: 100% 100%;
            .manageButt {
              margin-left: 40px;
            }
          }
        }
      }
/*底部统计表文职*/
      #civilianpost {
        .usermanage {
          .checkon {
            border: 1px solid #dfe6fb;
            @include border_radius(4px);
            height: 450px;
            .manageButt{
              margin-left: 41px;

            }
            .checkTitles {
              margin: 60px 0 0 40px;
              color: #fb4699;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 5px;
            }
            .checkLists {
              margin: 15px 0 0 40px;
              .belateList {
                border: 1px solid #409EFF;
                margin-right: 20px;
                @include border_radius(4px);
                .belateHead {
                  margin: 10px 0 0 15px;
                  @include flex;
                  justify-content: end;
                  .belateTitle {
                    font-size: 13px;
                  }
                  .imges {
                    width: 20px;
                    height: 20px;
                  }
                }
                .counts {
                  margin: 10px 0 20px 0;
                  @include flex;
                  .numbs {
                    font-size: 37px;
                    color: #409EFF;
                   text-align: right;
                  }
                  .units {
                    margin: 17px 0 0 5px;
                    font-size: 13px;
                    color: #4b385c;
                  }
                }
              }
            }
          }
          .integral{
            /*border: 1px solid #dfe6fb;*/
            height: 450px;
            @include border_radius(4px);
            background: url("../../assets/images/individual/jifeng.png") no-repeat;
            -moz-background-size: 100% 100%;
            background-size: 100% 100%;
            .countPic {
              @include flex;
              margin: 80px 0 0 66px;
              .boxs {
                width: 30px;
                height: 30px;
                @include border_radius(50%);
                border: 1px solid #fb4699;
              }
              img {
                width: 20px;
                height: 20px;
                margin: 5px 0 0 5px;
              }
              .pointCounts {
                font-size: 30px;
                color: #fb4699;
                margin-left: 5px;
              }
            }
            .manageButt {
              margin-left: 40px;
            }
          }
          .upgrade {
            @include border_radius(4px);
            border: 1px solid #dfe6fb;
            height: 450px;
            .upgradeShow {
              .manageButt {
                margin-left: 40px;
              }
              .upgradePic {
                height: 220px;
                width: 290px;
                margin-top: 10px;
                border: none;
                overflow: hidden;
                img {
                  height: 222px;
                  width: 292px;
                  margin: -1px 0 0 -1px;
                }
              }
            }

          }
        }

      }
/*公司通告*/
      .company {
        margin-top: 2px;
        .mainPart{
          border: 1px solid #dfe6fb;
          @include border_radius(4px);
          margin-top: 12px;
          .announDate {
            margin: 12px 0 0 10px;
          }
        }
        .announcement {
          background: url("../../assets/images/individual/gonggao.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          /*margin-top: 15px;*/
          height: 136px;
        }

        .announTitle {
          margin: 12px 0 0 10px;
          text-overflow : ellipsis;
          white-space : nowrap;
          overflow : hidden;
        }
        .detailes {
          margin: 10px;
          width: 95%;
          min-height: 32px;
          text-overflow : ellipsis;
          overflow : hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

        }
        .footButt {
          margin-bottom: 10px;
          .style1{
            @include flex;
            margin-left: 25px;
            .surname {
              @include flex;
              .nums {
                margin: 3px 0 0 5px;
              }
              img {
                width: 20px;
                height: 20px;
              }
            }
            .reader {
              @include flex;
              margin-left: 20px;
              i {
                margin: 4px 0 0 5px;
              }
              .numsTwo {
                margin: 3px 0 0 5px;
              }
            }
          }

        }
      }
/*公司活动*/
      .activities {
        margin-top: 20px;
        .activity {
          background: url("../../assets/images/individual/huodong.png") no-repeat;
          -moz-background-size: 100% 100%;
          background-size: 100% 100%;
          /*margin-top: 15px;*/
          height: 136px;
        }
      }
    }



  }
</style>
