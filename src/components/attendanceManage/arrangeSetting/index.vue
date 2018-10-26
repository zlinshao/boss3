<template>
    <div>
       <el-table
        :data="tableData"
        style="width:100%"
       >
           <el-table-column
            prop="sort"
            label="序号"
           ></el-table-column>
           <el-table-column
            prop="date"
            label="日期"
           ></el-table-column>
           <el-table-column
            label="操作"
           >
            <template slot-scope="scope">
                <div>
                    <el-button 
                        v-if="scope.row.edit" 
                        type="primary" 
                        size="mini"
                        @click="editInfo(scope)">编辑</el-button>
                    <el-button v-else size="mini" @click="LookInfo(scope)">查看</el-button>
                </div>
            </template>
           </el-table-column>
       </el-table>
    </div>
</template>

<script>
import GetDateList from './editArrange/components/currentData.js';

export default {
    name: 'index',
    data (){
        return {
            tableData:[]
        }
    },
    created (){
        var res = GetDateList();
        this.tableData = res;
    },
    methods: {
        LookInfo (scope){
            console.log(scope);
        },
        editInfo (scope){
            this.$router.push({path:'/editArrange',query:{date:scope.row.date,edit:scope.row.edit}});
        },
    }
}
</script>

<style>

</style>

