<template>
    <section class="addresslistbox font-xiti">
        <ul class="blockaddress">
            <li class="addr-item theme-spline spline-list" v-for="item in addressList">
                <div class="addr-desc tap-action theme-border" @click="goOrderfrim(item.uuid)">
                    <p class="ui-ellipsis-address namephone">{{item.name}}&nbsp;&nbsp;&nbsp;{{item.phone}}</p>
                    <p class="ui-ellipsis theme-grayfont">{{item.province_name}} {{item.city_name}} {{item.region_name}} {{item.desc_address}}</p>
                </div>
                <div class="addr-edit tap-action">
                    <span class="iconfont" @click="editAddress(item.uuid)">&#xe657;</span>
                    <span class="iconfont" @click="delAddress(item.uuid)">&#xe6b2;</span>
                </div>
            </li>
        </ul>
        <div class="flexaddress-add">
            <router-link :to="'/Address/AddAddress?fromurl='+this.$route.fullPath">添加地址</router-link>
        </div>
    
        <transition name="address">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
import { getAddressList, delAddress } from '../service/getData';
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    data() {
        return {
            customeruuid: "",
            fromurl: "",
            addressList: new Array()
        }
    },
    mounted() {
        if (this.$route.query.fromurl) {
            this.fromurl = this.$route.query.fromurl;
        }
        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;
            this.getAddress();
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    watch: {
        // 监听 如果路由有变化，会再次执行该方法
        "$route": "getAddress"
    },
    methods: {
        async getAddress() {
            const addressData = await getAddressList({
                data: {
                    customer_uuid: this.customeruuid
                }
            });
            this.addressList = addressData.data;
        },
        editAddress(uuid) {
            this.$router.push('/Address/AddAddress?uuid=' + uuid);
        },
        delAddress(uuid) {
            _Common.confirmMessageBox('确定执行此操作?', function () {
                delAddress({
                    data: {
                        address_uuid: uuid
                    }
                }).then(item => {
                    if (item.result == 0) {
                        this.getAddress();
                    }
                    else {
                        _Common.toastBottom('删除失败');
                    }
                });
            })
        },
        goOrderfrim(uuid) {
            if (this.fromurl) {
                this.$router.push(this.fromurl + '?address_uuid=' + uuid);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addresslistbox {
    width: 100%;
    background: #f6f6f6;
    .blockaddress {
        background-color: #fff;
        display: block;
        .addr-item {
            position: relative;
            height: 75px;
            border-color: #e0e0e0;
            border-top-width: 1px;
            border-top-style: solid;
            .addr-desc {
                position: absolute;
                border-left: solid 5px transparent;
                top: 5px;
                bottom: 5px;
                right: 8rem;
                left: 0;
                line-height: 28px;
                padding-top: 7px;
                padding-left: 10px;
                -webkit-transition: right .3s linear;
                .ui-ellipsis-address {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .namephone {
                    font-size: 14px;
                    color: #666;
                }
                .theme-grayfont {
                    color: #999;
                    font-size: 12px;
                    line-height: 14px;
                }
                .addresslistbox .addr-item .theme-grayfont {
                    color: #999;
                }
            }
            .addr-edit {
                position: absolute;
                width: 80px;
                text-align: center;
                height: 60px;
                line-height: 60px;
                top: 10px;
                right: 0;
                background: center center no-repeat;
                background-size: 26px;
                border-left: solid 1px #e0e0e0;
                -webkit-transition: right 0.3s linear;
                span {
                    display: inline-block;
                    font-size: 22px;
                    color: #888;
                }
                span:nth-child(2) {
                    color: #e72d60;
                    margin-left: 10px;
                }
            }
        }
        .addr-item:nth-child(1) {
            border-top: 0;
        }
    }
    .flexaddress-add {
        width: 100%;
        position: fixed;
        bottom: 0px;
        left: 0px;
        height: 50px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        z-index: 250;
        background: #fff;
        box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        -webkit-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        -moz-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        a {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            background: #fe4070;
            color: #fff;
            line-height: 50px;
            text-align: center;
            margin: 0 auto;
        }
    }
}

@media screen and (min-height:480px) {
    .addresslistbox {
        min-height: 480px;
    }
}

@media screen and (min-height:568px) {
    .addresslistbox {
        min-height: 568px;
    }
}

@media screen and (min-height:667px) {
    .addresslistbox {
        min-height: 667px;
    }
}

@media screen and (min-height:736px) {
    .addresslistbox {
        min-height: 736px;
    }
}

.address-enter-active,
.address-leave-active {
    transition: transform .3s;
}

.address-enter,
.address-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>


