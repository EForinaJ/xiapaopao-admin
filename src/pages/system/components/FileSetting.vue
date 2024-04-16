<template>
    <div class="setting">
        <!-- <div class="setting-item">
            <div class="setting-input">
                <span>上传空间</span>
                    <a-radio-group v-model="engine" class="setting-input">
                    <a-radio value="local">
                        本地
                    </a-radio>
                    <a-radio value="aly">
                        阿里云oss
                    </a-radio>
                   
                </a-radio-group>
            </div>
            <p>请配置好对应的配置信息（注意：如果设置为oss第三方引擎上传，<br/>
            则内置的大文件上传无效，无法支持断点续传以及大文件上传）<br/></p>
        </div> -->

        <div class="setting-item">
            <div class="setting-input">
                <span>上传目录</span>
                <a-input v-model="path" class="setting-content" />
            </div>
            <p>留空，则上传到根目录，默认上传到 uploads 目录</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>小文件上传大小限制</span>
                <a-input v-model="minFileSize" class="setting-content"/>
            </div>
            <p>小文件上传大小限制，单位: M（建议设置为10m）</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>大文件上传大小限制</span>
                <a-input v-model="bigFileSize" class="setting-content"/>
            </div>
            <p>大文件上传大小限制，单位: M</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>图片类型</span>
                <a-input v-model="imageType" class="setting-content" />
            </div>
            <p>如：.png,.jpg 用英文逗号隔开</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>音频类型</span>
                <a-input v-model="audioType" class="setting-content" />
            </div>
            <p>如：.mp3,.wav 用英文逗号隔开</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>视频类型</span>
                <a-input v-model="videoType" class="setting-content" />
            </div>
            <p>如：.mp4,.mod 用英文逗号隔开</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>其他类型</span>
                <a-input v-model="otherType" class="setting-content" />
            </div>
            <p>如：.crt 用英文逗号隔开</p>
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
            path:null,
            engine: null,
            minFileSize: null,
            bigFileSize: null,
            imageType: null,
            audioType: null,
            videoType: null,
            otherType: null,
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            
            const res = await Info("FileSetting")  
            if (res.data.info != null) {
                const value = JSON.parse(res.data.info)
                // console.log(value)
          
                value.imageType = value.imageType.join(',')
                value.audioType = value.audioType.join(',')
                value.videoType = value.videoType.join(',')
                value.otherType = value.otherType.join(',')
    
                this.path = value.path
                this.engine = value.engine
                this.minFileSize = value.minFileSize
                this.bigFileSize = value.bigFileSize
                this.imageType = value.imageType
                this.audioType = value.audioType
                this.videoType = value.videoType
                this.otherType = value.otherType
            }
        },
        handleSubmit(){
            this.$confirm({
                content: this.$t('confirm.content.text'),
                onOk:() => {
                    let imageType = this.imageType == null ? "[]" : this.imageType.split(',');
                    let audioType = this.audioType == null ? "[]" : this.audioType.split(',');
                    let videoType = this.videoType == null ? "[]" : this.videoType.split(',');
                    let otherType = this.otherType == null ? "[]" : this.otherType.split(',');
                    const options = {
                        engine:this.engine,
                        path:this.path,
                        minFileSize: this.minFileSize,
                        bigFileSize:this.bigFileSize,
                        imageType: imageType,
                        audioType: audioType,
                        videoType: videoType,
                        otherType: otherType,
                    }
                    const config = {
                        "configValue":JSON.stringify(options),
                        "configKey": "FileSetting",
                        "configName": "文件设置",
                        "remark" : "文件设置"
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