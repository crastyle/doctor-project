import { Toast } from 'mint-ui'
import resource from '../../resource'
import base from '../../base'
export default {
  name: 'Bindid',
  data() {
    return {
      msg: 'Welcome to Bindid',
      doctorID: ''
    }
  },
  created() {
    let _this = this
    // 检测用户的绑定状态，如果已经绑定了医生的话，直接跳转到激活页面
    resource.jsApiConfig().then(res => {
      if (res.body.code == 0) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.body.result.appId, // 必填，公众号的唯一标识
          timestamp: res.body.result.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.body.result.nonceStr, // 必填，生成签名的随机串
          signature: res.body.result.signature,// 必填，签名，见附录1
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    })

  },
  methods: {
    bindcard() {

      let id = this.doctorID,
        _this = this
      if (!base.validate.isDoctorCard(id)) {
        Toast({
          message: '医生识别码不正确',
          duration: 2000
        })
        return false
      }
      resource.doctorDetail({ identifyCode: id }).then((res) => {
        if (res.body.code == 0) {
          _this.$router.push({ name: 'Bindcard', query: { code: id } })
        }
      })
    },
    scanQR() {
      let _this = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (cb) {
          resource.doctorDetail({ identifyCode: cb.resultStr }).then((res) => {
            if (res.body.code == 0) {
              _this.$router.push({ name: 'Bindcard', query: { code: cb.resultStr } })
            }
          })
          // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      });
    }
  }
}