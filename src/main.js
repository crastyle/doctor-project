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
import vueResource from 'vue-resource'
Vue.config.productionTip = false
resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    let code = this.getUrlparams('code')
   
    resource.jsApiConfig().then(res => {
      console.log(res)
    })
    if (!code && this.isWechat()) {
      window.location.href=""
    }
  },
  methods: {
    getUrlparams(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
      if (r != null) {
        return unescape(r[2]);  //返回参数值 
      } else {
        return null;
      }
    },
    isWechat() {
      return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0
    }
  }
})
