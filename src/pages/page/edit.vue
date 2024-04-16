<template>
    <a-card :bordered="false">
        <div class="box">
            <a-form-model ref="form" :model="form" :rules="form.rules">
                <a-row :gutter="[40,0]">
                    <a-col :span="12">
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
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item 
                        ref="alias" prop="alias">
                            <a-input
                                size="large"
                                type="text"
                                placeholder="请输入别名"
                                v-model="form.alias"
                            >
                            </a-input>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                
                <a-form-model-item>
                    <TinyMceEditor @writeContent="writeContent"   
                    :valueContont="form.content"/>
                </a-form-model-item>

                <a-form-model-item>
                    <a-button v-action="'/category/create'" @click="onSubmit" icon="plus" type="primary" >
                        提交
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </a-card>
</template>

<script>
import { Edit,EditInfo  } from '@/api/page'
import TinyMceEditor from "@/components/Editor/Tinymce"

export default {
    components: {
        TinyMceEditor
    },
    data() {
        return {
            form:{
                title:undefined,
                content:undefined,
                alias:undefined,
                rules:{
                    title:[
                        { required: true, message: "请输入标题", trigger: 'blur' },
                    ],
                    alias:[
                        { required: true, message: "请输入别名", trigger: 'blur' },
                    ],
                },
            },
            id:undefined,
        }
    },
    mounted(){
        if (isNaN(this.$route.query.id)) {
            this.$router.push({path:"/404"})
        }
        this.id = parseInt(this.$route.query.id)
        console.log(this.id)
        this.getData()
    },
    methods: {
        async getData(){
            try {
                const editInfo = await EditInfo({id:this.id})
                if (editInfo.code != 1) {
                    this.$router.push({path:'/404'})
                }
                this.form = Object.assign(this.form,editInfo.data.info)
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        writeContent(e){
            this.form.content = e
        },
        onSubmit(e){
            this.$confirm({
                title: "正在修改",
                content: "请认真检查表单信息",
                onOk:() => {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            this.form.id = this.id
                            this.postEdit(this.form)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postEdit(formData){
            try {
                const res = await Edit(formData)
                if (res.code != 1) {
                   this.$message.error(res.message);
                   return
                }
                this.$router.push({path: '/page/list'});
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
