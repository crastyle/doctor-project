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
      checklistOpt: [],
      defaultMedicineList: [],
      unbind: false,
      isDetail: false,
      msgCount: 0,
      chatToken: '',
      showDialog: false,
      checkInList: [],
      showMessage: false,   // 点击当天的值
      defaultDoctor: {}
    }
  },
  created() {
    // 如果有新消息进来
    let _this = this
    resource.defaultDoctor().then(res => {
      if (res.body.code == 0) {
        this.defaultDoctor = res.body.result
      }
    })
    bus.$on('receiveMsg', function (message) {
      resource.defaultDoctor().then(res => {
        if (res.body.code == 0) {
          if (message.senderUserId == res.body.result.doctorUserGid) {
            _this.msgCount++
          }
        }
      })
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
    // 获取激活日历的计划信息
    resource.planInfo().then(res => {
      if (res.body.code == 0) {
        for (let i = 0; i < res.body.result.medicineList.length; i++) {
          _this.checklistOpt.push({
            isActive: false,
            name: res.body.result.medicineList[i]
          })
        }
        return resource.getTimestamp()
      }
      // 获取系统的时间戳
    }).then(res => {
      if (res.body.code == 0) {
        return resource.diaryInfo({ diaryTime: res.body.result.timestamp })
      }
      // 获取当日的打卡情况
    }).then(res => {
      if (res.body.code == 0) {
        if (res.body.result.medicineList != undefined) {
          let ms = res.body.result.medicineList
          for (let i = 0; i < _this.checklistOpt.length; i++) {
            for (let j = 0; j < ms.length; j++) {
              if (_this.checklistOpt[i]['name'] == ms[j]) {
                _this.checklistOpt[i]['isActive'] = true
              }
            }
          }
        }
      }
    })

  },
  methods: {
    takeMedicine(item) {
      this.checkInList = []
      item.isActive = true
      let _this = this
      for (let i = 0; i < this.checklistOpt.length; i++) {
        if (this.checklistOpt[i]['isActive']) {
          this.checkInList.push(this.checklistOpt[i].name)
        }
      }
      resource.getTimestamp().then(res => {
        if (res.body.code == 0) {
          return resource.checkIn({ diaryTime: res.body.result.timestamp, medicineList: _this.checkInList })
        }
      })
    },
    showCalendar() {
      this.checkInStatus = true
      this.loadMonthData(new Date().getFullYear(), new Date().getMonth() + 1)
    },
    showTips() {
      Toast({
        message: this.leaveMessage,
        duration: 5000
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
      if (base.formatEventDate(new Date()) === base.formatEventDate(date)) {
        this.checkInStatus = false
        return false
      }
      let _this = this
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, 500)

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
      console.log(month)
      this.loadMonthData(month.split('-')[0], month.split('-')[1])
    },

    goChat() {
      console.log(this.defaultDoctor.doctorUserGid)
      this.$router.push({ name: 'Chat', query: { id: this.defaultDoctor.doctorUserGid } })
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