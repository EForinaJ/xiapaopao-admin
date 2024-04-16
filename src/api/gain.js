import { axios } from '@/utils/request'
import api from './index'


// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getGainList,
        method: 'get',
        params: parameter
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeleteGain,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewGain,
        method: 'post',
        data: formData
    })
}