<template>
    <div class="container">
        <a-table 
            :rowKey="record=>record.id"
            :pagination="false"
            :columns="columns" 
            :dataSource="list"
        >
        <span slot="icon" slot-scope="icon,record">
            <img class="icon" :src="icon" :alt="record.title">
        </span>

        <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
            <a-descriptions>
                <a-descriptions-item 
                label="权限">
                    <span v-for="(item) in record.auth" :key="item">
                        {{item | resetAuth}}
                    </span>
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <span slot="action" slot-scope="text, record">
            <a v-action="'/grade/edit'" @click="edit(record.id)">编辑</a>
        </span>
        </a-table>
        <a-modal v-model="visible" 
            title="等级内容修改"
            @ok="handleOk">
            <a-form-model 
            ref="form" :model="form" :rules="form.rules">
            <a-form-model-item
                ref="title" 
                prop="title">
                <a-input
                    size="large"
                    type="text"
                    placeholder="等级标题"
                    v-model="form.title"
                >
                </a-input>
            </a-form-model-item>
            <a-form-model-item 
                ref="next" 
                prop="next">
                <a-input-number
                    size="large" 
                    v-model="form.next"
                    placeholder="下一级的id"
                    :style="{ width: '100%' }"
                    :min="0"
                />
            </a-form-model-item>
            <a-form-model-item 
                ref="experience" 
                prop="experience">
                <a-input-number
                    size="large" 
                    v-model="form.experience"
                    placeholder="升级所需经验"
                    :style="{ width: '100%' }"
                    :min="0"
                />
            </a-form-model-item>
            <a-form-model-item 
                ref="icon" 
                prop="icon">
                <div class="upload-icon">
                    <a-input
                        size="large"
                        type="text"
                        placeholder="等级图标"
                        v-model="form.icon"
                    />
                    <a-button v-action="'/media/upload'" class="form-button" @click="upload" size="large" type="primary" style="margin-left: 10px;">
                        上传
                    </a-button>
                </div>
            </a-form-model-item>

            <!-- 权限 -->
            <a-form-model-item
                ref="auth" 
                prop="auth">
                <a-select mode="multiple" 
                    size="large"
                    placeholder="权限"
                    v-model="form.auth">
                    <a-select-option value="post">
                        投稿
                    </a-select-option>
                    <a-select-option value="article">
                        文章
                    </a-select-option>
                    <a-select-option value="like">
                        点赞
                    </a-select-option>
                    <a-select-option value="comment">
                        评论
                    </a-select-option>
                    <a-select-option value="favorite">
                        收藏
                    </a-select-option>
                    <a-select-option value="message">
                        私信
                    </a-select-option>
                    <a-select-option value="upload">
                        上传
                    </a-select-option>
                    <a-select-option value="follow">
                        关注
                    </a-select-option>
                    <a-select-option value="report">
                        举报
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { Remove,EditInfo,Edit } from '@/api/grade'
export default {
    props:{
        list:{
            type:Array,
                // 当为数组类型设置默认值时必须使用数组返回
            required:true,
            default: []
        },
    },
    filters:{
        resetAuth (e) {
            switch (e) {
                case "post":
                    return "投稿"
                case "wiki":
                    return "百科"
                case "like":
                    return "点赞"
                case "comment":
                    return "评论"
                case "favorite":
                    return "收藏"
                case "message":
                    return "私信"
                case "upload":
                    return "上传"
                case "report":
                    return "举报"
                case "suggest":
                    return "意见反馈"
                case "follow":
                    return "关注"
            }
        },
    },
    data() {
        return {
            visible:false,
            // 表格
            columns:[
                {
                    title: "编号",
                    dataIndex: 'id',
                },
                {
                    title: "标题",
                    dataIndex: 'title',
                },
                {
                    title: "下一级",
                    dataIndex: 'next',
                },
                {
                    title: "所需经验",
                    dataIndex: 'experience',
                },
                {
                    title: "图标",
                    dataIndex: 'icon',
                    scopedSlots: { customRender: 'icon' }
                },
                {
                    title: "操作",
                    width: '150px',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            form:{
                gradeId: undefined,
                title:undefined,
                experience:undefined,
                icon:undefined,
                next:undefined,
                auth:undefined,
                rules:{
                    title:[
                        { required: true, message: "请输入标题", trigger: 'blur' },
                    ],
                    icon:[
                        { required: true, message: "请上传图标", trigger: 'blur' },
                    ],
                },
            }
        }
    },
    methods: {
        async edit(e){
            const editInfo = await EditInfo({id:e})
            if (editInfo.code != 1) {
                this.$router.push({path:'/404'})
            }
            this.form = Object.assign(this.form,editInfo.data.info)
            this.form.gradeId = e
            if (this.form.auth.length < 1) {
                this.form.auth = undefined
            }
            this.visible = true
        },
        upload(){
            this.visible = false
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.icon = res
                    this.visible = true
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        handleOk(){
            this.$confirm({
                title: "正在修改",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.postEdit(this.form)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
            this.visible = false
        },
        batchRemove(){
            this.$confirm({
                okText: this.$t('confirm.ok.text'),
                cancelText:this.$t('confirm.cancel.text'),
                title: this.$t('confirm.remove.title.text'),
                content: this.$t('confirm.remove.content.text'),
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
                okText: this.$t('confirm.ok.text'),
                cancelText:this.$t('confirm.cancel.text'),
                title: this.$t('confirm.remove.title.text'),
                content: this.$t('confirm.remove.content.text'),
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
.icon{
    width: 50px;
    height: 50px;
}
</style>
