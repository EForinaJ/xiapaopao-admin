<template>
    <div class="select-box">
        <a-form-model ref="selectForm" :model="selectForm" :rules="selectForm.rules" layout="inline">
            <a-form-model-item ref="title" prop="title">
                <a-input
                    size="large"
                    type="text"
                    placeholder="请输入勋章标题"
                    v-model="selectForm.title"
                >
                </a-input>
            </a-form-model-item>
            <a-form-model-item ref="isTop" prop="isTop">
                <a-select 
                    :style="{ width: 200 + 'px' }"
                    size="large"
                    v-model="selectForm.isTop" 
                    placeholder="请选择版块是否推荐">
                    <a-select-option :value="1">
                        否
                    </a-select-option>
                    <a-select-option :value="2">
                        是
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button v-action="'/forum/list'" @click="reset" style="margin-left: 10px;">
                    重置
                </a-button>
                <a-button v-action="'/forum/list'" @click="select" type="primary" style="margin-left: 10px;">
                    查询
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectForm:{
                title:undefined,
                isAll:undefined,
                rules:{},
            }
        }
    },
    methods:{
        reset(){
            this.selectForm.title = undefined
            this.selectForm.isAll = undefined
            this.$emit("select",this.selectForm)
        },
        select(){
            this.$emit("select",this.selectForm)
        }
    }
}
</script>

<style lang="less" scoped>
.select-box{
    margin-bottom: 10px;
}
</style>