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
			<span>{{DATA.name}}&nbsp;&nbsp; <span class="totalNumber"> ({{DATA.users}}人)</span></span>
		</span>
		<span class="tree-btn">
			<i class="iconfont icon-fuzeren" @click="nodeSet(STORE,DATA,NODE)"></i>
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
			<i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
      <i title="显示/隐藏" class="el-icon-close" @click.stop="nodeHide(STORE,DATA,NODE)"></i>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE', 'maxExpandId'],
		methods: {
		  nodeHide(s,d,n) {
		    this.$emit('nodeHide',s,d,n);
      },
      nodeSet(s,d,n){//设置负责人
        this.$emit('nodeSet',s,d,n);
      },
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

  .totalNumber{
    /*font-family: 'Impact', sans-serif;*/
    color: #bbb;
    font-size: 14px;
  }
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
	}
	.tree-expand .tree-label .edit{
		width:80%;
	}

	.tree-expand .tree-btn{
		display:none;
    float: right;
    /*margin-left: 200px;*/
	}
	.tree-expand .tree-btn i{
		color:#666;
    font-size: 12px;
		margin-right:5px;
	}
</style>
