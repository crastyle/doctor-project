<template>
    <div class="root">
    
        <div class="fixUserInfo">
            <div class="loginPage">
                <div class="avatar-content">
                    <div class="img-box">
                        <input type="file" @change="uploadHead" accept="images/*" class="file">
                        <img :src="userInfo.headImg" alt="" id="head" class="avatar">
                        <p class="tip">修改头像</p>
                    </div>
                </div>
            </div>
            <LoginForm v-if="activeLoginForm"></LoginForm>
            <mt-field label="姓名" placeholder="输入姓名" v-model="userInfo.name"></mt-field>
            <a class="mint-cell mint-field" @click="showBirthday">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">出生年月</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="sex-value arrow">{{birthdayStr}}</div>
    
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <mt-datetime-picker ref="birthdayPicker" @confirm="setBirthday" v-model="birthday" type="date" year-format="{value}年" month-format="{value}月" date-format="{value}日" :startDate="startTime" :endDate="endTime"></mt-datetime-picker>
            <a class="mint-cell mint-field" @click="sex">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">性别</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="sex-value arrow">{{sexValue}}</div>
    
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>
            <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
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
