<template>
    <div class="select-box">
        <a-form-model ref="selectForm" :model="selectForm" :rules="selectForm.rules" layout="inline">
            <a-form-model-item ref="id" prop="id">
                <a-input
                    size="large"
                    type="text"
                    placeholder="请输入编号"
                    v-model="selectForm.id"
                >
                </a-input>
            </a-form-model-item>
            <a-form-model-item ref="status" prop="status">
                <a-select v-model="selectForm.status" 
                    :style="{width:200 + 'px'}"
                    size="large"
                    placeholder="状态">
                    <a-select-option  :value="1">
                        待审核
                    </a-select-option>
                    <a-select-option  :value="2">
                        已认证
                    </a-select-option>
                    <a-select-option  :value="3">
                        未通过
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item ref="isRemove" prop="isRemove">
                <a-select v-model="selectForm.isRemove" 
                    :style="{width:200 + 'px'}"
                    size="large"
                    placeholder="回收站">
                    <a-select-option  :value="1">
                        回收站否
                    </a-select-option>
                    <a-select-option  :value="2">
                        回收站是
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button v-action="'/post/list'" @click="reset" style="margin-left: 10px;">
                    重置
                </a-button>
                <a-button v-action="'/post/list'" @click="select" type="primary" style="margin-left: 10px;">
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
                id:undefined,
                status:undefined,
                isRemove:1,
                rules:{},
            }
        }
    },
    methods:{
        reset(){
            this.selectForm.id = undefined
            this.selectForm.status = undefined
            this.selectForm.isRemove = 1
            this.$emit("select",this.selectForm)
        },
        select(){
            this.$emit("select",this.selectForm)
        },
    }
}
</script>

<style lang="less" scoped>
.select-box{
    margin-bottom: 10px;
}
</style>