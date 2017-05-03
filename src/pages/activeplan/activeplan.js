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
      wayValue: [],
      options: [{
        label: '短信',
        value: 2
      }, {
        label: '电话',
        value: 1
      }],
      value: {
        value: 1
      },
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
      leavePicker: false,
      leavePickerValue: "请选择时间",
      leavePickerDate: new Date(),

      forkTimePicker: false,
      forkTimePickerValue: "请选择时间",
      forkTimePickerDate: '12: 00',

      forkWeek: false,
      forkWeekValue: '请选择周期',
      formData: {
        leaveTime: new Date(this.leavePickerValue).getTime(),
        remindHour: 0,
        remindMinute: 0,
        remindWay: 2,
      },
  
    }
  },
  mounted: function () {
    this.leavePickerValue = base.formatDate(Date.now())
  },
  methods: {
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
      this.formData.leaveTime = parseInt((new Date(this.leavePickerValue).getTime()) / 1000)
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
