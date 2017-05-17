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
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        mobile: '',
        smsCode: ''
      },
      openId: ''
    }
  },
  created() {
    let code = base.getUrlparams('code')
    let openId = this.$route.query.openId
    let _this = this

    if (!code && !openId && base.isWechat()) {
      resource.jsApiConfig().then(res => {
        let redirect_uri = encodeURIComponent(location.href)
        let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
        window.location.href = codeUrl
      })
    }
    if (code) {
      resource.oath({ code: code }).then(res => {
        return resource.checkBind({ openId: res.body.result.openId })
      }).then(res => {
        if (res.body.result.bind) {
          //检测用户状态 绑定医生？激活月视图？
          let userid = res.body.result.u
          localStorage.setItem('userid', res.body.result.u)
          localStorage.setItem('token', res.body.result.t)

          resource.rongyunAppKey().then(res => {
            if (res.body.code == 0) {
              base.initIm(res.body.result.appKey)
              resource.newtoken({ userGid: userid }).then(res => {
                if (res.body.code == 0) {
                  base.watchIM()
                  base.receiveMsg()
                  base.connectIM(res.body.result.token, function () {
                    window.onLoadingIMStatus = true
                    bus.$emit('imLoad', res.body.result.token)
                  })
                }
              })
            }
          })
          resource.checkStatus().then(res => {
            if (res.body.result.activeRemindStatus == 1) {
              _this.$router.replace('keep')
            } else if (res.body.result.activeRemindStatus == 0) {
              _this.$router.replace('activePlan')
            }
          })
        } else {
          _this.openId = res.body.result.openId
        }
      })
    }
  },
  methods: {

    getCode: function () {
      let second = 60
      let _this = this
      if (!base.validate.isTelephone(this.userInfo.mobile)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }
      if (_this.buttonStatus) {
        return false
      }
      _this.buttonStatus = true
      this.validButtonText = `${second}重新获取`
      resource.smsCode({
        mobile: this.userInfo.mobile
      }).then(res => {
        Toast({
          message: '验证码发送成功',
          duration: 1500
        })
        let timer = setInterval(() => {
          second--
          _this.validButtonText = `${second}重新获取`
          if (second === 0) {
            _this.buttonStatus = false
            _this.validButtonText = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
      })

    },
    login() {
      let _this = this
      if (!base.validate.isTelephone(this.userInfo.mobile)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }
      resource.checkMobile({
        smsCode: this.userInfo.smsCode,
        mobile: this.userInfo.mobile
      }).then(res => {
        if (res.body.code == 0) {
          window.localStorage.setItem('tempOpenId', _this.openId)
          window.localStorage.setItem('tempMobile', _this.userInfo.mobile)
          window.localStorage.setItem('tempSmsCode', _this.userInfo.smsCode)
          _this.$router.push('login')
        }
      })
    }
  }
}