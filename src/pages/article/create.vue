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
                        <a-form-model-item 
                            label="直播间"
                            ref="link" 
                            prop="link">
                            <a-input
                                size="large"
                                placeholder="请输入直播间地址"
                                v-model="form.link"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
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
                    label="描述"
                    ref="description" 
                    prop="description">
                    <a-textarea
                        :maxLength="140"
                        :rows="5"
                        size="large"
                        type="text"
                        placeholder="请输入描述描述"
                        v-model="form.description"
                    />
                </a-form-model-item>

                <a-form-model-item>
                    <TinyMceEditor @writeContent="writeContent"   
                    :valueContont="form.content"/>
                </a-form-model-item>

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
import { Create } from '@/api/post'
import { ByModule } from '@/api/category'
import { Hots } from '@/api/tag'
import { All } from '@/api/forum'
import { loopCate } from '@/utils/tree/cate'
import { toTree } from '@/utils/tree/tree'
import TinyMceEditor from "@/components/Editor/Tinymce"
export default {
    components: {
        TinyMceEditor
    },
    data() {
        return {
            form:{
                link: undefined,
                description: undefined,
                cover:undefined,
                userId:undefined,
                categoryId:undefined,
                forumId:undefined,
                title:undefined,
                tags:[],
                content:undefined,
                hots:undefined,
                favorites:undefined,
                likes:undefined,
                views:undefined,
                isTop:undefined,

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
                    isPro:[
                        { required: true, message: "请设置是否置顶", trigger: 'blur' },
                    ],
                    isAuthentication:[
                        { required: true, message: "请设置是否平台验证", trigger: 'blur' },
                    ],
                    number:[
                        { required: true, message: "请输入联系号码", trigger: 'blur' },
                    ],
                    mode:[
                        { required: true, message: "请设置联系方式", trigger: 'blur' },
                    ],
                    cover:[
                        { required: true, message: "请设置封面", trigger: 'blur' },
                    ],
                },
            },
            tagList:[],
            categoryList:[],
            forumList:[],
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            try {
                const cateRes = await ByModule({"module":"article"})
                const list =  toTree(cateRes.data.list != null ? cateRes.data.list : [],"id","parentId")
                this.categoryList = loopCate(list)
                
                const tagRes = await Hots()
                this.tagList = tagRes.data.list

                const forumRes = await All()
                this.forumList = forumRes.data.list
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
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
        removeImg(i){
            this.form.images.splice(i,1)
        },
        onSubmit(e){
            this.$confirm({
                title: "正在创建",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.postCreate(this.form)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postCreate(formData){
            try {
                const res = await Create(formData)
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
    padding: 5px;
    margin-bottom: 10px;
    p{
        font-size: 12px;
        padding: 5px;
        display: flex;
        align-items: center;
        line-height: 1;
    }
    .image-list{
        display: flex;
        li{
            height: 100px;
            width: 100px;
            position: relative;
            margin-right: 10px;
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

</style>
