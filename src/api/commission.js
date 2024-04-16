import { axios } from '@/utils/request'
import api from './index'


// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getCommissionList,
        method: 'get',
        params: parameter
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeleteCommission,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewCommission,
        method: 'post',
        data: formData
    })
}

/* eslint-disable */
export function Payment (formData) {
    return axios({
        url: api.postPaymentCommission,
        method: 'post',
        data: formData
    })
}