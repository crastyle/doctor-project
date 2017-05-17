import resource from '../../resource'
export default {
  name: 'Doctors',
  data () {
    return {
      msg: 'Welcome to Doctors',
      doctors: []
    }
  },
  created() {
    resource.bindDoctorList().then(res => {
      if (res.body.code == 0) {
        this.doctors = res.body.result
      }
    })
  },
  methods: {
    goDoctor(item) {
      this.$router.push({name: 'Doctor', query: {id: item.doctorUserGid}})
    }
  }
}