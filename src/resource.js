import Vue from 'vue'
import vueResource from 'vue-resource'
import { Toast } from 'mint-ui';
Vue.use(vueResource)
export default {
    interceports() {
        Vue.http.interceptors.push((req, next) => {
            req.method = "POST"
            console.log(req)
            let u = window.localStorage.getItem('u_uid')
            let t = window.localStorage.getItem('u_token')
            if (!u || u !== "undefined") {
                if (!req.body) {
                    req.body = {}
                }
                req.body['u'] = u
                req.body['t'] = t
                req.body['c'] = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0 ? 'wechat' : ''
            }
            let toast = Toast({
                message: '请求中...'
            })
            next(res => {
                toast.close()
                if (!res.ok) {
                    Toast({
                        message: res.statusText,
                        duration: 2000
                    })
                    return
                }
                if (res.ok && res.body.code !== 0) {
                    Toast({
                        message: res.body.message,
                        duration: 2000
                    })
                    return
                }
            })
        })
    },
    resource(url, params) {
        let doUrl = 'http://139.198.11.46:8080/' + url

        return Vue.http.post(doUrl, params)
    },

    /**
     * @description 用来获取微信用户的openId
     * @param {*} params {code}
     * @return <promise>
     * @response openid
     */
    oath(params) {
        return this.resource('gateway/patient/oauth', params)
    },

    /**
     * @description 获取用来js-sdk认证的config参数信息
     * @param {*} params {code}
     * @return <promise>
     * @response code
     */
    jsApiConfig(params) {
        return this.resource('gateway/patient/jsApiConfig', params)
    },
    /**
     * @description 判断用户是否绑定手机号
     * @return {bind, openid, u, t}
     */
    checkBind(params) {
        return this.resource('patient/user/checkBind', params)
    },
    /**
     * @description 用来判断用户是否绑定了医生或者激活了日历
     * @return {bindDoctorStatus,  activeRemindStatus}
     */
    checkStatus(params) {
        return this.resource('patient/user/checkStatus', params)
    },

    /**
     * @description 用户注册接口
     * @return u,t
     */
    register(params) {

        return this.resource('patient/user/register', params)
    },

    /**
     * @description 判断手机是否已经注册
     */
    mobileUsed(params) {
        return this.resource('patient/user/mobileUsed', params)
    },
    /**
     * @description 获取系统当前时间戳
     */
    getSystemTimestamp(params) {
        return this.resource('utility/timestamp', params)
    },

    /**
     * @description 发送手机验证码
     * @params {mobile: string}
     */
    smsCode(params) {
        return this.resource('utility/smsCode', params)
    },

    uploadImageWithCrop(params) {
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key])
        }
        return this.resource('utility/uploadImageWithCrop', formData)
    },

    /**
     * @description 绑定医生
     * @params {identifyCode: string} 
     */
    bindDoctor(params) {
        return this.resource('patient/myDoctor/bindDoctor', params)
    },

    doctorDetail (params) {
        return this.resource('patient/myDoctor/intentionDoctorInfo', params)
    }
}
