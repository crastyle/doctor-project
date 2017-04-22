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
import {bus} from './bus'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    message: ''
  }
})
// import "vconsole"
Vue.config.productionTip = false

resource.interceports()
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted() {
    if (this.$route.name != 'Login') {
      base.getopenId()
    }
  },
  created() {
    let _this = this
    resource.rongyunAppKey().then(res => {
      if (res.body.code == 0) {
        base.initIm(res.body.result.appKey)
        resource.newtoken({ userGid: '156e6fe21f5f45dbb1198d1bc3223cd6' }).then(res => {
          if (res.body.code == 0) {
            base.watchIM()
            _this.receiveMsg()
            base.connectIM(res.body.result.token)
          }
        })
      }
    })
  },
  methods: {
    receiveMsg() {
      let _this = this
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          // 判断消息类型
          store.state.message = message
          _this.$refs.receiveMsg(message)
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
