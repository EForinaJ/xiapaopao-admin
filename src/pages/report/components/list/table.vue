<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/report/delete'"  :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchRemove" type="danger">
                批量删除
            </a-button>
            <a-button v-action="'/report/review'"  @click="batchReview" :disabled="selectedRowKeys.length > 0 ? false :true">
                批量处理
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
        <span slot="status" slot-scope="status">
            <a-tag v-if="status == 1" color="#2db7f5">
                待处理
            </a-tag>
            <a-tag v-if="status == 2" color="#87d068">
                已处理
            </a-tag>
        </span>
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
            {{ record.description }}
        </p>
        <div slot="type" slot-scope="type" >
            <a-tag  v-if="type == 1" color="#f50">
                广告垃圾
            </a-tag>
            <a-tag  v-if="type == 2" color="#f50">
                违规内容
            </a-tag>
            <a-tag  v-if="type == 3" color="#f50">
                恶意灌水
            </a-tag>
        </div>
        <span slot="action" slot-scope="text, record">
            <a-space>
                <a v-action="'/report/review'" @click="review(record.id)" href="#">处理</a>
                <a v-action="'/report/delete'" @click="remove(record.id)" href="#">删除</a>
            </a-space>
            
        </span>
        </a-table>

        <a-modal v-model="visible" 
            title="请填写，处理通知信息"
            @ok="handleOk">
            <a-textarea v-model="remark" :rows="4" />
        </a-modal>
    </div>
</template>

<script>
import { Delete,Review } from '@/api/report'
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
            visible:false,
            action:"review",
            remark:undefined,
            reviewFormData: null,
            // 表格
            columns:[
                {
                    title: "编号",
                    dataIndex: 'id',
                    
                },
                {
                    title: "举报人",
                    dataIndex: 'nickName',
                    scopedSlots: { customRender: 'nickName' },
                   
                },
                {
                    title: "内容标题",
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' },
                    width: 400
                },

                {
                    title: "类型",
                    dataIndex: 'type',
                    scopedSlots: { customRender: 'type' }
                },
                {
                    title: "状态",
                    dataIndex: 'status',
                    scopedSlots: { customRender: 'status' }
                },
                {
                    title: "举报时间",
                    dataIndex: 'createTime',
                },
                {
                    title: "操作",
                    width: '150px',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            selectedRowKeys: [],
            action:"review"
        }
    },
    methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
        batchReview(){
            const formData ={
                "status":2,
                idList:this.selectedRowKeys
            }
            this.action = undefined
            this.remark = undefined
            this.reviewFormData = undefined
            this.action = "review"
            this.visible = true
            this.reviewFormData = formData
            this.selectedRowKeys = []
        },
        review(i){
            const formData = {
                "status":2,
                "idList":[i]
            }
            this.action = undefined
            this.remark = undefined
            this.reviewFormData = undefined
            this.action = "review"
            this.visible = true
            this.reviewFormData = formData
        },
        handleOk(){
            if (this.remark == null || this.remark == undefined ||this.remark == "") {
                if (this.action == "review") {
                    this.$message.error("请输入审核信息");
                }
                if (this.action == "recover") {
                    this.$message.error("请输入回收信息");
                }
                return
            }
            const formData = this.reviewFormData
            formData.remark = this.remark
            if (this.action == "review") {
                this.postReview(formData)
                this.selectedRowKeys = []
            }
            if (this.action == "recover") {
                this.postRecover(formData)
                this.selectedRowKeys = []
            }
           
            this.visible = false
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
                const res = await Delete(formData)
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
        async postReview(formData){
            try {
                const res = await Review(formData)
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
.cover{
    width: 50px;
    height: 50px;
}
.title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
</style>
