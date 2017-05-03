import Vue from 'vue'

import {

    Switch,

    Radio,

    Toast,

    MessageBox,

    Actionsheet

} from 'mint-ui'



import resource from '../../resource'

import base from '../../base'

Vue.component(Switch.name, Switch)

Vue.component(Radio.name, Radio)

Vue.component(Actionsheet.name, Actionsheet)

export default {
    name: 'page-switch',
    data() {
        return {
            msg: 'Welcome to More',
            validButtonText: '获取验证码',
            mobile: '',
            buttonStatus: false,
            mobile_value: true,
            sms_value: true,
            value: false,
            isBind: false,
            remindWay: 0,
            options: [{
                label: '短信',
                value: 2
            }, {
                label: '电话',
                value: 1
            }],
            actions: [{
                name: '男',
                method: () => {
                    let _this = this
                    resource.updateUserInfo({
                        sex: 1
                    }).then(res => {
                        if (res.body.code == 0) {
                            _this.sheetVisible = false
                            _this.userInfo.sex = 1
                        }
                    })
                }
            }, {
                name: '女',
                method: () => {
                    let _this = this
                    resource.updateUserInfo({
                        sex: 0
                    }).then(res => {
                        if (res.body.code == 0) {
                            _this.sheetVisible = false
                            _this.userInfo.sex = 0
                        }
                    })
                }

            }],

            userInfo: {
                userGid: '',
                mobile: '',
                name: '',
                age: '',
                sex: '',
                headImg: '',
                bindDoctorStatus: '',
                smsCode: ''
            },
            showMobile: false,
            sheetVisible: false
        }
    },
    methods: {
        handleChangeMobile(event) {
            console.log(event)
        },
        handleChangeSms(event) {
            console.log(event)
        },
        changedShow() { },
        unbind: function () {
            MessageBox.confirm('确定解除绑定该医生吗').then(action => {
                if (action === 'confirm') {
                    let _this = this

                    resource.bindDoctorInfo().then(res => {

                        return resource.unbindDoctor({

                            doctorUserGid: res.body.result.doctorUserGid

                        })

                    }).then(res => {

                        console.log(res)

                        if (res.body.code == 0) {

                            _this.isBind = false

                            Toast({

                                message: '解绑成功',

                                duration: 2000

                            })

                        }

                    })

                }

            })
        },
        bind: function () {
            this.$router.push('bindid')
        },

        cancelDialog() {

            this.showMobile = false

        },

        validMobile() {

            let _this = this
            let mobile = this.mobile

            resource.updateUserInfo({

                mobile: mobile,

                smsCode: this.userInfo.smsCode

            }).then(res => {

                if (res.body.code == 0) {

                    _this.showMobile = false
                    _this.userInfo.mobile = mobile

                }

            })

        },

        updateName() {

            let _this = this

            MessageBox.prompt('请输入姓名').then((value, action) => {

                if (value.value) {

                    resource.updateUserInfo({

                        name: value.value

                    }).then(res => {

                        if (res.body.code == 0) {

                            _this.userInfo.name = value.value

                        }

                    })

                }

            })

        },

        updateAge() {

            let _this = this

            MessageBox.prompt('请输入年龄').then((value, action) => {

                if (value.value) {

                    resource.updateUserInfo({

                        age: value.value

                    }).then(res => {

                        if (res.body.code == 0) {

                            _this.userInfo.age = value.value

                        }

                    })

                }

            })

        },

        updateSex() {
            this.sheetVisible = true

        },

        updateHead() {

            this.$router.push({

                name: 'Cropper',

                query: {

                    redirect: 'More'

                }

            })

        },

        updateMobile() {

            this.showMobile = true

        },

        getCode: function () {

            let second = 60

            let _this = this
            let mobile = this.mobile

            console.log(mobile, this.userInfo.mobile)

            if (mobile == this.userInfo.mobile) {
                Toast({
                    message: '不能和原始号码相同',
                    duration: 1500
                })
                return false
            }
            
            if (!base.validate.isTelephone(mobile)) {
                Toast({
                    message: '请输入正确的手机号码',
                    duration: 2000
                })
                return false
            }
            if (_this.buttonStatus) {
                return false
            }

            _this.buttonStatus = true

            this.validButtonText = `${second}重新获取`

            resource.smsCode({

                mobile: mobile

            }).then(res => {

                Toast({

                    message: '验证码发送成功',

                    duration: 1500

                })
                let timer = setInterval(() => {

                    second--

                    _this.validButtonText = `${second}重新获取`

                    if (second === 0) {

                        _this.buttonStatus = false

                        _this.validButtonText = '获取验证码'

                        clearInterval(timer)

                    }

                }, 1000)

            })
        },
    },

    mounted() {
        let _this = this
        // 检测用户的绑定状态
        resource.checkStatus().then(res => {
            if (res.body.result.bindDoctorStatus == 1) {
                _this.isBind = true
            }
        })
        resource.userInfo().then(res => {
            if (res.body.code == 0) {
                _this.userInfo = res.body.result
                _this.mobile = JSON.parse(JSON.stringify(_this.userInfo))['mobile']
            }
        })
        resource.planInfo().then(res => {
            if (res.body.code == 0) {
                _this.remindWay = res.body.result.remindWay
            }
        })
    },
    watch: {
        'remindWay': function () {
            resource.planInfo().then(res => {
                if (res.body.code == 0) {
                    return resource.updatePlan({
                        planGid: res.body.result.planGid,
                        remindWay: this.remindWay
                    })
                }
            })
        }
    }
}