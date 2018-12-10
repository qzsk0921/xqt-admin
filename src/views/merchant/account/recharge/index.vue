/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/10/25
* Time: 下午8:05
*/
<template>
    <div class="account">
        <recharge
            :payOption="payTypeList"
            :rechargePriceOption="rechargePriceList">
        </recharge>
    </div>
</template>

<script>
    import recharge from '@/components/Recharge/index.vue'
    import {getPayInfo} from "../../../../api/common";

    export default {
        name: "account",
        components: {recharge},
        data () {
            return {
                payTypeList: [],
                rechargePriceList:[],
            }
        },
        created: function () {
            this.payInfo()
        },
        methods: {
            payInfo () {
                getPayInfo().then(res => {
                    if (res.result == 1) {
                        this.payTypeList = res.data.payment
                        this.rechargePriceList = res.data.goods

                    }
                }).catch(errors => {
                    console.log(errors)
                })
            }
        }
    }
</script>

<style scoped>

</style>
