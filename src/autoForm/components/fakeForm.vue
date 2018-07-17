<template>
  <div>
    <H3 class="formTitle">{{formConfig.formName}}</H3>
    <el-form class="dynamic-form fake-form" :inline="formConfig.inline" :size='formConfig.size'
             :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth">
      <draggable v-model="formConfig.formItemList">
        <transition-group name="list-complete">
          <div v-for="(item,i) in formConfig.formItemList" :key="item.index">
            <el-row v-if="item.type === 'column'" class="draggable list-complete-item"
                    style="min-height: 70px;border: 1px solid #ccc;">
              <el-col v-for="(column,index) in item.length" :span="24/item.length" :key="column">
                <div v-if="!item.formItemList[index]" style="text-align: center;margin-top: 8px">
                  <el-button type="text" @click="addComponents(item,index)">添加组件</el-button>
                </div>
                <div v-else class="draggable list-complete-item"
                     :class="{'selected': $store.state.autoForm.currentItem.index===item.formItemList[index].index}"
                     @click="select(item.formItemList[index])">
                  <fake-form-item :item="item.formItemList[index]"></fake-form-item>
                  <i class="el-icon-delete" style="font-size: 20px"
                     @click.stop="deleteItemChild(i,index,item.formItemList[index])"></i>
                </div>
              </el-col>
              <span class="delete" style="font-size: 13px" @click.stop="deleteItem(i)">删除</span>
            </el-row>
            <div v-else-if="item.type === 'formGroup'" class="draggable list-complete-item" @click="select(item)">
              <div class="form_border">
                <el-row>
                  <div class="title">{{item.label}}</div>
                  <el-col :span="24/Number(item.layout)" v-for="(formItem,index) in item.formItemList" :key="index">
                    <div class="draggable list-complete-item"
                         :class="{'selected': $store.state.autoForm.currentItem.index===item.formItemList[index].index}"
                         @click.stop="select(item.formItemList[index])">
                      <fake-form-item :item="formItem"></fake-form-item>

                      <i class="el-icon-delete" style="font-size: 20px"
                         @click.stop="deleteArrayItem(i,index)"></i>
                    </div>
                  </el-col>
                </el-row>
                <div style="text-align: center">
                  <el-button type="text" disabled>
                    + {{item.operateName}}
                  </el-button>
                </div>
              </div>

              <span class="delete" style="font-size: 13px" @click.stop="deleteItem(i)">删除</span>
            </div>
            <div v-else class="draggable list-complete-item"
                 :class="{'selected': $store.state.autoForm.currentItem.index===item.index}" @click="select(item)">
              <fake-form-item :item="item"></fake-form-item>
              <i class="el-icon-delete" style="font-size: 20px" @click.stop="deleteItem(i)"></i>
            </div>
          </div>
        </transition-group>
      </draggable>
    </el-form>


    <el-dialog
      title="选择组件"
      :visible.sync="dialogVisible"
      width="30%">
      <ItemList @add="addItem_"></ItemList>
      <h4>已选中 ： <span style="color: #409EFF">{{selectType.label}}</span></h4>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import FakeFormItem from './fakeFormItem'
  import ItemList from './itemList'

  export default {
    components: {FakeFormItem, Draggable, ItemList},
    props: {
      formConfig: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        dialogVisible: false,
        selectType: {},
        selectData: {},
      }
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          setTimeout(() => {
            this.selectType = {};
          },10)
        }
      }
    },
    methods: {
      select(item) {
        this.$store.dispatch('selectItem', item);
      },
      deleteItem(i) {
        this.formConfig.formItemList.splice(i, 1)
      },
      deleteItemChild(i, index, val) {
        this.formConfig.formItemList[i].formItemList.splice(index, 1, '')
      },
      deleteArrayItem(i,index){
        this.formConfig.formItemList[i].formItemList.splice(index, 1)
      },
      addComponents(item, column) {
        this.dialogVisible = true;
        const data = {};
        this.selectData = {};
        data.item = item;
        data.column = column;
        this.selectData = data
      },
      addItem_(val) {
        console.log(val);
        this.selectType = val;
      },
      confirmAdd() {
        this.$set(this.selectData, 'data', this.selectType);
        if (this.selectType.type) {
          this.$emit('update', this.selectData);
        }
        this.dialogVisible = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .fake-form {
    .draggable {
      position: relative;
      padding: 5px 10px 0 5px;
      cursor: move;

      i[class^="el-icon"] {
        display: none;
        position: absolute;
        right: 13px;
        top: 13px;
        cursor: pointer;
        color: #ff3c00b9;
      }

      &:hover {
        i[class^="el-icon"] {
          display: inline;
        }
      }
    }
    .delete {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 0 10px;
      border: 1px solid #ff3c00;
      cursor: pointer;
      color: #ff3c00b9;
      &:hover {
        display: inline;
      }
    }

    .selected {
      border: 1px dashed #40a0ff;
      background-color: #eaeafe;
      border-radius: 3px;
    }

    .el-form-item {
      label {
        cursor: move;
      }
    }

    &.el-form--inline {
      .draggable {
        display: inline-block;
      }
    }
  }

  .list-complete-item {
    transition: all 1s;
  }

  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
  }

  .title {
    color: #409EFF;
    opacity: .7;
    &:before {
      border-radius: 2px;
      margin-right: 5px;
      background: #409EFF;
      border-left: 1px solid #409EFF;
      content: '|';
    }
  }

  .form_border {
    padding: 18px 10px 0 10px;
    margin-bottom: 15px;
    border: 1px solid #dfe6fb;
    border-radius: 5px;
  }
</style>
