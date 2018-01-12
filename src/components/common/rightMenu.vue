<template>
    <div>
      <!--右键-->
      <div id="rightMenu">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
        return {
          getOffset : {
            top:  (obj) => {
              return obj.offsetTop + (obj.offsetParent ? this.getOffset.top(obj.offsetParent) : 0)
            },
            left:  (obj) => {
              return obj.offsetLeft + (obj.offsetParent ? this.getOffset.left(obj.offsetParent) : 0)
            }
          },
        }
    },
    mounted(){
      this.getRightMenu()
    },
    methods:{
      getRightMenu(){
        let _this =this;
        let oMenu = document.getElementById("rightMenu");
        let aUl = oMenu.getElementsByTagName("ul");
        let aLi = oMenu.getElementsByTagName("li");
        let aDoc = [window.innerWidth , window.innerHeight];
        let [showTimer,hideTimer,i,maxWidth,maxHeight] = [null,null,0,0,0];
        //实时监测浏览器窗口的大小
        window.onresize = function(){
          aDoc = [window.innerWidth , window.innerHeight];
        };

        oMenu.style.display = "none";

        for (i = 0; i < aLi.length; i++) {
          //为含有子菜单的li加上箭头
          aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");

          //鼠标移入
          aLi[i].onmouseover = function () {
            let oThis = this;
            let oUl = oThis.getElementsByTagName("ul");


            //显示子菜单
            if (oUl[0]) {
              clearTimeout(hideTimer);
              showTimer = setTimeout(function () {
                for (i = 0; i < oThis.parentNode.children.length; i++)
                {
                  oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
                  (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
                }
                oUl[0].style.display = "block";
                oUl[0].style.top = oThis.offsetTop + "px";
                oUl[0].style.left = oThis.offsetWidth + "px";
                setWidth(oUl[0]);

                //最大显示范围
                maxWidth = aDoc[0] - oUl[0].offsetWidth;
                maxHeight = aDoc[1] - oUl[0].offsetHeight;

                //防止溢出
                maxWidth < _this.getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
                maxHeight < _this.getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px")
              },300);
            }
          };

          //鼠标移出
          aLi[i].onmouseout = function () {
            let oThis = this;
            let oUl = oThis.getElementsByTagName("ul");
            //鼠标移出样式
            oThis.className = oThis.className.replace(/\s?active/,"");

            clearTimeout(showTimer);
            hideTimer = setTimeout(function ()
            {
              for (i = 0; i < oThis.parentNode.children.length; i++)
              {
                oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
                (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
              }
            },300);
          };
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
          for (i = 0; i < obj.children.length; i++)
          {
            let oLi = obj.children[i];
            let iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"] : getComputedStyle(oLi,null)["paddingLeft"]) * 2
            if (iWidth > maxWidth) maxWidth = iWidth;
          }
          for (i = 0; i < obj.children.length; i++) obj.children[i].style.width = maxWidth + "px";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  ul {
    list-style-type:none;
    margin: 0;
    padding: 0;
  }
  #rightMenu {
    position:fixed;
    top:-9999px;
    left:-9999px;
    z-index: 9999;
  }
  #rightMenu ul {
    float:left;
    border:1px solid #efefef;
    background: #ffffff;
    padding:0;
    /*box-shadow:2px 2px 2px rgba(0, 0, 0, .6);*/
  }
  #rightMenu ul li {
    float:left;
    clear:both;
    height:28px;
    cursor:pointer;
    line-height:28px;
    white-space:nowrap;
    padding: 0 40px;
  }
  #rightMenu ul li.sub {
    background:url(../../assets/arrow.png) right 12px no-repeat;
  }
  #rightMenu ul li:hover {
    background-color:#f1f3f6;
  }
  #rightMenu ul ul {
    display:none;
    position:absolute;
  }
</style>
