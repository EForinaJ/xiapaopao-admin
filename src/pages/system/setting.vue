<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 13:45:05
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-18 20:21:28
 * @FilePath: \back\src\pages\system\setting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-card :bordered="false">
       <a-tabs @change="callback" type="card" default-active-key="1">
            <a-tab-pane tab="基础设置" key="1">
              <base-setting />
            </a-tab-pane>
            <a-tab-pane tab="登录设置" key="2">
              <AuthSetting />
            </a-tab-pane>
            <a-tab-pane tab="用户设置" key="3">
              <UserSetting />
            </a-tab-pane>
            <a-tab-pane tab="文件设置" key="4">
              <file-setting />
            </a-tab-pane>
            <a-tab-pane tab="支付设置" key="5">
              <PaySetting />
            </a-tab-pane>
            <a-tab-pane tab="积分经验设置" key="6">
              <IntegralExperienceSetting />
            </a-tab-pane>
            <a-tab-pane tab="Apex设置" key="7">
              <ApexSetting />
            </a-tab-pane>
        </a-tabs>
  </a-card>
</template>
<script>
import BaseSetting from "./components/BaseSetting"
import FileSetting from "./components/FileSetting"
import AuthSetting from "./components/AuthSetting"
import UserSetting from "./components/UserSetting"
import PaySetting from "./components/PaySetting"
import IntegralExperienceSetting from "./components/IntegralExperienceSetting"
import ApexSetting from "./components/ApexSetting"


export default {
  components:{
    ApexSetting,
    BaseSetting,
    FileSetting,
    AuthSetting,
    UserSetting,
    PaySetting,
    IntegralExperienceSetting,
  },
  data() {
    return {

    }
  },
  methods: {
    callback(key) {
      // console.log(key);
    },
  },
};
</script>
