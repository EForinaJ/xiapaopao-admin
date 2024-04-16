<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2023-06-30 15:21:13
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-13 19:39:08
 * @FilePath: \back\src\pages\announcement\list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <a-card :bordered="false">
        <Select 
            @select="select"
        />
        <Table 
            :list="list"
            :total="total"
            :pageSize="query.limit"
            :current="query.page"
            @changePage="changePage"
            @getData="getData"
        />
    </a-card>
</template>

<script>
import Select from "./components/select"
import Table from "./components/table"
import { List } from '@/api/announcement'
export default {
    name: 'announcementList',
    components:{
        Select,
        Table
    },
    data(){
        return{
            // formType:"create",
            query:{
                page:1,
                limit:10,
                title:"",
                alias:""
            },
            list:[],
            total:0
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            const res = await List(this.query)
            this.list = res.data.list
            this.total = res.data.total
        },
        changePage(e){
            this.query.page = e.current
            this.query.limit = e.pageSize
            this.getData()
        },
        select(e){
            this.query.title = e.title
            this.query.isAll = e.isAll
            this.getData()
        },
        // changeFormType(e){
        //     this.formType = e.type
        //     // this.formType = e
        // }
    }
}
</script>

<style lang="less" scoped>

</style>