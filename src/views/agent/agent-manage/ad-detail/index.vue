/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/2
* Time: 下午4:38
*/
/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/10/25
* Time: 下午3:26
*/
<template>
    <div class="ad-detail">
        <el-tabs
                class="header-tabs"
                v-model="activeName"
                @tab-click="handleClick">
            <el-tab-pane label="广告详情" name="ad-detail">
                <div class="detail">
                    <div class="total-view">
                        <div class="item">
                            <p class="title">投放金额</p>
                            <p class="count">{{detailData.money}}</p>
                        </div>
                        <div class="item">
                            <p class="title">剩余金额</p>
                            <p class="count">{{detailData.balance}}</p>
                        </div>
                        <div class="item">
                            <p class="title">总广告展示量</p>
                            <p class="count">{{detailData.show_time_total}}</p>
                        </div>
                        <div class="item">
                            <p class="title">今日广告展示量</p>
                            <p class="count">{{detailData.show_time_today}}</p>
                        </div>
                    </div>
                    <div class="labels">
                        <el-row class="group-item">
                            <div class="item">
                                <span class="label-span server-type">服务类型：</span><span class="label-val">{{detailData.type_name}}</span>
                            </div>
                            <div class="item">
                                <span class="label-span user-type">用户类型：</span><span class="label-val">男</span>
                            </div>
                        </el-row>
                        <el-row class="group-item">
                            <span class="label-span">推广地区：</span>
                            <el-tag v-for="(v, i) in detailData.area_list" :key="i">{{v.s_name}}</el-tag>
                        </el-row>
                        <el-row class="group-item">
                            <span class="label-span">已选标签：</span>
                            <el-tag v-for="(v, i) in detailData.tag_list" :key="i">{{v.tag_name}}</el-tag>
                        </el-row>
                    </div>

                    <el-table
                            class="detail-table"
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="day"
                                label="时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="金额"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="show_num"
                                label="广告展示量">
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            class="pagination"
                            :page-size="10"
                            :pager-count="11"
                            :page-count="parseInt(pageCount)"
                            layout="prev, pager, next">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="标签分析" name="label-detail">
                <div class="label">
                    <div class="left">
                        <el-row class="select">
                            <el-date-picker
                                    v-model="value6"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                            <el-button type="primary">查询</el-button>
                        </el-row>

                        <div id="label-pie" :style="{width: '700px', height: '700px'}"></div>
                    </div>
                    <div class="right">
                        <el-table
                                :data="tableData3"
                                width="100%"
                        >
                            <el-table-column
                                    prop="label"
                                    label="标签类型"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="count"
                                    label="展示数量"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="point"
                                    label="占比">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import { getAdInfo, getConsumptionInfo } from '@/api/merchant.js'

    export default {
        name: "Detail",
        data () {
            return {
                query: {},
                detailData: {},
                consumptionInfo: {
                    search: '',
                    ad_id: '',
                    page: 1
                },
                pageCount: 1,
                userType: '男',
                activeName: 'ad-detail',
                tableData: [],
                value6: '',
                tableData3: []
            }
        },
        created: function () {

            this.query = this.$route.query
            this.getDetail()
            this.getConsumptionInfoTable()
        },
        methods: {
            getDetail () {

                getAdInfo(this.query).then(res => {
                    this.detailData = res.data.detail
                }).catch(error => {
                    console.log(error)
                })

            },
            getConsumptionInfoTable () {
                this.consumptionInfo.id = this.query.id
                getConsumptionInfo(this.consumptionInfo).then(res => {
                    this.tableData = res.data.list
                    this.pageCount = res.data.page.page_count
                }).catch(errors => {
                    console.log(errors)
                })
            },
            handleClick(tab, event) {

                if (tab.name == 'label-detail' && tab.active ) {
                    this.drawLabelsPie()
                }

            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            drawLabelsPie() {
                let option = {
                    title : {
                        text: '广告展示量',
                        // subtext: '纯属虚构',
                        x:'center',
                        bottom: '20'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: '100',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '广告展示量',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                let eCharts = this.$echarts.init(document.getElementById('label-pie'))
                eCharts.setOption(option)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .ad-detail{
        box-sizing: border-box;


        .header-tabs{
            box-sizing: border-box;
            padding: 0 40px;
        }


        .detail{

            .total-view{
                display: flex;
                justify-content: space-around;
                align-items: center;

                .item{
                    text-align: center;
                    .title{
                        font-size: 30px;
                        color: #2e2e2e;
                        font-weight: bold;
                    }

                    .count{
                        font-size: 30px;
                        color: #1992e6;
                        margin-top: 50px;
                    }
                }

            }

            .labels{
                box-sizing: border-box;
                padding: 44px 64px 28px;

                .group-item{
                    $fontSize: 16px;
                    margin-bottom: 20px;
                    .item{
                        display: inline-block;
                    }

                    .label-span{
                        font-size: $fontSize;
                        color: #2e2e2e;
                    }

                    .label-val{
                        font-size: $fontSize;
                        color: #1992e6;
                    }

                    .user-type{
                        margin-left: 250px;
                    }

                }
            }

            .detail-table{
                box-sizing: border-box;
                padding: 0 60px;
            }
        }


        .label{
            box-sizing: border-box;
            justify-content: space-between;
            display: flex;

            .right{
                width: 100%;
            }

        }

        .pagination{
            margin: 50px 0;
            text-align: center;
        }


    }
</style>

