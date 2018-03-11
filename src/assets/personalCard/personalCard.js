/**
 * Created by Administrator on 2018/3/11 0011.
 */
$(document).on('click', '[data-card]', function (e) {
  // console.log($(e.target).attr('data-src'))
  let p = $(e.target).attr('data-src');
  let el = e;
  // let eleWidth = e.target.width;
  let left = e.target.offsetLeft;
  let top = e.target.offsetTop;
  console.log(window.innerWidth);
  if(left+500>window.innerWidth){
    left = window.innerWidth - 500
  }
  if(top+250>window.innerHeight){
    top = window.innerHeight - 250 - e.target.width -30;
  }else {
    top =top+e.target.width+10;
  }
  insertHtml(top,left);
});


function insertHtml(top,left) {
  let contentHtml = `<div id="personalCard" style="position: absolute;left: ${left}px;top: ${top}px;">
                         <div class="personalCard_left"></div>
                         <div class="personalCard_right"></div>
                     </div>`;

  if($('#personalCard').length<1){
    $('body').append(contentHtml);
  }else {
    console.log(3)
    $('#personalCard').remove();
    $('body').append(contentHtml);
  }

}
