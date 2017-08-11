<template>
    <section class="registerbox">
        <div class="login-center font-xiti">
            <p class="input-p">
                <input type="tel" v-model="phone" id="account" placeholder="手机号">
            </p>
            <p class="input-p">
                <input type="tel" v-model="smscode" placeholder="验证码">
                <span v-show="btn_code" @click="getsmscode" class="codebtn">获取验证码</span>
                <span v-show="btn_miao_code" class="codebtn-miao">剩余
                    <i>{{socenum}}</i> s</span>
            </p>
            <p class="input-p">
                <input type="password" v-model="password" placeholder="设置密码">
            </p>
            <span @click="getpassword" class="btn-login">重置密码</span>
                <p class="zhucejrm clearfix">
                    <a href="javasctipt:;"></a>
                    <a href="tel:400-102-4198">收不到验证码?</a>
                </p>
        </div>
    </section>
</template>

<script>
import { getSmsCode, Backpassword } from '../../service/getData';
import _Common from '../../utils/common';
import _Config from '../../config/commonConfig';

export default {
    data() {
        return {
            smscode: "",
            phone: "",
            password: "",
            btn_code: true,
            btn_miao_code: false,
            socenum: 60
        }
    },
    methods: {
        async getsmscode() {
            if (this.phone && _Common.checkMobile(this.phone)) {
                const smsCodeData = await getSmsCode({
                    data: {
                        phone: this.phone
                    }
                });
                if (smsCodeData.result == 0) {
                    //测试由于 不真发短信  所以直接把验证码犯回来了
                    this.smscode = smsCodeData.data;
                    this.btn_code = false;
                    this.btn_miao_code = true;
                    this.timer();
                }
                else {
                    _Common.toastBottom(smsCodeData.message);
                }
            }
            else {
                _Common.toastBottom('手机号格式不正确');
            }
        },
        timer: function () {
            if (this.socenum > 0) {
                this.socenum--;
                setTimeout(this.timer, 1000);
            }
            else {
                this.btn_code = true;
                this.btn_miao_code = false;
                this.socenum = 60;
            }
        },
        async getpassword() {
            if (!this.phone || !_Common.checkMobile(this.phone)) {
                _Common.toastBottom('手机号格式不正确');
            }
            else if (_Common.trim(this.password).length < 6) {
                _Common.toastBottom('密码长度为6-18位');
            }
            else {
                const Data = await Backpassword({
                    data: {
                        username: this.phone,
                        smscode: this.smscode,
                        password: this.password
                    }
                });
                if (Data.result == 0) {
                    _Common.toastBottom("修改成功,自动跳转中...");
                    let that = this;
                    setTimeout(function () {
                        that.$router.push({ path: '/login' });
                    }, 1500);
                }
                else {
                    _Common.toastBottom(Data.message);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/css/mixin';

.registerbox {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    @include bagimg('../../style/images/registerback.png');
    padding: 10px;
    padding-top: 40px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    height: 100%;
    width: 100%;
    .login-center {
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
            .codebtn {
                position: absolute;
                display: block;
                right: 0px;
                top: 3px;
                width: 82px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                color: #fff;
                background: #e72d60;
                font-size: 12px;
            }
            .codebtn-miao {
                position: absolute;
                display: block;
                right: 0px;
                top: 3px;
                width: 82px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                color: #fff;
                background: #666;
                font-size: 12px;
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
            a:nth-child(2) {
                color: #a9a9a9;
                float: right;
            }
        }
    }
}
</style>


