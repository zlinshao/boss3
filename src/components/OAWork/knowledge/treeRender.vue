<template>
	<span class="tree-expand">
		<span v-if="DATA.open">
			<span>{{DATA.label}}</span>
		</span>
		<span class="tree-btn" v-if="DATA.open">
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
      <i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
		</span>
	</span>
</template>

<script>
  export default {
    name: 'treeExpand',
    props: ['NODE', 'DATA', 'STORE'],
    methods: {
      nodeAdd(s, d, n) {//新增
        this.$emit('nodeAdd', s, d, n);
      },
      nodeEdit(s, d, n) {//编辑
        this.$emit('nodeEdit', s, d, n);
      },
      nodeDel(s, d, n) {//删除
        this.$emit('nodeDel', s, d, n);
      },
      nodeEditFocus() {
        //阻止点击节点的事件冒泡
      },
    }
  }
</script>

<style scoped="">
  .tree-expand {
    overflow: hidden;
    display: inline-block;
    width: 100%;
  }

  .tree-expand .tree-btn {
    display: none;
    float: right;
  }

  .tree-expand .tree-btn i {
    color: #666;
    font-size: 12px;
    margin-right: 5px;
  }

  .colorRed {
    color: red;
  }
</style>
