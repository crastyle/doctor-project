import resource from '../../resource'
import base from '../../base'
import { bus } from '../../bus'
export default {
  name: 'Chat',
  data() {
    return {
      msg: 'Welcome to Chat',
      doctorInfo: {},
      userInfo: {},
      chatContent: '',
      contentList: []
    }
  },
  mounted() {
    let _this = this
    this.id = this.$route.query.id
    resource.bindDoctorInfo().then(res => {
      if (res.body.code == 0 && res.body.result.bindDoctorStatus == 1) {
        _this.doctorInfo = res.body.result
        _this.getHistoryRecord()
        _this.receiveMsg()
      }
    })
    resource.userInfo().then(res => {
      if (res.body.code == 0) {
        _this.userInfo = res.body.result
      }
    })
    bus.$emit('receiveMsg', function (e) {
      console.log(22222222222)
    })
    bus.$on('receiveMsg', function () {
      console.log(111111111111)
    })
  },
  created() {
    bus.$emit('receiveMsg', function (e) {
      console.log(22222222222)
    })
    bus.$on('receiveMsg', function () {
      console.log(111111111111)
    })
  },

  methods: {
    receiveMsg(params) {
      console.log('asdasdasd')
      bus.$emit('receiveMsg', function (e) {
        console.log(22222222222)
      })
      bus.$on('receiveMsg', function () {
        console.log(111111111111)
      })
    },
    getHistoryRecord() {
      //getHistoryMessages
      RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, this.$route.query.id, null, 20, {
        onSuccess: function (list, hasMsg) {
          console.log(list, 'list')
          // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
          // list 为拉取到的历史消息列表
        },
        onError: function (error) {
          // APP未开启消息漫游或处理异常
          // throw new ERROR ......
        }
      });
    },
    sendMsg() {
      let _this = this
      // 定义消息类型,文字消息使用 RongIMLib.TextMessage
      var msg = new RongIMLib.TextMessage({ content: this.chatContent, extra: "" });
      //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
      //var msg = RongIMLib.TextMessage.obtain("hello");
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
      var targetId = this.$route.query.id; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        // 发送消息成功
        onSuccess: function (message) {
          //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
          console.log("Send successfully");
          _this.contentList.push({
            content: _this.chatContent,
            headImg: _this.userInfo.headImg,
            type: '1'
          })
          _this.chatContent = ''
        },
        onError: function (errorCode, message) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = '在黑名单中，无法向对方发送消息';
              break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = '不在讨论组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = '不在群组中';
              break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = '不在聊天室中';
              break;
            default:
              info = x;
              break;
          }
          console.log('发送失败:' + info);
        }
      }
      );
    }
  }
}
