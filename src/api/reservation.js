/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2023-06-28 16:54:06
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-08-28 00:51:56
 * @FilePath: \back\src\api\Reservation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axios } from '@/utils/request'
import api from './index'




// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getReservationList,
        method: 'get',
        params: parameter
    })
}

/* eslint-disable */
export function Info (parameter) {
    return axios({
        url: api.getReservationInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postReservationCreate,
        method: 'post',
        data: formData
    })
}

// 
/* eslint-disable */
export function EditInfo (parameter) {
    return axios({
        url: api.getReservationEditInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Edit (formData) {
    return axios({
        url: api.postReservationEdit,
        method: 'post',
        data: formData
    })
}

/* eslint-disable */
export function PayDocumentAndMode (formData) {
    return axios({
        url: api.postPayDocumentAndModeReservation,
        method: 'post',
        data: formData
    })
}



// 删除
/* eslint-disable */
export function Remove (formData) {
    return axios({
        url: api.postRemoveReservation,
        method: 'post',
        data: formData
    })
}

// 还原
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeleteReservation,
        method: 'post',
        data: formData
    })
}

// 验收
/* eslint-disable */
export function CheckAndAccept (formData) {
    return axios({
        url: api.postCheckAndAcceptReservation,
        method: 'post',
        data: formData
    })
}



// 还原
/* eslint-disable */
export function Reduction (formData) {
    return axios({
        url: api.postReductionReservation,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewReservation,
        method: 'post',
        data: formData
    })
}