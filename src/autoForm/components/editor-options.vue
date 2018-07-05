<template>
  <div class="bowen-options">
    <div v-for="(opt,i) in itemOptions" style="margin: 5px 0">
      <template v-if="editingIdx===i">
        <el-input size="mini" v-model="editingOpt.value" placeholder="值"></el-input>
        <el-input size="mini" v-model="editingOpt.label" placeholder="标签"></el-input>
        <el-button-group>
          <el-button size="mini" icon="el-icon-success" @click="handleSave(i)"></el-button>
          <el-button size="mini" icon="el-icon-error" @click="editingIdx=-1"></el-button>
        </el-button-group>
      </template>
      <span v-else>
         <span>{{opt.value}}/{{opt.label}}</span>
      </span>
      <el-button-group>
        <el-button size="mini" round @click="opt.disabled = !opt.disabled" icon="el-icon-close"
                   :title="opt.disabled?'不可选':'可选'" :type="opt.disabled?'info':''">
        </el-button>

        <el-button size="mini" @click="handlePreEdit(i, opt)" icon="el-icon-edit" round></el-button>
        <el-button size="mini" @click="itemOptions.splice(i,1)" icon="el-icon-delete" round></el-button>
      </el-button-group>
    </div>

    <template v-if="editingIdx===-2">
      <el-input size="mini" v-model="editingOpt.value" placeholder="值"></el-input>
      <el-input size="mini" v-model="editingOpt.label" placeholder="标签"></el-input>
      <el-button-group>
        <el-button size="mini" icon="el-icon-success" @click="handleSave(itemOptions.length)"></el-button>
        <el-button size="mini" icon="el-icon-error" @click="editingIdx=-1"></el-button>
      </el-button-group>
    </template>
    <el-button @click="handlePreAdd" size="mini" type="primary" style="margin-top: 5px;float: right">添加选项</el-button>
  </div>
  <!--div.bowen-options-->

    <!--div.c666(v-for="(opt,i) in itemOptions" :key="i")-->

      <!--template(v-if="editingIdx===i")-->
        <!--el-input(-->
          <!--size="mini"-->
          <!--v-model="editingOpt.value"-->
          <!--placeholder="值")-->
        <!--el-input(-->
          <!--size="mini"-->
          <!--v-model="editingOpt.label"-->
          <!--placeholder="标签")-->
        <!--el-button-group-->
          <!--el-button(-->
            <!--size="mini"-->
            <!--icon="el-icon-success"-->
            <!--@click="handleSave(i)")-->
          <!--el-button(-->
            <!--size="mini"-->
            <!--icon="el-icon-error"-->
            <!--@click="editingIdx=-1")-->

      <!--span(v-else)-->
        <!--//- icon-svg(:icon="'checkbox'")-->
        <!--span {{opt.value}}/{{opt.label}}-->

      <!--el-button-group-->
        <!--el-button(-->
          <!--size="mini"-->
          <!--round-->
          <!--@click="opt.disabled = !opt.disabled"-->
          <!--:title="opt.disabled?'不可选':'可选'"-->
          <!--:type="opt.disabled?'info':''")-->
          <!--icon-svg(icon="disabled")-->
        <!--el-button(-->
          <!--size="mini"-->
          <!--@click="handlePreEdit(i, opt)"-->
          <!--icon="el-icon-edit"-->
          <!--round)-->
        <!--el-button(-->
          <!--size="mini"-->
          <!--@click="itemOptions.splice(i,1)"-->
          <!--icon="el-icon-delete"-->
          <!--round)-->

    <!--template(v-if="editingIdx===-2")-->
      <!--el-input(-->
        <!--size="mini"-->
        <!--v-model="editingOpt.value"-->
        <!--placeholder="值")-->
      <!--el-input(-->
        <!--size="mini"-->
        <!--v-model="editingOpt.label"-->
        <!--placeholder="标签")-->
      <!--el-button-group-->
        <!--el-button(-->
          <!--size="mini"-->
          <!--@click="handleSave(itemOptions.length)"-->
          <!--icon="el-icon-success")-->
        <!--el-button(-->
          <!--size="mini"-->
          <!--@click="editingIdx=-1"-->
          <!--icon="el-icon-error")-->

    <!--el-button(-->
      <!--@click="handlePreAdd"-->
      <!--size="mini"-->
      <!--type="primary") 添加选项-->
</template>

<script>
export default {
  methods: {
    handlePreAdd() {
      this.editingOpt = { value: '', label: '', disabled: false }
      this.editingIdx = -2
    },
    handlePreEdit(i, opt) {
      this.editingIdx = i
      this.editingOpt = { ...opt }
    },
    handleSave(i) {
      this.$set(this.itemOptions, i, { ...this.editingOpt })
      this.editingIdx = -1
    }
  },
  data() {
    return {
      editingIdx: -1, // 当前正在编辑的选项索引, -1没有正在编辑的, -2正在"新增"
      editingOpt: {
        'value': '',
        'label': '',
        'disabled': false,
      }
    }
  },
  // computed: {
  //   defaultValue: {
  //     get() {
  //       console.log(this.value)
  //       return this.value
  //     },
  //     set(newV) {
  //       this.$emit('input', newV)
  //     }
  //   }
  // },
  props: {
    itemOptions: {
      type: Array,
      required: true,
    },
    // selectType: {
    //   // 单选'single' / 多选'multiple'
    //   type: String,
    //   required: true,
    // },
    // value: {
    //   // 默认值
    //   required: true
    // }
  }
}
</script>
<style lang="scss" scoped>
  .bowen-options {
    .el-input {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
    }
  }
</style>
