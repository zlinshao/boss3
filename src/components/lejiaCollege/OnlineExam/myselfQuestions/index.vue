<template>
  <div>
    <div id="onlineExam">
      <div class="qutitle">
        <div class="title">题型</div>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="first">
            <el-button v-if="nowAction == 'first'" size="mini" slot="label" type="primary">单选题</el-button>
            <el-button v-else slot="label" size="mini" type="info">单选题</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">选项</div>
                <el-form :model="form3" style="border:1px #eee solid">
                  <el-form-item>
                    <el-radio-group v-model="form3.check" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in singlen" style="line-height:50px;height:50px;padding-top:14px;">
                        <el-radio :label="index"><el-input size="small"  placeholder="请输入选项内容"></el-input></el-radio>
                      </el-col>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div class="midadd">
                  <span @click="midaddx">+&nbsp;&nbsp;添加选项</span>
                </div>                               
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>

          <el-tab-pane name="second">
            <el-button v-if="nowAction == 'second'" size="mini" slot="label" type="primary">多选题</el-button>
            <el-button v-else slot="label" size="mini" type="info">多选题</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">选项</div>
                <el-form :model="form3" style="border:1px #eee solid">
                  <el-form-item>
                    <el-checkbox-group v-model="form3.checkbox" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in boxlen" style="line-height:50px;height:50px;padding-top:14px;">
                        <el-checkbox :label="index"><el-input size="small"  placeholder="请输入选项内容"></el-input></el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <div class="midadd">
                  <span @click="midaddbox">+&nbsp;&nbsp;添加选项</span>
                </div>                               
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>

          <el-tab-pane name="third">
            <el-button v-if="nowAction == 'third'" size="mini" slot="label" type="primary">不定向选择</el-button>
            <el-button v-else slot="label" size="mini" type="info">不定向选择</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">选项</div>
                <el-form :model="form3" style="border:1px #eee solid">
                  <el-form-item>
                    <el-checkbox-group v-model="form3.checkbox" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in boxlen" style="line-height:50px;height:50px;padding-top:14px;">
                        <el-checkbox :label="index"><el-input size="small"  placeholder="请输入选项内容"></el-input></el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <div class="midadd">
                  <span @click="midaddbox">+&nbsp;&nbsp;添加选项</span>
                </div>                               
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>

          <el-tab-pane name="fourth">
            <el-button v-if="nowAction == 'fourth'" size="mini" slot="label" type="primary">填空题</el-button>
            <el-button v-else slot="label" size="mini" type="info">填空题</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">填空信息</div>
                <el-form :model="form3" style="border:1px #eee solid; ">
                 <el-row>
                  <el-form-item label="填空数量" style="margin-top:20px; margin-left:10px;">
                    <el-col :span="4">
                      <el-input v-model="spacelen" placeholder="请填入" >处</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>                 
                  <el-form-item style=" margin-left:10px;">
                    <el-col :span="6" v-for="(val,index) in spacelen" :key="index">
                      <span>第{{index+1}}处答案</span>
                      <el-input style="width:70%" size="small"  placeholder="请输入选项内容"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
                <div class="midadd">
                  <span @click="spanceadd">+&nbsp;&nbsp;添加选项</span>
                </div>                               
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>

          <el-tab-pane name="five">
            <el-button v-if="nowAction == 'five'" size="mini" slot="label" type="primary">判断题</el-button>
            <el-button v-else slot="label" size="mini" type="info">判断题</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
              <div class="midbody">
                <div class="title">选项</div>
                <el-form :model="form3" style="border:1px #eee solid">
                  <el-form-item>
                    <el-radio-group v-model="form3.panduan" style="width:98%;margin-left:2%;">
                      <el-col :span="12" :key="val" v-for="(val,index) in 2" style="line-height:50px;height:50px;padding-top:14px;">
                        <el-radio :label="index"><el-input size="small"  placeholder="请输入选项内容"></el-input></el-radio>
                      </el-col>
                    </el-radio-group>
                  </el-form-item>
                </el-form>                  
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>

          <el-tab-pane name="six">
            <el-button v-if="nowAction == 'six'" size="mini" slot="label" type="primary">问答题</el-button>
            <el-button v-else slot="label" size="mini" type="info">问答题</el-button>
            <div class="qubody">
              <div class="topbody">
                <div class="title">题干</div>
                  <vue-editor id="editor" useCustomImageHandler :disabled="editorDisabled"></vue-editor>              
              </div>
            <div class="eachSore"> 
              <div class="title">默认分值</div>  
              <el-form :model="form3" style="border:1px #eee solid; text-indent:20px;">
                <el-row>
                  <el-form-item label="默认分值" style="margin-top:20px;">
                    <el-col :span="4">
                      <el-input v-model="form3.score" placeholder="请填入分值" >分</el-input>
                    </el-col>
                  </el-form-item>    
                </el-row>
              </el-form>
            </div>   
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom">
        <el-button  style="width:360px;margin-top:34px; height:32px; line-height:0px; background-color:rgb(106, 141, 251); border-color:rgb(106, 141, 251);" type="primary">提交</el-button>
      </div>
    </div>
  </div>
 
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "index",
  components: { VueEditor },
  data() {
    return {
      activeName: "first",
      nowAction: "first",
      editorDisabled: false,
      singlen: 4,
      boxlen: 4,
      spacelen: 4,
      form3: {
        check: "",
        score: "",
        checkbox: [],
        panduan: ""
      }
    };
  },
  mounted() {},
  watch: {
    activeName(val) {
      this.nowAction = val;
    },
    spacelen(val) {
      this.spacelen = val;
    }
  },
  methods: {
    midaddx() {
      this.singlen++;
    },
    midaddbox() {
      this.boxlen++;
    },
    spanceadd() {
      this.spacelen++;
    }
  }
};
</script>

<style lang="scss" scoped>
#onlineExam {
  .qutitle {
    width: 80%;
    margin: 0 auto;
    .title {
      height: 30px;
      color: #83a0fc;
      line-height: 30px;
      text-indent: 18px;
    }
    .qubody {
      .title {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 0px;
      }
    }
    .midbody {
      margin-top: 20px;
      .title {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 0px;
      }
      .midadd {
        height: 50px;
        padding-top: 20px;
        border: 1px #eee solid;
        border-top: none;
        text-align: center;
        span {
          width: 380px;
          height: 30px;
          border: 1px #58d788 dashed;
          text-align: center;
          line-height: 30px;
          display: block;
          color: #58d788;
          background: #f3fdf6;
          margin-left: 32%;
          cursor: pointer;
        }
      }
    }
    .eachSore {
      height: 120px;

      .title {
        height: 40px;
        color: #83a0fc;
        line-height: 40px;
        text-indent: 0px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 100px;
    text-align: center;
  }
}
</style>
