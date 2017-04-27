<template>
    <div class="activeplanPage">
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label ">
                    出院日期
                </div>
                <div class="values" @click="setLeavePicker">
                    {{leavePickerValue}}
                </div>
                <mt-datetime-picker ref="picker" v-model="leavePickerDate" type="date"></mt-datetime-picker>
            </div>
        </div>
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    提醒时间
                </div>
                <div class="values" @click="setForkTimePicker">
                    {{forkTimePickerDate}}
                </div>
                <mt-datetime-picker ref="forkPicker" v-model="forkTimePickerDate" type="time"></mt-datetime-picker>
            </div>
        </div>
        <!--
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    提醒周期
                </div>
                <div class="values" @click="setForkWeek">{{forkWeekValue}}</div>
                <mt-actionsheet :actions="weeksOptions" v-model="forkWeek" cancelText=""></mt-actionsheet>
            </div>
        </div>
        -->
        <div class="item">
            <div class="item-cell">
                <div class="label">
                    提醒方式
                </div>
                <div class="values single-radio">
                    <mt-radio :value="wayValue" v-model="formData.remindWay" :options="options"></mt-radio>
                </div>
            </div>
        </div>
        <!--
        <div class="item">
            <div class="item-cell">
                <div class="label">
                    所需药物
                </div>
                <div class="values checklist">
                    <mt-checklist :value="defaultChecklist" v-model="formData.medicineList" :options="checklistOpt"></mt-checklist>
                </div>
            </div>
        </div>
        -->
        <div class="section-button">
            <mt-button type="primary" @click="activePlan" size="large">激活出院日历</mt-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './activeplan.scss';
</style>

<script src="./activeplan">
    
</script>
