<template>
    <div>
        <div>
            <el-table>
                <el-table-column
                    label="头像"
                ></el-table-column>
                <el-table-column
                    label="姓名"
                ></el-table-column>
                <el-table-column
                    label="部门"
                ></el-table-column>
                <el-table-column
                    label="角色"
                ></el-table-column>
                <el-table-column
                    label="当日是否排班"  
                ></el-table-column>
                <el-table-column
                    label="当日是否打卡"  
                ></el-table-column>
                <el-table-column
                    label="连续多少天未打卡"  
                ></el-table-column>
                <el-table-column
                    label="是否出差"  
                ></el-table-column>
                <el-table-column
                    label="是否请假"  
                ></el-table-column>
                <el-table-column
                    label="迟到"  
                ></el-table-column>
            </el-table>
        </div>
    </div>    
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss">
</style>

