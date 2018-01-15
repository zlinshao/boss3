<template>
	<div id="demo" @click="show=false" @contextmenu="closeMenu">
    <div @contextmenu="openContextMenu($event)" style="width: 100%;height: 750px;">
        区域一
    </div>
		<RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'"
               :list="lists" :show="show" @clickOperate="clickEvent">
    </RightMenu>
	</div>
</template>

<script>
  import RightMenu from './rightMenu.vue'
  export default {
    name: 'Demo',
    components: {RightMenu},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: []
      }
    },
    methods: {
      clickEvent (index) {
        console.log('click ' +  index)
      },
      openContextMenu(event) {
        this.lists = [
          {
            clickIndex: 1,
            headIcon: 'el-icon-mobile-phone',
            label: '下么哈哈',
          },{
            clickIndex: 1,
            label: '阿萨德会计法',
          },
          {
            clickIndex: 1,
            label: '发生的发生',
          },
          {
            clickIndex: 1,
            label: '打发斯蒂芬法',
          },
          {
            clickIndex: 1,
            label: '呵呵二位法',
          },
          {
            clickIndex: 4,
            label: 'ddd',
            tailIcon: 'el-icon-arrow-right',
            divide: true,
            children: [
              {
                clickIndex: 5,
                label: 'dba',
              },
              {
                clickIndex: 6,
                label: 'addsaa',
              }
            ]
          },
          {
            clickIndex: 13,
            label: '过分的事',
            tailIcon: 'el-icon-arrow-right',
            children: [
              {
                clickIndex: 14,
                label: 'abacaa',
              },
              {
                clickIndex: 15,
                label: 'adaeaa',
              }
            ]
          }
        ];
        //param: user right param
        let e = event||window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop  - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      closeMenu(){
          this.show = false;
      },
    },
  }
</script>

<style scoped>
</style>
