<template>
    <div class="planCalendarPage">
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">2014年3月4日</div>
            <div class="cell-assign">农历二月初八</div>
            <div class="label">更多</div>
        </a>

        <div class="doctor-msg">
            <div class="doctor-avatar">
                <div class="img-box">
                    <img src="../../assets/image/demo-avatar.png" alt="">
                    <div class="co">1</div>
                </div>
                <div class="name">宋宝强</div>
            </div>
            <div class="medicine-tip">
                <div class="tip">出院第<em>7</em>天</div>
                <div class="tip-ass">记得按时吃药哦</div>
            </div>
        </div>
        <div class="calendar-card">
            <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './planCalendar.scss';
</style>
<script src="./planCalendar"></script>