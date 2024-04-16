<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/article/create'" type="primary" @click="goCreate">
                新建
            </a-button>
            <a-popconfirm
                 v-if="isRemove == 1"
                v-action="'/article/review'"
                :disabled="selectedRowKeys.length > 0 ? false :true"
                title="正在审核"
                ok-text="通过"
                cancel-text="拒绝"
                @confirm="batchReview(2)"
                @cancel="batchReview(3)"
            >
                <a-button v-action="'/article/review'" :disabled="selectedRowKeys.length > 0 ? false :true">
                    批量审核
                </a-button>
            </a-popconfirm>
            <a-button
                v-action="'/article/remove'"
                v-if="isRemove == 1"
                :disabled="selectedRowKeys.length > 0 ? false :true" 
                @click="batchRemove" type="danger">
                批量移入回收站
            </a-button>
            <a-button
                v-action="'/article/reduction'"
               v-if="isRemove == 2"
                :disabled="selectedRowKeys.length > 0 ? false :true" 
                @click="batchReduction" type="primary">
                批量还原
            </a-button>
            <a-button
                v-action="'/article/delete'"
                v-if="isRemove == 2"
                :disabled="selectedRowKeys.length > 0 ? false :true" 
                @click="batchDelete" type="danger">
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
            <a-tag v-if="isTop == 2" color="#2db7f5">
                是
            </a-tag>
        </span>


        <span slot="status" slot-scope="status">
            <a-tag v-if="status == 1" color="#2db7f5">
                待审核
            </a-tag>
            <a-tag v-if="status == 2" color="#87d068">
                已通过
            </a-tag>
            <a-tag v-if="status == 3" color="#f50">
                未通过
            </a-tag>
        </span>

       
        <span slot="action" slot-scope="text, record">
           
            <a-space>
                <a @click="edit(record.id)" v-action="'/article/edit'" v-if="isRemove == 1">编辑</a>
                <a-popconfirm
                 v-if="isRemove == 1"
                    v-action="'/article/review'"
                    title="审核认证内容"
                    ok-text="通过"
                    cancel-text="驳回"
                    @confirm="review(2,record.id)"
                    @cancel="review(3,record.id)"
                >
                    <a href="#">审核</a>
                </a-popconfirm>
                <a v-if="isRemove == 1" v-action="'/article/remove'" @click="remove(record.id)">移到回收站</a>
                <a @click="reduction(record.id)" v-action="'/article/reduction'"   v-if="isRemove == 2">还原</a>   
                <a @click="xdelete(record.id)" v-action="'/article/delete'"   v-if="isRemove == 2">删除</a>   
            </a-space>
        </span>
        </a-table>

        <a-modal v-model="removeVisible" 
            title="请填写，处理信息"
            @ok="handleOk">
            <a-textarea v-model="reviewFormData.remark" :rows="4" />
        </a-modal>
    </div>
</template>

<script>
import { Reduction,Remove,Delete,Review,Info,Authentication } from '@/api/article'
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
        isRemove:{
            type:Number,
            default: 1
        },
    },
    data() {
        return {
            visible:false,
            removeVisible:false,
            remark:undefined,
            reviewFormData:{
                remark:undefined,
            },
            // 表格
            columns:[
                {
                    title: "编号",
                    dataIndex: 'id',
                    
                },
                {
                    title: "标题",
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'title' },
                    width: '150px',
                    ellipsis: true,
                },
                {
                    title: "用户昵称",
                    dataIndex: 'nickName',
                    scopedSlots: { customRender: 'nickName' }
                },
                {
                    title: "分类",
                    dataIndex: 'category',
                    scopedSlots: { customRender: 'category' }
                },
                {
                    title: "版块",
                    dataIndex: 'forum',
                    scopedSlots: { customRender: 'forum' }
                },
                {
                    title: "是否置顶",
                    dataIndex: 'isTop',
                    scopedSlots: { customRender: 'isTop' }
                },
                {
                    title: "状态",
                    dataIndex: 'status',
                    scopedSlots: { customRender: 'status' }
                },
                {
                    title: "创建时间",
                    dataIndex: 'createTime',
                    scopedSlots: { customRender: 'createTime' }
                },

                {
                    title: "操作",
                    width: '300px',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            selectedRowKeys: [],
            info: null,
            action:"review"
        }
    },
    methods: {
        goCreate(){
            this.$router.push({path:'/article/create'})
        },
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
        edit(e){
            this.$router.push({path:'/article/edit',query:{id:e}})
        },
        batchReview(e){
            const formData = {
                "status":e,
                "idList":this.selectedRowKeys
            }
            this.action = undefined
            this.reviewFormData = {
                remark: undefined,
                idList: []
            }
            this.action = "review"
            this.reviewFormData = formData
            this.removeVisible = true
            this.selectedRowKeys = []
        },
        review(e,i){
            const formData = {
                "status":e,
                "idList":[i]
            }
            this.action = undefined
            this.reviewFormData = {
                remark: undefined,
                idList: []
            }
            this.action = "review"
            this.reviewFormData = formData
            this.removeVisible = true
        },


        handleOk(){
         
            if (this.reviewFormData.remark == null || this.reviewFormData.remark == undefined ||this.reviewFormData.remark == "") {
                if (this.action == "review") {
                    this.$message.error("请输入审核信息");
                }
                if (this.action == "remove") {
                    this.$message.error("请输入回收信息");
                }
                return
            }
      
            if (this.action == "review") {
                this.postReview(this.reviewFormData)
                this.selectedRowKeys = []
            }
            if (this.action == "remove") {
                this.postRemove(this.reviewFormData)
                this.selectedRowKeys = []
            }
            if (this.action == "authentication") {
                this.postAuthentication(this.reviewFormData)
                this.selectedRowKeys = []
            }
           
            this.removeVisible = false
        },

        batchRemove(){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.reviewFormData = {
                        remark: undefined,
                        idList: []
                    }
                    this.action = "remove"
                    this.reviewFormData = {
                        remark: undefined,
                        idList: this.selectedRowKeys
                    }
                    this.removeVisible = true
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        remove(e){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    this.reviewFormData = {
                        remark: undefined,
                        idList: []
                    }
                    this.action = "remove"
                    this.reviewFormData = {
                        remark: undefined,
                        idList: [e]
                    }
                    this.removeVisible = true
                },
                onCancel() {},
            });
        },

        batchReduction(){
            this.$confirm({
                title: "正在还原",
                onOk:() => {
                    const formData = {
                        idList:this.selectedRowKeys
                    }
                    this.postReduction(formData)
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        reduction(e){
            this.$confirm({
                title: "正在还原",
                onOk:() => {
                    const formData = {
                        "idList":[e]
                    }
                    this.postReduction(formData)
                },
                onCancel() {},
            });
        },

        batchDelete(){
            this.$confirm({
                title: "正在还原",
                onOk:() => {
                    const formData = {
                        idList:this.selectedRowKeys
                    }
                    this.postDelete(formData)
                    this.selectedRowKeys = []
                },
                onCancel() {},
            });
        },
        xdelete(e){
            this.$confirm({
                title: "正在删除",
                onOk:() => {
                    const formData = {
                        "idList":[e]
                    }
                    this.postDelete(formData)
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
        async postAuthentication(formData){
            try {
                const res = await Authentication(formData)
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
        async postReduction(formData){
            try {
                const res = await Reduction(formData)
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
        async postDelete(formData){
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
.br{
    margin: 20px 0;
}
.other{
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    .xxastatus{
        margin-left: 5px;
    }
}

</style>
