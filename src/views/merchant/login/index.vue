/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/2
* Time: 上午11:15
*/
<template>
    <div class="merchant-login">
        <div class="container">
            <div class="header">登录</div>
            <div class="content">
                <a href="javascript: void (0)" class="item"
                   v-for="(v, i) in clubs "
                   :key="i"
                    @click="select(v)">
                    {{v.club_name}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { loginSwithc } from "../../../api/merchant";

    export default {
        name: "merchantLogin",
        data(){
            return {
                clubs: this.$store.state.user.clubs,
                userInfo: this.$store.state.user.userInfo
            }
        },
        methods: {
            select (v) {
                this.userInfo['currentClub'] = v
                this.$store.dispatch('SwitchLogin', this.userInfo).then(() => {

                    this.$router.push({path: '/ad/serving'})

                }).catch(errors => {
                    console.log(errors)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .merchant-login{

        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;

        .container{
            width: 500px;
            border-radius: 6px;
            background-color: #fff;
            .header{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 80px;
                font-size: 28px;
                border-bottom: 1px solid #f5f5f5;
            }

            .content{
                max-height: 300px;
                overflow-y: scroll;
                .item{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 420px;
                    height: 60px;
                    border: 1px solid #1992e6;
                    border-radius: 6px;
                    font-size: 22px;
                    color: #1992e6;
                    margin: 20px auto;
                }
            }
        }
    }


</style>
