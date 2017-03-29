<template>
    <div class="bindidPage">
        <div class="tips">
            请输入您的医生识别码
        </div>
        <div class="label-input">
            <input placeholder="输入七位有效数字" type="number">
        </div>
        <div class="bd-tips">
            或者点击这里<a href="">扫描医生二维码</a>
        </div>
        <div class="section-button">
            <mt-button type="primary" size="large">验证登录</mt-button>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './bindid.scss';
</style>
<script src="./bindid"></script>