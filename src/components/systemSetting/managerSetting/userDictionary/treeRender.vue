<template>
	<span class="tree-expand">
		<span v-if="DATA.open">
			<span :class="{'colorRed': DATA.status === 8}">{{DATA.dictionary_name}}</span>
		</span>
		<span class="tree-btn" v-if="DATA.open">
			<i v-if="DATA.status === 7" class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i v-if="DATA.status === 7" class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
      <!--<i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>-->
			<i class="el-icon-sort" @click.stop="upperSelf(STORE,DATA,NODE)"></i>
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
        // this.$emit('nodeDel', s, d, n);
      },
      upperSelf(s, d, n) {//上架下架
        this.$emit('nodeSelf', s, d, n);
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
