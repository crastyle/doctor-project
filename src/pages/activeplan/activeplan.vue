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
                <mt-datetime-picker ref="picker" @confirm="setLeaveValue" year-format="{value}年" month-format="{value}月" date-format="{value}日" v-model="leavePickerDate" :endDate="endDate" type="date"></mt-datetime-picker>
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
   
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    提醒方式
                </div>
                <div class="values" @click="showRemindWay">
                    {{remindWayStr}}
                </div>
                <mt-actionsheet :actions="remindWays" v-model="isRemindWay"></mt-actionsheet>
            </div>
        </div>
        <div class="sub-title">
            用药类别
        </div>
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    他汀类药物
                </div>
                <div class="values" @click="showMed1">
                    {{med1Name || "点击选择"}}
                </div>
                <mt-actionsheet :actions="med1" v-model="isMed1"></mt-actionsheet>
            </div>
        </div>
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    降压类药物
                </div>
                <div class="values" @click="showMed2">
                    {{med2Name || "点击选择"}}
                </div>
                <mt-actionsheet :actions="med2" v-model="isMed2"></mt-actionsheet>
            </div>
        </div>
        <div class="item">
            <div class="item-cell arrow-right">
                <div class="label">
                    其他
                </div>
                <div class="values" @click="showMed3">
                    {{med3Name || "点击选择"}}
                </div>
                <mt-actionsheet :actions="med3" v-model="isMed3"></mt-actionsheet>
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
