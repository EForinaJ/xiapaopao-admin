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
import { Edit,EditInfo  } from '@/api/article'
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
            id:undefined,
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
                const cateRes = await ByModule({"module":"article"})
                const list =  toTree(cateRes.data.list != null ? cateRes.data.list : [],"id","parentId")
                this.categoryList = loopCate(list)
                
                const tagRes = await Hots()
                this.tagList = tagRes.data.list

                const forumRes = await All()
                this.forumList = forumRes.data.list

                
                const editInfo = await EditInfo({id:this.id})
                if (editInfo.code != 1) {
                    this.$router.push({path:'/404'})
                }

                this.form = Object.assign(this.form,editInfo.data.info)
                this.form.tags = editInfo.data.info.tagList == null ? [] :  editInfo.data.info.tagList.map((itme)=>{
                    return itme.title
                })
            
            } catch (error) {
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
        onSubmit(e){
            this.$confirm({
                title: "正在创建",
                content: "请认真检查表单信息",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.form.id = this.id
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
                this.$router.push({path: '/article/list'});
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
.box{
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-icon{
    display: flex;
}
.caele{
    border: 1px solid #ccc;
    padding: 10px;
    .title{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
    }
}
.create{
    margin-top: 20px;
}
</style>
