<template>
    <div class="container">
        <a-space v-action="'/suggest/create'" class="container-action" size="large">
            <a-button size="large" v-action="'/suggest/remove'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchRemove" type="danger">
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
        <span slot="connectMode" slot-scope="connectMode">
            <a-tag v-if="connectMode == 2" color="#108ee9">
                QQ
            </a-tag>
            <a-tag v-if="connectMode == 1" color="#87d068">
                微信
            </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
            <a v-action="'/suggest/remove'" @click="remove(record.id)">删除</a>   
        </span>
        </a-table>
    </div>
</template>

<script>
import { Remove,Create } from '@/api/suggest'
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
            link:undefined,
            cateId:undefined,
            alias: undefined,
            cateList:[],

            // 表格
            columns:[
                {
                    title: "编号",
                    width: '80px',
                    dataIndex: 'id',
                    
                },
                {
                    title: "内容",
                    dataIndex: 'content',
                    scopedSlots: { customRender: 'content' }
                },
                {
                    title: "联系方式",
                    dataIndex: 'connectMode',
                    width: '150px',
                    scopedSlots: { customRender: 'connectMode' }
                },
                {
                    title: "联系号码",
                    dataIndex: 'connectNumber',
                    scopedSlots: { customRender: 'connectNumber' }
                },
                {
                    title: "作者",
                    dataIndex: 'nickName',
                    scopedSlots: { customRender: 'nickName' }
                },
                {
                    title: "发布时间",
                    dataIndex: 'createTime',
                },
                {
                    title: "操作",
                    width: '150px',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            selectedRowKeys: []
        }
    },
    mounted(){
    },
    methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
        uploadSuggest(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    console.log(res)
                    this.link = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        batchRemove(){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    const formData = {
                        idList:this.selectedRowKeys
                    }
                    this.postRemove(formData)
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        remove(e){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    const formData = {
                        "idList":[e]
                    }
                    this.postRemove(formData)
                },
                onCancel() {},
            });
        },
        async postRemove(formData){
            try {
                const res = await Remove(formData)
               if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$emit("getData")
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
        async postCreate(formData){
            try {
                const res = await Create(formData)
               if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$emit("getData")
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
    },
}
</script>

<style scoped lang="less">
.container-action{
    margin-bottom: 10px;
}
.avatar{
    width: 50px;
    height: 50px;
}
.remark{
    margin-top: 20px;
}
</style>
