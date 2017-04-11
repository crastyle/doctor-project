import resource from "../../resource"
import {Toast} from 'mint-ui'
export default {
  name: 'Bindcard',
  data () {
    return {
      doctorInfo: {
        identifyCode: '',
        doctorUserGid: '',
        doctorName: '',
        headImg: ''
      },
      code: 0
    }
  },
  mounted() {
    this.code = this.$route.query.code
    let _this = this
    resource.doctorDetail({identifyCode: _this.code}).then(res => {
      if (res.body.code == 0) {
        _this.doctorInfo = res.body.result
      }
    })
  },
  methods: {
    bind() {
      let _this = this
      resource.bindDoctor({identifyCode: this.code}).then(res => {
        if (res.body.code == 0) {
          Toast({
            message: '绑定医生成功',
            duration: 2000
          })
          setTimeout(() => {
            _this.$router.replace('leave')
          }, 2000)
        }
      })
    }
  } 
}