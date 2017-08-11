<template>
    <section class="addresslistbox font-xiti">
        <div class="address-edit-main">
            <table class="addr-edit" width="100%">
                <tbody>
                    <tr class="theme-spline spline-list">
                        <th>联系人</th>
                        <td>
                            <input class="addr-input" id="name" type="text" name="accept_name" v-model="edit_name" placeholder="收货人姓名">
                        </td>
                    </tr>
                    <tr class="theme-spline spline-list">
                        <th>手机号码</th>
                        <td>
                            <input class="addr-input" type="tel" id="telphone" name="telphone" v-model="edit_phone" placeholder="能联系您的电话" maxlength="11">
                        </td>
                    </tr>
                    <tr class="theme-spline spline-list">
                        <th>选择省份</th>
                        <td class="more">
                            <select class="addr-city-select" @change="selectSysCode('province_arr')" v-model="edit_province" id="shengfen">
                                <option disabled value="">请选择</option>
                                <template v-for="item in province_arr">
                                    <option :value="item.code">{{item.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr class="theme-spline spline-list">
                        <th>选择城市</th>
                        <td class="more ">
                            <select class="addr-city-select" @change="selectSysCode('city_arr')" v-model="edit_city" id="chengshi">
                                <option disabled value="">请选择</option>
                                <template v-for="item in city_arr">
                                    <option :value="item.code">{{item.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr class="theme-spline spline-list">
                        <th>选择区县</th>
                        <td class="more">
                            <select class="addr-city-select" v-model="edit_region" id="quxian">
                                <option disabled value="">请选择</option>
                                <template v-for="item in region_arr">
                                    <option :value="item.code">{{item.name}}</option>
                                </template>
                            </select>
                        </td>
                    </tr>
                    <tr class="theme-spline spline-list">
                        <th>详细地址</th>
                        <td>
                            <input class="addr-input" id="addresscon" type="text" name="address_1" v-model="edit_address" placeholder="请输入楼号门牌号等详细信息">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flexaddress-add">
            <span @click="saveAddress">保存地址</span>
        </div>
    </section>
</template>

<script>
import { getAddressInfo, getSysAddressData, addAddress, updateAddress } from '../../service/getData';
import _Common from '../../utils/common';
import _Config from '../../config/commonConfig';

export default {
    data() {
        return {
            customeruuid: "",
            fromurl: "",
            edit_uuid: "",
            edit_province: "",
            edit_city: "",
            edit_region: "",
            edit_name: "",
            edit_phone: "",
            edit_address: "",
            province_arr: new Array(),
            city_arr: new Array(),
            region_arr: new Array()
        }
    },
    mounted() {
        if (this.$route.query.fromurl) {
            this.fromurl = this.$route.query.fromurl;
        }
        if (this.$route.query.uuid) {
            this.edit_uuid = this.$route.query.uuid;
        }
        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;
            this.get_address_info();
            if (!this.edit_uuid) {
                this.get_address_Sys("", "province_arr");
            }
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        get_address_info() {
            if (this.edit_uuid) {
                getAddressInfo({
                    data: {
                        address_uuid: this.edit_uuid
                    }
                }).then(res => {
                    if (res.result == 0) {
                        this.edit_province = res.data.province_code;
                        this.edit_city = res.data.city_code;
                        this.edit_region = res.data.region_code;
                        this.edit_address = res.data.desc_address;
                        this.edit_name = res.data.name;
                        this.edit_phone = res.data.phone;
                        this.get_address_Sys("", "province_arr");
                        this.get_address_Sys(this.edit_province, "city_arr");
                        this.get_address_Sys(this.edit_city, "region_arr");
                    }
                });
            }
        },
        get_address_Sys(code, type) {
            _Common.loadingShow();
            if (!code) { code = "p"; }
            getSysAddressData({
                data: {
                    parentcode: code
                }
            }).then(res => {
                if (res.result == 0) {
                    if (type == "province_arr") {
                        this.province_arr = res.data;
                    }
                    else if (type == "city_arr") {
                        this.city_arr = res.data;
                    }
                    else if (type == "region_arr") {
                        this.region_arr = res.data;
                    }
                    _Common.loadingHide();
                }
            });

        },
        selectSysCode(type) {
            if (type == "province_arr") {
                this.get_address_Sys(this.edit_province, 'city_arr');
            }
            else if (type == "city_arr") {
                this.get_address_Sys(this.edit_city, 'region_arr')
            }
        },
        saveAddress() {
            if (this.edit_province && this.edit_city && this.edit_region && this.edit_address && this.edit_name && this.edit_phone) {
                if (!this.edit_uuid) {
                    //添加
                    addAddress({
                        data: {
                            customeruuid: this.customeruuid,
                            provincecode: this.edit_province,
                            citycode: this.edit_city,
                            regioncode: this.edit_region,
                            descaddress: this.edit_address,
                            name: this.edit_name,
                            phone: this.edit_phone
                        }
                    }).then(res => {
                        if (res.result == 0) {
                            if (this.fromurl) {
                                this.$router.push({ path: this.fromurl });
                            }
                            else {
                                this.$router.push({ path: '/address' });
                            }
                        }
                        else {
                            _Common.toastBottom(res.message);
                        }
                    });
                }
                else {
                    //修改
                    updateAddress({
                        data: {
                            addressuuid: this.edit_uuid,
                            provincecode: this.edit_province,
                            citycode: this.edit_city,
                            regioncode: this.edit_region,
                            descaddress: this.edit_address,
                            name: this.edit_name,
                            phone: this.edit_phone
                        }
                    }).then(res => {
                        if (res.result == 0) {
                            if (this.fromurl) {
                                this.$router.push({ path: this.fromurl });
                            }
                            else {
                                this.$router.push({ path: '/address' });
                            }
                        }
                        else {
                            _Common.toastBottom(res.message);
                        }
                    });
                }
            }
            else {
                _Common.toastBottom('以上均为必填项');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addresslistbox {
    width: 100%;
    background: #f6f6f6;
    position: fixed;
    z-index: 1000;
    top: 0px;
    left: 0px;
    .address-edit-main {
        width: 100%;
        padding-top: 10px;
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        .theme-spline {
            border-color: #e0e0e0;
            background: rgb(247, 247, 247);
            font-size: 13px;
        }
        .spline-list {
            border-top-width: 1px;
            border-top-style: solid;
        }
        .spline-list:nth-child(1) {
            border-top: 0;
        }
        th {
            padding: 1rem 0 1rem 1.5rem;
            text-align: left;
            width: 7rem;
        }
        td {
            position: relative;
            .addr-input {
                border: 0;
                width: 90%;
                vertical-align: baseline;
                height: 40px;
                line-height: 40px;
                background: rgb(247, 247, 247);
            }
        }
    }
    td.more {
        background-image: url(../../style/images/jiantou-you-ico.png);
        background-repeat: no-repeat;
        background-position: right center;
        background-repeat: no-repeat;
        background-size: auto 1rem;
        padding-right: 0;
        select {
            color: #999;
            font-size: 14px;
        }
    }
    .addr-city-select {
        border: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        -webkit-appearance: none;
        background-color: transparent;
        vertical-align: baseline;
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
        span {
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
</style>


