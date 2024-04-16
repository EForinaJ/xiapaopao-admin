<template>
    <div class="setting">
        <div class="setting-item">
            <div class="setting-input">
                <span>赛季标题</span>
                <a-input v-model="season" class="setting-content" />
            </div>
            <p>赛季主题名称</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>赛季图标</span>
                <a-input v-model="icon" class="setting-content" />
            </div>
            <p>赛季主题图标</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>赛季</span>
                <a-input v-model="number" class="setting-content"/>
            </div>
            <p>当前第几赛季</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>结束时间</span>
                <a-input v-model="endTime" class="setting-content"/>
            </div>
            <p>当前赛季结束时间</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>排位结束时间</span>
                <a-input v-model="rankEndTime" class="setting-content" />
            </div>
            <p>当前赛季排位结束时间</p>
        </div>
        <div v-action="'/system/save'" class="setting-item">
            <a-button @click="handleSubmit" type="primary" class="setting-save">
            保存
            </a-button>
        </div>
    </div>
</template>

<script>
import { Save,Info } from '@/api/system'
export default {
    data(){
        return{
            season:null,
            icon: null,
            number: null,
            endTime: null,
            rankEndTime: null,
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            
            const res = await Info("ApexSetting")  
            if (res.data.info != null) {
                const value = JSON.parse(res.data.info)
                this.season = value.season
                this.icon = value.icon
                this.number = value.number
                this.endTime = value.endTime
                this.rankEndTime = value.rankEndTime
            }
        },
        handleSubmit(){
            this.$confirm({
                content: this.$t('confirm.content.text'),
                onOk:() => {
                
                    const options = {
                        season:this.season,
                        icon:this.icon,
                        number: this.number,
                        endTime:this.endTime,
                        rankEndTime:this.rankEndTime,
                    }
                    const config = {
                        "configValue":JSON.stringify(options),
                        "configKey": "ApexSetting",
                        "configName": "Apex设置",
                        "remark" : "rankEndTime"
                    }
                   
                    this.CreatePost(config)
                },
                onCancel() {},
            });
        },
        async CreatePost(value){
            try {
                const data = await Save(value)
                if (data.code == 1) {
                    this.$message.success(
                        data.message,
                        3
                    )
                } else {
                    this.$message.error(
                        data.message,
                        3
                    )
                }
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
    }
}
</script>
<style lang="less" scoped>
.setting{
    .setting-item{
        width: 520px;
        margin-top: 20px;
        .setting-input{
            display: flex;
            justify-content: space-between;
            // align-items: center;
            span{
                width: 200px;
                font-size: 14px;
                font-weight: 700;
            }
            .setting-content{
                margin-left: 20px;
                width: 400px;
            }
        }
        p{
            text-align: right;
            margin-top: 10px;
            font-size: 12px;
        }
        .setting-save{
            margin-right: 20px;
        }
    }
    
}
</style>