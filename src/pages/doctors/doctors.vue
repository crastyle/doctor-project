<template>
    <div class="doctorsPage">
        <div class="sub-title" v-if="doctors.length > 0">您已经绑定了{{doctors.length}}位医生</div>
        <div class="sub-title" v-if="!doctors || doctors.length ==0">您暂时还未绑定医生</div>
        <div class="doctor-list">
            <div class="item" v-for='(doctor, index) in doctors' @click="goDoctor(doctor)">
                <div class="avatar">
                    <div class="img-box">
                        <img :src="doctor.headImg">
                        <i class="new" v-if="doctor.isNew"></i>
                    </div>
                </div>
                <div class="info">
                    <div class="name">{{doctor.name}}</div>
                    <div class="position">{{doctor.hospital}}{{doctor.department}} {{doctor.title}}</div>
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