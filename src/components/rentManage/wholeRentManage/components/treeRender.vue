<template>
	<span class="tree-expand">
		<!--<span class="tree-label" v-show="DATA.isEdit">-->
			<!--<el-input class="edit" size="mini" autofocus-->
			<!--v-model="DATA.name"-->
			<!--:ref="'treeInput'+DATA.id"-->
			<!--@click.stop.native="nodeEditFocus"-->
			<!--@blur.stop="nodeEditPass(STORE,DATA,NODE)"-->
			<!--@keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>-->
		<!--</span>-->
		<span :class="[DATA.id > maxExpandId ? 'tree-new tree-label' : 'tree-label']">
			<span style="width:80%" :title="DATA.title">{{DATA.title}}</span>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE', 'maxExpandId'],
		methods: {
			nodeAdd(s,d,n){//新增
				this.$emit('nodeAdd',s,d,n);
			},
			nodeEdit(s,d,n){//编辑
//				d.isEdit = true;
//				this.$nextTick(() => {
//					this.$refs['treeInput'+d.id].$refs.input.focus();
//				});
				this.$emit('nodeEdit',s,d,n);
			},
			nodeDel(s,d,n){//删除
				this.$emit('nodeDel',s,d,n);
			},
			nodeEditPass(s,d,n){//编辑完成
//				d.isEdit = false
//        this.$emit('nodeEdit',s,d,n);
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
		}
	}
</script>

<style scoped="">

  /*.totalNumber{*/
    /*font-family: 'Impact', sans-serif;*/
    /*color: #ccc;*/
    /*font-size: 14px;*/
  /*}*/
	.tree-expand{
		overflow:hidden;
    display: inline-block;
    width: 100%;
	}
	.tree-expand .tree-label.tree-new{
		font-weight:600;
	}
	.tree-expand .tree-label{
		font-size:0.9em;
		overflow: hidden;
		float: left;
		width:100%;
	}
		.tree-expand .tree-label span{
		float: left;
		}	

</style>
