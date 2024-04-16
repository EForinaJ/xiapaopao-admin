<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/announcement/create'" type="primary" @click="goCreate">
                新建
            </a-button>
            <a-button v-action="'/announcement/delete'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchdelete" type="danger">
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
        <span slot="link" slot-scope="link">
            <span @click="go(link)" class="link">
                [网页地址]
            </span>
        </span>
        <span slot="action" slot-scope="text, record">
            <a-space>
                <a v-action="'/announcement/edit'" @click="edit(record.id)">编辑</a>
                <a v-action="'/announcement/delete'" @click="xdelete(record.id)">删除</a> 
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
                        placeholder="请输入标题"
                        v-model="form.title"
                    />
                </a-form-model-item>

                <a-form-model-item 
                    ref="link" prop="link">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入链接"
                            v-model="form.link"
                        >
                        </a-input>
                </a-form-model-item>

                <a-form-model-item
                    ref="content" prop="content">
                    <a-textarea 
                    v-model="form.content"
                    size="large"
                    type="text"
                    placeholder="请输入描述"
                    :rows="4" />
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
                        placeholder="请输入标题"
                        v-model="form.title"
                    />
                </a-form-model-item>

                <a-form-model-item 
                    ref="link" prop="link">
                        <a-input
                            size="large"
                            type="text"
                            placeholder="请输入链接"
                            v-model="form.link"
                        >
                        </a-input>
                </a-form-model-item>

                <a-form-model-item
                    ref="content" prop="content">
                    <a-textarea 
                    v-model="form.content"
                    size="large"
                    type="text"
                    placeholder="请输入描述"
                    :rows="4" />
                </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { Delete,Create,EditInfo,Edit  } from '@/api/announcement'
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
                content:undefined,
                link:undefined,
                rules:{
                    title:[
                        { required: true, message: "请输入标题", trigger: 'blur' },
                    ],
                    content:[
                        { required: true, message: "请输入内容", trigger: 'blur' },
                    ],
                },
            },
            // 表格
            columns:[
                {
                    title: "版块编号",
                    dataIndex: 'id',
                    width: '100px',
                },
                {
                    title: "版块标题",
                    ellipsis: true,
                    width: '200px',
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' }
                },
                {
                    title: "公告内容",
                    dataIndex: 'content',
                    scopedSlots: { customRender: 'content' },
                    ellipsis: true,
                    width: '200px',
                },
                {
                    title: "链接",
                    dataIndex: 'link',
                    scopedSlots: { customRender: 'link' }
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
        go(e){
            window.open(e, '_blank');
        },
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
                this.form.content = undefined
                this.form.link = undefined
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
                title: "正在创建",
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
                this.form.content = undefined
                this.form.link = undefined
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
                title: "正在创建",
                content: "请认真检查表单信息",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            let formData = {
                                id: this.id,
                                title: this.form.title,
                                content: this.form.content,
                                link: this.form.link,
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
.link:hover{
    cursor: pointer;
    color: #1890ff;
}
</style>
