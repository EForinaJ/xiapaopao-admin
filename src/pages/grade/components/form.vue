<template>
    <div class="box">
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

            <a-form-model-item>
                <a-button v-action="'/grade/create'"   @click="onSubmit" size="large" type="primary" >
                    提交
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import { Create } from '@/api/grade'

export default {
    data() {
        return {
            form:{
                title:undefined,
                experience:undefined,
                icon:undefined,
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
        onSubmit(e){
            this.$confirm({
                title: "正在创建等级",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            console.log(this.form)
                            // this.postCreate(this.form)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        upload(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.form.icon = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        async postCreate(formData){
            try {
                const res = await Create(formData)
                if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.form.title = undefined
                this.form.experience = undefined
                this.form.icon = undefined
                this.form.auth = undefined
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
</style>

