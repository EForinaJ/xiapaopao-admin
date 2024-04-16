import { axios } from '@/utils/request'
import api from './index'



/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postPostCreate,
        method: 'post',
        data: formData
    })
}


// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getPostList,
        method: 'get',
        params: parameter
    })
}


// 还原
/* eslint-disable */
export function Reduction (formData) {
    return axios({
        url: api.postReductionPost,
        method: 'post',
        data: formData
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeletePost,
        method: 'post',
        data: formData
    })
}

// 删除
/* eslint-disable */
export function Remove (formData) {
    return axios({
        url: api.postRemovePost,
        method: 'post',
        data: formData
    })
}



/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewPost,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Top (formData) {
    return axios({
        url: api.postTopPost,
        method: 'post',
        data: formData
    })
}

// 
/* eslint-disable */
export function EditInfo (parameter) {
    return axios({
        url: api.getPostEditInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Edit (formData) {
    return axios({
        url: api.postPostEdit,
        method: 'post',
        data: formData
    })
}