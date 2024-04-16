<template>
    <div class="container">
        <div class="top">
            <a-row :gutter="40">
                <a-col :span="12">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div class="text">
                                用户总数：
                            </div>
                            <div class="nrumber">
                                <a-statistic 
                                :value="112893" 
                                valueStyle="font-size: 38px;"
                                style="margin-right: 50px" >
                                    <template #prefix>
                                        <a-icon type="user" />
                                    </template>
                                </a-statistic>
                            </div>
                        </div>
                        <div class="charts" id="userChart" ></div>
                    </a-card>
                </a-col>
                <a-col :span="12">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div class="text">
                                用户总数：
                            </div>
                            <div class="nrumber">
                                <a-statistic 
                                :value="112893" 
                                valueStyle="font-size: 38px;"
                                style="margin-right: 50px" >
                                    <template #prefix>
                                        <a-icon type="user" />
                                    </template>
                                </a-statistic>
                            </div>
                        </div>
                        <div class="charts" id="userChart" ></div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <div class="center">
            <a-row :gutter="40">
                <a-col :span="6">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div>待审核提现</div>
                            <a-tooltip>
                                <template slot="title">
                                prompt text
                                </template>
                                <a-icon type="info-circle" />
                            </a-tooltip>
                        </div>
                        <div class="number">
                            <a-statistic 
                            :value="112893" 
                            valueStyle="font-size: 38px;"
                            style="margin-right: 50px" >
                            </a-statistic>
                        </div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div>待审核充值</div>
                            <a-tooltip>
                                <template slot="title">
                                prompt text
                                </template>
                                <a-icon type="info-circle" />
                            </a-tooltip>
                        </div>
                        <div class="number">
                            <a-statistic 
                            :value="112893" 
                            valueStyle="font-size: 38px;"
                            style="margin-right: 50px" >
                            </a-statistic>
                        </div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div>待审核帖子</div>
                            <a-tooltip>
                                <template slot="title">
                                prompt text
                                </template>
                                <a-icon type="info-circle" />
                            </a-tooltip>
                        </div>
                        <div class="number">
                            <a-statistic 
                            :value="112893" 
                            valueStyle="font-size: 38px;"
                            style="margin-right: 50px" >
                            </a-statistic>
                        </div>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="false">
                        <div class="text-box">
                            <div>待审核举报</div>
                            <a-tooltip>
                                <template slot="title">
                                prompt text
                                </template>
                                <a-icon type="info-circle" />
                            </a-tooltip>
                        </div>
                        <div class="number">
                            <a-statistic 
                            :value="112893" 
                            valueStyle="font-size: 38px;"
                            style="margin-right: 50px" >
                            </a-statistic>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    data(){
        
        return{
            userChart: null,
            option : {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [120, 200, 150, 80, 70, 110, 130,800],
                    type: 'bar'
                    }
                ]
            }
        }   
    },
    mounted(){
        this.draBar()
    },
    methods:{
        draBar(){
            this.userChart = echarts.init(document.getElementById("userChart"))
            this.userChart.setOption(this.option)
            window.addEventListener("resize",this.userChart.resize)
        }
    }
}
</script>

<style lang="less" scoped>
.top{
    .text-box{
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .text{
            font-size: 38px;
        }
    }
    .charts{
        width: 100%;
        height:400px;
    }
}
.center{
    margin-top: 20px;
    .text-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        
    }
    .number{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.072);
    }
    .today{
        margin-top: 10px;
        display: flex;
        align-items: center;
    }
}
.ver{
    margin-top: 20px;
    
}
</style>