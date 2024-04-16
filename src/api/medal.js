/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2023-06-30 14:13:23
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-10-06 01:11:12
 * @FilePath: \back\src\api\Medal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axios } from '@/utils/request'
import api from './index'

/* eslint-disable */
export function ByMedalModule (formData) {
    return axios({
        url: api.getMedalByModule,
        method: 'get',
        params: formData
    })
}



// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getMedalList,
        method: 'get',
        params: parameter
    })
}



/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postMedalCreate,
        method: 'post',
        data: formData
    })
}

// 
/* eslint-disable */
export function EditInfo (parameter) {
    return axios({
        url: api.getMedalEditInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Edit (formData) {
    return axios({
        url: api.postMedalEdit,
        method: 'post',
        data: formData
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postMedalDelete,
        method: 'post',
        data: formData
    })
}