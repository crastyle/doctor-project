<template>
    <div class="bindcardPage">
        <div class="doctor-card">
            <img src="../../assets/image/demo-card.png" alt="">
            <div class="doctor-name">
                宋宝强 主任医生
            </div>
        </div>
        <div class="section-button">
            <router-link to="leave">
                <mt-button type="primary" size="large">绑定医生</mt-button>
            </router-link>
            
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './bindcard.scss';
</style>
<script src="./bindcard"></script>