import Vue from 'vue'
import { Actionsheet, Field, Button} from 'mint-ui'
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
export default {
  name: 'Login',
  data() {
    return {
      msg: 'Welcome to Login',
      sheetVisible: true,
      actions: [{
        name: '男',
        method: () => {

        }
      }, {
        name: '女',
        method: () => {

        }
      }],
      validButtonText: '获取验证码',
      buttonStatus: false
    }
  },
  methods: {
    setSex: function(){
      console.log('111')
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