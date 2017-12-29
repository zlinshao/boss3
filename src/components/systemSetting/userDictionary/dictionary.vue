<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">

          <div class="grid-content">
            <div class="title">用户字典</div>
            <el-tree
              :data="data"
              :props="defaultProps"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :render-content="renderContent">
            </el-tree>

          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content">
            <div class="title">
              <span>字典详情</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: 'hello',
      data () {
            return {
              data: [{
                id: 1,
                label: '一级 1',
                children: [{
                  id: 4,
                  label: '二级 1-1',
                  children: [{
                    id: 9,
                    label: '三级 1-1-1'
                  }, {
                    id: 10,
                    label: '三级 1-1-2'
                  }]
                }]
              }, {
                id: 2,
                label: '一级 2',
                children: [{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 6,
                  label: '二级 2-2'
                }]
              }, {
                id: 3,
                label: '一级 3',
                children: [{
                  id: 7,
                  label: '二级 3-1'
                }, {
                  id: 8,
                  label: '二级 3-2'
                }]
              }],
              defaultProps: {
                children: 'children',
                label: 'label'
              }
            }
        },
      methods:{
        append(store, data) {
          store.append({ id: id++, label: 'testtest', children: [] }, data);
        },
        remove(store, data) {
          store.remove(data);
        },
        renderContent(createElement, { node, data, store }) {
          let _this = this;
          return createElement('span', [
            createElement('span', node.label),
            createElement('span', {attrs:{
              style:"float: right; color:transparent"
            }},[
              createElement('a',{attrs:{
                style:"margin: 0 10px;",
                class:"el-icon-delete"
              },on:{
                mouseover :function (e) {
                    e.target.style.color = '#5a5e66'
                },
                mouseout :function (e) {
                  e.target.style.color = 'transparent'
                },
                click:function() {
                  console.info("点击了节点" + data.id + "的删除按钮");
                  store.remove(data);
                },
              }}),
//              createElement('a',{attrs:{
//                style:"margin: 0 10px; color:#5a5e66"
//              },on:{
//                click:function() {
//                  console.info("点击了节点" + data.id + "的添加按钮");
//
//                  store.append({ id: _this.baseId++, label: 'testtest', children: [] }, data);
//                }
//              }},"增加"),
            ]),
          ]);
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


  body {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-col {
        border-radius: 4px;
        .grid-content {
          border-radius: 4px;
          min-height: 818px;
          background: #fff;
          .title{
            height: 40px;
            line-height: 40px;
            background: #409EFF;
            border-radius: 4px 4px 0 0;
            color: #fff;
            padding-left: 15px;
          }
        }
      }
    }
  }
</style>
