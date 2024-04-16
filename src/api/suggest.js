import { axios } from '@/utils/request'
import api from './index'


// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getSuggestList,
        method: 'get',
        params: parameter
    })
}


// 删除
/* eslint-disable */
export function Remove (formData) {
    return axios({
        url: api.postSuggestRemove,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postSuggestCreate,
        method: 'post',
        data: formData
    })
}
