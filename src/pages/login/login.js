import Vue from 'vue'
import { Actionsheet, Field, Button, Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
import LoginForm from '../../components/LoginForm'
Vue.component(Actionsheet.name, Actionsheet)
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
        age: '',
        sex: 1,
        mobile: '',
        smsCode: '',
        headImg: '',
        openId: ''
      },
      activeLoginForm: false,
      sexValue: '男'
    }
  },
  components: {
    LoginForm: LoginForm
  },
  mounted() {
    if (this.$route.params.imgurl) {
      this.userInfo.headImg = this.$route.params.imgurl
    }
  },
  created() {

    let code = base.getUrlparams('code')
    let _this = this
    if (!code) {
      resource.jsApiConfig().then(res => {
        let redirect_uri = encodeURIComponent(location.href)
        let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
        window.location.href = codeUrl
      })
    } else {
      resource.oath({ code: code }).then(res => {
        this.userInfo.openId = res.body.result.openId
        return resource.checkBind({ openId: res.body.result.openId })
      }).then(res => {
        if (res.body.result.bind) {
          localStorage.setItem('userid', res.body.result.u)
          localStorage.setItem('token', res.body.result.t)
          _this.$router.replace('bindid')
        }
      })
    }
  },

  methods: {
    showLoginForm: function () {
      this.$router.push({ name: 'Cropper', query: { redirect: 'Login' } })
    },
    sex: function () {
      this.sheetVisible = true
    },
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
    login: function () {
      let name = this.userInfo.name
      let mobile = this.userInfo.mobile
      let age = this.userInfo.age
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
      if (!base.validate.isNumber(age)) {
        Toast({
          message: '年龄不能为空',
          duration: 2000
        })
        return false
      }
      if (!this.userInfo.sex) {
        Toast({
          message: '请选择您的性别',
          duration: 2000
        })
        return false
      }
      if (!base.validate.isTelephone(mobile)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }
      if (!base.validate.isValicode(code)) {
        Toast({
          message: '验证码不正确',
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
                  base.connectIM(token)
                }
              })
            }
          })
          setTimeout(() => {

            _this.$router.replace('bindid')
          }, 2000)
        }
      })
    }
  }
}