<template>
    <div class="root">
        
        <div class="fixUserInfo">
            <div class="loginPage">
                <div class="avatar-content" @click="uploadHead">
                    <img :src="userInfo.headImg" alt="" class="avatar">
                    <p class="tip">修改头像</p>
                </div>
            </div>
            <LoginForm v-if="activeLoginForm"></LoginForm>
            <mt-field label="姓名" placeholder="输入姓名" v-model="userInfo.name"></mt-field>
            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">出生年月</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="sex-value arrow" @click="showBirthday">{{birthdayStr}}</div>
                        <mt-datetime-picker ref="birthdayPicker" @confirm="setBirthday" v-model="birthday" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日" :startDate="startTime" :endDate="endTime"></mt-datetime-picker>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">性别</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="sex-value arrow" @click="sex">{{sexValue}}</div>
                        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <div class="section-button">
                <mt-button type="primary" size="large" @click="loginUserInfo">提交</mt-button>
            </div>
        </div>
    
    </div>
</template>

<style scoped lang="scss">
@import './login.scss';
</style>

<script src="./login">

</script>
