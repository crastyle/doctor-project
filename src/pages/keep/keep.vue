<template>
    <div class="keepPage">
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">{{currentTime}}</div>
            <router-link to="more">
                <div class="label">更多</div>
            </router-link>
        </a>
        <div class="doctor-msg">
            <div class="doctor-avatar">
                <router-link to="chat">
                    <div class="img-box">
                        <img :src="doctorInfo.headImg" alt="">
                        <div class="co">1</div>
                    </div>
                    <div class="name">{{doctorInfo.doctorName}}</div>
                </router-link>
            </div>
            <div class="medicine-tip">
                <div class="tip">出院第<em>{{leaveDay}}</em>天</div>
                <div class="tip-ass" @click="showTips">{{leaveMessage}}</div>
            </div>
        </div>
        <div class="medicine-card" v-bind:class="{'transition-hide': isTake}" v-if="!checkInStatus">
            <div class="timer">
                {{remindTime}} <i class="icon-love"></i>
            </div>
            <ul class="medicine-list">
                <li v-for="item in medicineList">{{item}}</li>
            </ul>
            <div class="section-button">
                <mt-button type="primary" size="large" @click="checkIn">吃完药请点这里</mt-button>
            </div>
        </div>
        <div class="calendar-card" v-show="checkInStatus" v-bind:class="{'transition-hide': !calendarTransform}">
            <vue-event-calendar :events="demoEvents" @curDayChanged="changed"></vue-event-calendar>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './keep.scss';
</style>

<script src="./keep">
    
</script>