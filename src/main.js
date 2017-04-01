// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from  'vue-resource'
// rem
import './flexble.js'
// mint-ui
import 'mint-ui/lib/style.css'
import "./styles/reset-ui.scss"
import resource from './resource'
Vue.config.productionTip = false
Vue.use(vueResource)
resource.interceports()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
