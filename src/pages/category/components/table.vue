<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/category/create'" type="primary" @click="goCreate">
                新建
            </a-button>
            <a-button v-action="'/category/remove'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchRemove" type="danger">
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
        <span slot="module" slot-scope="module">
            <span>
                {{module | resetModule}}
            </span>
        </span>
        <span slot="isTop" slot-scope="isTop">
            <span v-if="isTop == 1">
                否
            </span>
            <span v-if="isTop == 2">
                是
            </span>
        </span>
         <span slot="isAuditing" slot-scope="isAuditing">
            <span v-if="isAuditing == 1">
                否
            </span>
            <span v-if="isAuditing == 2">
                是
            </span>
        </span>
        <span slot="action" slot-scope="text, record">
            <a-space>
                <a v-action="'/category/edit'" @click="edit(record.id)">编辑</a>
                <a v-action="'/category/remove'" @click="remove(record.id)">删除</a> 
            </a-space>
        </span>
        </a-table>
    </div>
</template>

<script>
import { Remove } from '@/api/category'
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
    filters:{
        resetModule (e) {
            switch (e) {
                case "post":
                    return "帖子"
                case "wiki":
                    return "百科"
            }
        },
    },
    data() {
        return {
            // 表格
            columns:[
                {
                    title: "分类编号",
                    dataIndex: 'id',
                },
                {
                    title: "分类标题",
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' }
                },
                {
                    title: "是否推荐",
                    dataIndex: 'isTop',
                    scopedSlots: { customRender: 'isTop' }
                },
                {
                    title: "栏目内容是否需要审核",
                    dataIndex: 'isAuditing',
                    scopedSlots: { customRender: 'isAuditing' }
                },
                {
                    title: "所属模块",
                    dataIndex: 'module',
                    scopedSlots: { customRender: 'module' }
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
            this.$router.push({path:'/category/create'})
        },
        edit(e){
            this.$router.push({path:'/category/edit',query:{id:e}})
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
