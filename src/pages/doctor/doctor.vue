<template>
    <div class="doctorPage">
        <img :src="doctor.headImg" class="avatar">
        <div class="name">{{doctor.name}}</div>
        <div class="sub">{{doctor.hospital}} {{doctor.title}}</div>
        <div class="section-button">
            <a href="javascript:;" class="u-btn btn-block btn-assert" @click="chat">
                开始聊天
                <i class="new-msg" v-if="doctor.isNew"></i>
            </a>
            <a href="javascript:;" class="u-btn btn-block btn-dark" @click="unbind">解除绑定</a>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './doctor.scss';
</style>
<script src="./doctor"></script>