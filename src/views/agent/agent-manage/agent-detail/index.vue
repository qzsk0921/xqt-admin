/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/1
* Time: 下午1:53
*/
<template>
    <div class="ad-management">
        <div class="overview-div">
            <div class="left">
                <div class="item">
                    <p>总投放量</p>
                    <p>{{overViewData.total_ad}}</p>
                </div>
                <div class="item">
                    <p><span>投放中</span><span>{{overViewData.running_num}}</span></p>
                    <p><span>未通过</span><span>{{overViewData.fail_num}}</span></p>
                </div>
                <div class="item">
                    <p><span>待审核</span><span>{{overViewData.pending_num}}</span></p>
                    <p><span>已结束</span><span>{{overViewData.end_num}}</span></p>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <p>总展示量次数</p>
                    <p>{{overViewData.show_time_total}}</p>
                </div>
                <div class="item">
                    <p>今日展示次数</p>
                    <p>{{overViewData.show_time_today}}</p>
                </div>
            </div>
        </div><!--value-format="timestamp"-->
        <div class="chart-div">
            <el-row class="chart-search-row">
                <el-date-picker
                        v-model="chartSearchDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
                <el-button type="primary" @click="lineChartSearch">查询</el-button>
            </el-row>
            <div id="line-chart" :style="{width: '100%', height: '416px'}"></div>
        </div>
        <div class="tables-div">
            <el-row class="chart-search-row">
                <el-date-picker
                        v-model="tableSearchDate"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" @click="tableSearch">查询</el-button>
            </el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="day"
                        label="时间"
                >
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="金钱"
                >
                </el-table-column>
                <el-table-column
                        prop="show_num"
                        label="广告展示量"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                    class="pagination"
                    :page-size="10"
                    :pager-count="11"
                    :page-count="paginationTotal"
                    layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { getConsumptionInfo } from '@/api/merchant.js'
    import { getAgentInfo, adShow } from "../../../../api/agent";

    export default {
        name: "index",
        data: function () {
            return {
                overViewData: '',
                chartSearchDate: '',
                tableSearchDate: '',
                paginationTotal: 1,
                lineChartData: '',
                tableData: [],
                consumptionSearch: {
                    search: '',
                    merchant_id: this.$route.query.id,
                    begin_create_time: '',
                    end_create_time: '',
                    page: 1
                }
            }
        },
        created: function () {

            getAgentInfo({merchant_id: this.$route.query.id}).then(res => {
                this.overViewData = res.data
            }).catch(error => {
                console.log(error)
            })

            this.getLineChart(this.consumptionSearch)

            this.getConsumption(this.consumptionSearch)

        },
        mounted: function () {


        },
        methods: {
            drawLineChart() {
                let seriesArry = []
                this.lineChartData.series.forEach((v, i) => {
                    let datta = {
                        name: v.name,
                        data: v.data,
                        type: 'line',
                        smooth: true
                    }

                    seriesArry.push(datta)

                })


                let option = {
                    legend: {
                        data: this.lineChartData.legend
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.lineChartData.xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: seriesArry
                };


                let eCharts = this.$echarts.init(document.getElementById('line-chart'))

                eCharts.setOption(option)
            },
            getConsumption (consumptionSearch) {
                getConsumptionInfo(consumptionSearch).then(res => {
                    this.tableData = res.data.list
                }).catch(error => {
                    console.log(error)
                })
            },
            lineChartSearch () {
                this.getLineChart({
                    search: 1,
                    begin_create_time: this.chartSearchDate,
                    // end_create_time: this.chartSearchDate[1],
                    merchant_id: this.$route.query.id

                })
            },
            tableSearch() {
                this.consumptionSearch.search = 1
                this.consumptionSearch.begin_create_time = this.tableSearchDate[0]
                this.consumptionSearch.end_create_time = this.tableSearchDate[1]

                console.log(this.consumptionSearch)
                this.getConsumption(this.consumptionSearch)
            },
            getLineChart (params) {
                adShow(params).then(res => {
                    this.lineChartData = res.data
                    this.drawLineChart()
                }).catch(errors => {
                    console.log(errors)
                })
            }
        },

    }
</script>

<style lang="scss" scoped>


    .ad-management{
        background-color: #f7f7f7;

        .overview-div{
            display: flex;
            height: 260px;
            background-color: #fff;

            .left,.right{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 50%;
                height: 100%;

            }

            .t{
                text-align: center;
                &>p:nth-of-type(1){
                    font-size: 30px;
                    color: #2e2e2e;
                    font-weight: bold;
                }

                &>p:nth-of-type(2){
                    font-size: 30px;
                    color: #1992e6;
                    font-weight: bold;
                    margin-top: 48px;
                }

            }

            .sbt{

                p{
                    font-size: 22px;
                    color: #2e2e2e;
                    margin-bottom: 30px;

                    span{
                        margin-left: 50px;
                    }
                }


            }

            .left{
                .item{
                    &:nth-of-type(1){
                        @extend .t;
                    }

                    &:not(:nth-of-type(1)){
                        @extend .sbt;
                    }
                }

            }

            .right{
                .item{
                    @extend .t;
                }

            }

        }

        .chart-search-row{
            margin-bottom: 40px;
        }

        .chart-div{
            box-sizing: border-box;
            padding: 50px 44px;
            background-color: #fff;
            margin-top: 20px;
        }

        .tables-div{
            box-sizing: border-box;
            padding: 50px 60px;
            margin-top: 20px;
            background-color: #fff;

            .pagination{
                text-align: center;
                margin-top: 50px;
            }
        }

    }



</style>
