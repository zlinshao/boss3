
let getOffset = {
  top: function (obj) {
    return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
  },
  left: function (obj) {
    return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
  }
};


window.onload = function () {
  if(document.getElementById("rightMenu")!== null){
    let oMenu = document.getElementById("rightMenu");
    let aUl = oMenu.getElementsByTagName("ul");
    let aLi = oMenu.getElementsByTagName("li");
    let aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
    let [showTimer,hideTimer,i,maxWidth,maxHeight] = [null,null,0,0,0];

    //实时监测浏览器窗口的大小
    window.onresize = function(){
      aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
    };

    oMenu.style.display = "none";

    for (i = 0; i < aLi.length; i++) {
      //为含有子菜单的li加上箭头
      // aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");

      //鼠标移入
      aLi[i].onmouseover = function () {
        let that = this;
        let oUl = that.getElementsByTagName("ul");

        //鼠标移入样式
        that.className += " active";

        //显示子菜单
        if (oUl[0]) {
          clearTimeout(hideTimer);
          showTimer = setTimeout(function () {
            for (i = 0; i < that.parentNode.children.length; i++) {
              that.parentNode.children[i].getElementsByTagName("ul")[0] &&
              (that.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
            }
            oUl[0].style.display = "block";
            oUl[0].style.top = that.offsetTop + "px";
            oUl[0].style.left = that.offsetWidth + "px";
            setWidth(oUl[0]);

            //最大显示范围
            maxWidth = aDoc[0] - oUl[0].offsetWidth;
            maxHeight = aDoc[1] - oUl[0].offsetHeight;

            //防止溢出
            maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
            maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + that.offsetTop + that.clientHeight + "px")
          }, 300);
        }
      };

      // //鼠标移出
      // aLi[i].onmouseout = function () {
      //   let that = this;
      //   let oUl = that.getElementsByTagName("ul");
      //   //鼠标移出样式
      //   that.className = that.className.replace(/\s?active/, "");
      //
      //   clearTimeout(showTimer);
      //   hideTimer = setTimeout(function () {
      //     for (i = 0; i < that.parentNode.children.length; i++) {
      //       that.parentNode.children[i].getElementsByTagName("ul")[0] &&
      //       (that.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
      //     }
      //   }, 300);
      // };
    }


    //自定义右键菜单
    document.oncontextmenu = function (event) {
      oMenu.style.display = "block";
      oMenu.style.top = event.clientY + "px";
      oMenu.style.left = event.clientX + "px";
      setWidth(aUl[0]);

      //最大显示范围
      maxWidth = aDoc[0] - oMenu.offsetWidth;
      maxHeight = aDoc[1] - oMenu.offsetHeight;

      //防止菜单溢出
      oMenu.offsetTop > maxHeight && (oMenu.style.top = maxHeight + "px");
      oMenu.offsetLeft > maxWidth && (oMenu.style.left = maxWidth + "px");
      return false;
    };

    //点击隐藏菜单
    document.onclick = function () {
      oMenu.style.display = "none"
    };

    //取li中最大的宽度, 并赋给同级所有li
    function setWidth(obj) {
      maxWidth = 0;
      for (i = 0; i < obj.children.length; i++) {
        let oLi = obj.children[i];
        let iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"] : getComputedStyle(oLi, null)["paddingLeft"]) * 2;
        if (iWidth > maxWidth) maxWidth = iWidth;
      }
      for (i = 0; i < obj.children.length; i++) {
        obj.children[i].style.width = maxWidth + "px";
      }
    }
  }
};
