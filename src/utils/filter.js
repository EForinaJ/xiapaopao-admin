/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 13:45:06
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-06-29 02:24:50
 * @FilePath: \back\src\utils\filter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('resetImage', function (v,w = null,h = null) {
  if (w == null || h == null) { 
      return v;
  }
  v = v+`@w${w}_h${h}`
  return v;
})