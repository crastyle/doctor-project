import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import More from '../pages/more/more.vue'
import Login from '../pages/login/login.vue'
import Bindid from '../pages/bindid/bindid.vue'
import Bindcard from '../pages/bindcard/bindcard.vue'
import Bindqr from '../pages/bindqr/bindqr.vue'
import Leave from '../pages/leave/leave.vue'
import Activeplan from '../pages/activeplan/activeplan.vue'
import Keep from '../pages/keep/keep.vue'
import PlanCalendar from '../pages/planCalendar/planCalendar.vue'
import Chat from '../pages/chat/chat.vue'
//@import
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Hello',component: Hello},
    {path: '/more',name: 'More',component: More},
    {path: '/bindid',name: 'Bindid',component: Bindid},
    {path: '/bindcard',name: 'Bindcard',component: Bindcard},
    {path: '/bindqr',name: 'Bindqr',component: Bindqr},
    {path: '/leave',name: 'Leave',component: Leave},
    {path: '/activeplan',name: 'Activeplan',component: Activeplan},
    {path: '/keep',name: 'Keep',component: Keep},
    {path: '/planCalendar',name: 'PlanCalendar',component: PlanCalendar},
    {path: '/login',name: 'Login',component: Login},
    {path: '/chat',name: 'Chat',component: Chat}//@register
   
  ]
})
