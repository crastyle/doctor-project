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
    let openId = this.$route.query.openId
    let _this = this

    if (!code && !openId) {
      resource.jsApiConfig().then(res => {
        let redirect_uri = encodeURIComponent(location.href)
        let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
        window.location.href = codeUrl
      })
    }
    if (code) {
      if (openId) {
        _this.userInfo.openId = openId
      } else {
        resource.oath({ code: code }).then(res => {
          this.userInfo.openId = res.body.result.openId
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
              } else if (res.body.result.bindDoctorStatus == 0) {
                _this.$router.replace('bindid')
              }
            })

          }
        })
      }
    }
  },

  methods: {
    showLoginForm: function () {
      this.$router.push({ name: 'Cropper', query: { redirect: 'Login', openId: this.userInfo.openId } })
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
                  base.connectIM(token, function(){
                    window.onLoadingIMStatus = true
                    bus.$emit('imLoad', res.body.result.token)
                  })
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