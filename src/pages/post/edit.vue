<template>
    <a-card :bordered="false">
        <div class="authority-box">
            <a-form-model 
            ref="form" :model="form" :rules="form.rules">
                
                <a-row :gutter="[40,0]">
                    <a-col :span="12">
                        <a-form-model-item 
                            label="标题"
                            ref="title" 
                            prop="title">
                            <a-input
                                size="large"
                                placeholder="请输入标题"
                                v-model="form.title"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                         <a-form-model-item 
                            label="作者编号"
                            ref="userId" 
                            prop="userId">
                             <a-input-number
                                size="large" 
                                v-model="form.userId"
                                placeholder="请输入作者ID"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[40,0]">
                    <a-col :span="12">
                        <a-form-model-item label="标签" ref="tags" prop="tags">
                            <a-select v-model="form.tags" 
                                :maxTagCount="5" 
                                style="width: 100%;"
                                size="large"
                                placeholder="请设置标签" mode="tags" :token-separators="[',']">
                                <a-select-option v-for="(item,index) in tagList" :key="index" :value="`${item.title}`">
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item 
                            label="是否置顶"
                            ref="isTop" 
                            prop="isTop">
                            <a-select
                                v-model="form.isTop" 
                                size="large" 
                                placeholder="请选择是否置顶">
                                    <a-select-option  :value="1">
                                        否
                                    </a-select-option>
                                    <a-select-option  :value="2">
                                        是
                                    </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[40,0]">
                    <a-col :span="12">
                        <a-form-model-item 
                            label="分类"
                            ref="categoryId" 
                            prop="categoryId">
                            <a-tree-select 
                                v-model="form.categoryId"
                                :tree-data="categoryList"
                                size="large" 
                                placeholder="请设置分类"
                                tree-default-expand-all
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item 
                            label="所属版块"
                            ref="forumId" 
                            prop="forumId">
                            <a-select
                                v-model="form.forumId" 
                                size="large" 
                                placeholder="请选择所属版块">
                                    <a-select-option v-for="(item,index) in forumList" :key="index" :value="item.id">
                                        {{item.title}}
                                    </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[40,0]">
                    <a-col :span="6">
                        <a-form-model-item 
                            label="热度"
                            ref="hots" 
                            prop="hots">
                            <a-input-number
                                size="large" 
                                v-model="form.hots"
                                placeholder="请设置热度"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                       <a-form-model-item 
                            label="收藏数"
                            ref="favorites" 
                            prop="favorites">
                            <a-input-number
                                size="large" 
                                v-model="form.favorites"
                                placeholder="请设置收藏数"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                       <a-form-model-item 
                            label="点赞数"
                            ref="likes" 
                            prop="likes">
                            <a-input-number
                                size="large" 
                                v-model="form.likes"
                                placeholder="请设置收藏数"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                       <a-form-model-item 
                            label="浏览数"
                            ref="views" 
                            prop="views">
                            <a-input-number
                                size="large" 
                                v-model="form.views"
                                placeholder="请设置浏览数"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item 
                    label="封面"
                    ref="cover" 
                    prop="cover">
                    <div class="upload-icon">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请上传封面"
                            v-model="form.cover"
                        />
                        <a-button 
                        @click="uploadCover" 
                        v-action="'/media/upload'" 
                        class="form-button"  size="large" type="primary" style="margin-left: 10px;">
                            上传
                        </a-button>
                    </div>
                </a-form-model-item>
               
                <a-form-model-item>
                    <TinyMceEditor @writeContent="writeContent"   
                    :valueContont="form.content"/>
                </a-form-model-item>


                <a-form-model-item 
                    label="是否设置资源"
                    ref="setResource" 
                    prop="setResource">
                    <a-radio-group size="large" 
                    v-model="form.setResource" button-style="solid">
                        <a-radio-button :value="1">
                            不设置资源
                        </a-radio-button>
                        <a-radio-button :value="2">
                            设置资源
                        </a-radio-button>
                    </a-radio-group> 
                </a-form-model-item>


                <div class="create-hide" v-if="form.setResource == 2">
                    <a-form-model 
                        ref="resourceform"
                        :model="resourceform" 
                        :rules="resourceform.rules">

                        <!-- 标题-例子 -->
                        <a-row :gutter="[40,0]">
                            <a-col :span="12">
                                <a-form-model-item 
                                    label="标题"
                                    ref="title" 
                                    prop="title">
                                    <a-input
                                        size="large"
                                        placeholder="请输入标题"
                                        v-model="resourceform.title"
                                    />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                    <a-form-model-item 
                                        label="演示例子"
                                        ref="example" 
                                        prop="example">
                                        <a-input
                                            size="large"
                                            placeholder="请输入标题"
                                            v-model="form.example"
                                        />
                                    </a-form-model-item>
                            </a-col>
                        </a-row>

                        <!-- 权限 -->
                        <a-form-model-item 
                            label="资源权限"
                            ref="mode" 
                            prop="mode">
                            <a-radio-group size="large" 
                            v-model="resourceform.mode" button-style="solid">
                                <a-radio-button :value="1">
                                    登录后可看
                                </a-radio-button>
                                <a-radio-button :value="2">
                                    评论后可看
                                </a-radio-button>
                                <a-radio-button :value="3">
                                    按等级查看
                                </a-radio-button>
                                <a-radio-button :value="4">
                                    积分兑换查看
                                </a-radio-button>
                                <a-radio-button :value="5">
                                    付费购买查看
                                </a-radio-button>
                            </a-radio-group>      
                        </a-form-model-item>

                        <!-- 积分查看输入积分 -->
                        <a-form-model-item 
                            v-if="resourceform.mode == 4"
                            label="请输入积分"
                            ref="integral" 
                            prop="integral">
                            <a-input-number
                                size="large" 
                                v-model="resourceform.integral"
                                placeholder="请输入积分"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>

                        <!-- 付费查看输入金额 -->
                        <a-form-model-item 
                             v-if="resourceform.mode == 5"
                            label="请输入金额"
                            ref="money" 
                            prop="money">
                            <a-input-number
                                size="large" 
                                v-model="resourceform.money"
                                placeholder="请输入金额"
                                :style="{ width: '100%' }"
                                :min="0"
                            />
                        </a-form-model-item>

                        <!-- 请设置可以查看等级组 -->
                        <a-form-model-item 
                         v-if="resourceform.mode == 3"
                            label="请设置等级"
                            ref="grade" 
                            prop="grade">
                            <a-select
                            v-model="resourceform.grade"
                            size="large" 
                            style="width: 100%"
                            placeholder="请设置等级">
                            <a-select-option v-for="(item,index) in gradeList" :key="index+'grade'" :value="item.id">
                                  {{item.title}}
                            </a-select-option>
                        </a-select>
                        </a-form-model-item>

                        <!-- 请设置资源属性 -->
                        <a-form-model-item 
                            label="资源属性"
                            ref="attr" 
                            prop="attr">
                            <div v-if="resourceform.attr.length == 0" class="attr-add">
                                <a-button @click="addAttr" type="primary">
                                    添加属性
                                </a-button>
                            </div>
                            <div class="attr-list" v-if="resourceform.attr.length > 0">
                                <div  class="attr-input" v-for="(item,index) in resourceform.attr" :key="index">
                                    <div class="input-box">
                                        <a-row :gutter="[40,0]">
                                            <a-col :span="12">
                                                <a-input
                                                    size="large"
                                                    placeholder="请输入属性标识"
                                                    v-model="item.key"
                                                />
                                            </a-col>
                                            <a-col :span="12">
                                                <a-input
                                                    size="large"
                                                    placeholder="请输入属性值"
                                                    v-model="item.value"
                                                />
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="action">
                                        <a-space>
                                            <a-button  @click="addAttr" type="primary" size="large">
                                                添加
                                            </a-button>
                                            <a-button @click="deleteAttr(index)" type="danger" size="large">
                                                删除
                                            </a-button>
                                        </a-space>
                                    </div>
                                </div>
                            </div>
                        </a-form-model-item>

                        <!-- 下载地址-解压码-提取码 -->
                        <a-row :gutter="[40,0]">
                            <a-col :span="8">
                                <a-form-model-item 
                                    label="下载地址"
                                    ref="link" 
                                    prop="link">
                                    <a-input
                                        size="large"
                                        placeholder="下载地址"
                                        v-model="resourceform.link"
                                    />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item 
                                    label="解压码"
                                    ref="untieCode" 
                                    prop="untieCode">
                                    <a-input
                                        size="large"
                                        placeholder="请输入解压码"
                                        v-model="resourceform.untieCode"
                                    />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item 
                                    label="提取码"
                                    ref="gainCode" 
                                    prop="gainCode">
                                    <a-input
                                        size="large"
                                        placeholder="请输入提取码"
                                        v-model="resourceform.gainCode"
                                    />
                                </a-form-model-item>
                            </a-col>
                        </a-row>

                    </a-form-model>
                </div>
                <!-- <a-form-model-item 
                    ref="video" 
                    prop="video">
                    <div class="upload-icon">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请上传视频"
                            v-model="form.video"
                        />
                        <a-button v-action="'/media/upload'" class="form-button" @click="uploadVideo" size="large" type="primary" style="margin-left: 10px;">
                            上传
                        </a-button>
                    </div>
                </a-form-model-item> -->
                
                <a-form-model-item>
                    <a-button @click="onSubmit" size="large" type="primary" >
                        提交
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </a-card>
</template>

<script>
import { Edit,EditInfo } from '@/api/post'
import { ByModule } from '@/api/category'
import { Hots } from '@/api/tag'
import { All } from '@/api/forum'
import { loopCate } from '@/utils/tree/cate'
import { toTree } from '@/utils/tree/tree'
import {  List } from '@/api/grade'
import TinyMceEditor from "@/components/Editor/Tinymce"

export default {
    components: {
        TinyMceEditor
    },
    data() {
        return {
            form:{
                userId:undefined,
                categoryId:undefined,
                forumId:undefined,
                cover: undefined,
                video: undefined,
                title:undefined,
                
                tags:[],
                content:undefined,
                hots:undefined,
                favorites:undefined,
                likes:undefined,
                views:undefined,
                isTop:undefined,
                setResource:undefined,
                rules:{
                    title:[
                        { required: true, message: "请输入标题", trigger: 'blur' },
                    ],
                    categoryId:[
                        { required: true, message: "请设置分类", trigger: 'blur' },
                    ],
                    forumId:[
                        { required: true, message: "请设置版块", trigger: 'blur' },
                    ],
                },
            },
            tagList:[],
            categoryList:[],
            forumList:[],
            gradeList:[],
            resourceform:{
                title:undefined,
                example:undefined,
                mode:undefined,
                integral:undefined,
                money:undefined,
                grade:undefined,
                attr:[],
                gainCode:undefined,
                untieCode:undefined,
                link:undefined,
                rules:{
                    setResource:[
                        { required: true, message: "请设置是否开启资源", trigger: 'blur' },
                    ],
                    title:[
                        { required: true, message: "请设置资源标题", trigger: 'blur' },
                    ],
                    mode:[
                        { required: true, message: "请设置资源权限", trigger: 'blur' },
                    ],
                },
            },
            id:null,
        }
    },
    mounted(){
        if (isNaN(this.$route.query.id)) {
            this.$router.push({path:"/404"})
        }
        this.id = parseInt(this.$route.query.id)
      
      this.getData()
    },
    methods: {
        async getData(){
            try {
                const cateRes = await ByModule({"module":"post"})
                const list =  toTree(cateRes.data.list != null ? cateRes.data.list : [],"id","parentId")
                this.categoryList = loopCate(list)
                
                const tagRes = await Hots()
                this.tagList = tagRes.data.list

                const forumRes = await All()
                this.forumList = forumRes.data.list

                const gradeRes  = await List()
                this.gradeList = gradeRes.data.list == null ? [] : gradeRes.data.list

                const editInfo = await EditInfo({id:this.id})
                if (editInfo.code != 1) {
                    this.$router.push({path:'/404'})
                }

                this.form = Object.assign(this.form,editInfo.data.info)
                // this.form.content = editInfo.data.info.content.replace(/<br\s*\/?>/gi, '\n'); 


                this.form.tags = editInfo.data.info.tagList == null ? [] :  editInfo.data.info.tagList.map((itme)=>{
                    return itme.title
                })

                this.resourceform.setResource = editInfo.data.info.resource.setResource
                this.resourceform.title = editInfo.data.info.resource.title
                this.resourceform.example = editInfo.data.info.resource.example
                this.resourceform.mode = editInfo.data.info.resource.mode
                this.resourceform.integral = editInfo.data.info.resource.integral
                this.resourceform.money = editInfo.data.info.resource.money
                this.resourceform.grade = editInfo.data.info.resource.grade ?? []
                this.resourceform.attr = editInfo.data.info.resource.attr  ?? []
                this.resourceform.gainCode = editInfo.data.info.resource.gainCode
                this.resourceform.untieCode = editInfo.data.info.resource.untieCode
                this.resourceform.link = editInfo.data.info.resource.link
 
        
            } catch (error) {
                
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        uploadVideo(){
            if (this.form.images.length > 0) {
                this.$message.error(
                    "上传了图片，无法上传视频",
                    3
                )
                return
            }
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.video = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.cover = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        writeContent(e){
            this.form.content = e
        },
        addAttr(){
            this.resourceform.attr.push({
                key: undefined,
                value: undefined,
            })
        },
        deleteAttr(index){
            this.resourceform.attr.splice(index,1)
        },
        onSubmit(e){
            this.$confirm({
                title: "正在修改",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                        
                            this.form.id = this.id
                            this.form.resource = this.resourceform
                            this.postEdit(this.form)
                           
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postEdit(formData){
            try {
                const res = await Edit(formData)
                if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$router.push({path: '/post/list'});
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
    },
}
</script>

<style scoped lang="less">
.authority-box{
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-icon{
    display: flex;
}
.create-meta{

    border: 1px dashed #dfdfdf;
    padding: 15px;
    margin-bottom: 20px;
    p{
        font-size: 12px;
        padding: 5px;
        display: flex;
        align-items: center;
        line-height: 1;
    }
    .image-list{
        display: flex;
        .add-image{
            cursor: pointer;
            box-shadow: inset 0 0 2px rgb(137, 137, 137);
            border-radius: 2px;
            height: 100px;
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon{
                color: rgb(137, 137, 137);
                font-size: 30px;
            }
        }   
        .item{
            height: 100px;
            width: 100px;
            position: relative;
            margin-right: 10px;
            
            .image-box{
                height: 100px;
                width: 100px;
                padding-top: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                cursor: move;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100px;
                    width: 100px;
                    box-shadow: inset 0 0 2px rgb(137, 137, 137);
                    border-radius: 2px;
                }
                .img-close{
                    position: absolute;
                    right: 0;
                    top: 9px;
                    width: 14px;
                    display: block;
                    background: rgba(255, 255, 255, 0.88);
                    text-align: center;
                    height: 14px;
                    border-radius: 100%;
                    cursor: pointer;
                    line-height: 14px;
                    text-align: center;
                    margin-right: 10px;
                    font-size: 12px;
                }
            }
        }
    }
}
.create-hide{
    border: 1px dashed #dfdfdf;
    padding:10px 40px;
    margin-bottom: 20px;
    .attr-input{
        display: flex;
        align-items: center;
        margin-top: 20px;
        .input-box{
            flex: 1;
            margin-right: 20px;
        }
    }
}
</style>
