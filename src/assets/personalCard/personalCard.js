/**
 * Created by AigLe on 2018/3/11 0011.
 */
import img from '../images/defaultHead.png'

let is_on_job = null;
let isClickHead = false;
$(document).on('click', '[data-card]', function (e) {
  let personal = JSON.parse($(e.target).attr('data-src'));
  if (!personal.avatar) {
    personal.avatar = img;
  }
  is_on_job = personal.is_on_job ? '离职' : '在职';
  let offsetLeft = e.clientX;
  let offsetTop = e.clientY;

  let inner_width = window.innerWidth;
  let inner_height = window.innerHeight;

  //定位名片顯示位置
  if (offsetLeft + 294 > window.innerWidth) {
    offsetLeft = window.innerWidth - 334
  }
  if (offsetTop + 194 > window.innerHeight) {
    offsetTop = window.innerHeight - 194 - e.target.width;
  } else {
    offsetTop = offsetTop + e.target.width;
  }
  insertHtml(offsetTop, offsetLeft, personal);
  e.stopPropagation();
  isClickHead = true;

  //浏览器尺寸变化，名片消失
  $(window).resize(function () {
    $('#personalCard').remove();
  })
});

function insertHtml(offsetTop, offsetLeft, personal) {
  console.log(personal);
  let man = personal;
  if (personal.detail) {
    man.enroll = personal.detail.enroll;
    man.enroll = personal.detail.birthday;
  }
  if (personal.role) {
    man.display_name = man.role[0].display_name;
  } else {
    if (man.roles.length) {
      man.display_name = man.roles[0].name;
    } else {
      man.display_name = '';
    }
  }
  if (personal.org) {
    man.depart = man.org[0].name;
  } else {
    man.depart = '---';
  }
  let contentHtml = `<div id="personalCard" style="position: fixed;left: ${offsetLeft}px;top: ${offsetTop}px;">
                         <div class="personalCard_left">
                              <div class="header">
                                  <img src="${man.avatar}" alt="">
                              </div>
                              <div class="name">${man.name}</div>
                              <div class="name">${man.phone}</div>
                         </div>
                         <div class="personalCard_right">
                              <div>
                                 <div>员工职务</div>
                                 <div>${man.display_name}</div>
                              </div>
                              <div>
                                 <div>部门</div>
                                 <div>${man.depart}</div>
                              </div>
                               <div>
                                 <div>入职时间</div>
                                 <div>${man.enroll}</div>
                              </div>
                              <div>
                                 <div>员工状态</div>
                                 <div>${is_on_job}</div>
                              </div>
                               <div>
                                 <div>生日</div>
                                 <div>${man.birthday}</div>
                              </div>
                         </div>
                     </div>`;

  let personalCard = $('#personalCard');


  if (personalCard.length < 1) {
    $('body').append(contentHtml);
    isClickHead = false;
  } else {
    personalCard.remove();
    $('body').append(contentHtml);
    isClickHead = false;
  }
}

$(document).click(function (e) {
  let personalCard = $('#personalCard');
  if (!personalCard.is(e.target) && personalCard.has(e.target).length === 0) {
    personalCard.remove();
  }
});
