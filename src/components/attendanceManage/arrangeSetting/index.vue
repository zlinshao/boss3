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
export default {
    name: 'index',
    data (){
        return {
            tableData:[
                {sort:1,date:'2018-10-25',edit:true},
                {sort:2,date:'2018-11-25',edit:true},
                {sort:3,date:'2018-12-25',edit:true},
                {sort:4,date:'2019-01-25',edit:true},
                {sort:5,date:'2019-02-25',edit:true},
                {sort:6,date:'2019-03-25',edit:true},
                {sort:7,date:'2018-09-25',edit:false},
                {sort:8,date:'2018-08-25',edit:false},
                {sort:9,date:'2018-07-25',edit:false},
                {sort:10,date:'2018-06-25',edit:false},
                {sort:11,date:'2018-05-25',edit:false},
                {sort:12,date:'2018-04-25',edit:false},
            ]
        }
    },
    created (){
    },
    methods: {
        LookInfo (scope){
            console.log(scope);
        },
        editInfo (scope){
            console.log(scope);
            this.$router.push('/editArrange');
        }
    }
}
</script>

<style>

</style>

