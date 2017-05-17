<template>
    <div class="keepPage">
        <div class="overlay" v-if="showDialog">
            <div class="overlay-tip">
                <i class="icon-ok"></i> 恭喜您
            </div>
        </div>
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">{{currentTime}}</div>
            <router-link to="more">
                <div class="label">设置</div>
            </router-link>
        </a>
        <div class="msg-box">
            <div class="msg-info-list">
                <div class="doctor-msg-info" :class="{'transform': showMessage}">
                    <div class="doctor-avatar">
                        <div class="img-box" v-if="defaultDoctor" @click="goChat">
                            <img :src="defaultDoctor.headImg" alt="">
                            <div class="co" v-if="msgCount">{{msgCount > 99 ? '...' : msgCount}}</div>
                        </div>
                        <div class="name" v-if="defaultDoctor">咨询医生</div>
                        <div class="name" v-if="!defaultDoctor" @click="bind">绑定医生</div>
                    </div>
                    <div class="medicine-tip">
                        <div class="tip" v-if="leaveDay > 0">出院第<em>{{leaveDay}}</em>天</div>
                        <div class="tip" v-if="leaveDay == 0">出院了</div>
                        <div class="tip-ass" @click="showTips">{{leaveMessage}}</div>
                    </div>
                </div>
                <div class="doctor-msg-info" :class="{'transform': showMessage}">
                    <div class="doctor-avatar" @click="goChat">
                        <div class="img-box">
                            <img :src="doctorInfo.headImg" alt="">
                            <div class="co" v-if="msgCount">{{msgCount > 99 ? '...' : msgCount}}</div>
                        </div>
                        <div class="name">咨询医生</div>
                    </div>
                    <div class="medicine-tip">
                        <div class="tip" v-if="leaveDay > 0">出院第<em>{{leaveDay}}</em>天</div>
                        <div class="tip" v-if="leaveDay == 0">出院了</div>
                        <div class="tip-ass" @click="showTips">要记得吃药啊啊啊要记得吃药啊啊啊要记得吃药啊啊啊要记得吃药啊啊啊{{leaveMessage}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="medicine-card" v-if="!checkInStatus">
            <div class="timer">
                请点击勾选今天服用的药品
            </div>
            <div class="medicine-list">
    
                <div class="values checklist">
                    <div class="med-item" v-for="(item, index) in checklistOpt">
                        <div class="med-name">{{item.name}} </div>
                        <div class="med-button">
                            <i class="icon-ok" v-if="item.isActive"></i>
                            <a href="javascript:;" v-if="!item.isActive" @click="takeMedicine(item)">吃完点这</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-button">
                <a href="javascript:;" class="show-calc-button" @click="showCalendar">用药日历</a>
            </div>
        </div>
        <div class="calendar-card" v-show="checkInStatus">
            <vue-event-calendar :events="demoEvents" @click-day="clickDay" @change-month="changeMonth"></vue-event-calendar>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './keep.scss';
</style>

<script src="./keep">
    
</script>