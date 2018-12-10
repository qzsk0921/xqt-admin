/**
* Created by PhpStorm.
* User: caoqs
* Date: 2018/10/26
* Time: 下午3:05
*/
<template>
    <div class="ad-create">
        <el-form :model="form" ref="form" label-width="80px">
            <el-form-item label="服务类型">
                <!-- <el-radio
                    @change="handleTargetTypeChange(v)"
                    v-model="form.type"
                    v-for="(v, i) in form.targetType"
                    :key="v.area_type"
                    :label="v.name">
                    {{v.name}}
                </el-radio> -->
                <el-cascader
                    placeholder="请选择:"
                    expand-trigger="hover"
                    :options="form.adOptions"
                    props.value="title"
                    label="title"
                    children="list"
                    change-on-select
                    @change="handleAreaTagsClose">
                </el-cascader>
            </el-form-item>
            <el-form-item label="用户性别">
                <el-checkbox :indeterminate="form.isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group class="checkbox-group-sex" v-model="form.checkedSex" @change="handleCheckedSexChange">
                    <el-checkbox v-for="sex in form.sex" :label="sex" :key="sex">{{sex}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="推广地区">
                <el-tag
                        v-if="form.areaTags.length != 0"
                        v-for="tag in form.areaTags"
                        :key="tag.area_name"
                        closable
                        :type="tag.area_id"
                        @close="handleAreaTagsClose(tag)"
                    >
                    {{tag.area_name}}
                </el-tag>
                <el-tag v-if="form.areaTags.length == 0" type="danger">未添加推广地区</el-tag>
            </el-form-item>
            <el-form-item>
                <el-cascader
                    placeholder="试试搜索：省市地区"
                    :options="form.options"
                    :show-all-levels="false"
                    filterable
                    change-on-select
                    @change="handleAreaCascaderChange"
                >
                </el-cascader>
                <el-button type="primary" @click="addAreaTag">添加</el-button>
            </el-form-item>

            <div class="tags-row">
                <el-form-item label="已选标签" :data-l="form.promotionTags.length">
                    <el-tag
                        v-if="form.promotionTags.length != 0"
                        v-for="tag in form.promotionTags"
                        :key="tag.tag_name"
                        closable
                        :type="tag.type"
                        @close="handlePromotionTagsTagClose(tag)"
                    >
                        {{tag.tag_name}}
                    </el-tag>
                    <el-tag v-if="form.promotionTags.length == 0" type="danger">未添已选标签</el-tag>
                </el-form-item>
                <el-form-item label="可选标签" class="promotion-checkbox">
                    <el-checkbox-group v-model="form.promotionTags" >
                        <el-checkbox
                                :label="v"
                                border v-for="(v, i) in promotionCheckList"
                                :key="i">
                            {{v.tag_name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div class="ad-edit-div">
                    <el-form-item label="价格内容" >
                        <div class="ad-txt-div">
                            <div class="left">
                                <div class="ad-info-div">
                                    <el-row class="price-header">
                                        <div class="item">广告类型</div>
                                        <div class="item">类型描述</div>
                                        <div class="item">价格描述</div>
                                    </el-row>
                                    <el-checkbox-group  v-model="adTypeCheckList" @change="handleAdTypeChange">
                                        <el-row class="radio-div">
                                            <el-checkbox label="1">
                                                <el-row class="price-header">
                                                    <div class="item">原生广告</div>
                                                    <div class="item">固定信息</div>
                                                    <div class="item">0.5元/次</div>
                                                </el-row>
                                            </el-checkbox>
                                        </el-row>
                                        <el-row class="radio-div">
                                            <el-checkbox label="2">
                                                <el-row class="price-header">
                                                    <div class="item">原生广告</div>
                                                    <div class="item">自定义图文</div>
                                                    <div class="item">1元/次</div>
                                                </el-row>
                                            </el-checkbox>

                                        </el-row>
                                    </el-checkbox-group>

                                </div>
                                <div class="ad-post-div" v-if="picTxtAdShow">
                                    <el-form-item label="广告文案:" class="ad-dddd">
                                        <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入内容"
                                                v-model="form['adPriceList'][2]['ad_content']">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="广告封面:">
                                        <el-upload
                                                class="avatar-uploader"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :show-file-list="false"
                                                :http-request="handleAdPostUpload">
                                            <img v-if="form.postImageUrl" :src="form.postImageUrl" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            <div slot="tip" class="el-upload__tip">注意：图片大小建议：750*220，格式为jpg/png/jepg，图片大小不可大于1M</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="right" v-if="(adTypeCheckList.length != 0 ? true : false)">
                                <img class="preview-img" :src="adPreviewImgUrl"  alt="">
                            </div>
                        </div>

                    </el-form-item>

            </div>
        </el-form>
        <el-row class="footer"><el-button type="primary" @click="onSubmit('form')">下一步</el-button></el-row>
    </div>
</template>

<script>
    import address from '../../../../../../static/area/address'
    import { uploadImage } from "../../../../../api/common";
    import { getClubTags, createAd, getSttId, getTargetType, getCityBlock, getAdType } from "../../../../../api/merchant";

    const sexOptions = ['男', '女'];
    export default {
        name: "Create",
        data () {
            return {
                // targetType: this.$store.state.user.currentClub.target_type,
                // targetId: this.$store.state.user.currentClub.target_id,
                picTxtAdShow: false,
                areaTagsCache: {},
                adTypeCheckList: [],
                promotionCheckList:[],
                adPreviewImgUrl: '',
                areaType: '',
                form: {
                    name: '',
                    type: '1',
                    checkAll: false,
                    checkedSex: ['男'],
                    adOptions: [], //广告服务类型
                    options: [],//address,
                    sex: sexOptions,
                    isIndeterminate: true,
                    targetType: [],         // 服务类型
                    areaTags: [],           // 推广地区
                    promotionTags: [],   // 推广标签
                    content: '',
                    postImageUrl: '',
                    adPriceList: {
                        1: {
                            "type": 1,
                            "ad_price": "0.5",
                            "ad_pic": "",
                            "ad_content": ""
                        },
                        2: {
                            "type": 2,
                            "ad_price": "1",
                            "ad_pic": "",
                            "ad_content": ""
                        },

                    }
                },
                sttIdParent: {   ///  53:兴趣通俱乐部,54:兴趣通兴趣班
                    1: 53,
                    2: 54,
                },
                adPreviewImg:{
                    1: '../../../../../../static/image/pic_xqt_gg_5mshili@3x.png',
                    2: '../../../../../../static/image/pic_xqt_gg_1yshili@3x.png',
                },
            }
        },
        created: function () {
            this.handleGetTargetType()
            this.handleGetCityBlock()
            this.handleGetAdType() //获取广告服务
            this.getSttIdMehtod()
            console.log(this.form.areaTags.length)
        },
        methods: {
            handleTargetTypeChange(v){
                this.form.type = v.name
                this.areaType = v.area_type
                this.handleGetCityBlock();
            },
            handleGetCityBlock () {
                getCityBlock({target_id: this.targetId, target_type: this.targetType})
                    .then(res => {
                        if (res.result == 1) {
                            let options = {
                                    "value": res.data.type[0].area_id,
                                    "label": res.data.type[0].area_name,
                                    "children":[]
                                }

                            res.data.type[0].children.forEach( (v, i) => {
                                options.children = options.children.concat({"label": v.district_name, "value": v.district_id})
                            })
                            this.form.options.push(options)
                        }
                    }).catch(errors => {
                        console.log(errors)
                    })
            },
            handleGetAdType () {
                getAdType().then(res => {
                    console.log(res)
                    if (res.result == 1) {
                        this.form.adOptions = res.data
                        // this.form.adOptions.push(res.data)
                    }
                })
            },
            handleGetTargetType () {
                getTargetType({target_id: this.targetId, target_type: this.targetType}).then(res => {
                    if (res.result == 1) {
                        this.form.targetType = res.data
                        this.form.type = res['data'][0]['name']
                        this.areaType = res['data'][0]['area_type']
                    }
                }).catch(errors => {
                    console.log(errors)
                })
            },
            getTargetTemplage (sttId) {
                getClubTags({
                    target_id: this.targetId,
                    target_type: this.targetType
                }).then(res => {
                    if (res.result == 1) {
                        let d = []
                        res.data.type.forEach((v, i) => {
                             d = d.concat(v.data)
                        })
                        this.promotionCheckList = d
                    }
                }).catch(errors => {
                    console.log(errors)
                })
            },
            getSttIdMehtod () {
                getSttId({target_id: this.targetId, target_type: this.targetType}).then(res => {
                    if (res.result == 1) this.getTargetTemplage(res.data.stt_id)
                }).catch(errors => {
                    this.$message({
                        type: 'error',
                        message: errors
                    })
                })
            },
            handleAdTypeChange (item) {
                item.forEach((val, i) => {
                    this.adPreviewImgUrl = this.adPreviewImg[val]
                    this.picTxtAdShow = (item.indexOf('2') != -1  ? true : false)
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let formData = this.form,
                            adList = [],
                            sex = '';

                        this.adTypeCheckList.forEach((v, i) => {
                            adList.push(this.form.adPriceList[v])
                        })

                        if (formData.checkedSex.length > 1) {
                            sex = 3
                        } else {
                            sex = (formData.checkedSex[0] == '男' ? 1 : 2)
                        }

                        if (sex == '') {
                            this.$message({type: 'warning', message: '用户性别不能为空'})
                            return false
                        }  else if (formData.areaTags .length == 0) {
                            this.$message({type: 'warning', message: '推广地区不能为空'})
                            return false
                        } else if (formData.promotionTags.length == 0) {
                            this.$message({type: 'warning', message: '已选标签不能为空'})
                            return false
                        } else if (adList.length == 0) {
                            this.$message({type: 'warning', message: '请至少选择一种广告类型'})
                            return false
                        }

                        let params = {
                            "target_id": this.targetId,
                            "target_type": this.targetType,
                            "sex": sex,
                            "tag_list": JSON.stringify(formData.promotionTags),
                            "area_list": this.formatAreaList(this.areaType, formData.areaTags),
                            "ad_price_list": JSON.stringify(adList)
                        }

                        createAd(params).then(res => {
                            this.$message(res.msg)
                            this.$router.push({name: 'set-price', query:{sn: res.data.sn}})
                        }).catch(errors => {
                            console.log(errors)
                        })
                        return false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            formatAreaList: function (areaType = 2, areaTagsList) {
                let res = []
                switch (areaType) {
                    case 1:
                        res =  areaTagsList;
                        break;
                    case 2:
                        res = areaTagsList.map((v) => {
                            return {district_name: v.area_name, district_id: v.area_id}
                        })
                    break;
                    default:
                        break;
                }
                return JSON.stringify(res)
            },
            handleCheckAllChange(val) {
                this.form.checkedSex = val ? sexOptions : [];
                this.form.isIndeterminate = false;
            },
            handleCheckedSexChange(value) {
                let checkedCount = value.length;
                this.form.checkAll = checkedCount === this.form.sex.length;
                this.form.isIndeterminate = checkedCount > 0 && checkedCount < this.form.sex.length;
            },
            handleAdPostUpload(file) {
                let _this = this
                this.upload({type: 1, image: file.file},function (data) {
                    _this.form.adPriceList[2]['ad_pic'] = data.file_path
                    _this.form.postImageUrl = data.url
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
            },
            handleAreaCascaderChange(val){
                let res = this.getCascaderObj(val, this.form.options),//this.getCascaderObj(val, address),
                    length = res.length;
                this.areaTagsCache =  {area_name: res[length - 1]['label'], area_id: res[length - 1]['value']}
            },
            addAreaTag () {
                let arr = this.form.areaTags.map((v) => {
                    return v.area_id
                })
                switch (arr.indexOf(this.areaTagsCache.area_id)) {
                    case -1:
                        this.form.areaTags.push(this.areaTagsCache)
                        break;
                    default:
                        this.$message({type: 'warning', message: '不能重复添加哦'})
                        break;
                }
            },
            handlePromotionTagsTagClose (tag) {
                this.delTagsIndex(this.form.promotionTags, tag, (i) => {
                    this.form.promotionTags.splice(i, 1)
                })
            },
            handleAreaTagsClose(tag){
                this.delTagsIndex(this.form.areaTags, tag, (i) => {
                    this.form.areaTags.splice(i, 1)
                })
            },
            delTagsIndex (tagArray, tag, call) {
               return tagArray.filter((v, i) => {
                    if (v == tag) {
                        call(i)
                    }
                })
            },
            getCascaderObj(val,opt) {
                return val.map(function (value, index, array) {
                    for (var itm of opt) {
                        if (itm.value == value) {
                            opt = itm.children; return itm;
                        }

                    }
                    return null;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .ad-create{
        box-sizing: border-box;
        padding: 44px 60px 110px;


        .ad-name-input{
            width: 500px;
        }

        .el-tag{
            margin-right: 10px;
        }

        .tags-row{
            /*display: flex;*/
            /*justify-content: space-between;*/

            .tags-input{
                width: 270px;
            }
        }

        /deep/ .checkbox-group-sex{
            display: inline-block;
            margin-left: 30px;
        }

        .ad-post-div{
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


        .ad-edit-div{


            .preview-img{
                width:400px;
                height:628px;
                margin-right: 200px;
            }

            .ad-txt-div{
                display: flex;
                justify-content: space-between;
            }

            .left{
                width: 780px;;

            }

            .ad-info-div{
                display: flex;
                flex-wrap: wrap ;
                justify-content: flex-end;
            }

            .price-header{
                display: flex;
                align-items: center;
                width: 780px;
                height: 80px;
                border: 1px solid #1992e6;
                border-radius: 6px;



                &>.item{
                    text-align: center;
                    &:nth-of-type(1),&:nth-of-type(2){
                        width: 195px;
                    }

                    &:nth-of-type(3){
                        width: 398px;
                    }
                }
            }

            .radio-div:nth-of-type(2){
                margin-bottom: 20px;
            }

            /deep/ .el-radio{
                display: flex;
                align-items: center;
            }

            .radio-div{
                display: flex;
            }

            .ad-dddd{
                margin-bottom: 20px;
            }
        }

        .footer{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 50px 0;
        }


    }
</style>
