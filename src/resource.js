import Vue from 'vue'
import vueResource from 'vue-resource'
import { Toast } from 'mint-ui';
Vue.use(vueResource)
export default {
    interceports() {
        Vue.http.interceptors.push((req, next) => {
            let toast = Toast({
                message: '请求中...'
            })
            next(res => {
                toast.close()
                if (res.status !== 0) {
                    Toast({
                        message: res.statusText,
                        duration: 2000
                    })
                }
            })

        })
    },
    resource(url, params) {
        let doUrl = '' + url
        return Vue.http.get(doUrl, params)
    },
    register(params) {

        return this.resource('111.jspn', params)
    }
}
