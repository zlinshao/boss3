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

//
// <script>
// var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
//   browse_button: ‘btnBrowse‘,
// url: ‘upload.ashx‘,
// flash_swf_url: ‘Resource/scripts/js/Moxie.swf‘,
// silverlight_xap_url: ‘Resource/scripts/js/Moxie.xap‘,
// filters: {
//   mime_types: [ //只允许上传图片文件
//     { title: "图片文件", extensions: "jpg,gif,png" }
//   ]
// }
// });
// uploader.init(); //初始化
//
// //绑定文件添加进队列事件
// uploader.bind(‘FilesAdded‘, function (uploader, files) {
//   // alert(files[0].size);
//   var msgFlg = 0;
//   for (var i = 0, len = files.length; i < len; i++) {
//     if (files[i].size > 81920) {
//       uploader.files.splice(i, 1);
//       msgFlg = 1;
//     }
//     else {
//       !function (i) {
//         previewImage(files[i], function (imgsrc) {
//           $(‘#file-list‘).html($(‘#file-list‘).html() +
//                                     ‘<div style="float:left" class="pic_list" id="‘ + files[i].id + ‘">‘
//                                     + ‘ (‘ + plupload.formatSize(files[i].size) +
//                                     ‘)<a href="###" class="pic_delete" data-val=‘ + files[i].id +
//                                     ‘>删除</a><br/>‘ +
//                                 ‘<img class="listview" width="90" height="60" src="‘ + imgsrc + ‘" name="‘ + files[i].name + ‘" /></div>‘);
//         })
//       }(i);
//     }
//   }
//   if (msgFlg == 1) {
//     alert("上传图片小于80K");
//   }
// });
//
// $(document).on(‘click‘, ‘.pic_list a.pic_delete‘, function () {
//   $(this).parent().remove();
//   var toremove = ‘‘;
//   var id = $(this).attr("data-val");
//   for (var i in uploader.files) {
//     if (uploader.files[i].id === id) {
//       toremove = i;
//     }
//   }
//   uploader.files.splice(toremove, 1);
// });
//
// //所有都上传完成
// uploader.bind("UploadComplete", function (uploader, file) {
//   alert("成功");
//   $(‘#file-list‘).html("");
//   exit();
// });
// function exit() {
//   window.parent.location.href = window.parent.location.href;
// }
// //plupload中为我们提供了mOxie对象
// //有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
// //如果你不想了解那么多的话，那就照抄本示例的代码来得到预览的图片吧
// function previewImage(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
//   if (!file || !/image\//.test(file.type)) return; //确保文件是图片
//   if (file.type == ‘image/gif‘) {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
//     var fr = new mOxie.FileReader();
//     fr.onload = function () {
//       callback(fr.result);
//       fr.destroy();
//       fr = null;
//     }
//     fr.readAsDataURL(file.getSource());
//   } else {
//     var preloader = new mOxie.Image();
//     preloader.onload = function () {
//       //preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
//       var imgsrc = preloader.type == ‘image/jpeg‘ ? preloader.getAsDataURL(‘image/jpeg‘, 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
//       callback && callback(imgsrc); //callback传入的参数为预览图片的url
//       preloader.destroy();
//       preloader = null;
//     };
//     preloader.load(file.getSource());
//   }
// }
//
// $("#update").bind(‘click‘, function () {
//   if (uploader.files.length < 1) {
//     alert(‘请选择图片！‘);
//     return false;
//   }
//   uploader.start();
// })
// </script>
