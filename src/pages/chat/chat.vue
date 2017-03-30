<template>
  <div class="chatPage">
    <header>张医生</header>
    <div class="chat_body clearfix">
      <!-- 左边 文字 -->
      <div class="left_flex">
        <div class="left_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="left_txt">
          啦啦啦啦啦啦啦啦
        </div>
      </div>
  
      <!-- 左边 图片加类chat_image -->
      <div class="left_flex">
        <div class="left_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="left_txt chat_image">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
      </div>
  
      <!-- 左边 语音加类left_voice -->
      <div class="left_flex">
        <div class="left_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="left_txt left_voice">
          <span>8"</span>
        </div>
      </div>
  
      <!-- 左边 链接加类left_link -->
      <div class="left_flex">
        <div class="left_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <router-link class="left_txt left_link" tag="div" to="https://mail.qq.com">
          这是链接<a>https://mail.qq.com</a>
        </router-link>
      </div>
  
      <span class="time">2017年3月19号 20:03</span>
  
      <!-- 右边 -->
      <div class="right_flex">
        <div class="right_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="right_txt">
          啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦
        </div>
      </div>
  
      <!-- 右边 图片加类chat_image -->
      <div class="right_flex">
        <div class="right_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="right_txt chat_image">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
      </div>
  
      <!-- 右边 语音加类right_voice -->
      <div class="right_flex">
        <div class="right_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <div class="right_txt right_voice">
          <span>8"</span>
        </div>
      </div>
  
      <!-- 左边 链接加类right_link -->
      <div class="right_flex">
        <div class="right_header">
          <img src="../../assets/image/demo-avatar.png" alt="">
        </div>
        <router-link class="right_txt right_link" tag="div" to="https://mail.qq.com">
          <a>https://mail.qq.com</a>
        </router-link>
      </div>
    </div>
  
    <div class="chat_zone">
      <div class="chat_footer">
        <!-- 添加on为语音状态 -->
        <i class="emotion"></i>
      </div>
      <div class="chat_footer chat_footer_center">
        <!-- 输入框状态 -->
        <textarea name="" id=""></textarea>
        <!-- 语音状态-->
        <input type="button" value="按住说话" name="press">
      </div>
      <div class="chat_footer">
        <input type="file" name="file">
        <input type="button" name="button" class="chat_image">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './chat.scss';
</style>

<script src="./chat.js"></script>
