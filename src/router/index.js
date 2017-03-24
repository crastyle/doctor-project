import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Date from '../pages/date/date.vue'
import List from '../pages/list/list.vue'
//@import
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Hello',component: Hello},
    {path: '/date',name: 'Date',component: Date},
    {path: '/list',name: 'List',component: List}//@register
   
  ]
})
