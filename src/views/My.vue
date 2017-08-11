<template>
    <section class="myhome-m">
    
        <div class="header-home">
            <router-link to="/My/EditInfo" class="edit-info iconfont">&#xe6a6;</router-link>
            <p class="myinfo-p">
                <img :src="userInfo.photo">
                <span>{{userInfo.nickname}}</span>
                <span>推荐人:
                    <i>
                        ......
                    </i>
                </span>
            </p>
            <div class="integral-div-top">
                <a href="/integral/integraldlist">
                    <i>{{userInfo.integraldaycount}}</i>
                    <span>今日积分</span>
                </a>
                <a href="/integral/integraldlist">
                    <i>{{userInfo.surplusintegralcount}}</i>
                    <span>剩余积分</span>
                </a>
                <a href="/integral/integraldlist">
                    <i>{{userInfo.consumecount}}</i>
                    <span>消费积分</span>
                </a>
            </div>
        </div>
        <div class="myhomg-content clearfix">
            <ul class="clearfix">
                <li>
                    <router-link to="/Order">
                        <img src="../style/images/order-icon.png"> 我的订单
                    </router-link>
                </li>
                <li>
                    <a href="/user/myclient">
                        <img src="../style/images/mykehu.png"> 我的客户
                    </a>
                </li>
                <li>
                    <a href="/user/targetcustomer">
                        <img src="../style/images/mymubiaokehu.png"> 目标客户
                    </a>
                </li>
                <li style="display:none;">
                    <a href="javascript:;" id="qrcode">
                        <img src="../style/images/erweimaicon.png"> 我的二维码
                    </a>
                </li>
                <li>
                    <router-link to="/Address">
                        <img src="../style/images/addressicon.png"> 收货地址
                    </router-link>
                </li>
                <li>
                    <a href="tel:400-102-4198">
                        <img src="../style/images/kefudianhua.png"> 客服电话
                    </a>
                </li>
            </ul>
            <span @click="loginout" class="resrity">重新登录</span>
        </div>
    
        <main-footer></main-footer>
    
        <transition name="editinfo">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
import MainFooter from '../components/footerMain';
import { getUserInfoMy } from '../service/getData';
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    components: {
        'main-footer': MainFooter
    },
    data() {
        return {
            customeruuid: "",
            userInfo: {}
        }
    },
    mounted() {
        let UserInfo = _Common.getStore(_Config.loginStoreName);

        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;

            this.getuserinfo();
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        async getuserinfo() {
            const user_info = await getUserInfoMy({
                data: {
                    customer_uuid: this.customeruuid
                }
            });
            if (user_info.result == 0) {
                this.userInfo = user_info.data;
            }
            else {
                this.$router.push({ path: "/login" });
            }
        },
        loginout(){
             _Common.removeStore(_Config.loginStoreName);
             this.$router.push({path:'/login'});
        }
    }
}
</script>

<style lang="scss" scoped>
.myhome-m {
    width: 100%;
    position: relative;
    background: #f4f4f4;
    min-width: 300px;
    max-width: 640px;
    margin: 0 auto;
    .header-home {
        width: 100%;
        height: 220px;
        position: relative;
        background: url(../style/images/myhome-top-back.png) no-repeat center;
        background-size: 100%;
        position: relative;
        .edit-info {
            display: block;
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 25px;
            color: #fff;
        }
        .myinfo-p {
            position: absolute;
            top: 34px;
            left: 0px;
            width: 100%;
            display: block;
            img {
                display: block;
                margin: 0 auto;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                -webkit-border-radius: 50%;
            }
            span:nth-child(2) {
                display: block;
                font-size: 14px;
                text-align: center;
                margin-top: 6px;
                margin-bottom: 6px;
                color: #fff;
                -webkit-font-smoothing: antialiased;
                font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
            }
            span:nth-child(3) {
                display: block;
                font-size: 13px;
                text-align: center;
                color: #fff;
                -webkit-font-smoothing: antialiased;
                font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
            }
        }
        .integral-div-top {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 50px;
            background: rgba(255, 255, 255, 0.21);
            -webkit-font-smoothing: antialiased;
            font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
            a {
                display: inline-block;
                width: 32.222%;
                height: 100%;
                text-align: center;
                padding: 7px 0px;
                color: #fff;
                font-size: 12px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                i {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 15px;
                    font-weight: bold;
                }
                span {
                    display: block;
                    position: relative;
                }
                span:after {
                    position: absolute;
                    content: ' ';
                    display: block;
                    border-right: 1px solid #fff;
                    right: 0px;
                    bottom: -2px;
                    height: 14px;
                }
            }
            a:nth-child(3) span:after {
                position: absolute;
                content: ' ';
                display: block;
                border-right: 0px solid #fff;
                right: 0px;
                bottom: -2px;
                height: 14px;
            }
        }
    }
    @media screen and (min-width:320px) {
        .header-home {
            background-size: 120%;
        }
    }
    @media screen and (min-width:375px) {
        .header-home {
            background-size: 100%;
        }
    }
    @media screen and (min-width:414px) {
        .header-home {
            background-size: 100%;
        }
    }
    .myhomg-content {
        width: 100%;
        margin-top: 10px;
        overflow: hidden;
        min-height: 450px;
        ul {
            width: 106%;
            li {
                width: 30%;
                float: left;
                margin-right: 10px;
                background: #fff;
                padding: 15px 10px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                font-size: 12px;
                color: #666;
                text-align: center;
                margin-bottom: 10px;
                a {
                    color: #666;
                    outline: 0;
                    text-decoration: none;
                    img {
                        display: block;
                        margin: 0 auto;
                        width: 28px;
                        height: 28px;
                        margin-bottom: 7px;
                    }
                }
            }
        }
        span.resrity {
            display: block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #fff;
            color: #cba162;
            font-size: 16px;
            margin-top: 15px;
            -webkit-font-smoothing: antialiased;
            font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
        }
    }
}

.editinfo-enter-active,
.editinfo-leave-active {
    transition: transform .3s;
}

.editinfo-enter,
.editinfo-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>


