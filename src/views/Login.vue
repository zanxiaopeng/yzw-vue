<template>
    <section class="loginbox">
        <header class="font-xiti">
            <div class="loginbox-top padding-cler">
                <img src="http://s.iyouzhuang.com/images/yzw-logo-logo.png">
                <p>
                    一次购买
                    <i>终身</i>领取
                </p>
            </div>
        </header>
        <div class="login-center font-xiti">
            <p class="input-p">
                <input type="tel" v-model="phone" @focus="closeBotimg" @blur="showBotimg" placeholder="绑定手机号">
            </p>
            <p class="input-p">
                <input type="password" v-model="password" @focus="closeBotimg" @blur="showBotimg" placeholder="登录密码">
            </p>
            <span href="javascript:;" id="btnSubmit" @click="login" class="btn-login">马上登录</span>
            <p class="zhucejrm clearfix">
                <router-link to="/Login/Register">
                    注册
                </router-link>
                <router-link to="/Login/Getpassword">
                    忘记密码?
                </router-link>
            </p>
        </div>
        <div class="back-bottom" v-show="bottombagIsShow">
            <img src="../style/images/logo-b-banck.png">
        </div>
    
        <transition name="account">
            <router-view></router-view>
        </transition>
    
    </section>
</template>

<script>
import { getLogin } from '../service/getData';
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    data() {
        return {
            bottombagIsShow: true,
            fromurl: "",
            phone: "",
            password: ""
        }
    },
    created() {
        this.fromurl = this.$route.query.fromurl;
    },
    methods: {
        closeBotimg() {
            this.bottombagIsShow = false;
        },
        showBotimg() {
            this.bottombagIsShow = true;
        },
        async login() {
            if (_Common.checkMobile(this.phone) == false) {
                _Common.toastBottom('手机格式不正确');
                return;
            }
            if (!this.password) {
                _Common.toastBottom('以上均为必填项');
                return;
            }
            const loginData = await getLogin({
                data: {
                    username: this.phone,
                    password: this.password
                }
            });
            if (loginData.result == 0) {
                await _Common.setStore(_Config.loginStoreName, {
                    uuid: loginData.data.uuid,
                    nickname: loginData.data.nickname,
                    photo: loginData.data.photo,
                });
                if (this.fromurl) {
                    this.$router.push({ path: this.fromurl });
                }
                else {
                    this.$router.push({ path: '/My' });
                }
            }
            else {
                _Common.toastBottom(loginData.message);
                return;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.loginbox {
    width: 100%;
    background: #fff;
    position: absolute;
    height: 100%;
    header {
        .loginbox-top {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            text-align: center;
            padding-top: 50px;
            img {
                display: block;
                width: 110px;
                margin: 0 auto;
                margin-bottom: 10px;
            }
            p {
                text-align: center;
                font-size: 14px;
                color: #999;
                letter-spacing: 3px;
                i {
                    font-weight: 600;
                }
            }
        }
    }
    .login-center {
        width: 100%;
        margin-top: 25px;
        padding: 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        p.input-p {
            border-bottom: 1px solid #eee;
            position: relative;
            input {
                width: 100%;
                display: block;
                height: 45px;
                line-height: 45px;
                text-align: left;
                font-size: 14px;
                color: #333;
                letter-spacing: 1px;
                background: rgba(255, 255, 255, 0);
            }
        }
        .btn-login {
            background: #e9285e;
            display: block;
            height: 45px;
            line-height: 45px;
            color: #fff;
            width: 100%;
            text-align: center;
            font-size: 16px;
            border: 0px;
            margin-top: 15px;
        }
        .zhucejrm {
            font-size: 14px;
            margin-top: 12px;
            a:nth-child(1) {
                color: #e72d60;
                float: left;
            }
            a:nth-child(2) {
                color: #a9a9a9;
                float: right;
            }
        }
    }
    .back-bottom {
        display: block;
        position: fixed;
        bottom: 0px;
        left: 0px;
        text-align: center;
        width: 100%;
        img {
            width: 200px;
            margin: 0 auto;
            display: block;
        }
        @media screen and (min-height:480px) {
            img {
                width: 110px;
            }
        }
        @media screen and (min-height:568px) {
            img {
                width: 150px;
            }
        }
        @media screen and (min-height:667px) {
            img {
                width: 200px;
            }
        }
    }
}

.account-enter-active,
.account-leave-active {
    transition: transform .3s;
}

.account-enter,
.account-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>


