import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
export default {
  name: 'Keep',
  data () {
    return {
      msg: 'Welcome to Keep',
      isTake: false,
      demoEvents: [{
        date: '2017/04/01',
        title: 'title'
      },{
        date: '2017/03/31',
        title: 'title'
      }],
      calendarCard: false,
      calendarTransform: false
    }
  },
  methods: {
    takeMedicine() {
      this.isTake = true
      setTimeout(() => {
        this.calendarCard = true
      }, 300)
      setTimeout(() => {
        this.calendarTransform = true
      }, 350)
    }
  }
}