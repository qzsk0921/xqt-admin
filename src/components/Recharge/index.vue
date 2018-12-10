/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/8
* Time: 下午3:57
*/
<template>
    <div class="recharge">
        <el-row class="form-row">
            <el-form ref="form" :model="form" label-width="80px" label-position="left" >
                <el-form-item label="充值金额">

                    <el-select placeholder="请选择"
                           v-model="form.rechargePrice"
                           @change="handleSelectChange">
                        <el-option
                            v-for="item in form.rechargePriceList"
                            :key="item.product_id"
                            :label="item.product_price"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="充值金额">-->
                    <!--<el-input class="recharge-price-input" placeholder="请输入充值金额" v-model="form.rechargePrice">-->
                        <!--<template slot="append">元</template>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="支付方式">
                    <el-radio-group v-model="form.payType">
                        <el-radio-button v-for="payType in form.payTypeList" :label="payType.type" :key="payType.type">{{payType.title}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row class="commit-row">
            <el-button type="primary" @click="handleRecharge">确认支付</el-button>
            <p>充值过程中，如遇到未及时到账的情况，系统会自动核查，在充值当天入账，请及时关注</p>
        </el-row>
        <el-dialog
                title="使用微信扫描二维码进行支付"
                :visible.sync="wechatPayDialog"
                width="50%"
                center>
            <img class="wechat-pay-qr-code" :src="wechatPayQrCode" alt="">
            <span slot="footer" class="dialog-footer">
                <el-button @click="wechatPayDialog = false">取 消</el-button>
                <el-button type="primary" @click="wechatPayDialog = false">完成支付</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { recharge } from "../../api/common";

    export default {
        name: "recharge",
        props: ['payOption', 'rechargePriceOption'],
        data(){
            return {
                form:{
                    payTypeList: [],
                    payType: '',
                    rechargePriceList: [],
                    rechargePrice:'',
                    selectedPrice: [],
                },
                wechatPayQrCode: '',
                wechatPayDialog: false
            }
        },
        watch: {
            payOption: function (val, oldVal) {
                if (val.length != 0) {
                    this.form.payTypeList = val
                    this.form.payType = val[0]['type']
                }
            },
            rechargePriceOption: function (val, oldVal) {
                if (val.length != 0) {
                    this.form.rechargePriceList = val
                    this.form.selectedPrice = val[0]
                    this.form.rechargePrice = val[0]['product_price']

                }
            }
        },
        methods: {
            handleSelectChange (val) {
                this.form.selectedPrice = val
                this.form.rechargePrice = val.product_price
            },
            handleRecharge () {
                let payType = this.form.payType,
                    rechargePrice = this.form.selectedPrice
                if (payType == '' || rechargePrice == '') {
                    this.$message({
                        type:'errors',
                        message: '充值信息出错，请检查'
                    })
                    return false;
                }
                let params = {
                    pay_type: payType,
                    ...rechargePrice,
                }

                recharge(params).then(res => {

                    if (res.result == 1) {
                        let info = res.data.info
                        switch (res.data.is_qrcode) {
                            case 0:
                                location.href = info;
                                break;
                            default:
                                this.wechatPayQrCode = info
                                this.wechatPayDialog = true
                                break;
                        }
                    }

                }).catch(errors => {
                    console.log(errors)
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    .recharge{
        box-sizing: border-box;
        padding: 60px 0 0 78px;

        .form-row{

            /deep/ .recharge-price-input{
                width: 210px;
            }

        }

        /deep/ .el-dialog__body{
            text-align: center;
            padding: 0;
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
