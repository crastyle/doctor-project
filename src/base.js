import resource from './resource'
export default {
    validate: {
        isTelephone(val) {
            return /^1\d{10}$/.test(val)
        },
        isNumber(val) {
            return /^\d+$/.test(val)
        },
        isUserName(val) {
            return !!val
        },
        isValicode(val) {
            return /^\d{6}$/.test(val)
        },
        isDoctorCard(val) {
            return /^\d+$/.test(val)
        }
    },
    getopenId() {
        let code = this.getUrlparams('code')
        let ls_openId = window.localStorage.getItem('openId')
        // resource.jsApiConfig().then(res => {
        //   console.log(res)
        // })
        /**
         * openId对应的是用户信息，并且是唯一的，时效性为永久
         * 所以保存在本地存储就可以
         * 首先进入程序的时候判断本地存储有没有openId
         * 如果没有的话，则判断是否是微信环境，并且是否已经授权登录
         * 如果是，将得到的code发送给后台换取openId，保存openId到本地，重复以上步骤
         */

        // if (!ls_openId || ls_openId === "undefined") {
        //     if (!code && this.isWechat()) {
        //         resource.jsApiConfig().then(res => {
        //             let redirect_uri = encodeURIComponent(location.href)
        //             let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
        //             window.location.href = codeUrl
        //         })
        //     } else {
        //         resource.oath({
        //             code: code
        //         }).then(res => {
        //             let openId = res.body.result.openId
        //             window.localStorage.setItem('openId', openId)
        //         })
        //     }
        // }
    },
    getUrlparams(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return 0;
        }
        return results[1] || 0;
    },
    isWechat() {
        return window.navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0
    },
    formatDate(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${year}-${month}-${day}`
    },
    formatDate2(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${year}年${month}月${day}日`
    },
    formatEventDate(time) {
          let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day

        return `${year}/${month}/${day}`
    },
    initIm(appid) {
        RongIMLib.RongIMClient.init(appid);
    },
    watchIM() {
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        location.reload()
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    location.reload()
                        console.log('网络不可用');
                        break;
                }
            }
        });
    },
    connectIM(token) {
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                console.log("Login successfully." + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                }
                console.log(errorCode);
            }
        });
    },
}