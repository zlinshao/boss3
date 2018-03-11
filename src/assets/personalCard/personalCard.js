/**
 * Created by AigLe on 2018/3/11 0011.
 */

let isClickHead = false;
$(document).on('click', '[data-card]', function (e) {
  let personal = JSON.parse($(e.target).attr('data-src'));
  let offsetLeft = e.target.offsetLeft;
  let offsetTop = e.target.offsetTop;
  //定位名片顯示位置
  if(offsetLeft+480>window.innerWidth){
    offsetLeft = window.innerWidth - 520
  }
  if(offsetTop+250>window.innerHeight){
    offsetTop = window.innerHeight - 250 - e.target.width -30;
  }else {
    offsetTop =offsetTop + e.target.width+10;
  }
  insertHtml(offsetTop,offsetLeft,personal);
  e.stopPropagation();
  isClickHead = true;
});


function insertHtml(offsetTop,offsetLeft,personal) {
  let contentHtml = `<div id="personalCard" style="position: absolute;left: ${offsetLeft}px;top: ${offsetTop}px;">
                         <div class="personalCard_left">
                              <div class="header">
                                  <img src="${personal.avatar}" alt="">
                              </div>
                              <div class="name">${personal.name}</div>
                         </div>
                         <div class="personalCard_right">
                             <ul>
                                <li> <span>部门 ：</span> <span style="color: #555">${personal.org[0].name}</span></li>
                                <li> <span>分部 ：</span> <span style="color: #555">${personal.pinyin}</span></li>
                                <li> <span>岗位 ：</span> <span style="color: #555">${personal.created_at}</span></li>
                                <li> <span>上级 ：</span> <span style="color: #555">${personal.is_enable}</span></li>
                                <li> <span>状态 ：</span> <span style="color: #555">${personal.is_on_job}</span></li>
                                <li> <span>手机 ：</span> <span style="color: #555">${personal.phone}</span></li>
                                <li> <span>邮箱 ：</span> <span style="color: #555">${personal.email}</span></li>
                             </ul>
                             <div class="personalCard_right_bottom">14.146.92.67</div>
                         </div>
                     </div>`;

  let personalCard = $('#personalCard');


  if(personalCard.length<1){
    $('body').append(contentHtml);
    isClickHead = false;
  }else {
    personalCard.remove();
    $('body').append(contentHtml);
    isClickHead = false;
  }
}
$(document).click(function(e){
  let personalCard = $('#personalCard');
  if(!personalCard.is(e.target) && personalCard.has(e.target).length === 0){
    personalCard.remove();
  }
});
