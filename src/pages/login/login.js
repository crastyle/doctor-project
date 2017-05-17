import Vue from 'vue'
import { Actionsheet, Field, Button, Toast, DatetimePicker } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
import LoginForm from '../../components/LoginForm'
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
export default {
  name: 'Login',
  data() {
    return {
      sheetVisible: false,
      actions: [{
        name: '男',
        method: () => {
          this.sexValue = '男'
          this.userInfo.sex = 1
        }
      }, {
        name: '女',
        method: () => {
          this.sexValue = '女'
          this.userInfo.sex = 0
        }
      }],
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        name: '',
        birthDay: '',
        sex: '',
        mobile: '',
        headImg: '',
        openId: '',
        smsCode: ''
      },
      activeLoginForm: false,
      sexValue: '请选择',
      birthday: '1970-01-01',
      birthdayStr: '请选择',
      startTime: new Date('1900/01/01'),
      endTime: new Date()
    }
  },
  components: {
    LoginForm: LoginForm
  },
  mounted() {
    if (this.$route.params.imgurl) {
      this.userInfo.headImg = this.$route.params.imgurl
    }
    if (window.localStorage.getItem('tempMobile')) {
      this.userInfo.mobile = localStorage.getItem('tempMobile')
      this.userInfo.smsCode = localStorage.getItem('tempSmsCode')
      this.userInfo.openId = localStorage.getItem('tempOpenId')
      let _this = this
      resource.checkBind({ openId: this.userInfo.openId }).then(res => {
        if (!res.body.result.bind && !_this.$route.params.imgurl) {
          this.userInfo.headImg = res.body.result.wechatHeadImg
        }
      })
    }
  },

  methods: {
    setBirthday() {
      this.birthdayStr = base.formatDate2(this.birthday)
      this.userInfo.birthDay = parseInt(new Date(this.birthday).getTime() / 1000)
    },
    showBirthday() {
      this.$refs.birthdayPicker.open()
    },
    uploadHead: function () {
      this.$router.push({
        name: 'Cropper',
        query: {
          redirect: 'Login'
        }
      })
    },
    sex: function () {
      this.sheetVisible = true
    },
    loginUserInfo: function () {
      let name = this.userInfo.name
      let mobile = this.userInfo.mobile
      let birthday = this.userInfo.birthDay
      let code = this.userInfo.smsCode
      let sex = this.userInfo.sex
      let _this = this
      if (!base.validate.isUserName(name)) {
        Toast({
          message: '请输入正确的姓名',
          duration: 2000
        })
        return false
      }
      if (sex == '') {
        Toast({
          message: '请选择您的性别',
          duration: 2000
        })
        return false
      }
      if (!birthday) {
        Toast({
          message: '请选择生日',
          duration: 2000
        })
        return false
      }

      resource.register(this.userInfo).then(res => {
        if (res.body.code == 0) {
          Toast({
            message: '注册成功',
            duration: 2000,
            position: 'middle'
          })
          localStorage.removeItem('tempMobile')
          localStorage.removeItem('tempSmsCode')
          localStorage.removeItem('tempOpenId')
          let token = res.body.result.t
          let userid = res.body.result.u
          window.localStorage.setItem('userid', userid)
          window.localStorage.setItem('token', token)
          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
              resource.newtoken({ userGid: userid }).then(res => {
                if (res.body.code == 0) {
                  base.watchIM()
                  base.receiveMsg()
                  base.connectIM(token, function () {
                    window.onLoadingIMStatus = true
                    bus.$emit('imLoad', res.body.result.token)
                  })
                }
              })
            }
          })
          setTimeout(() => {
            _this.$router.replace('activePlan')
          }, 2000)
        }
      })
    }
  }
}