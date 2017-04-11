<template>
    <div class="root">
        <div class="loginPage">
            <div class="avatar-content" @click="showLoginForm">
                <img :src="userInfo.headImg" alt="" class="avatar">
                <p class="tip">点击修改头像</p>
            </div>
        </div>
        <LoginForm v-if="activeLoginForm"></LoginForm>
        <mt-field label="姓名" placeholder="输入姓名" v-model="userInfo.name"></mt-field>
        <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="userInfo.age"></mt-field>
        <a class="mint-cell mint-field">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title"><span class="mint-cell-text">性别</span>
                </div>
                <div class="mint-cell-value">
                    <div class="sex-value" @click="sex">{{sexValue}}</div>
                    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
                </div>
            </div>
            <div class="mint-cell-right"></div>
        </a>
        <mt-field label="手机号" placeholder="输入手机号" type="tel" v-model="userInfo.mobile"></mt-field>
        <mt-field label="验证码" placeholder="输入验证码" v-model="userInfo.smsCode">
            <button class="valid-button" @click="getCode"  v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
        </mt-field>
        <div class="section-button">
                <mt-button type="primary" size="large" @click="login">验证登录</mt-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './login.scss';
</style>

<script src="./login">
    
</script>
