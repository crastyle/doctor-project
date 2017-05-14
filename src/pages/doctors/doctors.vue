<template>
    <div class="doctorsPage">
        <div class="sub-title">您已经绑定了2位医生</div>
        <div class="doctor-list">
            <div class="item">
                <div class="avatar">
                    <div class="img-box">
                        <img :src="$static + 'ava.jpg'">
                    </div>
                </div>
                <div class="info">
                    <div class="name">王龙医生</div>
                    <div class="position">北京市海淀区协和医院外科 主任</div>
                </div>
            </div>
            
            <router-link to="bindid">
                <div class="item">
                    <div class="avatar">
                        <div class="img-box">
                            <div class="icon-add"></div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="add-tip">新增医生</div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import './doctors.scss';
</style>
<script src="./doctors"></script>