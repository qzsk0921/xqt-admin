/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/10/25
* Time: 上午9:32
*/
<template>
    <div class="ad">
        <div class="ad-head">
            <el-button type="primary" @click="create">新建广告</el-button>
            <el-row class="ad-head-right">
                <el-select
                        class="status-select"
                        v-model="statusSelectedValue"
                        placeholder="请选择">
                    <el-option
                            v-for="item in statusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="search">查询</el-button>
            </el-row>

        </div>
        <el-row class="table-container">
            <el-table
                :data="tableData"
                @row-click="rowClick"
                >
                <!-- <el-table-column
                        prop="ad_name"
                        label="投放名称"
                        height="54px"
                        class-name="table-column"
                        label-class-name="label-name"
                        >
                </el-table-column>
                <el-table-column
                        prop="status_name"
                        label="广告状态"
                        height="54px"
                        class-name="table-column"
                        label-class-name="label-name"
                        >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">{{scope.row.status_name}}</span>
                        <span class="review" v-else-if="scope.row.status === 2">{{scope.row.status_name}}</span>
                        <span v-else-if="scope.row.status === 3">{{scope.row.status_name}}</span>
                        <span class="over" v-else="scope.row.status === 4">{{scope.row.status_name}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column
                        prop="ad_name"
                        label="推广名称"
                        height="54px"
                        class-name="table-column"
                        label-class-name="label-name"
                        >
                </el-table-column>
                <el-table-column
                        prop="type_name"
                        label="服务类型"
                        height="54px"
                        class-name="table-column"
                        label-class-name="label-name"
                        >
                </el-table-column>
                <el-table-column
                        prop="status_name"
                        label="广告状态"
                        height="54px"
                        class-name="table-column"
                        label-class-name="label-name"
                        >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">{{scope.row.status_name}}</span>
                        <span class="review" v-else-if="scope.row.status === 2">{{scope.row.status_name}}</span>
                        <span v-else-if="scope.row.status === 3">{{scope.row.status_name}}</span>
                        <span class="over" v-else="scope.row.status === 4">{{scope.row.status_name}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination">
            <el-pagination
                    :page-size="10"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :page-count="parseInt(pagination.page_count)"
                    @current-change="pageChange">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import { getAdList } from '@/api/merchant.js'
    export default {
        name: "Ad",
        data () {
            return{
                isCreate: 0,
                typeList: [],
                typeSelectedValue: '',
                dateValue: [],
                statusList: [],
                statusSelectedValue: '',
                tableData: [],
                pagination: {},
                searchParams: {
                    'search': '',
                    'type': '',
                    'status': '',
                    'page': 1,
                    'per-page': 20

                }

            }
        },
        created: function () {
            this.getList()
        },
        methods: {
            rowClick (row) {
                this.$router.push({ name: 'detail', query: { id: row.id}})
            },
            create () {
                if (this.isCreate == 1) {
                    this.$router.push({name: 'create', query: {id: 1}})
                } else {
                    this.$message({
                        type: 'warning',
                        message: '您有正在审核或投放中的广告，暂不能新建广告哦'
                    })
                }
            },
            getList () {
                return new Promise((resolve, reject) => {
                    getAdList(this.searchParams).then(response => {
                        // config_sex
                        this.typeList = response.data.config_type
                        this.statusList = response.data.config_status
                        this.tableData = response.data.list
                        this.pagination = response.data.page
                        this.isCreate = response.data.is_create
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            search () {
                this.searchParams.search = 1
                this.searchParams.status = this.statusSelectedValue

                this.getList()

            },
            pageChange (page) {
                this.searchParams.page = page
                this.getList()
            }

        }
    }
</script>

<style lang="scss" scoped>
    .ad{

        box-sizing: border-box;
        padding: 40px 50px 50px;

        .ad-head{
            display: flex;
            justify-content: space-between;

            .ad-head-right{
                .type-select{
                    width: 120px;
                }

                .status-select{
                    width: 100px;
                }
            }
        }

        .table-container{
            text-align: center;
            margin-top: 35px;

            & /deep/ .table-column{
                /*font-size: 22px ;*/
                color: #2e2e2e;
            }

            & /deep/ .label-name{
                font-size: 22px;
                color: #2e2e2e;
            }


            .over{
                color: #989898;
            }

            .review{
                color: #ff1919;
            }
        }



        .pagination{
            text-align: center;
            margin-top: 20px;



        }


    }
</style>
