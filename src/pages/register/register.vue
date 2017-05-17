<template>
    <div class="root">
        <div class="validMobile">
            <div class="cell-input">
                <input class="input-item block icon-mobile" placeholder="手机" v-model="userInfo.mobile">
            </div>
            <div class="cell-input">
                <input class="input-item block icon-code" placeholder="验证码" v-model="userInfo.smsCode">
                <button class="valid-button" @click="getCode" v-bind:class="{'disabled': buttonStatus}">{{validButtonText}}</button>
            </div>
            <div class="cell-input">
                <a href="javascript:;" class="confirm-button" @click="login">登录</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './register.scss';
</style>

<script src="./register">

</script>
