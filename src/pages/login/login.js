import Vue from 'vue'
import { Actionsheet, Field, Button, Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
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
          this.userInfo.sex = '男'
        }
      }, {
        name: '女',
        method: () => {
          this.userInfo.sex = '女'
        }
      }],
      validButtonText: '获取验证码',
      buttonStatus: false,
      userInfo: {
        userName: 'li',
        age: 26,
        sex: '男',
        tel: 15801929103,
        code: 123456
      },
      activeLoginForm: false
    }
  },
  components:{
    LoginForm: LoginForm
  },
  methods: {
    showLoginForm: function(){
      this.activeLoginForm = true
    },
    sex: function () {
      this.sheetVisible = true
    },
    getCode: function () {
      let second = 60
      let _this = this
      if (!base.validate.isTelephone(this.userInfo.tel)) {
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
      let timer = setInterval(() => {
        second--
        _this.validButtonText = `${second}重新获取`
        if (second === 0) {
          _this.buttonStatus = false
          _this.validButtonText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
    login: function () {
      let userName = this.userInfo.userName
      let telephone = this.userInfo.tel
      let age = this.userInfo.age
      let tel = this.userInfo.tel
      let code = this.userInfo.code
      console.log(base)
      if (!base.validate.isUserName(userName)) {
        Toast({
          message: '请输入正确的姓名',
          duration: 2000
        })
        return false
      }
      if (!base.validate.isNumber(age)) {
        console.log(age)
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
      if (!base.validate.isTelephone(telephone)) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return false
      }
      if(!base.validate.isValicode(code)) {
        Toast({
          message: '验证码不正确',
          duration: 2000
        })
        return false
      }

      this.$router.push('/bindid')
      console.log(resource.register({
        userName,
        telephone
      }))
    }
  }
}