// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// rem
import './flexble.js'
// mint-ui
import 'mint-ui/lib/style.css'
import "./styles/reset-ui.scss"
import resource from './resource'
import base from './base'
import { bus } from './bus'
import Vuex from 'vuex'

import "vconsole"
Vue.config.productionTip = false

resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    let _this = this
    let route = this.$route.name
    if (route !== 'Login') {
      // 如果是在注册页面，让他授权登录
      resource.userInfo().then(res => {
        if (res.body.code == 0) {
          let userid = res.body.result.userGid
          let rongyunToken = res.body.result.rongyunToken
          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
              if (!rongyunToken) {
                base.watchIM()
                base.receiveMsg()
                base.connectIM(rongyunToken)
                bus.$emit('imLoad')
              } else {
                resource.newtoken({ userGid: userid }).then(res => {
                  if (res.body.code == 0) {
                    base.watchIM()
                    base.receiveMsg()
                    base.connectIM(res.body.result.token)
                    bus.$emit('imLoad')
                  }
                })
              }
            }
          })
          //检测用户状态 绑定医生？激活月视图？
          resource.checkStatus().then(res => {
            if (res.body.result.activeRemindStatus == 1) {
              _this.$router.replace('keep')
            } else if (res.body.result.activeRemindStatus == 0) {
              _this.$router.replace('activePlan')
            } else if (res.body.result.bindDoctorStatus == 0) {
              _this.$router.replace('bindid')
            } 

          })
        } else {
          _this.$router.replace('login')
        }
      })
    }
  }
})
