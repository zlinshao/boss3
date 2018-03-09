<template>
  <div id="converge">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="banner">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="banner_pic">
                  <img src="../../assets/images/情人节.png" alt="">
                  <h3> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="hover_pic picOne">
                  <img src="../../assets/images/发展.png" alt="">
                </div>
              </el-col>
              <el-col :span="12">
                <div class="hover_pic picOne">
                  <img src="../../assets/images/人才.png" alt="">
                </div>
              </el-col>
            </el-row>
          </div>


          <el-row :gutter="10">
            <el-col :span="12">
              <div class="hover_pic picOne">
                <img src="../../assets/images/发展.png" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="hover_pic picOne">
                <img src="../../assets/images/人才.png" alt="">
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>


      <el-row :gutter="10">
        <el-col :span="16">
          <div class="title" style="color: #fb4699;">
            <span style="border-left: 4px solid #fb4699; margin-right: 10px"></span>乐伽新闻
          </div>
          <div class="lejiaNews">
            <el-row>
              <el-col :span="12">
                <div class="newsOne">
                  <div class="newsTitle">
                    恭喜我公司企业注册成功
                  </div>
                  <div class="reader">
                    <div class="readerDate">2019-09-09</div>
                    <div class="readerInfos">
                      <div>
                        <i class="iconfont icon-xiaoxi"></i>1232
                      </div>
                      <div>
                        <i class="iconfont icon-dianzan"></i>123
                      </div>
                      <div>
                        <i class="iconfont icon-yanjing"></i>123
                      </div>
                    </div>
                  </div>
                  <div class="newsPic hover_pic">
                    <img src="../../assets/images/管理.png" alt="">
                  </div>
                  <div class="newsDetail">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
                  </div>
                  <div class="lints"></div>
                  <div class="newsButt">
                    <router-link to="/Infodetails">
                      <el-button type="primary" size="mini">MORE</el-button>
                    </router-link>

                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="newsList">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints"></div>
                      </el-col>
                      </div>
                  </el-row>

                </div>
                <div class="newsList">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="title" style="color: #6a8dfb;">
            <span style="border-left: 4px solid #6a8dfb; margin-right: 10px"></span>员工风采
          </div>
          <div class="staff">
            <div class="staffPic hover_pic">
              <img src="../../assets/images/管理.png" alt="">
            </div>
            <div class="newsOne" style="border: none">
              <div class="newsTitle" style="margin-top: 20px">
                恭喜我公司企业注册成功
              </div>
              <div class="reader">
                <div class="readerDate">2019-09-09</div>
                <div class="readerInfos">
                  <div>
                    <i class="iconfont icon-xiaoxi"></i>1232
                  </div>
                  <div>
                    <i class="iconfont icon-dianzan"></i>123
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>123
                  </div>
                </div>
              </div>
              <div class="newsDetail" style="margin-top: 0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
              </div>
              <div class="lints"></div>
              <div class="newsButt">
                <el-button type="primary" size="mini">MORE</el-button>
              </div>
              <div class="newsList" style="padding: 0;margin: 20px 0 5px 0">
                <el-row :gutter="10">
                  <div class="lists">
                    <el-col :span="10">
                      <div class="listPic hover_pic">
                        <img src="../../assets/images/人才.png" alt="">
                      </div>
                    </el-col>
                    <el-col :span="14">
                      <div class="listsTitle">
                        恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                      </div>
                      <div class="listsDetail">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                      </div>
                      <div class="lints" style="border-bottom: 3px solid #6a8dfb"></div>
                    </el-col>
                  </div>
                </el-row>

              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-row :gutter="10">
          <el-col :span="16">
            <el-row :gutter="10" style="margin-left: 0;">
              <el-col :span="12">
                <div class="title" style="color: #58d788; margin-top: 20px">
                  <span style="border-left: 4px solid #58d788; margin-right: 10px"></span>客户实记
                </div>
                <div class="staff">
                  <div class="staffPic hover_pic">
                    <img src="../../assets/images/管理.png" alt="">
                  </div>
                  <div class="newsOne" style="border: none">
                    <div class="newsTitle" style="margin-top: 20px">
                      恭喜我公司企业注册成功
                    </div>
                    <div class="reader">
                      <div class="readerDate">2019-09-09</div>
                      <div class="readerInfos">
                        <div>
                          <i class="iconfont icon-xiaoxi"></i>1232
                        </div>
                        <div>
                          <i class="iconfont icon-dianzan"></i>123
                        </div>
                        <div>
                          <i class="iconfont icon-yanjing"></i>123
                        </div>
                      </div>
                    </div>
                    <div class="newsDetail" style="margin-top: 0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
                    </div>
                    <div class="lints" style="border-bottom: 3px solid #58d788"></div>
                    <div class="newsButt">
                      <el-button type="primary" size="mini">MORE</el-button>
                    </div>
                    <div class="newsList" style="padding: 0;margin: 20px 0 5px 0">
                      <el-row :gutter="10">
                        <div class="lists">
                          <el-col :span="10">
                            <div class="listPic hover_pic">
                              <img src="../../assets/images/人才.png" alt="">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="listsTitle">
                              恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                            </div>
                            <div class="listsDetail">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                            </div>
                            <div class="lints" style="border-bottom: 3px solid #6a8dfb"></div>
                          </el-col>
                        </div>
                      </el-row>

                    </div>
                    <div class="newsList" style="padding: 0;margin: 20px 0 5px 0">
                      <el-row :gutter="10">
                        <div class="lists">
                          <el-col :span="10">
                            <div class="listPic hover_pic">
                              <img src="../../assets/images/人才.png" alt="">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="listsTitle">
                              恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                            </div>
                            <div class="listsDetail">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                            </div>
                            <div class="lints" style="border-bottom: 3px solid #6a8dfb"></div>
                          </el-col>
                        </div>
                      </el-row>

                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="title" style="color: #fb4699; margin-top: 20px">
                  <span style="border-left: 4px solid #fb4699; margin-right: 10px"></span>公司生活
                </div>
                <div class="companyLife">
                  <div class="newsOne" style="border: none;padding-right: 0">
                    <div class="newsTitle">
                      恭喜我公司企业注册成功
                    </div>
                    <div class="reader">
                      <div class="readerDate">2019-09-09</div>
                      <div class="readerInfos">
                        <div>
                          <i class="iconfont icon-xiaoxi"></i>1232
                        </div>
                        <div>
                          <i class="iconfont icon-dianzan"></i>123
                        </div>
                        <div>
                          <i class="iconfont icon-yanjing"></i>123
                        </div>
                      </div>
                    </div>
                    <div class="newsPic hover_pic">
                      <img src="../../assets/images/管理.png" alt="">
                    </div>
                    <div class="newsDetail">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
                    </div>
                    <div class="lints"></div>
                    <div class="newsButt">
                      <el-button type="primary" size="mini">MORE</el-button>
                    </div>
                    <div class="lifePic">
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <div class="hover_pic picList">
                            <img src="../../assets/images/人才.png" alt="">
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="hover_pic picList">
                            <img src="../../assets/images/人才.png" alt="">
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="hover_pic picList">
                            <img src="../../assets/images/人才.png" alt="">
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>

              </el-col>
            </el-row>
            <!--人物志-->
              <el-row :gutter="10">
                <el-col style="padding-left: 10px;margin-top: 20px">
                  <div class="title" style="color: #fb4699;">
                    <span style="border-left: 4px solid #fb4699; margin-right: 10px"></span>人物志
                  </div>
                  <div class="lejiaNews" style="padding-bottom: 0">
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <div class="newsOne">
                          <div class="newsTitle">
                            恭喜我公司企业注册成功
                          </div>
                          <div class="reader">
                            <div class="readerDate">2019-09-09</div>
                            <div class="readerInfos">
                              <div>
                                <i class="iconfont icon-xiaoxi"></i>1232
                              </div>
                              <div>
                                <i class="iconfont icon-dianzan"></i>123
                              </div>
                              <div>
                                <i class="iconfont icon-yanjing"></i>123
                              </div>
                            </div>
                          </div>
                          <div class="personage">
                            <el-row :gutter="10">
                              <el-col :span="8">
                                <div class="personagePic hover_pic">
                                  <img src="../../assets/images/人才.png" alt="">
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="personagePic hover_pic">
                                  <img src="../../assets/images/人才.png" alt="">
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="personagePic hover_pic">
                                  <img src="../../assets/images/人才.png" alt="">
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                          <div class="newsDetail">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
                          </div>
                          <div class="lints"></div>
                          <div class="newsButt">
                            <el-button type="primary" size="mini">MORE</el-button>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="peoplePics">
                          <el-row :gutter="10">
                            <el-col :span="16">
                              <div class="pics_one hover_pic">
                                <img src="../../assets/images/人才.png" alt="">
                                <!--<div class="shade">-->
                                  <!--<div class="positionalInfo">-->
                                    <!--<div class="info_name">张琳琳琳</div>-->
                                    <!--<div class="info_title">研发部-研发部研发部</div>-->
                                  <!--</div>-->
                                <!--</div>-->
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="pics_two hover_pic">
                                <img src="../../assets/images/人才.png" alt="">
                              </div>
                              <div class="pics_two hover_pic">
                                <img src="../../assets/images/人才.png" alt="">
                              </div>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="8">
                              <div class="hover_pic pics_two">
                                <img src="../../assets/images/管理.png" alt="">
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="hover_pic pics_two">
                                <img src="../../assets/images/管理.png" alt="">
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="hover_pic pics_two">
                                <img src="../../assets/images/管理.png" alt="">
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
          </el-col>
          <el-col :span="8" style="padding-right: 10px;">
            <div class="title" style="color: #fdca41; margin-top: 20px">
              <span style="border-left: 4px solid #fdca41; margin-right: 10px"></span>热门导读
            </div>
            <div class="staff">
              <div class="staffPic hover_pic">
                <img src="../../assets/images/管理.png" alt="">
              </div>
              <div class="newsOne" style="border: none">
                <div class="newsTitle" style="margin-top: 20px">
                  恭喜我公司企业注册成功
                </div>
                <div class="reader">
                  <div class="readerDate">2019-09-09</div>
                  <div class="readerInfos">
                    <div>
                      <i class="iconfont icon-xiaoxi"></i>1232
                    </div>
                    <div>
                      <i class="iconfont icon-dianzan"></i>123
                    </div>
                    <div>
                      <i class="iconfont icon-yanjing"></i>123
                    </div>
                  </div>
                </div>
                <div class="newsDetail" style="margin-top: 0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa mollitia sin tvolpt as voluptatem? Assumenda, atque beatae corporis doloremque eum, ex fugiat laborum maiores nesciunt, nostrum officia quam quas soluta.
                </div>
                <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                <div class="newsButt">
                  <el-button type="primary" size="mini">MORE</el-button>
                </div>
                <div class="newsList" style="padding: 0;margin: 35px 0 5px">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList" style="padding: 0;margin: 20px 0 5px">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList" style="padding: 0;margin: 20px 0 5px">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList" style="padding: 0;margin: 20px 0 5px">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
                <div class="newsList" style="padding: 0;margin: 20px 0 5px">
                  <el-row :gutter="10">
                    <div class="lists">
                      <el-col :span="10">
                        <div class="listPic hover_pic">
                          <img src="../../assets/images/人才.png" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="listsTitle">
                          恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜 恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜恭喜
                        </div>
                        <div class="listsDetail">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores aut commodi, deleniti doloremque ducimus facilis ipsam iure labore, laboriosam minima natus nihil, nobis quas quos recusandae sequi vero voluptates!
                        </div>
                        <div class="lints" style="border-bottom: 3px solid #fdca41"></div>
                      </el-col>
                    </div>
                  </el-row>

                </div>
              </div>
            </div>
          </el-col>
        </el-row>


      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "purchase",
    data () {
      return {
        showUp: false,
      }
    },
    methods: {
        add(){
          this.showUp = true;
        }
      },
  }
</script>

<style scoped lang="scss">
  #converge {
    width: 100%;
    overflow: hidden;

  @font-face {
    font-family: Impact;//////字体名称
  src: url(../../assets/font/impact-2.ttf);  ////字体路径
  }
  @mixin flex {
    display: -webkit-flex;
    display: flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }
  .scroll_bar {
  &::-webkit-scrollbar-button {
     height: 20px;
     background-color: #ffffff;
   }
  }
  .container {
    .hover_pic {
      overflow: hidden;
      border: 1px solid #dfe6fb;
      border-radius: 5px;
      box-shadow: 0 2px 4px 0 rgba(64, 158, 255, .12), 0 0 6px 0 rgba(64, 158, 255, .04);
      img {
        transition: all .5s;
        &:hover {
           transform: scale(1.1);
         }
      }
    }

    .banner {
      margin-bottom: 30px;
      .banner_pic {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .el-carousel__item h3 {
        position: absolute;
        bottom: 40px;
        left: 30px;
        color: #FFFFFF;
        font-size: 20px;
        opacity: 0.75;
        line-height: 20px;
        margin: 0;
      }
    }
    .picOne {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      @include flex;
      @include border_radius(5px);
      width: 100%;
      height: 145px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .lejiaNews {
      border: 1px solid #dfe6fb;
      @include border_radius(5px);
      padding: 15px;
      margin-top: 10px;
    }
    .newsOne {
      border-right: 1px solid #e5e5e5;
      padding-right: 15px;
      .newsTitle {
        color: #303133;
        margin-bottom: 17px;
        text-overflow : ellipsis;
        overflow : hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .reader {
        @include flex;
        justify-content: space-between;
        .readerInfos {
          @include flex;
          justify-content: space-between;
          margin-bottom: 14px;
          div {
            margin-left: 10px;
          }
        }
      }
      .newsPic {
        width: 100%;
        height: 254px;
        @include border_radius(5px);
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .newsDetail {
        color: #8f9193;
        width:100%;
        height: 36px;
        line-height: 18px;
        margin-top: 20px;
        text-overflow : ellipsis;
        overflow : hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .lints {
        width: 20px;
        border-bottom: 3px solid #fb4699;
        margin-top: 21px;
      }
      .newsButt {
        margin-top: 27px;
      }
    }
    .newsList {
      padding: 0 15px;
      margin-bottom: 17px;
      .lists {
        //@include flex;
        .listPic {
          width: 100%;
          height: 100px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .listsTitle {
          color: #303133;
          margin-bottom: 20px;
          text-overflow : ellipsis;
          overflow : hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .listsDetail {
          width: 100%;
          height: 32px;
          line-height: 16px;
          color: #8f9193;
          text-overflow : ellipsis;
          overflow : hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .lints {
          width: 20px;
          border-bottom: 3px solid #fb4699;
          margin-top: 29px;
        }
      }
    }
    .staff {
      border: 1px solid #dfe6fb;
      @include border_radius(5px);
      padding: 15px;
      margin-top: 10px;
      .staffPic {
        width: 100%;
        height: 144px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .companyLife {
      border: 1px solid #dfe6fb;
      @include border_radius(5px);
      padding: 15px;
      margin-top: 10px;
      .lifePic {
        @include flex;
        justify-content: space-between;
        margin-top: 20px;
        .picList {
          width: 100%;
          height: 100px;
          margin-top: 15px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .personage {
      .personagePic {
        width: 100%;
        height: 100px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        cursor: pointer;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .peoplePics {
      /*padding: 15px 0 15px 15px;*/
      .pics_one {
        width: 100%;
        height: 200px;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .shade {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0,0,0,0.6);


        }
        .positionalInfo {
          position: absolute;
          top: 35%;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          color: #FFFFFF;
        }
      }
      .pics_two {
        width: 100%;
        height: 90px;
        cursor: pointer;
        margin-bottom: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
