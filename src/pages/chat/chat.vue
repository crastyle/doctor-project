<template>
  <div class="chatPage">
    <div class="overlay" v-if="isPreview" @click="closePreview">
      <img :src="previewImage">
    </div>
    <mt-header :title="doctorInfo.name"></mt-header>
    <div class="chat_body clearfix" id="content">
      <!-- 左边 文字 -->
      <!-- 左边 链接加类left_link -->
      <div v-bind:class="{'left_flex': chat.type==0, 'right_flex': chat.type==1}" v-for="chat in contentList">
        <div class="left_header" v-bind:class="{'left_header': chat.type==0, 'right_header': chat.type==1}">
          <img :src="chat.headImg" alt="">
        </div>
        <div class="left_txt" v-bind:class="{'left_header': chat.type==0, 'right_txt': chat.type==1}" v-if="chat.extra!='voice'">
          <span v-if="chat.extra !='image'">{{chat.content}}</span>
          <img v-if="chat.extra=='image'" :src="chat.content" class="contentImage" @click="showPreview(chat.content)">
        </div>
        <div class="left_txt" @click="playVoice(chat.content)" v-bind:class="{'left_header left_voice': chat.type==0, 'right_txt right_voice': chat.type==1}" v-if="chat.extra=='voice'">
          <span>3"</span>
        </div>
      </div>
    </div>
  
    <div class="chat_zone" :class="{'bottom': isbottom}" v-if="msgType">
      <div class="chat_footer" @click="changeStatus" v-if="isHidden"> 
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
        <textarea name="" id="" v-model="chatContent" @focus="showBottom" @blur="hideBottom" ></textarea>
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
        <button @touchstart="startVoice" @touchend="stopVoice" name="press" class="startVoice" v-bind:class="{'stopVoice': isStartVoice}">按住说话</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './chat.scss';
</style>

<script src="./chat.js">
  
</script>
