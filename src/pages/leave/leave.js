import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Leave',
  data () {
    return {
      msg: 'Welcome to Leave',
      currentTime: ''
    }
  },
  created() {
    let _this = this
    resource.checkStatus().then(res => {
      if (res.body.result.activeRemindStatus == 1) {
        _this.$router.replace('keep')
      } 
    })
    resource.getTimestamp().then(res => {
      _this.currentTime = base.formatDate2(res.body.result.timestamp*1000)
    })
  }
}