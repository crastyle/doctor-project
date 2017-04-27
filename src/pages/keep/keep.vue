<template>
    <div class="keepPage">
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">{{currentTime}}</div>
            <router-link to="more">
                <div class="label">更多</div>
            </router-link>
        </a>
        <div class="more_cells" @click="bind" v-if="unbind">
            <div class="more_cell">
                <div class="more_hd">
                    绑定医生
                </div>
                <div class="more_ft arrow">
                    绑定医生获得更多贴心服务
                </div>
            </div>
        </div>
        <div class="doctor-msg" v-if="!unbind">
            <div class="doctor-avatar" @click="goChat">
                <div class="img-box">
                    <img :src="doctorInfo.headImg" alt="">
                    <div class="co">1</div>
                </div>
                <div class="name">{{doctorInfo.doctorName}}</div>
            </div>
            <div class="medicine-tip">
                <div class="tip">出院第<em>{{leaveDay}}</em>天</div>
                <div class="tip-ass" @click="showTips">{{leaveMessage}}</div>
            </div>
        </div>
        <div class="medicine-card" @click="backMonthDiary" v-bind:class="{'transition-hide': isTake}" v-if="!checkInStatus">
            <div class="timer">
                {{remindTime}} <i class="icon-love"></i>
            </div>
            <div class="medicine-list">
                <div class="label">
                    {{isDetail ? '当日所用药物': '服用药物'}}
                </div>
    
                <div class="values checklist">
                    <mt-checklist :value="defaultChecklist" v-model="medicineList" :options="checklistOpt"></mt-checklist>
                </div>
            </div>
            <div class="section-button" v-if="!isDetail">
                <mt-button type="primary" size="large" @click="checkIn">吃完药请点这里</mt-button>
            </div>
            <div class="section-button" v-if="isDetail">
                <mt-button type="primary" size="large" @click="backMonthDiary">返回查看</mt-button>
            </div>
        </div>
        <div class="calendar-card" v-show="checkInStatus" v-bind:class="{'transition-hide': !calendarTransform}">
            <vue-event-calendar :events="demoEvents" @click-day="clickDay" @change-month="changeMonth"></vue-event-calendar>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './keep.scss';
</style>

<script src="./keep">
    
</script>