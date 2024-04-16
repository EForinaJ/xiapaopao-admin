<template>
    <div class="setting">
        <div class="setting-item">
            <div class="setting-input">
                <span>积分兑换</span>
                <a-input-number class="setting-content"  
                v-model="moneyToIntegral" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>1元人民币兑换多少积分。</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>新用户注册</span>
                <a-input-number class="setting-content"  
                v-model="register" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>奖励对象：注册者。首次注册时奖励。</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>签到</span>
                <a-input class="setting-content"  
                v-model="signIn" 
                />
            </div>
            <p>奖励对象：当前登录用户，登录用户每日签到将会随机获得积分，<br/>如果是固定值请使用 xx-xx 例如 100-100（中间横杠不可缺失）</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>发布内容</span>
                <a-input-number class="setting-content"  
                v-model="createPost" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="postCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：内容作者。<br/>内容发布包括：帖子</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>发布评论</span>
                <a-input-number class="setting-content"  
                v-model="createComment" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="commentCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：评论作者。</p>
        </div>
        <div class="setting-item">
            <div class="setting-input">
                <span>被点赞收藏</span>
                <a-input-number class="setting-content"  
                v-model="like" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="likeCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：被点赞内容作者。</p>
        </div>

        <div class="setting-item">
            <div class="setting-input">
                <span>被点赞收藏</span>
                <a-input-number class="setting-content"  
                v-model="favorite" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="favoriteCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：被收藏内容作者。</p>
        </div>

        <div class="setting-item">
            <div class="setting-input">
                <span>被关注</span>
                <a-input-number class="setting-content"  
                v-model="follow" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="followCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/> 奖励对象：被关注获得</p>
        </div>

        <div class="setting-item">
            <div class="setting-input">
                <span>举报内容</span>
                <a-input-number class="setting-content"  
                v-model="report" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="reportCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：举报成功删除内容的举报人。</p>
        </div>

        <div class="setting-item">
            <div class="setting-input">
                <span>帖子精华</span>
                <a-input-number class="setting-content"  
                v-model="postEssence" 
                  :min="0" :max="9999" :precision="0"/>
                  <a-input-number class="setting-content"  
                v-model="postEssenceCount" 
                  :min="0" :max="9999" :precision="0"/>
            </div>
            <p>左边输入奖励积分，右边输入当日奖励次数 <br/>奖励对象：内容作者。</p>
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
            moneyToIntegral: 50,

            register:260,
            signIn:"50-90",

            createPost:50,
            postCount:2,

            createComment:50,
            commentCount:2,

            like:50,
            likeCount:2,

            favorite:50,
            favoriteCount:2,

            follow:50,
            followCount:2,

            report:50,
            reportCount:2,

            postEssence:50,
            postEssenceCount:2,
        }
    },
    created(){
        this.getData()
    },
    methods:{
        
        async getData(){
            const res = await Info("IntegralAndExperienceSetting")  
            if (res.data.info != null) {
                const value = JSON.parse(res.data.info)
                // Object.assign(this,value)

                this.moneyToIntegral = value.moneyToIntegral
                this.register = value.register
                this.signIn = value.signIn

                this.createPost = value.createPost
                this.postCount = value.postCount

                this.createComment = value.createComment
                this.commentCount = value.commentCount

                this.like = value.like
                this.likeCount = value.likeCount

                this.favorite = value.favorite
                this.favoriteCount = value.favoriteCount

                this.follow = value.follow
                this.followCount = value.followCount

                this.report = value.report
                this.reportCount = value.reportCount

                this.postEssence = value.postEssence
                this.postEssenceCount = value.postEssenceCount
            }

        },
        handleSubmit(){
            this.$confirm({
                content: this.$t('confirm.content.text'),
                onOk:() => {
                    const options = {
                        moneyToIntegral : this.moneyToIntegral,
                        
                        register : this.register,
                        signIn : this.signIn,

                        createPost : this.createPost,
                        postCount : this.postCount,

                        createComment : this.createComment,
                        commentCount : this.commentCount,

                        like : this.like,
                        likeCount : this.likeCount,

                        favorite : this.favorite,
                        favoriteCount : this.favoriteCount,

                        follow : this.follow,
                        followCount : this.followCount,

                        report : this.report,
                        reportCount : this.reportCount,

                        postEssence : this.postEssence,
                        postEssenceCount : this.postEssenceCount,
                    }
                    const config = {
                        "configValue":JSON.stringify(options),
                        "configKey": "IntegralAndExperienceSetting",
                        "configName": "积分设置",
                        "remark" : "积分设置"
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
            align-items: center;
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
        .setting-upload{
            display: flex;
            justify-content: flex-end;
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
