import resource from '../../resource'
import {MessageBox} from 'mint-ui'
export default {
  name: 'Doctor',
  data() {
    return {
      msg: 'Welcome to Doctor',
      doctor: {}
    }
  },
  mounted() {
    resource.bindDoctorInfo({ doctorUserGid: this.$route.query.id }).then(res => {
      if (res.body.code == 0) {
        this.doctor = res.body.result
      }
    })
  },
  methods: {
    unbind() {
      resource.unbindDoctor({doctorUserGid: this.$route.query.id}).then(res => {
        if (res.body.code == 0) {
          this.$router.replace('doctors')
        }
      })
    }
  }
}