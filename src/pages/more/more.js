import Vue from 'vue'
import { Switch } from 'mint-ui'
Vue.component(Switch.name, Switch)
export default {
  name: 'page-switch',
  data () {
    return {
      msg: 'Welcome to More',
      value: false
    }
  },
  methods: {
    handleChange(event) {
      console.log(event)
    }
  }
}
