<template>
    <div class="select-box">
        <a-form-model ref="selectForm" :model="selectForm" :rules="selectForm.rules" layout="inline">
            <a-form-model-item ref="connectMode" prop="connectMode">
                <a-select v-model="selectForm.connectMode" 
                    :style="{width:200 + 'px'}"
                    size="large"
                    placeholder="请选择联系方式">
                    <a-select-option  :value="1">
                        qq
                    </a-select-option>
                    <a-select-option  :value="2">
                        微信
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item ref="connectNumber" prop="connectNumber">
                <a-input
                    size="large"
                    type="text"
                    placeholder="请输入联系号码"
                    v-model="selectForm.connectNumber"
                >
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button v-action="'/card/list'" @click="reset" style="margin-left: 10px;">
                    重置
                </a-button>
                <a-button v-action="'/card/list'" @click="select" type="primary" style="margin-left: 10px;">
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
                connectMode:undefined,
                connectNumber:undefined,
            }
        }
    },
    methods:{
        reset(){
            this.selectForm.connectMode = undefined
            this.selectForm.connectNumber = undefined
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