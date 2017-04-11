<template>
    <div class="keepPage">
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">2014年3月4日</div>
            <div class="cell-assign">农历二月初八</div>
            <router-link to="more">
                <div class="label">更多</div>
            </router-link>
    
        </a>
    
        <div class="doctor-msg">
            <div class="doctor-avatar">
                <router-link to="chat">
                    <div class="img-box">
                        <img src="../../assets/image/demo-avatar.png" alt="">
                        <div class="co">1</div>
                    </div>
                    <div class="name">宋宝强</div>
                </router-link>
    
            </div>
            <div class="medicine-tip">
                <div class="tip">出院第<em>7</em>天</div>
                <div class="tip-ass">记得按时吃药哦</div>
            </div>
        </div>
        <div class="medicine-card" v-bind:class="{'transition-hide': isTake}" v-if="!calendarCard">
            <div class="timer">
                09:00 <i class="icon-love"></i>
            </div>
            <ul class="medicine-list">
                <li>他汀（安托伐他汀）</li>
                <li>长效降压（氨碌地平）</li>
                <li>其他</li>
            </ul>
            <div class="section-button">
                <mt-button type="primary" size="large"  @click="takeMedicine">吃完药请点这里</mt-button>
            </div>
        </div>
        <div class="calendar-card" v-show="calendarCard" v-bind:class="{'transition-hide': !calendarTransform}">
            <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './keep.scss';
</style>

<script src="./keep">
    
</script>