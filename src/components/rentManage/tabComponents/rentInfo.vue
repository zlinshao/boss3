<template>
    <div>
      <div class="content">
        <table class="tableDetail">
          <tr>
            <td>房东姓名</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
            <td>合同开始时间</td>
            <td></td>
            <td>空置期开始时间</td>
            <td></td>
            <td>月单价</td>
            <td></td>
          </tr>
          <tr>
            <td>卫生情况</td>
            <td></td>
            <td>付款方式</td>
            <td></td>
            <td>证件类型</td>
            <td></td>
            <td>合同结束时间</td>
            <td></td>
            <td>空置期结束时间</td>
            <td></td>
          </tr>
          <tr>
            <td>签约时长</td>
            <td></td>
            <td>门卡数量</td>
            <td></td>
            <td>押金</td>
            <td></td>
            <td>证件号码</td>
            <td></td>
            <td>钥匙数</td>
            <td></td>
          </tr>
          <tr>
            <td>空置时长</td>
            <td></td>
            <td>合同性质</td>
            <td></td>
            <td>录入时间</td>
            <td></td>
            <td>水电底数</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td>所属部门</td>
            <td></td>
            <td>开单人</td>
            <td></td>
            <td>负责人</td>
            <td></td>
            <td>操作人</td>
            <td colspan="3"></td>
          </tr>
        </table>
      </div>
      <div class="remarks">备注：</div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content {
    min-height: 100px;
    .tableDetail {
      width: 100%;
      border-collapse: collapse;
      tr {
        td {
          border: 1px solid #ebeef5;
          padding: 8px 0;
          color: #606266;
          text-align: center;
          &:nth-child(odd) {
            width: 8%;
          }
          &:nth-child(even) {
            width: 12%;
          }
        }
      }
    }
  }
  .remarks {
    padding: 8px;
    border-top: 1px solid #efefef;
  }
</style>
