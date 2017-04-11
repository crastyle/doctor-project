import resource from '../../resource'
export default {
  name: 'Leave',
  data () {
    return {
      msg: 'Welcome to Leave'
    }
  },
  mounted() {
    let _this = this
    resource.checkStatus().then(res => {
      if (res.body.result.activeRemindStatus == 1) {
        _this.$router.replace('keep')
      } 
    })
  }
}