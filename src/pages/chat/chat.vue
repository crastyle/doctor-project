<template>
  <div class="chatPage">
    <header>张医生</header>
    <div class="chat_body clearfix">
      <!-- 左边 文字 -->
    
  
      <!-- 左边 链接加类left_link -->
      <div class="left_flex" v-for="chat in contentList" v-if="chat.type == 0"> 
        <div class="left_header">
          <img :src="chat.headImg" alt="">
        </div>
         <div class="left_text">
          {{chat.content}}
        </div>
      </div>
  
      <span class="time">2017年3月19号 20:03</span>
  
      <!-- 右边 -->
      <div class="right_flex" v-for="chat in contentList" v-if="chat.type == 1">
        <div class="right_header">
          <img :src="chat.headImg" alt="">
        </div>
        <div class="right_txt">
          {{chat.content}}
        </div>
      </div>
  
  
    </div>
  
    <div class="chat_zone">
      <div class="chat_footer">
        <!-- 添加on为语音状态 -->
        <i class="emotion"></i>
      </div>
      <div class="chat_footer chat_footer_center">
        <!-- 输入框状态 -->
        <textarea name="" id="" v-model="chatContent"></textarea>
        <!-- 语音状态-->
        <input type="button" value="按住说话" name="press">
      </div>
      <div class="chat_footer" @click="sendMsg">
        发送
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './chat.scss';
</style>

<script src="./chat.js"></script>
