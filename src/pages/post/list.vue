<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2023-06-30 17:34:16
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-14 16:46:23
 * @FilePath: \back\src\pages\player\list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="container">
        <a-card :bplayered="false">
            <Select  @select="select"/>
            <Table 
                :list="list"
                :total="total"
                :pageSize="query.limit"
                :current="query.page"
                :status="query.status"
                :isRemove="query.isRemove"
                @changePage="changePage"
                @getData="getData"
            />
        </a-card>
    </div>
</template>

<script>
import { List } from '@/api/post'
import Select from "./components/select"
import Table from "./components/table"
export default {
    name:"postList",
    components: {
        Select,
        Table
    },
    data() {
        return {
            query:{
                page:1,
                limit:10,
                status:undefined,
                id:undefined,
                isRemove:1,
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
            this.list = res.data.list == null ? [] :  res.data.list
            this.total = res.data.total
        },
        changePage(e){
            this.query.page = e.current
            this.query.limit = e.pageSize
            this.getData()
        },
        select(e){
            this.query.id = e.id
            this.query.status = e.status
            this.query.isRemove = e.isRemove
            this.getData()
        },
    }
}
</script>

<style scoped lang="less">

</style>
