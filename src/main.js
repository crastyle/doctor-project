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
import VueTouch from 'vue-touch'
import { Toast } from 'mint-ui'
// import 'vconsole'
Vue.config.productionTip = false
Vue.use(VueTouch, { name: 'v-touch' })
Vue.prototype.$static = 'http://localhost:8080/static/'
resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    let _this = this
    let route = this.$route.name
    let toast = ''
    if (route !== 'Login' && route !== 'Cropper' && route !== 'Register') {
      if (!localStorage.getItem('userid')) {
        toast = Toast({
          message: '您还没有注册',
          duration: 2000
        })
        setTimeout(() => {
          _this.$router.replace('/')
        }, 2000)
      } else {
        resource.userInfo().then(res => {
          if (res.body.code == 0) {
            let userid = res.body.result.userGid
            let rongyunToken = res.body.result.rongyunToken
            resource.rongyunAppKey().then(res => {
              if (res.body.code == 0) {
                base.initIm(res.body.result.appKey)
                resource.newtoken({ userGid: userid }).then(res => {
                  if (res.body.code == 0) {
                    base.watchIM()
                    base.receiveMsg()
                    let token = res.body.result.token
                    base.connectIM(token, function () {
                      window.onLoadingIMStatus = true
                      bus.$emit('imLoad', token)
                    })
                  }
                })
              }
            })
          } else {
            toast = Toast({
              message: '您还没有注册',
              duration: 2000
            })
            setTimeout(() => {
              _this.$router.replace('/')
            }, 2000)
          }
        })
      }
    }
  }
})
