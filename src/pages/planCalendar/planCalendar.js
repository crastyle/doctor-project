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
        date: '2016/12/15',
        title: 'Foo',
        desc: 'longlonglong description'
      }, {
        date: '2016/11/12',
        title: 'Bar'
      }]
    }
  }
}