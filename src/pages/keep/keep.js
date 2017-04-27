import Vue from 'vue'
import vueEventCalendar from '../../components/calendar/'

import resource from '../../resource'
import base from '../../base'
import { Toast } from 'mint-ui'
Vue.use(vueEventCalendar, { locale: 'zh', color: '#1D8CDC' })
export default {
  name: 'Keep',
  data() {
    return {
      isTake: false,
      demoEvents: [],
      calendarTransform: false,
      leaveDay: 7,
      leaveMessage: '要记得吃药哦',
      medicineList: [],
      remindTime: '',
      checkInStatus: false,
      dateValue: '',
      doctorInfo: {},
      currentTime: '',
      checklistOpt: [{
        label: '他汀（阿托伐他汀）',
        value: '他汀（阿托伐他汀）'
      }, {
        label: '长效降压（氨氯地平)',
        value: '长效降压（氨氯地平)'
      }, {
        label: '其他',
        value: '其他'
      }],
      defaultChecklist: [],
      medicineList: [],
      currentDayMedicineList: [],
      unbind: false,
      isDetail: false
    }
  },
  mounted() {
    let _this = this
    resource.console().then(res => {
      _this.leaveDay = res.body.result.leaveDays
      _this.leaveMessage = res.body.result.leaveMessage
    })
    resource.getTimestamp().then(res => {
      _this.currentTime = base.formatDate2(res.body.result.timestamp * 1000)

      return resource.diaryInfo({ diaryTime: res.body.result.timestamp })
    }).then(res => {
      // _this.medicineList = res.body.result.medicine.split(',')
      let hour = res.body.result.remindHour
      let minute = res.body.result.remindMinute
      
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      _this.remindTime =  hour + ':' + minute
      _this.checkInStatus = res.body.result.checkInStatus
      if (res.body.result.checkInStatus) {
        _this.calendarTransform = true
      }
    })

    resource.getTimestamp().then(res => {
      var date = new Date(res.body.result.timestamp * 1000)
      _this.loadMonthData(date.getFullYear(), date.getMonth() + 1)

    })

    resource.bindDoctorInfo().then(res => {
      if (res.body.code == 0 && res.body.result.bindDoctorStatus == 1) {
        _this.doctorInfo = res.body.result
      } else {
        _this.unbind = true
      }
    })
  },
  methods: {

    showTips() {
      Toast({
        message: this.leaveMessage,
        duration: 5000
      })
    },
    checkIn() {
      let _this = this
      resource.getTimestamp().then(res => {
        return resource.checkIn({ diaryTime: res.body.result.timestamp, medicineList: _this.medicineList })
      }).then(res => {
        if (res.body.code == 0) {
          resource.getTimestamp().then(res => {
            var date = new Date(res.body.result.timestamp * 1000)
            _this.loadMonthData(date.getFullYear(), date.getMonth() + 1)
          })
          _this.demoEvents.push({
            date: base.formatEventDate(Date.now())
          })
          _this.isTake = true
          setTimeout(() => {
            _this.checkInStatus = true
          }, 300)
          setTimeout(() => {
            _this.calendarTransform = true
          }, 350)
        }
      })
    },
    loadMonthData(year, month) {
      let _this = this
      resource.monthDiary({ year: year, month: month }).then(res => {
        if (res.body.code == 0) {
          let list = res.body.result
          for (let i = 0; i < list.length; i++) {
            if (list[i]['checkInStatus'] == 1)
            _this.demoEvents.push({
              date: base.formatEventDate(list[i]['checkInTime'] * 1000),
              title: 'xxx'
            })
          }
        }
      })
    },
    bind() {
      this.$router.push('bindid')
    },
    clickDay(date) {
      let _this = this
      _this.medicineList = []
      resource.diaryInfo({ diaryTime: parseInt(new Date(date).getTime() / 1000) }).then(res => {
        _this.calendarTransform = false
        setTimeout(() => {
          _this.isTake = false
          _this.checkInStatus = false
          _this.isDetail = true
        }, 350)

        for (var i = 0; i < _this.checklistOpt.length; i++) {
          _this.checklistOpt[i]['disabled'] = true
        }
        if(res.body.result.medicine) {
          _this.medicineList = res.body.result.medicine.split(',')
        }
        
      })
    },
    changeMonth(month) {
      this.loadMonthData(month.split('-')[0], month.split('-')[1])
    },
    backMonthDiary() {
      if (this.isDetail) {
        this.isTake = true
        setTimeout(() => {
          this.checkInStatus = true
        }, 300)
        setTimeout(() => {
          this.calendarTransform = true
        }, 350)
      }
    },
    goChat() {
      this.$router.push({ name: 'Chat', query: { id: this.doctorInfo.doctorUserGid } })
    },
    getUnReceiveMsg() {
      
    }
  }
}