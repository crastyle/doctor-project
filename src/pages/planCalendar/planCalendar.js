import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
Vue.use(vueEventCalendar, { locale: 'zh', color: '#1D8CDC' })
export default {
  name: 'PlanCalendar',
  data() {
    return {
      msg: 'Welcome to PlanCalendar',
      demoEvents: [{
        date: '2017/04/01',
        title: 'title'
      },{
        date: '2017/03/31',
        title: 'title'
      }]
    }
  }
}