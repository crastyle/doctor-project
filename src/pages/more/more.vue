<template>
  <div class="morePage">
    <div class="more_body">
      <div class="more_cells">
        <div class="more_cell">
          <div class="more_hd">
            <label class="more_label" for="">提醒方式</label>
          </div>
          <div class="more_ft single-radio">
            <mt-radio :options="options" v-model="remindWay"></mt-radio>
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
  
          <div class="more_ft arrow" @click="updateSex">
  
            {{userInfo.sex == 1 ? "男" : "女"}}
  
          </div>
  
          <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  
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
  
      <router-link to="doctors">
        <div class="more_cells">
          <div class="more_cell">
            <div class="more_hd">
              <label class="more_label" for="">我的医生</label>
            </div>
            <div class="more_ft arrow"></div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="doctor_dialog" v-if="showMobile">
      <div class="doctor_mask doctor-mask_transparent"></div>
  
      <div class="doctor_message">
  
        <div class="doctor_hd">更换手机号码</div>
  
        <div class="doctor_bd">
  
          <!-- 姓名 年龄 手机号-->
  
          <input type="tel" v-model="mobile">
  
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

<script src='./more'>

</script>
