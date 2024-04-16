import { axios } from '@/utils/request'
import api from './index'

// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getIntegralList,
        method: 'get',
        params: parameter
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeleteIntegral,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewIntegral,
        method: 'post',
        data: formData
    })
}
