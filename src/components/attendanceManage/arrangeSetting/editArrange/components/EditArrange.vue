<template>
    <div id="editArrange">
        <div>
            <el-row>
                <el-col span="12">
                    排班月份
                    <el-date-picker type="month" placeholder="请选择" size="mini" style="width:180px;">      
                    </el-date-picker>
                </el-col>
                <el-col span="12">
                    应用对象
                    <el-input type="text" size="mini" style="width:300px;"></el-input>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editArrange',
    props:['date']
}
</script>

<style lang="scss">
    #editArrange{
        width: 100%;
    }
</style>

