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
          this.med1Name = '阿托伐他汀'
        }
      }, {
        name: '非强效他汀',
        method: () => {
          this.med1Name = '非强效他汀'
        }
      }],
      med2: [{
        name: '氨氯地平',
        method: () => {
          this.med2Name = '氨氯地平'
        }
      }, {
        name: '非长效降压药',
        method: () => {
          this.med2Name = '非长效降压药'
        }
      }],
      med3: [{
        name: '有',
        method: () => {
          this.med3Name = '其他'
        }
      }, {
        name: '无',
        method: () => {
          this.med3Name = '无'
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
        leaveTime: '',
        remindHour: 0,
        remindMinute: 0,
        remindWay: '',
        medicineList: []
      },
      isRemindWay: false,
      remindWayStr: '请选择',
      isMed1: false,
      isMed2: false,
      isMed3: false,
      med1Name: '',
      med2Name: '',
      med3Name: ''
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
      this.formData.leaveTime =  parseInt(new Date(this.leavePickerDate).getTime() / 1000)
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
      
      this.formData.remindHour = this.forkTimePickerDate.split(':')[0]
      this.formData.remindMinute = this.forkTimePickerDate.split(':')[1]
      this.formData.medicineList = []
      if (!this.formData['leaveTime']) {
        Toast({
          message: '请选择出院时间',
          duration: 2000
        })
        return
      }
      if (!this.formData['remindWay']) {
        Toast({
          message: '请选择提醒方式',
          duration: 2000
        })
        return
      }
      if (!this.med1Name || !this.med2Name || !this.med3Name) {
        Toast({
          message: '请选择用药类别',
          duration: 2000
        })
        return
      }
      this.formData.medicineList.push(this.med1Name)
      this.formData.medicineList.push(this.med2Name)
      if (this.med3Name === '其他') {
        this.formData.medicineList.push(this.med3Name)
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
