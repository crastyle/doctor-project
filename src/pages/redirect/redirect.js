import {Button} from 'mint-ui'
import Vue from 'vue'
import resource from '../../resource'
Vue.component(Button.name, Button)
export default {
    name: 'redirect',
    data() {
        return  {
            showDoctors: true,
            showActivePlan: false
        }
    },
    created() {
        resource.checkStatus().then(res => {
            if (res.body.code == 0) {
                if (res.body.result.activeRemindStatus == 0) {
                    this.showActivePlan = true
                }
            }
        })
    },
    methods: {
        doctors: function(){
            this.$router.push('doctors')
        },
        activePlan() {
            this.$router.push('activePlan')
        }
    }
}