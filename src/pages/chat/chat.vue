<template>
  <div class="chatPage">
    <div class="overlay" v-if="isPreview" @click="closePreview">
      <img :src="previewImage" >
    </div>
    <mt-header :title="doctorInfo.name"></mt-header>
    <div class="chat_body clearfix" id="content">
      <!-- 左边 文字 -->
      <!-- 左边 链接加类left_link -->
      <div v-bind:class="{'left_flex': chat.type==0, 'right_flex': chat.type==1}" v-for="chat in contentList">
        <div class="left_header" v-bind:class="{'left_header': chat.type==0, 'right_header': chat.type==1}">
          <img :src="chat.headImg" alt="">
        </div>
        <div class="left_txt" v-bind:class="{'left_header': chat.type==0, 'right_txt': chat.type==1}">
          <span v-if="chat.extra !='image'">{{chat.content}}</span>
          <img v-if="chat.extra=='image'" class="contentImage" :src="chat.content" @click="showPreview(chat.content)">
        </div>
      </div>
    </div>
  
    <div class="chat_zone" v-if="msgType">
      <div class="chat_footer" @click="changeStatus">
        <!-- 添加on为语音状态 -->
        <i class="emotion"></i>
      </div>
      <div class="chat_footer">
        <!-- 添加on为语音状态 -->
        <i class="chat_image"></i>
        <input type="file" accept="image/*" @change="sendImage">
      </div>
      <div class="chat_footer chat_footer_center" v-if="msgType">
        <!-- 输入框状态 -->
        <textarea name="" id="" v-model="chatContent"></textarea>
        <!-- 语音状态-->
      </div>
  
      <div class="chat_footer" @click="sendMsg">
        发送
      </div>
    </div>
  
    <div class="chat_zone" v-if="!msgType">
      <div class="chat_footer" @click="changeStatus">
        <!-- 添加on为语音状态 -->
        <i class="emotion on"></i>
      </div>
      <div class="chat_footer chat_footer_center voice">
        <!-- 输入框状态 -->
        <!-- 语音状态-->
        <input type="button" value="按住说话" name="press">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './chat.scss';
</style>

<script src="./chat.js"></script>
