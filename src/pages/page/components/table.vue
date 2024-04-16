<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/page/create'" type="primary" @click="goCreate">
                新建
            </a-button>
            <a-button v-action="'/page/remove'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchRemove" type="danger">
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
        <span slot="action" slot-scope="text, record">
            <a-space>
                <a v-action="'/page/edit'" @click="edit(record.id)">编辑</a>
                
                <a v-action="'/page/remove'" @click="remove(record.id)">删除</a>
            </a-space>
            
        </span>
        </a-table>
    </div>
</template>

<script>
import { Remove } from '@/api/page'
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
            // 表格
            columns:[
                {
                    title: "编号",
                    dataIndex: 'id',
                },
                {
                    title: "标题",
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' }
                },
                {
                    title: "别名",
                    dataIndex: 'alias',
                    scopedSlots: { customRender: 'alias' }
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
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
        goCreate(){
            this.$router.push({path:'/page/create'})
        },
        edit(e){
            this.$router.push({path:'/page/edit',query:{id:e}})
        },
        batchRemove(){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.postRemove({"idList":this.selectedRowKeys})
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        remove(e){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.postRemove({"idList":[e]})
                },
                onCancel() {},
            });
        },
        async postRemove(formData){
            try {
                const res = await Remove(formData)
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
.container-action{
    margin-bottom: 10px;
}
</style>
