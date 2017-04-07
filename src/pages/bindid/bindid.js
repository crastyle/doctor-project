import { Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Bindid',
  data () {
    return {
      msg: 'Welcome to Bindid',
      doctorID: 1619354
    }
  },
  methods: {
    bindcard () {
      let id = this.doctorID
      if (!base.validate.isDoctorCard(id)) {
        Toast({
          message: '医生识别码不正确',
          duration: 2000
        })
        return false
      }
      this.$router.push('/bindcard')
      resource.login({
        id: id
      })
    }
  }
}