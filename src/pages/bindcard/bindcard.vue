<template>
    <div class="bindcardPage">
        <div class="doctor-card">
            <img :src="doctorInfo.headImg" alt="">
            <div class="doctor-name">
                {{doctorInfo.doctorName}} 医生
            </div>
        </div>
        <div class="section-button">
            <mt-button type="primary" @click="bind" size="large">绑定医生</mt-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './bindcard.scss';
</style>

<script src="./bindcard">
    
</script>