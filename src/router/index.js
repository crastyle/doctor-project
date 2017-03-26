import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import More from '../pages/more/more.vue'
import Login from '../pages/login/login.vue'
//@import
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Hello',component: Hello},
    {path: '/more',name: 'More',component: More},
    {path: '/login',name: 'Login',component: Login}//@register
   
  ]
})
