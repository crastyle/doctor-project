import Vue from 'vue'
import vueEventCalendar from '../../components/calendar/'

import resource from '../../resource'
import base from '../../base'
import { Toast } from 'mint-ui'
import { bus } from '../../bus'
Vue.use(vueEventCalendar, { locale: 'zh', color: '#1D8CDC' })
export default {
  name: 'Keep',
  data() {
    return {
      isTake: false,
      demoEvents: [{
        date: '2017/05/01',
        title: 'asfasf',
        fail: false
      }, {
        date: '2017/05/02',
        title: '',
        fail: true
      }],
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
      currentDayMedicineList: [],
      unbind: false,
      isDetail: false,
      msgCount: 0,
      chatToken: ''
    }
  },
  created() {
    // 如果有新消息进来
    let _this = this
    bus.$on('receiveMsg', function () {
      _this.msgCount++
    })
    if (window.userChatToken) {
      this.chatToken = window.userChatToken
      _this.getUnReceiveMsg()
    }
    bus.$on('imLoad', function (token) {
      console.log(token, 'keep')
      window.userChatToken = token
      _this.chatToken = token
      _this.getUnReceiveMsg()
    })

  },
  mounted() {
    let _this = this
    resource.console().then(res => {
      _this.leaveDay = res.body.result.leaveDays
      _this.leaveMessage = res.body.result.leaveMessage
    })


    resource.getTimestamp().then(res => {
      var date = new Date(res.body.result.timestamp * 1000)
      // _this.loadMonthData(date.getFullYear(), date.getMonth() + 1)

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
    showCalendar() {
      this.checkInStatus = true
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
    // loadMonthData(year, month) {
    //   let _this = this
    //   resource.monthDiary({ year: year, month: month }).then(res => {
    //     if (res.body.code == 0) {
    //       let list = res.body.result
    //       for (let i = 0; i < list.length; i++) {
    //         if (list[i]['checkInStatus'] == 1)
    //           _this.demoEvents.push({
    //             date: base.formatEventDate(list[i]['checkInTime'] * 1000),
    //             title: 'xxx'
    //           })
    //       }
    //     }
    //   })
    // },
    bind() {
      this.$router.push('bindid')
    },
    clickDay(date) {
      let _this = this
      _this.medicineList = []
      resource.diaryInfo({ diaryTime: parseInt(new Date(date).getTime() / 1000) }).then(res => {
        for (var i = 0; i < _this.checklistOpt.length; i++) {
          _this.checklistOpt[i]['disabled'] = true
        }
        if (res.body.result.medicine) {
          _this.medicineList = res.body.result.medicine.split(',')
        }

      })
    },
    changeMonth(month) {
      this.loadMonthData(month.split('-')[0], month.split('-')[1])
    },
  
    goChat() {
      this.$router.push({ name: 'Chat', query: { id: this.doctorInfo.doctorUserGid } })
    },
    getUnReceiveMsg() {
      RongIMClient.getInstance().hasRemoteUnreadMessages(this.chatToken, {
        onSuccess: function (hasMessage) {
          console.log(hasMessage)
          if (hasMessage) {
            // 有未读的消息
          } else {
            // 没有未读的消息
          }
        }, onError: function (err) {
          // 错误处理...
        }
      });
    }
  }
}