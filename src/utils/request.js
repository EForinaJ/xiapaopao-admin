/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 13:45:06
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-07-25 10:33:53
 * @FilePath: \back\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: "https://aipaikesi.com",
  timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  // 拦截路由跳转
  if (response.data.code != 1) {
    notification.error({
      message: 'Forbidden',
      description: response.data.message
    })
  }

  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
