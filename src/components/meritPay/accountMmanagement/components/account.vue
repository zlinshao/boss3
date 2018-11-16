<template>
    <div class="account">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-table :data="cityDate" style="width: 100%" class="urban-division">
                        <el-table-column prop="province" label="组织架构">
                            <template slot-scope="scope">

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-table :data="cityDate" style="width: 100%" class="urban-division">
                        <el-table-column prop="province" label="账户类型">
                        </el-table-column>
                        <el-table-column prop="province" label="账户名称">
                        </el-table-column>
                        <el-table-column prop="province" label="账号">
                        </el-table-column>
                        <el-table-column prop="province" label="操作人">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
