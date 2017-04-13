import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css'
import resource from '../../resource'
import base from '../../base'
import { Toast } from 'mint-ui'
export default {
  name: 'Keep',
  data() {
    return {
      isTake: false,
      demoEvents: [{
        date: '2017/04/01',
        title: 'title'
      }, {
        date: '2017/03/31',
        title: 'title'
      }],
      calendarCard: false,
      calendarTransform: false,
      leaveDay: 7,
      leaveMessage: '要记得吃药哦',
      medicineList: [],
      remindTime: '',
      checkInStatus: false,
      dateValue: '',
      doctorInfo: {},
      currentTime: ''

    }
  },
  mounted() {
    let _this = this
    resource.console().then(res => {
      _this.leaveDay = res.body.result.leaveDays
      _this.leaveMessage = res.body.result.leaveMessage
    })
    resource.getTimestamp().then(res => {
      _this.currentTime = base.formatDate2(res.body.result.timestamp*1000)
      return resource.diaryInfo({ diaryTime: res.body.result.timestamp })
    }).then(res => {
      _this.medicineList = res.body.result.medicine.split(',')
      _this.remindTime = res.body.result.remindHour + ':' + res.body.result.remindMinute
      _this.checkInStatus = res.body.result.checkInStatus
      if (res.body.result.checkInStatus) {
        _this.calendarTransform = true
      }
    })

    resource.bindDoctorInfo().then(res => {
      if (res.body.code == 0) {
        _this.doctorInfo = res.body.result
      }
    })
  },
  methods: {
    changed() {
      console.log('xxx')
    },
    showTips() {
      Toast({
        message: this.leaveMessage,
        duration: 5000
      })
    },
    checkIn() {
      let _this = this
      resource.getTimestamp().then(res => {
        return resource.checkIn({ diaryTime: res.body.result.timestamp })
      }).then(res => {
        _this.isTake = true
        setTimeout(() => {
          _this.checkInStatus = true
        }, 300)
        setTimeout(() => {
          _this.calendarTransform = true
        }, 350)
      })
    }
  }
}