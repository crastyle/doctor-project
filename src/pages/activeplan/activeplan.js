import Vue from 'vue'
import base from '../../base'
import { Radio, Checklist, DatetimePicker, Picker, Toast } from 'mint-ui'
import resource from '../../resource'
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'Activeplan',
  data() {
    return {
      endDate: new Date(),
      remindWays: [{
        name: '短信',
        method: () => {
          this.formData.remindWay = 2
          this.remindWayStr = '短信'
        }
      }, {
        name: '电话',
        method: () => {
          this.formData.remindWay = 1
          this.remindWayStr = '电话'
        }
      }],

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
      med1: [{
        name: '阿托伐他汀',
        method: () => {

        }
      }, {
        name: '非强效他汀',
        method: () => {

        }
      }],
      med2: [{
        name: '氨氯地平',
        method: () => {

        }
      }, {
        name: '非长效降压药',
        method: () => {

        }
      }],
      med3: [{
        name: '有',
        method: () => {

        }
      }, {
        name: '无',
        method: () => {
          
        }
      }],
      defaultChecklist: [],
      leavePicker: false,
      leavePickerValue: "请选择",
      leavePickerDate: new Date(),

      forkTimePicker: false,
      forkTimePickerValue: "请选择",
      forkTimePickerDate: '12: 00',

      forkWeek: false,
      forkWeekValue: '请选择周期',
      formData: {
        leaveTime: new Date(this.leavePickerValue).getTime(),
        remindHour: 0,
        remindMinute: 0,
        remindWay: '',
        med1: '',
        med2: '',
        med3: ''
      },
      isRemindWay: false,
      remindWayStr: '请选择',
      isMed1: false,
      isMed2: false,
      isMed3: false
    }
  },
  mounted: function () {
  },
  methods: {
    showRemindWay() {
      this.isRemindWay = true
    },
    showMed1() {
      this.isMed1 = true
    },
    showMed2() {
      this.isMed2 = true
    },
    showMed3() {
      this.isMed3 = true
    },
    setLeaveValue() {
      this.leavePickerValue = base.formatDate2(this.leavePickerDate)
    },
    setLeavePicker: function () {
      console.log(new Date(this.leavePickerValue))
      this.$refs.picker.open()
    },
    setForkTimePicker: function () {
      this.$refs.forkPicker.open()
    },
    setForkWeek: function () {
      this.forkWeek = true
    },
    activePlan() {
      this.formData.leaveTime = parseInt((new Date(this.leavePickerDate).getTime()) / 1000)
      this.formData.remindHour = this.forkTimePickerDate.split(':')[0]
      this.formData.remindMinute = this.forkTimePickerDate.split(':')[1]
      if (!this.formData['remindWay']) {
        Toast({
          message: '请选择提醒方式',
          duration: 2000
        })
        return
      }
      let _this = this
      resource.activePlan(this.formData).then(res => {
        if (res.body.code == 0) {
          Toast({
            message: '您已经激活成功',
            duration: 2000
          })
          setTimeout(() => {
            _this.$router.replace('keep')
          }, 2000)
        }
      })
    }
  }
}
