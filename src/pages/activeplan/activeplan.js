import Vue from 'vue'
import base from '../../base'
import { Radio, Checklist, DatetimePicker, Picker } from 'mint-ui'
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
        value: 0
      }, {
        label: '电话',
        value: 1
      }],
      value: {
        value: 1
      },
      checklistOpt: [{
        label: '他汀（阿托伐他汀）',
        value: 0
      }, {
        label: '长效降压（氨氯地平)',
        value: 1
      }, {
        label: '其他',
        value: 2
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
      weeks: ['星期一','星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      formData: {
        leaveTime: new Date(this.leavePickerValue).getTime(),
        remindWeek: '',
        remindHour: 0,
        remindMintes: 0,
      },
      weeksOptions: [{
        name: '星期一',
        method: () => {
          this.forkWeekValue = '星期一'
          this.formData.remindWeek = 1
        }
      }, {
        name: '星期二',
        method: () => {
          this.forkWeekValue = '星期二'
          this.formData.remindWeek = 2
        }
      }, {
        name: '星期三',
        method: () => {
          this.forkWeekValue = '星期三'
          this.formData.remindWeek = 3
        }
      }, {
        name: '星期四',
        method: () => {
          this.forkWeekValue = '星期四'
          this.formData.remindWeek = 4
        }
      }, {
        name: '星期五',
        method: () => {
          this.forkWeekValue = '星期五'
          this.formData.remindWeek = 5
        }
      }, {
        name: '星期六',
        method: () => {
          this.forkWeekValue = '星期六'
          this.formData.remindWeek = 6
        }
      }, {
        name: '星期日',
        method: () => {
          this.forkWeekValue = '星期日'
          this.formData.remindWeek = 7
        }
      }]
    }
  },
  mounted: function() {
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
    onWeeksChange: function (picker, value) {

    },
    activePlan() {
      console.log(this.leavePickerDate)
      console.log(this.wayValue)
      this.formData.remindHour = this.forkTimePickerDate.split(':')[0]
      this.formData.remindMintes = this.forkTimePickerDate.split(':')[1]
      console.log(this.forkTimePickerDate)
      console.log(this.defaultChecklist)
    }
  }
}
