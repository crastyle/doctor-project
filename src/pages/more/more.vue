<template>
  <div class="morePage">
    <div class="more_body">
      <div class="more_cells">
        <div class="more_cell" v-for="item in remindWayList">
          <div class="more_hd">
            <label class="more_label" for="">{{item == 1 ? '电话' : '短信'}}</label>
            <span>已开启</span>
          </div>
          <div class="more_ft">
            <mt-switch v-model="mobile_value" @change="handleChangeMobile" v-if="item == 1"></mt-switch>
            <mt-switch v-model="sms_value" @change="handleChangeSms" v-if="item == 2"></mt-switch>
          </div>
        </div>
  
      </div>
      <div class="more_cells">
        <div class="more_cell" v-for="item in medicineList">
          <div class="more_hd">
            <label class="more_label" for="">{{item}}</label>
            <span>服用中</span>
          </div>
        </div>
      </div>
      <div class="more_cells">
        <div class="more_cell" @click="updateHead">
          <div class="more_hd">
            <label class="more_label" for="">头像</label>
          </div>
          <div class="more_ft">
            <img :src="userInfo.headImg" alt="" class="headImg">
          </div>
        </div>
        <div class="more_cell" @click="updateName">
          <div class="more_hd">
            <label class="more_label" for="">姓名</label>
          </div>
          <div class="more_ft arrow" @click="changedShow">
            {{userInfo.name}}
          </div>
        </div>
        <div class="more_cell" @click="updateAge">
          <div class="more_hd">
            <label class="more_label" for="">年龄</label>
          </div>
          <div class="more_ft arrow">
            {{userInfo.age}}
          </div>
        </div>
        <div class="more_cell">
          <div class="more_hd">
            <label class="more_label" for="">性别</label>
          </div>
          <div class="more_ft ">
            {{userInfo.sex == 1 ? "男" : "女"}}
          </div>
        </div>
  
        <div class="more_cell" @click="updateMobile">
          <div class="more_hd">
            <label class="more_label" for="">手机号</label>
          </div>
          <div class="more_ft arrow">
            {{userInfo.mobile}}
          </div>
        </div>
      </div>
  
      <div class="more_cells" v-if="isBind" @click="unbind">
        <div class="more_cell">
          <div class="more_hd">
            <label class="more_label" for="">重新绑定</label>
          </div>
          <div class="more_ft arrow">
            解绑当前医生，绑定新医生
          </div>
        </div>
      </div>
  
      <div class="more_cells" v-if="!isBind" @click="bind">
        <div class="more_cell">
          <div class="more_hd">
            <label class="more_label" for="">绑定医生</label>
          </div>
          <div class="more_ft arrow">
            绑定医生获得更多贴心服务
          </div>
        </div>
      </div>
  
  
    </div>
  
    <div class="doctor_dialog" v-if="showMobile">
      <div class="doctor_mask doctor-mask_transparent"></div>
      <div class="doctor_message">
        <div class="doctor_hd">更换手机号码</div>
        <div class="doctor_bd">
          <!-- 姓名 年龄 手机号-->
          <input type="tel" v-model="userInfo.mobile">
          <!-- 验证码 -->
          <div class="code">
            <input type="text" v-model="userInfo.smsCode">
            <a href="javascript:;" class="button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</a>
          </div>
        </div>
        <div class="doctor_ft">
          <a href="javascript:;" class="doctor_dialog_cancel" @click="cancelDialog">取消</a>
          <a href="javascript:;" @click="validMobile">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  @import './more.scss';
</style>

<script>
  import Vue from 'vue'
  import {
    Switch,
    Radio,
    Toast,
    MessageBox
  } from 'mint-ui'
  
  import resource from '../../resource'
  import base from '../../base'
  Vue.component(Switch.name, Switch)
  Vue.component(Radio.name, Radio)
  export default {
    name: 'page-switch',
    data() {
      return {
        msg: 'Welcome to More',
        validButtonText: '获取验证码',
        buttonStatus: false,
        mobile_value: true,
        sms_value: true,
        value: false,
        sexValue: '男',
        isBind: false,
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
        medicineList: [],
        remindWayList: [],
        showMobile: false
  
      }
    },
    methods: {
      handleChangeMobile(event) {
        console.log(event)
      },
      handleChangeSms(event) {
        console.log(event)
      },
      changedShow() {},
      unbind: function() {
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
      bind: function() {
        this.$router.push('bindid')
      },
      cancelDialog() {
        this.showMobile = false
      },
      validMobile() {
        let _this = this
        resource.updateUserInfo({
          mobile: this.userInfo.mobile,
          smsCode: this.userInfo.smsCode
        }).then(res => {
          if (res.body.code == 0) {
            _this.showMobile = false
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
      getCode: function() {
        let second = 60
        let _this = this
        if (!base.validate.isTelephone(this.userInfo.mobile)) {
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
          mobile: this.userInfo.mobile
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
        }
      })
  
      resource.planInfo().then(res => {
        console.log(res)
        if (res.body.code == 0) {
          _this.medicineList = res.body.result.medicine.split(',')
          _this.remindWayList = res.body.result.remindWay.split(',')
        }
      })
  
    }
  }
</script>
