/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/2
* Time: 下午6:04
*/
<template>
    <div class="termination-div">
        <el-form ref="form" :model="form" label-position="left" label-width="85px">
            <div class="search-row">
                <el-form-item label="商户ID">
                    <el-input v-model="form.id" placeholder="请输入俱乐部ID/兴趣班ID" class="termination-input" @blur="handleSearchAgent"></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                    <el-input :disabled="true" placeholder="商家名称" v-model="form.name">{{form.name}}</el-input>
                </el-form-item>
            </div>
            <el-row class="content-div">
                <el-form-item label="解绑原因">
                    <el-input
                            class="content-textarea"
                            type="textarea"
                            :rows="15"
                            placeholder="请输入解绑内容"
                            v-model="form.content">
                    </el-input>
                </el-form-item>
            </el-row>
            <el-row class="submit-row">
                <el-button type="primary" @click="unbind">提交申请</el-button>
            </el-row>

        </el-form>
    </div>
</template>

<script>
    import {agentUnbind, getClubByAgent, getClubInfo} from "../../../../api/agent";

    export default {
        name: "termination",
        data(){
            return {
                terminationID: 0,
                form: {
                    name: '',
                    id: '',
                    content: ''
                }
            }
        },
        created: function (){

        },
        methods: {
            handleSearchAgent () {
                // getClubByAgent({user_id: this.form.id}).then(res => {
                //     if (res.result == 1) {
                //         this.form.name = res.data.name
                //     }

                //     this.$message(res.msg)
                // }).catch(error => {
                //     console.log(error)
                // })
                getClubInfo({user_id: this.form.id, type: 2}).then(res => {
                    
                    if (res.result === 1) {
                        this.form.name = res.data.user_nickname
                    } else {
                        this.form.name = ''
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            unbind () {
                if (this.terminationID == this.form.id) {
                    this.$message({
                        message: '您已提交解绑申请，请勿重复提交',
                        type: 'warning'
                    });
                    return false;
                } else {
                    agentUnbind({user_id: this.form.id, unbind_text: this.form.content, type: 2}).then(res => {
                        if(res.result == 1) {
                            this.terminationID = this.form.id
                            this.$alert(res.msg, '提示', {
                                confirmButtonText: '我知道了'
                            });
                        }
                    }).catch(erros => {
                        console.log(erros)
                    })
                }

            }
        }

    }
</script>

<style lang="scss" scoped>

    .termination-div{
        box-sizing: border-box;
        padding: 30px 50px;
        .search-row{
            display: flex;
            .termination-input{
                width: 400px;
                margin-right: 300px;
            }
        }

        .content-textarea{
            /*width: 900px;*/
        }

        .submit-row{
            display: flex;
            justify-content: center;
            margin-top: 180px;
        }

    }



</style>
