<template>
	<transition name='fade'>
		<ul class="menu-ui" :style="{left:startX.replace(/[^0-9]/ig,'')>innerWidth-150?innerWidth-150+'px':startX,top:startY}"
        v-if="show" @contextmenu="rightMenuClick($event)">
			<li v-for="(item, index) in list" @mouseover="showIndex=index" @mouseleave="showIndex=-1" :key="index">
				<a :class="item['divide'] ? 'divide':''" @click="emitClickEvent($event, item)" @contextmenu="emitClickEvent($event, item)">
					<i :class="item.headIcon" class="head-icon"></i>
					<span>{{ item.label}}</span>
					<i :class="item.tailIcon" class="tail-icon"></i>
				</a>
        <!--存在子元素进行递归-->
				<infinite-right-menu v-if="showChildren(item)" @clickOperate="emitClick"
														 :list="item.children" :startX="isOverflowX?'-95%':'95%'" :startY="'0'"
														 :show="showList(index)"></infinite-right-menu>
			</li>
		</ul>
	</transition>
</template>

<script>
  export default {
    name: 'InfiniteRightMenu',
    props:['startX','startY','list','show'],
    data(){
      return{
        showIndex: -1,
        innerWidth:'',
        innerHeight:'',
      }
    },
    mounted(){
      this.innerWidth = document.documentElement.clientWidth;
      this.innerHeight = document.documentElement.clientHeight;
      window.onresize = function(){
        this.innerWidth = document.documentElement.clientWidth;
        this.innerHeight = document.documentElement.clientHeight;
      };
    },
    computed:{
      isOverflowX(){
          return this.startX.replace(/[^0-9]/ig,'')>this.innerWidth-300
      }
    },
    methods: {
      showChildren(item) {
        return !(!item.children || !item.children.length);
      },
      showList(index) {
        return this.showIndex === index;
      },
      emitClick (index,item) {
        this.$emit('clickOperate', index)
      },
      emitClickItem(item){
        this.$emit('clickOperateMore', item)
      },
      emitClickEvent (event, item) {
        if (!this.showChildren(item)) {
          this.emitClick (item.clickIndex)
          this.emitClickItem (item)
				} else {
          event.cancelBubble = true;
          event.stopPropagation();
          event.preventDefault();
				}
			},
      rightMenuClick(event){
        event.preventDefault();
      }
    },
  }
</script>

<style scoped="">
	.menu-ui {
		position: absolute;
		background: white;
		width: 150px;
		display: list-item;
    box-shadow: 0 0 1px 0 #6a8dfb;
		list-style: none;
		padding: 13px 0;
		z-index: 1000;
		margin: 0;
	}

	li {
		position: relative;
	}

	a {
		text-decoration: none;
		position: relative;
		display: flex;
		cursor: pointer;
		align-items: center;
    justify-content: space-between;
		padding: 0 10px;
		height: 26px;
		line-height: 26px;
		color: #222;
	}

	.divide {
		border-bottom: 1px solid #e6e6e6;
	}

	li:hover {
		background-color: #6a8dfb;
	}

	li:hover > a > span {
		color: #ffffff;
	}
	a > span {
		padding-left: 20px;
		font-size: 13px;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	i {
		font-size: 13px !important;
	}

	.head-icon {
		position: absolute;
    left: 10px;
    line-height: 26px;
    color: #bfcbfa;
	}

	.tail-icon {
		position: relative;
		float: right;
    line-height: 26px;
    color: #bfcbfa;
	}
</style>
