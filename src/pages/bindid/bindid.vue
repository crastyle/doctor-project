<template>
    <div class="bindidPage">
        <div class="tips">
            同一家医院的某一科室，只能绑定一位医生
        </div>
        <div class="label-input">
            <input placeholder="请输入数字识别码" v-model="doctorID" type="tel">
        </div>
        <div class="bd-tips">
            或者点击这里<a href="javascript:;" @click="scanQR">扫描医生二维码</a>
        </div>
        <div class="section-button">
            <mt-button type="primary" @click="bindcard" size="large">提交</mt-button>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './bindid.scss';
</style>

<script src="./bindid">
    
</script>