<template>
    <div class="redirectPage">
        <div class="section-button" @click="doctors">
            <mt-button type="primary" size="large">我的医生</mt-button>
            <p class="tip">您可以绑定自己的医生，并与他们一对一沟通</p>
        </div>
        <div class="section-button" @click="activePlan">
            <mt-button type="primary" size="large">激活日历</mt-button>
            <p class="tip">激活吃药日历以后，可以管理您的日常吃药习惯</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './redirect.scss';
</style>
<script src="./redirect"></script>