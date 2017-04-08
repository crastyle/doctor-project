<template>
    <div class="login-form">
        <div class="login-panel">
            <mt-field label="用户名" placeholder="用户名" v-model="loginForm.username"></mt-field>
            <mt-field label="邮箱" placeholder="邮箱" v-model="loginForm.email" type="email"></mt-field>
            <mt-field label="密码" placeholder="密码" v-model="loginForm.password" type="password"></mt-field>
            <mt-field label="手机" placeholder="请输入手机号码" v-model="loginForm.telephone" type="tel"></mt-field>
            <div class="center">
                <mt-button type="primary" @click="login">登录</mt-button>
                <mt-button type="danger" @click="cancel">取消</mt-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .login-form {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 555;
        background: rgba(0, 0, 0, 0.8);
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
    }
    
    .center {
        text-align: center;
    }
    
    .login-panel {
        background: #fff;
        width: 80%;
    }
</style>

<script>
    import Vue from "vue"
    import {
        Field
    } from 'mint-ui';
    Vue.component(Field.name, Field);
    export default {
        data() {
            return {
                loginForm: {
                    username: '淼淼爱宇哥',
                    password: '',
                    email: '197203392@qq.com',
                    telephone: ''
                }
    
            }
        },
        methods: {
            login() {
                console.log(this.loginForm.email)
            },
            cancel() {
                this.$parent.activeLoginForm = false
            }
        }
    }
</script>