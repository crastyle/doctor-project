<template>
    <div class="morePage">
      <header>更多</header>
      <div class="more_body">

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">电话提醒</label>
              <span>已开启</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">短信提醒</label>
              <span>已开启</span>
            </div>
            <div class="more_ft">
              <mt-switch v-model="value" @change="handleChange">
              </mt-switch>
            </div>
          </div>
        </div>
        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">他汀（阿法司他汀）</label>
              <span>服用中</span>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">长效降压</label>
              <span>服用中</span>
            </div>
          </div>
        </div>
        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">头像</label>
            </div>
            <div class="more_ft">
              <i class="header"></i>
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">姓名</label>
            </div>
            <div class="more_ft arrow" @click="changedShow">
              宋宝强先生
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">年龄</label>
            </div>
            <div class="more_ft arrow">
              35
            </div>
          </div>
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">性别</label>
            </div>
            <div class="more_ft arrow">
              女
            </div>
          </div>

          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">手机号</label>
            </div>
            <div class="more_ft arrow">
              13810678245
            </div>
          </div>
        </div>

        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">重新绑定</label>
            </div>
            <div class="more_ft arrow">
              解绑当前医生，绑定新医生
            </div>
          </div>
        </div>
      </div>

      <div class="doctor_dialog" style="display: none;">
        <div class="doctor_mask doctor-mask_transparent"></div>
        <div class="doctor_message">
          <div class="doctor_hd">更改姓名</div>
          <div class="doctor_bd">
            <!-- 姓名 年龄 手机号-->
            <input type="text">
            <!-- 验证码 -->
            <div class="code">
              <input type="text">
              <input type="button" value="获取验证码" name="code">
            </div>
            <!-- 性别 -->
            <div class="sex">
              <mt-radio v-model="sexValue" :options="['男', '女']">
              </mt-radio>
            </div>

          </div>
          <div class="doctor_ft">
            <a href="javascript:;" class="doctor_dialog_cancel">取消</a>
            <a href="javascript:;">确定</a>
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
  import { Switch, Radio } from 'mint-ui'
  Vue.component(Switch.name, Switch)
  Vue.component(Radio.name, Radio)
  export default {
    name: 'page-switch',
    data () {
      return {
        msg: 'Welcome to More',
        value: false,
        sexValue: '男'
      }
    },
    methods: {
      handleChange(event) {
        console.log(event)
      },
      changedShow () {
      }
    }
  }

</script>
