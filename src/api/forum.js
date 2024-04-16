import { axios } from '@/utils/request'
import api from './index'

// 获取列表
/* eslint-disable */
export function All (parameter) {
    return axios({
        url: api.getForumAll,
        method: 'get',
        params: parameter
    })
}



// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getForumList,
        method: 'get',
        params: parameter
    })
}



/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postForumCreate,
        method: 'post',
        data: formData
    })
}

// 
/* eslint-disable */
export function EditInfo (parameter) {
    return axios({
        url: api.getForumEditInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Edit (formData) {
    return axios({
        url: api.postForumEdit,
        method: 'post',
        data: formData
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postForumDelete,
        method: 'post',
        data: formData
    })
}