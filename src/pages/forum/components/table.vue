<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/forum/create'" type="primary" @click="goCreate">
                新建
            </a-button>
            <a-button v-action="'/forum/delete'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchdelete" type="danger">
                批量删除
            </a-button>
        </a-space>
        <a-table 
            :rowKey="record=>record.id"
             :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :pagination="{
                showQuickJumper:true,
                showSizeChanger:true,
                showTotal:(total)=>`共${total}条`,
                pageSize:pageSize,
                current:current,
                total:total
            }"
            :columns="columns" 
            :dataSource="list"
            @change="pageChange"
        >
        <span slot="isTop" slot-scope="isTop">
            <a-tag v-if="isTop == 1" color="#2db7f5">
                否
            </a-tag>
            <a-tag v-if="isTop == 2" color="#87d068">
                是
            </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
            <a-space>
                <a v-action="'/forum/edit'" @click="edit(record.id)">编辑</a>
                <a v-action="'/forum/delete'" @click="xdelete(record.id)">删除</a> 
            </a-space>
        </span>
        </a-table>


        <a-modal v-model="createVisible" 
            title="请填写，创建内容"
            @ok="handleOk">
            <a-form-model ref="form" :model="form" :rules="form.rules">
                <a-form-model-item 
                    ref="title" 
                    prop="title">
                    <a-input
                        size="large"
                        type="text"
                        placeholder="请输入版块标题"
                        v-model="form.title"
                    />
                </a-form-model-item>

                <a-form-model-item 
                    ref="slug" prop="slug">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入版块别名"
                            v-model="form.slug"
                        >
                        </a-input>
                </a-form-model-item>


                <a-form-model-item ref="module" prop="module">
                    <a-select 
                        
                        size="large"
                        v-model="form.isTop" 
                        placeholder="请设置版块是否推荐">
                        <a-select-option :value="1">
                            否
                        </a-select-option>
                        <a-select-option :value="2">
                            是
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    ref="description" prop="description">
                    <a-input
                        size="large"
                        type="text"
                        placeholder="请输入版块描述"
                        v-model="form.description"
                    >
                    </a-input>
                </a-form-model-item>

             

                <a-form-model-item ref="cover" prop="cover">
                    <div class="upload-icon">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入版块图片地址"
                            v-model="form.cover"
                        />
                        <a-button v-action="'/media/upload'" class="form-button" @click="uploadCover" size="large" type="primary" style="margin-left: 10px;">
                            上传
                        </a-button>
                    </div>
                </a-form-model-item>
            </a-form-model>
        </a-modal>

        <a-modal v-model="editVisible" 
            title="请填写，创建内容"
            @ok="handleEditOk">
            <a-form-model ref="form" :model="form" :rules="form.rules">
                <a-form-model-item 
                    ref="title" 
                    prop="title">
                    <a-input
                        size="large"
                        type="text"
                        placeholder="请输入版块标题"
                        v-model="form.title"
                    />
                </a-form-model-item>

                <a-form-model-item 
                    ref="slug" prop="slug">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入版块别名"
                            v-model="form.slug"
                        >
                        </a-input>
                </a-form-model-item>


                <a-form-model-item ref="module" prop="module">
                    <a-select 
                      
                        size="large"
                        v-model="form.isTop" 
                        placeholder="请设置版块是否推荐">
                        <a-select-option :value="1">
                            否
                        </a-select-option>
                        <a-select-option :value="2">
                            是
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item
                    ref="description" prop="description">
                    <a-input
                        size="large"
                        type="text"
                        placeholder="请输入版块描述"
                        v-model="form.description"
                    >
                    </a-input>
                </a-form-model-item>

             

                <a-form-model-item ref="cover" prop="cover">
                    <div class="upload-icon">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入版块图片地址"
                            v-model="form.cover"
                        />
                        <a-button v-action="'/media/upload'" class="form-button" @click="uploadCover" size="large" type="primary" style="margin-left: 10px;">
                            上传
                        </a-button>
                    </div>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { Delete,Create,EditInfo,Edit  } from '@/api/forum'
export default {
    props:{
        list:{
            type:Array,
                // 当为数组类型设置默认值时必须使用数组返回
            required:true,
            default: []
        },
        total:{
            type:Number,
            default: 0
        },
        pageSize:{
            type:Number,
            default: 10
        },
        current:{
            type:Number,
            default: 1
        },
    },
    data() {
        return {
            createVisible:false,
            editVisible:false,
            id: undefined,
            form:{
                title:undefined,
                slug:undefined,
                isTop:undefined,
                description:undefined,
                cover:undefined,
                rules:{
                    title:[
                        { required: true, message: "请输入版块标题", trigger: 'blur' },
                    ],
                    cateId:[
                        { required: true, message: "请输入版块版块", trigger: 'blur' },
                    ],
                    isAll:[
                        { required: true, message: "请设置版块人员已满", trigger: 'blur' },
                    ],
                },
            },
            // 表格
            columns:[
                {
                    title: "版块编号",
                    dataIndex: 'id',
                },
                {
                    title: "版块标题",
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' }
                },
                {
                    title: "是否推荐",
                    dataIndex: 'isTop',
                    scopedSlots: { customRender: 'isTop' }
                },
                {
                    title: "创建时间",
                    dataIndex: 'createTime',
                },
                {
                    title:"操作",
                    width: '150px',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            selectedRowKeys: [],
        }
    },
    methods: {
        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.image = res
                   
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
        async goCreate(){
            try {
                this.form.title = undefined
                this.form.slug = undefined
                this.form.isTop = undefined
                this.form.description = undefined
                this.form.cover = undefined
                this.createVisible = true
            } catch (error) {
                this.createVisible = false
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        handleOk(){
            this.$confirm({
                title: "正在创建版块",
                content: "请认真检查表单信息",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.postCreate(this.form)
                            this.createVisible = false
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async edit(e){
            try {
                this.form.title = undefined
                this.form.slug = undefined
                this.form.isTop = undefined
                this.form.description = undefined
                this.form.cover = undefined
                const editInfo = await EditInfo({id:e})
                if (editInfo.code != 1) {
                    this.$router.push({path:'/404'})
                }
                this.form = Object.assign(this.form,editInfo.data.info)
                this.id = e
                this.editVisible = true
            } catch (error) {
                this.id = undefined
                this.editVisible = false
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        handleEditOk(){
            this.$confirm({
                title: "正在创建版块",
                content: "请认真检查表单信息",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            let formData = {
                                id: this.id,
                                title: this.form.title,
                                slug: this.form.slug,
                                isTop: this.form.isTop,
                                description: this.form.description,
                                cover: this.form.cover,
                            }
                            this.postEdit(formData)
                            this.editVisible = false
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {

                },
            });
        },
        batchdelete(){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.postDelete({"idList":this.selectedRowKeys})
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        xdelete(e){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.postDelete({"idList":[e]})
                },
                onCancel() {},
            });
        },
        async postDelete(formData){
            try {
                const res = await Delete(formData)
                this.$emit("getData")
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        async postCreate(formData){
            try {
                const res = await Create(formData)
                 if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$emit("getData")
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        async postEdit(formData){
            try {
                const res = await Edit(formData)
                if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$emit("getData")
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
.upload-icon{
    display: flex;
}
.container-action{
    margin-bottom: 10px;
}
</style>
