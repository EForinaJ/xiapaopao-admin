<template>
    <div class="container">
        <a-card :bcarded="false">
            <Select  @select="select"/>
            <Table 
                :list="list"
                :total="total"
                :pageSize="query.limit"
                :current="query.page"
                :status="query.status"
                @changePage="changePage"
                @getData="getData"
            />
        </a-card>
    </div>
</template>

<script>
import { List } from '@/api/suggest'
import Select from "./components/select"
import Table from "./components/table"
export default {
    name:"SuggestList",
    components: {
        Select,
        Table
    },
    data() {
        return {
            query:{
                page:1,
                limit:10,
                connectMode:undefined,
                connectNumber:undefined,
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
            this.list = res.data.list == null ? [] : res.data.list
            this.total = res.data.total
        },
        changePage(e){
            this.query.page = e.current
            this.query.limit = e.pageSize
            this.getData()
        },
        select(e){
            this.query.connectMode = e.connectMode
            this.query.connectNumber = e.connectNumber
            this.getData()
        },
    }
}
</script>

<style scoped lang="less">

</style>
