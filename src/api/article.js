/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2023-06-30 17:34:45
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-01-31 01:19:30
 * @FilePath: \back\src\api\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/Article/%E9%85%8D%E7%BD%AE
 */
import { axios } from '@/utils/request'
import api from './index'

/* eslint-disable */
export function Info (parameter) {
    return axios({
        url: api.getArticleInfo,
        method: 'get',
        params: parameter
    })
}

/* eslint-disable */
export function Meta (parameter) {
    return axios({
        url: api.getArticleMeta,
        method: 'get',
        params: parameter
    })
}

/* eslint-disable */
export function Create (formData) {
    return axios({
        url: api.postArticleCreate,
        method: 'post',
        data: formData
    })
}


// 获取列表
/* eslint-disable */
export function List (parameter) {
    return axios({
        url: api.getArticleList,
        method: 'get',
        params: parameter
    })
}


// 还原
/* eslint-disable */
export function Reduction (formData) {
    return axios({
        url: api.postReductionArticle,
        method: 'post',
        data: formData
    })
}


// 删除
/* eslint-disable */
export function Delete (formData) {
    return axios({
        url: api.postDeleteArticle,
        method: 'post',
        data: formData
    })
}

// 删除
/* eslint-disable */
export function Remove (formData) {
    return axios({
        url: api.postRemoveArticle,
        method: 'post',
        data: formData
    })
}



/* eslint-disable */
export function Review (formData) {
    return axios({
        url: api.postReviewArticle,
        method: 'post',
        data: formData
    })
}


/* eslint-disable */
export function Authentication (formData) {
    return axios({
        url: api.postAuthenticationArticle,
        method: 'post',
        data: formData
    })
}

// 
/* eslint-disable */
export function EditInfo (parameter) {
    return axios({
        url: api.getArticleEditInfo,
        method: 'get',
        params: parameter
    })
}


/* eslint-disable */
export function Edit (formData) {
    return axios({
        url: api.postArticleEdit,
        method: 'post',
        data: formData
    })
}