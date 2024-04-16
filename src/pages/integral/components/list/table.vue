<template>
    <div class="container">
        <a-space class="container-action" size="large">
            <a-button v-action="'/integral/delete'" :disabled="selectedRowKeys.length > 0 ? false :true" @click="batchRemove" type="danger">
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
        <span slot="type" slot-scope="type">
            {{type | resetType}}
        </span>
       

        <span slot="action" slot-scope="text, record">
            <a-space>
                <a-popconfirm
                    title="正在审核"
                    ok-text="通过"
                    cancel-text="拒绝"
                    @confirm="review(2,record.code)"
                    @cancel="review(3,record.code)"
                >
                    <a v-action="'/integral/review'" v-if="(record.mode == 3 || record.mode == 4) && record.status == 1">审核</a>
                </a-popconfirm>
                <a v-action="'/integral/delete'" @click="remove(record.id)">删除</a>
            </a-space>
               
        </span>
        </a-table>

        <a-modal v-model="visible" 
            title="请输入审核信息"
            @ok="handleOk">
            <a-textarea placeholder="请输入审核信息" class="remark" v-model="remark" :rows="4" />
        </a-modal>
    </div>
</template>

<script>
import { Delete,Review } from '@/api/integral'
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
        resetType (e) {
            switch (e) {
                case 1:
                    return "积分购买"
                case 2:
                    return "签到积分"
                case 3:
                    return "创建帖子"
                case 4:
                    return "评论"
                case 5:
                    return "点赞"
                case 6:
                    return "收藏"
                case 7:
                    return "关注"
                case 8:
                    return "举报"
                case 9:
                    return "精华帖子"
            }
        },
    },
    data() {
        return {
            visible:false,
            remark:undefined,
            reviewFormData:undefined,
            action:"review",
            // 表格
            columns:[
                {
                    title: "编号",
                    dataIndex: 'id',
                    
                },
                {
                    title: "用户",
                    dataIndex: 'nickName',
                    scopedSlots: { customRender: 'nickName' }
                },
                {
                    title: "类型",
                    dataIndex: 'type',
                    scopedSlots: { customRender: 'type' }
                },
                {
                    title: "积分",
                    dataIndex: 'integral',
                    scopedSlots: { customRender: 'integral' }
                },
                {
                    title: "创建时间",
                    dataIndex: 'createTime',
                    scopedSlots: { customRender: 'createTime' }
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
    methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        pageChange(e){
            this.$emit("changePage",e)
        },
     
        handleOk(){
            if (this.remark == null || this.remark == undefined ||this.remark == "") {
                if (this.action == "review") {
                    this.$message.error("请输入审核信息");
                }

                return
            }
            const formData = this.reviewFormData
            formData.remark = this.remark
            if (this.action == "review") {
                this.postReview(formData)
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
        review(e,i){
            const formData = {
                "status":e,
                "code":i
            }
            this.action = undefined
            this.remark = undefined
            this.reviewFormData = undefined
            this.action = "review"
            this.visible = true
            this.reviewFormData = formData
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
