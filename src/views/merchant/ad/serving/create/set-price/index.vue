/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/9
* Time: 下午2:47
*/
<template>
    <div class="set-price">
        <el-row class="account-balance-row">
            <span class="account-balance-txt">账户余额 :</span><span class="account-balance">{{totalAmount}}</span><el-button type="primary" size="mini" @click="recharge">充值</el-button>
        </el-row>
        <el-row class="price-of-delivery">
            <!--<span class="price-of-delivery-txt">投放金额： </span> <el-input class="price-of-delivery-input" type="text" placeholder="请输入100以上的整数" v-model="priceOfDeliver"></el-input>-->
            <span class="price-of-delivery-txt">投放金额： </span>
            <el-select v-model="priceOfDeliver" placeholder="请选择">
                <el-option
                    v-for="item in priseOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
        </el-row>
        <el-row class="commit-row"><el-button type="primary" @click="handleCommit">完成</el-button></el-row>
    </div>
</template>

<script>
    import {merchantAmount, adPay} from "../../../../../../api/merchant";

    export default {
        name: "setPrice",
        data() {
            return {
                sn: this.$route.query.sn,
                priceOfDeliver: '',
                totalAmount: 0.00,
                priseOptions: [100, 200, 300, 1000, 2000, 5000, 100000],
                priceOfDeliver: ''
            }
        },
        created: function () {
          this.getMerchantAmount()
        },
        methods: {
            recharge () {
                this.$router.push({name: 'recharge'})
            },
            getMerchantAmount () {
                merchantAmount().then(res => {
                    if (res.result == 1) this.totalAmount = res.data.total_amount
                }).catch(errors => {
                    console.log(errors)
                })
            },
            handleCommit() {
                if (this.totalAmount <  this.priceOfDeliver || this.totalAmount == 0) {
                    this.$message({
                        type: 'error',
                        message: '余额不足，无法创建广告，请充值'
                    })
                    return false
                } else {
                    adPay({
                        amount: this.priceOfDeliver,
                        sn: this.sn
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                        this.$router.push({name: 'serving'})
                    }).catch(errors => {
                        console.log(errors)
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .set-price{
        box-sizing: border-box;
        padding: 60px 78px;

        .account-balance-row{
            display: flex;
            align-items: center;
            font-size: 22px;
            color: #2e2e2e;

            .account-balance-txt{
                margin-right: 18px;
            }

            .account-balance{
                margin-right: 40px;
            }
        }


        .price-of-delivery{
            display: flex;
            align-items: center;
            margin-top: 40px;

            .price-of-delivery-txt{
                font-size: 22px;
                color: #2e2e2e;
            }

            .price-of-delivery-input{
                width: 400px;
            }
        }

        .commit-row{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 190px;
        }
    }
</style>
