export default {
  name: 'page-switch',
  data () {
    return {
      msg: 'Welcome to More',
      value: '已开启',
      infoValue: '已开启'
    }
  },
  methods: {
    handleChange(event) {
      console.log(event)
    }
  }
}
