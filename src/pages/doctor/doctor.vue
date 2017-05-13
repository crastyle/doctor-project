<template>
    <div class="doctorPage">
        <img :src="$static + 'ava.jpg'" class="avatar">
        <div class="name">吴医生</div>
        <div class="sub">北京市海淀区朝阳区通州区武警医院 主任医师</div>
        <div class="section-button">
            <a href="javascript:;" class="u-btn btn-block btn-assert">
                开始聊天
                <i class="new-msg"></i>
            </a>
            <a href="javascript:;" class="u-btn btn-block btn-dark">解除绑定</a>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './doctor.scss';
</style>
<script src="./doctor"></script>