import Vue from 'vue'
import { Radio, Checklist, DatetimePicker, Picker } from 'mint-ui'
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'Activeplan',
  data() {
    return {
      wayValue: [{
        label: '短信',
        value: 0
      }, {
        label: '电话',
        value: 1
      }],
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
      defaultChecklist: [{
        label: '长效降压（氨氯地平)',
        value: 1
      }, {
        label: '其他',
        value: 2
      }],
      leavePicker: false,
      leavePickerValue: "请选择时间",
      leavePickerDate: new Date(),

      forkTimePicker: false,
      forkTimePickerValue: "请选择时间",
      forkTimePickerDate: '12: 00',

      forkWeek: false,
      forkWeekValue: '请选择周期',
      weeksOptions: [{
        name: '星期一',
        method: () => {
          this.forkWeekValue = '星期一'
        }
      }, {
        name: '星期二',
        method: () => {
          this.forkWeekValue = '星期二'
        }
      }, {
        name: '星期三',
        method: () => {
          this.forkWeekValue = '星期三'
        }
      }, {
        name: '星期四',
        method: () => {
          this.forkWeekValue = '星期四'
        }
      }, {
        name: '星期五',
        method: () => {
          this.forkWeekValue = '星期五'
        }
      }, {
        name: '星期六',
        method: () => {
          this.forkWeekValue = '星期六'
        }
      }, {
        name: '星期日',
        method: () => {
          this.forkWeekValue = '星期日'
        }
      }]
    }
  },
  methods: {
    setLeavePicker: function () {
      console.log(new Date(this.leavePickerValue))
      this.$refs.picker.open()
    },
    confirmLeaveDate: function () {
      let select_date = new Date(this.leavePickerDate)
      let year = select_date.getFullYear()
      let month = select_date.getMonth() + 1
      let day = select_date.getDate()
      this.leavePickerValue = `${year}-${month}-${day}`
    },
    setForkTimePicker: function () {
      this.$refs.forkPicker.open()
    },
    setForkWeek: function () {
      this.forkWeek = true
    },
    onWeeksChange: function (picker, value) {

    }
  }
}
