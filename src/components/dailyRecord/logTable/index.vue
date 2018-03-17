<template>
   <div>
     <el-table
       :data="tableData"
       width="100%">
       <el-table-column
         label="填报人"
         prop="fillName">
       </el-table-column>
       <el-table-column
         label="填报时间"
         prop="fillTime">
       </el-table-column>
       <el-table-column
         label="今日完成工作"
         prop="todayFinish">
       </el-table-column>
       <el-table-column
         label="未完成工作"
         prop="noFinish">
       </el-table-column>
       <el-table-column
         label="需协调工作"
         prop="coordinate">
       </el-table-column>
     </el-table>
   </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
              tableData: [
                {
                  fillName: '米见过',
                  fillTime: '0000-00-00 00:00:00',
                  todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                },
                {
                  fillName: '米见过',
                  fillTime: '0000-00-00 00:00:00',
                  todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                },
                {
                  fillName: '米见过',
                  fillTime: '0000-00-00 00:00:00',
                  todayFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  noFinish: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                  coordinate: 'Manger和福克斯的发货快递顺丰航空的萨芬好看的',
                },
              ],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
