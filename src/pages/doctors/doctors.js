import resource from '../../resource'
import { bus } from '../../bus'
import { Toast } from 'mint-ui'
export default {
  name: 'Doctors',
  data() {
    return {
      msg: 'Welcome to Doctors',
      doctors: []
    }
  },
  created() {
    let _this = this
    let userid = localStorage.getItem('userid')
    if (!userid) {
      Toast({
        message: '您还没有注册',
        duration: 2000
      })
      setTimeout(() => {
        _this.$router.replace('/')
      }, 2000)
    } else {
      resource.bindDoctorList().then(res => {
        if (res.body.code == 0) {
          for (let i = 0; i < res.body.result.length; i++) {
            res.body.result[i].isNew = false
          }
          this.doctors = res.body.result
          let unlist = localStorage.getItem('unlist')
          if (unlist) {
            unlist = unlist.split(',')
            for (let i = 0; i < this.doctors.length; i++) {
              for (let j = 0; j < unlist.length; j++) {
                if (this.doctors[i]['doctorUserGid'] == unlist[j]) {
                  this.doctors[i]['isNew'] = true
                }
              }
            }
          }
        }
      })
    }

    bus.$on('receiveMsg', function (message) {
      let unlist = localStorage.getItem('unlist')
      if (unlist) {
        unlist = unlist.split(',')
        for (let i = 0; i < _this.doctors.length; i++) {
          for (let j = 0; j < unlist.length; j++) {
            if (_this.doctors[i]['doctorUserGid'] == unlist[j]) {
              _this.doctors[i]['isNew'] = true
            }
          }
        }
      }
    })
  },
  methods: {
    goDoctor(item) {
      this.$router.push({ name: 'Doctor', query: { id: item.doctorUserGid } })
    }
  }
}