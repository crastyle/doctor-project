<template>
    <div class="leavePage">
        <a href="javascript:;" class="item-cell">
            <div class="cell-date">{{currentTime}}</div>
            <router-link to="more">
                <div class="label">
                    更多
                </div>
            </router-link>
        </a>
        <div class="section-button">
            <router-link to="activeplan">
                <mt-button type="primary" size="large">出院请点这里</mt-button>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './leave.scss';
</style>

<script src="./leave">
    
</script>