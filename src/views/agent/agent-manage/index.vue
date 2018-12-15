/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/1
* Time: 上午11:05
*/
<template>
    <div class="ad">
        <div class="ad-head">
            <el-button type="primary" @click="create">新建商家</el-button>
            <el-row class="ad-head-right">
                <el-input
                    placeholder="搜索商家名称、商家ID"
                    prefix-icon="el-icon-search"
                    v-model="searchValue">
                </el-input>
                <el-button type="primary" @click="search">查询</el-button>
            </el-row>
        </div>
        <el-row class="table-container">
            <el-table
                    :data="tableData"
                    @row-click="rowClick"
            >
                <el-table-column
                    prop="merchant_name"
                    label="名称"
                    height="54px"
                    class-name="table-column"
                    label-class-name="label-name"
                >
                </el-table-column>
                <el-table-column
                    prop="user_id"
                    label="合拍ID"
                    height="54px"
                    class-name="table-column"
                    label-class-name="label-name"
                >
                </el-table-column>
                <el-table-column
                    prop="status_name"
                    label="状态"
                    height="54px"
                    class-name="table-column"
                    label-class-name="label-name"
                >
                </el-table-column>
                <!-- <el-table-column
                    prop="status_name"
                    label="兴趣通服务"
                    height="54px"
                    class-name="table-column"
                    label-class-name="label-name"
                >
                    <template slot-scope="scope">
                        <span class="" v-if="scope.row.status === 1">{{scope.row.status_name}}</span>
                        <span class="review" v-else-if="scope.row.status === 2">{{scope.row.status_name}}</span>
                        <span class="" v-else-if="scope.row.status === 3">{{scope.row.status_name}}</span>
                        <span class="over" v-else="scope.row.status === 4">{{scope.row.status_name}}</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-row>
        <el-row class="pagination">
            <el-pagination
                :page-size="10"
                :pager-count="11"
                :page-count="parseInt(pagination.page_count)"
                layout="prev, pager, next"
                @current-change="pageChange">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import { getMerchantList } from '@/api/agent.js'
    import { pureNum } from "../../../utils/validate"

    export default {
        name: "Ad",
        data () {
            return{
                typeList: [],
                dateValue: [],
                statusList: [],
                searchValue: '',
                tableData: [],
                pagination: {},
                searchParams: {
                    'search': '',
                    'user_id': '',
                    'merchant_name': '',
                    'page': 1,
                    'per-page': 10

                }

            }
        },
        created: function () {
            this.getList()
        },
        methods: {
            rowClick (row) {
                // console.log(row)
                // if (row.status == 1) return false
                if (row.is_click === 0) return false
                this.$router.push({ name: 'agent-detail', query: { id: row.id}})
            },
            create () {
                this.$router.push({name: 'create', query: {id: 1}})
            },
            getList () {
                return new Promise((resolve, reject) => {
                    getMerchantList(this.searchParams).then(response => {
                        // this.typeList = response.data.config_type
                        this.statusList = response.data.config_status
                        this.tableData = response.data.list
                        this.pagination = response.data.page
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            search () {
                let val = this.searchValue
                if (pureNum(val)) {
                    this.searchParams.user_id = val
                    this.searchParams.merchant_name = ''
                } else {
                    this.searchParams.merchant_name = val
                    this.searchParams.user_id = ''
                }
                this.searchParams.search = 1
                this.getList()

            },
            pageChange () {
                this.searchParams.page = this.searchParams.page + 1
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
                display: flex;

                .el-input--prefix {
                    margin-right: 5px;
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
