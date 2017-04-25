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

    let code = base.getUrlparams('code')
    // let ls_openId = 'oipgNwtZu3Pzr9seSLMtKH7EJ2mg'
    let _this = this
    /**
     * 进入程序，获取appid，获得code
     * 通过code获得openid，拿到openid去判断用户是否绑定了手机号码
     * 如果绑定了手机号码，再去判断用户是否激活了月视图以及绑定了医生
     * 如果绑定了手机号码，开启im监听流程
     * 如果没有绑定，进入注册页面
     */
    if (!code) {
      resource.jsApiConfig().then(res => {
        let redirect_uri = encodeURIComponent(location.href)
        let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
        window.location.href = codeUrl
      })
    } else {
      resource.oath({ code: code }).then(res => {
        if (res.body.code == 0) {
          let openId = res.body.result.openId
          return resource.checkBind({ openId: openId })
        } else {
          resource.jsApiConfig().then(res => {
            let redirect_uri = encodeURIComponent(location.href)
            let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
            window.location.href = codeUrl
          })
        }

      }).then(res => {
        if (res.body.result.bind) {

          window.localStorage.setItem('userid', res.body.result.u)
          window.localStorage.setItem('token', res.body.result.t)
          let userid = res.body.result.u
          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
              resource.newtoken({ userGid: userid }).then(res => {
                if (res.body.code == 0) {
                  base.watchIM()
                  _this.receiveMsg()
                  base.connectIM(res.body.result.token)
                }
              })
            }
          })
          //检测用户状态 绑定医生？激活月视图？
          resource.checkStatus().then(res => {
            if (res.body.result.bindDoctorStatus == 0) {
              _this.$router.replace('bindid')
            } else if (res.body.result.activeRemindStatus == 1) {
              _this.$router.replace('keep')
            } else if (res.body.result.activeRemindStatus == 0) {
              _this.$router.replace('activePlan')
            }

          })
        } else {
          _this.$router.push({ name: 'Login', query: { openId: res.body.result.openId } })
        }
      })
    }

    //////


  },
  methods: {
    receiveMsg() {
      let _this = this
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          // 判断消息类型
          bus.$emit('receiveMsg', message)
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              // 发送的消息内容将会被打印
              console.log(message.content.content);
              break;
            case RongIMClient.MessageType.VoiceMessage:
              // 对声音进行预加载                
              // message.content.content 格式为 AMR 格式的 base64 码
              RongIMLib.RongIMVoice.preLoaded(message.content.content);
              break;
            case RongIMClient.MessageType.ImageMessage:
              // do something...
              break;
            case RongIMClient.MessageType.UnknownMessage:
              // do something...
              break;
            default:
            // 自定义消息
            // do something...
          }
        }
      })
    }
  }
})
