/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/15
* Time: 下午2:55
*/
<template>
    <div class="transfer">
        <el-row class="form-row">
            <el-form ref="form" :model="form" label-width="80px" label-position="left" >
                <el-form-item label="账户余额">
                    <span>{{amount}}</span>
                </el-form-item>
                <el-form-item label="转账账号">
                    <el-select
                            v-model="form.account"
                            @change="handleSelecteChange"
                            placeholder="请选择">
                        <el-option
                                v-for="item in form.accountList"
                                :key="item.id"
                                :label="item.merchant_name"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="转账金额">
                    <el-input class="recharge-price-input" placeholder="请输入充值金额" v-model="form.rechargePrice">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row class="commit-row">
            <el-button type="primary" @click="handleTransfer">确认转账</el-button>
            <p>充值过程中，如遇到未及时到账的情况，系统会自动核查，在充值当天入账，请及时关注</p>
        </el-row>
    </div>
</template>

<script>
    import { agentAmount, transfer, getMerchants} from "../../../../api/agent";

    export default {
        name: "transfer",
        data(){
            return {
                amount: 0.00,
                form:{
                    accountList: [],
                    merchantId: '',
                    account: '',
                    rechargePrice: '',
                }
            }
        },
        created: function () {
            this.handleGetAgentAmount()
            this.handleGetMerchants()
        },
        methods: {
            handleSelecteChange (val) {
                this.form.merchantId = val['id']
                this.form.account = val['merchant_name']
            },
            handleGetMerchants () {
                getMerchants().then(res => {
                    if (res.result == 1) {
                        this.form.accountList = res.data
                        this.form.merchantId = res.data[0]['id']
                        this.form.account = res.data[0]['merchant_name']
                    }
                }).catch(errors => {
                    console.log(errors)
                })
            },
            handleGetAgentAmount(){
                agentAmount().then(res => {

                    if (res.result == 1) this.amount = res.data.total_amount

                }).catch(errors => {
                    console.log(errors)
                })
            },
            handleTransfer() {
                if (this.form.merchantId == '' || this.form.account == '') {
                    alert('转账信息不正确，请检查');
                    return false
                } else {
                    transfer({
                        merchant_id: this.form.merchantId,
                        amount: this.form.rechargePrice
                    }).then(res => {
                        this.$message(res.msg)
                    }).catch(errors => {
                        console.log(errors)
                    })
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .transfer{
        box-sizing: border-box;
        padding: 60px 0 0 78px;

        .form-row{

            /deep/ .recharge-price-input{
                width: 210px;
            }

        }

        .commit-row{
            margin-top: 190px;
            text-align: center;

            p{
                font-size: 14px;
                color: #989898;
            }
        }
    }
</style>
