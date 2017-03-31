import Vue from 'vue'
import { Actionsheet, Field, Button} from 'mint-ui'
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
        userName: '李龙先生',
        age: 26,
        sex: '男',
        tel: 15801929103,
        code: 123456
      }
    }
  },
  methods: {
    sex: function(){
      this.sheetVisible = true
    },
    getCode: function() {
      let second = 60
      let _this = this
      if (_this.buttonStatus) {
        return false
      }
      _this.buttonStatus = true
      this.validButtonText = `${second}重新获取`
      let timer = setInterval(()=>{
        second -- 
        _this.validButtonText = `${second}重新获取`
        if (second === 0) {
          _this.buttonStatus = false
          _this.validButtonText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}