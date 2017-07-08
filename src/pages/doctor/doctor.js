import resource from '../../resource'
import { MessageBox } from 'mint-ui'
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
        res.body.result.isNew = false
        this.doctor = res.body.result
        let unlist = localStorage.getItem('unlist')
        if (unlist) {
          unlist = unlist.split(',')
          for (let i = 0; i < unlist.length; i++) {
            if (this.doctor['doctorUserGid'] == unlist[i]) {
              this.doctor['isNew'] = true
            }
          }
        }
      }
    })
  },
  methods: {
    unbind() {
      MessageBox.confirm('确定执行此操作吗？').then(action => {
        if (action === 'confirm') {
          resource.unbindDoctor({ doctorUserGid: this.$route.query.id }).then(res => {
            if (res.body.code == 0) {
              this.$router.replace('doctors')
            }
          })
        }
      })
    },
    chat() {
      let unlist = localStorage.getItem('unlist')
      if (unlist) {
        unlist = unlist.split(',')
        console.log(unlist, this.$route.query.id)
        for (let i = 0; i < unlist.length; i++) {
          console.log(unlist[i], this.$route.query.id)
          if (this.$route.query.id == unlist[i]) {
            console.log(i)
            unlist.splice(i, 1)
          }
        }
        localStorage.setItem('unlist', unlist)
      }
      this.$router.push({ name: 'Chat', query: { id: this.$route.query.id } })
    }
  }
}