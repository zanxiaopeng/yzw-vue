<template>
    <section class="cartorderbox">
    
        <div class="cart-address" v-if="address != null">
            <table class="addr-table" width="100%">
                <tbody>
                    <tr>
                        <th width="28%">收
                            <span class="ui-hidden">a</span>货
                            <span class="ui-hidden">a</span>人
                        </th>
                        <td>{{address.name}}&nbsp;</td>
                        <td width="17%" rowspan="3" class="more" @click="goaddress" style="position: relative;">
                            <span></span>
                        </td>
                    </tr>
                    <tr>
                        <th>电
                            <span class="ui-hidden">中中</span>话
                        </th>
                        <td>{{address.phone}}</td>
                    </tr>
                    <tr>
                        <th>收货地址
                        </th>
                        <td>{{address.province_name}} {{address.city_name}} {{address.region_name}}{{address.desc_address}}</td>
                    </tr>
                </tbody>
            </table>
            <input type="hidden" id="addressId" value="2">
        </div>
    
        <div class="no-address font-xiti" v-if="address==null">
            <div class="no-addr-icon"></div>
            <div class="no-addr-text">
                还没有收货地址，
                <router-link :to="'/Address?fromurl='+fromurl">去添加</router-link>
            </div>
        </div>
    
        <div class="cartorderlist font-xiti">
            <p class="titile-or">
                <i></i>
                有妆网发货
            </p>
            <div class="cartlist-u">
                <ul class="clearfix">
    
                    <li v-for="item in prolist.data">
                        <img :src="item.pro_ico">
                        <div class="prodecut-imtn">
                            <p class="ellisp">{{item.pro_name}}</p>
                            <p>x
                                <i>{{item.count}}</i>份</p>
                        </div>
                        <div class="right-jaige">
                            <span class="ellisp">商品: ¥{{item.pro_price}}</span>
                            <span class="ellisp">运费: ¥{{item.pro_freight}}</span>
                        </div>
                    </li>
    
                </ul>
                <p class="yunfei-p clearfix">
                    <span>运费</span>
                    <span>
                        <em>¥{{prolist.freightAll}}</em>
                    </span>
                </p>
                <p class="zongji-p clearfix">
                    <span>小计</span>
                    <span>共
                        <i>{{prolist.countAll}}</i>件商品
                        <em>¥{{prolist.priceAll}}</em>
                    </span>
                </p>
            </div>
        </div>
    
        <div class="cartorderpay font-xiti">
            <p class="title-pauy">
                <i class="iconfontnew"></i>积分抵现
            </p>
            <div class="paylisti">
                <div class="integrallistm">
    
                    <p>可用0.00有妆积分抵
                        <i>￥{{surplusintegralcount}}</i>
                    </p>
    
                    <em @click="surpluChecked" :class="issurplu == true ? 'active' : ''"></em>
                </div>
            </div>
        </div>
    
        <div class="cartorderpay font-xiti">
            <p class="title-pauy">
                <i class="iconfont"></i>支付方式
            </p>
            <div class="paylisti">
                <div class="paylistm">
                    <img src="http://s.iyouzhuang.com/images/weixinpayicon.png">
                    <div class="paylistmitem">
                        <span>微信支付</span>
                        <p>亿万用户的选择，更快更安全!</p>
                        <em class="xuanze-icon"></em>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="botomfixedord font-xiti">
            <p>
                <span>共计
                    <i>{{prolist.countAll}}</i>件商品</span>
                <span id="order-amountfree">合计
                    <em>¥{{minamoutPrice}}</em>
                </span>
            </p>
            <span @click="saveorder" class="btn_saveorder">提交订单</span>
        </div>
    
    </section>
</template>

<script>
import { getOrderCofim, setOrder, getAddressInfo } from '../service/getData';
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    data() {
        return {
            customeruuid: "",
            address: null,
            prolist: {},
            surplusintegralcount: 0,
            addressuuid: "",
            fromurl: "",
            issurplu: false,
            amoutPrice: 0,
            minamoutPrice: 0,
            address_uuid: ""
        }
    },
    mounted() {
        this.fromurl = this.$route.path;
        if (this.$route.query.address_uuid) {
            this.address_uuid = this.$route.query.address_uuid;
        }

        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;

            this.getordercofim();
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        async getordercofim() {
            let orderconfimdata = await getOrderCofim({
                data: {
                    customeruuid: this.customeruuid
                }
            });
            if (orderconfimdata.result == 0) {
                if (this.address_uuid) {
                    const addressinfo = await getAddressInfo({
                        data: {
                            address_uuid: this.address_uuid
                        }
                    });
                    if (addressinfo.result == 0) {
                        this.address = addressinfo.data;
                    }
                }
                else {
                    this.address = orderconfimdata.data.address;
                }

                this.prolist = orderconfimdata.data.prolist;
                this.surplusintegralcount = orderconfimdata.data.surplusintegralcount;
                if (this.prolist.countAll <= 0) {
                    this.$router.push({ 'path': '/' });
                }
                else {
                    this.amoutPrice = this.prolist.priceAll;
                    this.minamoutPrice = this.prolist.priceAll;
                    if (this.address_uuid) {
                        this.addressuuid = this.address_uuid;
                    }
                    else if (this.address) {
                        this.addressuuid = this.address.uuid;
                    }
                }
            }
            else {
                this.$router.push({ 'path': '/' });
            }
        },
        goaddress() {
            this.$router.push({ 'path': '/Address?fromurl=' + this.fromurl });
        },
        surpluChecked() {
            if (this.surplusintegralcount > 0) {
                if (this.issurplu == false) {
                    this.issurplu = true;
                    if (this.amoutPrice > this.surplusintegralcount) {
                        this.minamoutPrice = this.amoutPrice - this.surplusintegralcount;
                    }
                    else if (this.amoutPrice <= this.surplusintegralcount) {
                        this.minamoutPrice = 0;
                    }
                }
                else {
                    this.issurplu = false;
                    this.minamoutPrice = this.amoutPrice;
                }
            }
        },
        async saveorder() {
            if (this.addressuuid) {
                _Common.loadingShow('加载中...');
                const saveOrderData = await setOrder({
                    data: {
                        customeruuid: this.customeruuid,
                        addressuuid: this.addressuuid,
                        isintegral: this.issurplu
                    }
                });
                if (saveOrderData.result == 0) {
                    //订单提交成功 ---可以调用第三方支付
                    _Common.toastBottom("订单提交成功:" + " 订单号:" + saveOrderData.data.order_code + " 需支付金额:" + saveOrderData.data.payment + " 支付状态:" + _Config.payState.payStateWri(saveOrderData.data.state));

                    if (saveOrderData.data.state == _Config.payState.pendin_Payment) {
                        //提交第三方支付
                    }
                    else {
                        _Common.loadingHide();
                        this.$router.push({ path: '/Order' });
                    }
                }
                else {
                    _Common.loadingHide();
                    _Common.toastBottom(saveOrderData.message);
                }
            }
            else {
                _Common.toastBottom("请选择收货地址");
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../style/css/mixin';
.cartorderbox {
    width: 100%;
    background: #ebe6e3;
    min-height: 700px;
    .cart-address {
        width: 100%;
        background: #fff;
        padding-top: 2px;
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        .addr-table {
            line-height: 20px;
            background-repeat: repeat-x;
            background-position: left top, left bottom;
            background-size: auto 2px;
            font-size: 13px;
            background-image: url(../style/images/bak-cart-address.png), url(../style/images/bak-cart-address.png);
            th {
                padding: 7px 0px 0px 7px;
                font-weight: 400;
                text-align: left;
                vertical-align: baseline;
                .ui-hidden {
                    visibility: hidden;
                }
            }
            td {
                padding-bottom: 5px;
                padding-top: 6px;
                span {
                    position: absolute;
                    /* font-size: 13px; */
                    top: 44px;
                    right: 9px;
                    display: block;
                    background: url(../style/images/jinatou-icoyou.png) no-repeat;
                    background-position: 36px 0px;
                    width: 45px;
                    /* background-size: 32px; */
                    height: 32px;
                }
            }
        }
    }
    .cartorderlist {
        width: 100%;
        margin-top: 15px;
        background: #fff;
        .titile-or {
            border-bottom: 1px solid #ddd;
            height: 35px;
            line-height: 35px;
            padding: 0px 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            color: #666;
            font-size: 14px;
            i {
                @include bagimg('../style/images/ordercartfang.png');
                display: inline-block;
                width: 15px;
                height: 15px;
                vertical-align: -2px;
            }
        }
        .cartlist-u {
            padding: 0px 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            li {
                border-bottom: 1px solid #ddd;
                position: relative;
                padding: 10px 0px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                height: 78px;
                img {
                    display: block;
                    width: 50px;
                    height: 58px;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                }
                .prodecut-imtn {
                    width: 100%;
                    padding: 0px 85px 0px 85px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    p {
                        height: 25px;
                        line-height: 25px;
                        color: #666;
                    }
                    p:nth-child(1) {
                        font-size: 13px;
                    }
                    p:nth-child(2) {
                        font-size: 12px;
                    }
                }
                .right-jaige {
                    position: absolute;
                    top: 10px;
                    right: 0px;
                    width: 80px;
                    text-align: right;
                    span {
                        display: block;
                        color: #666;
                        height: 25px;
                        line-height: 25px;
                    }
                    span:nth-child(1) {
                        font-size: 13px;
                    }
                    span:nth-child(2) {
                        font-size: 12px;
                    }
                }
            }
            .yunfei-p {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                color: #666;
                border-bottom: 1px solid #ddd;
                span:nth-child(1) {
                    float: left;
                    display: block;
                }
                span:nth-child(2) {
                    float: right;
                    display: block;
                    em {
                        color: #e72d60;
                        margin-left: 5px;
                    }
                }
            }
            .zongji-p {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                color: #666;
                span:nth-child(1) {
                    float: left;
                    display: block;
                }
                span:nth-child(2) {
                    float: right;
                    display: block;
                    em {
                        color: #e72d60;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
    .cartorderpay {
        margin-top: 15px;
        background: #fff;
        .title-pauy {
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            padding: 0px 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            color: #666;
            border-bottom: 1px solid #ddd;
            i {
                font-size: 19px;
                color: #666;
                vertical-align: -2px;
                margin-right: 2px;
            }
        }
        .paylisti {
            padding: 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            .integrallistm {
                width: 100%;
                position: relative;
                height: 22px;
                line-height: 22px;
                p {
                    color: #666;
                    font-size: 13px;
                    i {
                        color: #e72d60;
                    }
                }
                em {
                    display: block;
                    position: absolute;
                    right: 0px;
                    top: -2px;
                    width: 19px;
                    height: 19px;
                    border: 1px solid #b5b5b5;
                    border-radius: 50%;
                }
                em.active {
                    @include bagimg('../style/images/yuandgouxuan.png');
                    border: 0px;
                    width: 20px;
                    height: 20px;
                }
            }
            .paylistm {
                width: 100%;
                position: relative;
                height: 42px;
                img {
                    display: block;
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    left: 0px;
                    top: 0px;
                }
                .paylistmitem {
                    width: 100%;
                    padding-left: 50px;
                    padding-top: 3px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    position: relative;
                    span {
                        color: #333;
                        font-size: 14px;
                        display: block;
                        margin-bottom: 5px;
                    }
                    p {
                        color: #666;
                        font-size: 13px;
                    }
                    em.xuanze-icon {
                        position: absolute;
                        display: block;
                        width: 20px;
                        height: 20px;
                        @include bagimg('../style/images/yuandgouxuan.png');
                        right: 0px;
                        top: 9px;
                    }
                }
            }
        }
    }
    .botomfixedord {
        width: 100%;
        height: 45px;
        color: #fff;
        position: fixed;
        bottom: 0px;
        left: 0px;
        background: #000;
        p {
            height: 45px;
            padding-right: 100px;
            padding-left: 10px;
            padding-top: 6px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            span:nth-child(1) {
                font-size: 12px;
                color: #fff;
                display: block;
                margin-bottom: 5px;
            }
            span:nth-child(2) {
                font-size: 15px;
                color: #fff;
                display: block;
                em {
                    color: #c79f62;
                    margin-left: 4px;
                    vertical-align: -2px;
                }
            }
        }
        span.btn_saveorder {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 45px;
            background: #cba162;
            font-size: 14px;
            text-align: center;
            line-height: 45px;
            color: #fff;
            top: 0px;
        }
    }
    .no-address {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 6.4375rem;
        background: #fff;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 13px;
        .no-addr-icon {
            width: 3.75rem;
            height: 4rem;
            @include bagimg('../style/images/wudizhi-iocn.png');
        }
        .no-addr-text {
            margin-top: .375rem;
            a {
                color: #fe4070;
                text-decoration: none;
            }
        }
    }
}

@media screen and (min-height:480px) {
    .cartorderbox {
        min-height: 480px;
    }
}

@media screen and (min-height:568px) {
    .cartorderbox {
        min-height: 568px;
    }
}

@media screen and (min-height:667px) {
    .cartorderbox {
        min-height: 667px;
    }
}

@media screen and (min-height:736px) {
    .cartorderbox {
        min-height: 736px;
    }
}
</style>


