import resource from './resource'
import { bus } from './bus'
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
        let ls_openId = window.localStorage.getItem('openid')
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

        if (!ls_openId || ls_openId === "undefined") {
            if (!code && this.isWechat()) {
                resource.jsApiConfig().then(res => {
                    let redirect_uri = encodeURIComponent(location.href)
                    let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.body.result.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
                    window.location.href = codeUrl
                })
            } else {
                resource.oath({
                    code: code
                }).then(res => {
                    let openId = res.body.result.openId
                    window.localStorage.setItem('openid', openId)
                })
            }
        }
    },
    uglyImage(path, callback, orient) {
        var img = new Image();
        img.src = path;

        img.onload = function () {

            var that = this;
            let x = 0, y = 0;
            // 默认按比例压缩

            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d');

            var windowWidth = document.documentElement.clientWidth;
            if (orient && orient == 6) {
                canvas.width = height;
                canvas.height = width;
                ctx.save()
                ctx.translate(width / 2, height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
                ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
                ctx.drawImage(img, Number(y) - height / 2, Number(x) - width / 2, windowWidth, height * (windowWidth / width));//把图片绘制在画布translate之前的中心点，
                ctx.restore();//恢复状态
            } else {
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, x, y, width, height);
                // ctx.translate(ctx.width / 2, ctx.height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
                // ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
                // ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, -width/2, -height/2, width, height);//把图片绘制在画布translate之前的中心点，
            }
            var quality = 0.3;
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
        }
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
    connectIM(token, success) {
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                console.log("Login successfully." + userId);
                success()
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
    receiveMsg() {
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                if (!localStorage.getItem('unlist')) {
                    localStorage.setItem('unlist', message.targetId)
                } else {
                    let unlist = localStorage.getItem('unlist').split(',')
                    if (unlist.indexOf(message.targetId) < 0) {
                        unlist.push(message.targetId)
                        localStorage.setItem('unlist', unlist)
                    }
                }
                bus.$emit('receiveMsg', message)
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        // 发送的消息内容将会被打印
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载                
                        // message.content.content 格式为 AMR 格式的 base64 码
                        RongIMLib.RongIMVoice.preLoaded(message.content.content);
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // 自定义消息
                    // do something...
                }
            }
        });
    }
}