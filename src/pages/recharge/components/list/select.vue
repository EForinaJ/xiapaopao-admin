<template>
    <div class="select-box">
        <a-form-model ref="selectForm" :model="selectForm" :rules="selectForm.rules" layout="inline">
            <a-form-model-item ref="code" prop="code">
                <a-input
                    size="large"
                    type="text"
                    placeholder="编号"
                    v-model="selectForm.code"
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
                        充值成功
                    </a-select-option>
                    <a-select-option  :value="3">
                        充值失败
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button v-action="'/recharge/list'" @click="reset" style="margin-left: 10px;">
                    重置
                </a-button>
                <a-button v-action="'/recharge/list'" @click="select" type="primary" style="margin-left: 10px;">
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
            cateList:[],
            selectForm:{
                status:undefined,
                code:undefined,
            }
        }
    },
    mounted(){
    },
    methods:{
        reset(){
            this.selectForm.status = undefined
            this.selectForm.code = undefined
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