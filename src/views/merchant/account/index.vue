/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/9
* Time: 上午9:25
*/
<template>
    <div class="account">
        <el-row class="overage-row">
            <el-row class="overage-txt-row">
                <span class="overage-txt">账户余额</span><el-button type="primary" size="mini" @click="recharge">充值</el-button><el-button type="primary" size="mini" @click="transfer">转账</el-button>
            </el-row>
            <el-row><span class="overage">{{totalAmount}}</span></el-row>
        </el-row>
        <el-row class="transaction-details-row">
            <el-row class="table-title">交易明细</el-row>
            <el-table
                    :data="listData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="amount"
                        label="交易金额">
                </el-table-column>
                <el-table-column
                        prop="trade_type"
                        label="交易类型">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="交易时间">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="pagination-row">
            <el-pagination
                    :page-size="10"
                    :pager-count="11"
                    :page-count="pagination.pageCount"
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next">

            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import { merchantLog, merchantAmount } from "../../../api/merchant";

    export default {
        name: "account",
        data () {
            return {
                totalAmount: '0.00',
                pagination: {},
                listData: [],
                currentPage: 1,
            }
        },
        created: function (){
            this.handleAgentAmount()
            this.handleAgentLog()
        },
        methods: {
            handleCurrentChange (val) {
                this.currentPage = val
                this.handleAgentLog()
            },
            handleAgentAmount() {
                merchantAmount().then(res => {
                    if (res.result == 1) this.totalAmount = res.data.total_amount
                }).catch(errors => {
                    console.log(errors)
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success–row';
                }
                return '';
            },
            recharge () {
                this.$router.push({name: 'recharge'})
            },
            transfer () {
                this.$router.push({name: 'transfer'})
            },
            handleAgentLog () {
                merchantLog({page: this.currentPage}).then(res => {
                    if (res.result == 1) {
                        this.listData = res.data.list
                        this.pagination = res.data.pagination
                    }
                }).catch(errors => {
                    console.log(errors)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .account{
        box-sizing: border-box;
        padding: 0 60px 40px;

        /deep/ .el-table .warning-row {
            background: oldlace;
        }

        /deep/ .el-table .success-row {
            background: #f0f9eb;
        }

        .overage-row{
            height: 168px;
            border-bottom: 1px solid #f5f5f5;

            .el-row{
                display: flex;
                align-items: center;
            }

            .overage-txt-row{
                margin: 38px 0 30px;
                .overage-txt{
                    font-size: 30px;
                    color: #2e2e2e;
                    margin-right: 40px;
                }
            }


            .overage{
                font-size: 30px;
                color: #1992e6;
            }

        }


        .transaction-details-row{
            .table-title{
                display: flex;
                align-items: center;
                height: 120px;
                font-size: 22px;
                color: #2e2e2e;
                border-bottom: 1px solid #f5f5f5;

            }
        }


        .pagination-row{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 45px;
        }

    }
</style>
