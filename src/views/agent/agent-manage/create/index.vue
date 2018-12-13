/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/11/3
* Time: 下午2:36
*/
<template>
    <div class="agent-create-div">
        <div class="content">
            <el-form ref="formEl" :rules="rules" :model="form" label-position="right" label-width="100px">
                <div class="row">
                    <el-form-item label="合拍ID" prop="id">
                        <el-input v-model="form.id"  placeholder="请输入个人ID或商家ID" @blur="handleSearchAgent"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入商家名称" disabled></el-input>
                    </el-form-item>
                </div>

                <!-- <div class="row">
                    <el-form-item label="联系电话" prop="mobileNum">
                        <el-input v-model="form.mobileNum"  placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址" prop="address">
                        <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                </div>

                <div class="row">
                    <el-form-item label="业务联系人" prop="linkman">
                        <el-input v-model="form.linkman" placeholder="请输入业务联系人"></el-input>
                    </el-form-item>
                </div>

                <div class="row">
                    <el-form-item label="营业执照" prop="businessLicensePicPath">
                        <el-upload
                                class="avatar-uploader"
                                action="string"
                                :show-file-list="false"
                                :http-request="handleBusinessUpload"
                                >
                            <img v-if="form.businessLicensePicUrl" :src="form.businessLicensePicUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">注意：图片大小建议：750*220，格式为jpg/png/jepg，图片大小不可大于1M</div>
                        </el-upload>
                    </el-form-item>
                </div> -->
                <el-row class="commit-button"><el-button type="primary" @click="create('formEl')">完成</el-button></el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { uploadImage } from "../../../../api/common";
    import { createAgent, getClubInfo } from "@/api/agent";


    export default {
        name: "create",
        data () {
            return {
                form: {
                    id: '',
                    name: '',
                    // mobileNum: '',
                    // address: '',
                    // linkman: '',
                    // businessLicensePicUrl: '',
                    // businessLicensePicPath: '',
                },
                rules: {
                    id: [
                        { required: true, message: '请输入商家ID', trigger: 'blur' },
                    ],
                    name:[
                        { required: true, message: '请输入商家名称', trigger: 'blur' },
                    ],
                    // mobileNum:[
                    //     { required: true, message: '请输入联系电话', trigger: 'blur' },
                    // ],
                    // address: [
                    //     { required: true, message: '请输入联系地址', trigger: 'blur' },
                    // ],
                    // linkman: [
                    //     { required: true, message: '请输入业务联系人', trigger: 'blur' },
                    // ],
                    // businessLicensePicPath: [
                    //     { type: 'string', required: true, message: '请上传营业执照', trigger: 'blur' },
                    // ]
                }
            }
        },
        methods: {
            create(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = this.form
                        let params = {
                            user_id: formData.id,
                            // mobile: formData.mobileNum,
                            // linkman: formData.linkman,
                            // license: formData.businessLicensePicPath,
                            // merchant_address: formData.address,
                        }
                        createAgent(params).then(res => {
                            this.$message(res.msg)
                            this.$router.push({name: 'agent'})
                        }).catch(errors => {
                            console.log(errors)
                        })
                    } else {
                        // this.$message({
                        //     message: '有错误信息，请认真检查',
                        //     type: 'warning'
                        // })
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleSearchAgent () {

                getClubInfo({user_id: this.form.id, type: 1}).then(res => {
                    
                    if (res.result === 1) {
                        this.form.name = res.data.user_nickname
                    } else {
                        this.form.name = ''
                    }

                }).catch(error => {
                    console.log(error)
                })
            },
            handleBusinessUpload(file) {
                let _this = this
                this.upload({type: 2, image: file.file, group_name: 'license'},function (data) {
                    _this.form.businessLicensePicUrl = data.url
                    _this.form.businessLicensePicPath = data.file_path
                })
            },
            upload (params, call) {
                uploadImage(params).then(res => {
                    if (res.result == 1) {
                        call(res.data)
                    }
                    this.$message(res.msg)
                }).catch(erros => {
                    console.log(erros)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>


    .agent-create-div{
        .content{
            box-sizing: border-box;
            padding: 40px 54px;

            .row{
                display: flex;

                .el-form-item{
                    margin-right: 320px;
                }


                /deep/ .avatar-uploader .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                /deep/ .avatar-uploader .el-upload:hover {
                    border-color: #409EFF;
                }
                /deep/ .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }
                /deep/ .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }

            }

            .id-card-upload{
                /deep/ .el-form-item__content{
                    display: flex;

                    text-align: center;

                    .avatar-uploader{
                        margin-right: 85px !important;
                    }
                }
            }
        }

        .commit-button{
            display: flex;
            justify-content: center;
            margin-top: 108px;
        }
    }
</style>
