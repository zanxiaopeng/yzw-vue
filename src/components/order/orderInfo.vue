<template>
    <section class="orderdeailssbox">
    
        <div class="orderdal-top font-xiti">
            <span class="orderstaues">
                {{orderData.statename}}
                <i v-if="orderData.state == pay_state.completed || orderData.state == pay_state.pending_evaluation">
    
                    [ {{orderData.logisticsname}} ]
    
                </i>
            </span>
            <p>交易单号:
                <i>{{orderData.code}}</i>
            </p>
            <p>下单时间:
                <i>{{orderData.create_time}}</i>
            </p>
        </div>
    
        <template v-if="(orderData.state == pay_state.completed || orderData.state == pay_state.pending_evaluation) && ExpressInfo.length>0">
            <div class="wuliu-con font-xiti" @click="logisticsShow">
                <i class="icon-wuliu-l iconfont">&#xe6ad;</i>
                <div class="wuliuinfo">
                    <p>{{ExpressInfo[0].AcceptStation}}</p>
                    <time>{{ExpressInfo[0].AcceptTime}}</time>
                </div>
                <span class="iconfont youjiantou">&#xe65f;</span>
            </div>
        </template>
    
        <div class="orderaddress font-xiti">
            <i class="addressincon iconfont">&#xe66c;</i>
            <div class="orderaddress-man">
                <p>收件人：{{orderData.name}} {{orderData.phone}}</p>
                <p>收货地址：{{orderData.address}}
                </p>
            </div>
        </div>
    
        <div class="orderproducrlist font-xiti">
            <ul>
                <li>
                    <template v-for="item in orderData.productlist">
                        <div class="orderproitem">
                            <img :src="item.pro_icon">
                            <div class="protitle-porder">
                                <p class="ttile-prod ellisp">{{item.pro_name}}</p>
                            </div>
                            <div class="right-orderprik">
                                <span class="ellisp">{{item.price}}</span>
                                <em class="ellisp">x{{item.count}}</em>
                            </div>
                        </div>
                    </template>
    
                    <div class="order-list-bottom">
                        <p class="nunmberangrice clearfix">
                            <span class="number-p-o">
                                共
                                <i>{{orderData.count}}</i>件商品
                                <span>(运费
                                    <em>¥{{orderData.count}}</em>)</span>
                            </span>
                            <span class="price-o-n-z font-xiti">
                                总计
                                <em>¥{{orderData.priceOr}}</em>
                            </span>
                        </p>
                        <p class="nunmberangrice clearfix">
                            <span class="price-o-n-z font-xiti">
                                积分
                                <em>-{{orderData.integral}}</em>
                            </span>
                        </p>
                        <p class="nunmberangrice clearfix">
                            <span class="price-o-n-z-s font-xiti">
                                实付
                                <em>¥{{orderData.payment}}</em>
                            </span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    
        <div class="orderdealbottom font-xiti">
            <template v-if="orderData.state == pay_state.pendin_Payment">
                <a href="#">去支付</a>
            </template>
            <template v-if="orderData.state == pay_state.completed || orderData.state == pay_state.pending_evaluation">
                <a href="javascript:;" @click="logisticsShow" class="showwuliu">查看物流</a>
            </template>
        </div>
    
        <order-logistics :isShow="logistics" :orderCode="code" v-on:closeLogistics="closeLogistics"></order-logistics>
    
    </section>
</template>

<script>
import OrderLogistics from './orderLogistics';
import { getOrderInfo, getExpressListInfo } from '../../service/getData';

import _Common from '../../utils/common';
import _Config from '../../config/commonConfig';

export default {
    data() {
        return {
            logistics: false,
            code: "",
            orderData: {},
            customeruuid: "",
            pay_state: _Config.payState,
            ExpressInfo: new Array()
        }
    },
    created() {
        if (this.$route.query.code) {
            this.code = this.$route.query.code;
        }
        else {
            this.$router.push({ path: '/order' });
        }
    },
    mounted() {


        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;
            this.getorderinfo();
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        logisticsShow() {
            this.logistics = true;
        },
        closeLogistics() {
            this.logistics = false;
        },
        getorderinfo() {
            getOrderInfo({
                data: {
                    customeruuid: this.customeruuid,
                    ordercode: this.code
                }
            }).then(res => {
                if (res.result == 0) {
                    if (res.data.state == this.pay_state.completed || res.state == this.pay_state.pending_evaluation) {
                        getExpressListInfo({
                            data: {
                                customeruuid: this.customeruuid,
                                ordercode: this.code
                            }
                        }).then(res => {
                            if (res.result == 0) {
                                if (res.data.data && res.data.data.constructor == Array) {
                                    this.ExpressInfo = res.data.data;
                                }
                            }
                        });

                    }
                    this.orderData = res.data;
                }
                else {
                    _Common.toastBottom(res.message);
                }
            });
        }
    },
    components: {
        'order-logistics': OrderLogistics
    }
}
</script>

<style lang="scss" scoped>
.orderdeailssbox {
    width: 100%;
    background: #f6f6f6;
    padding-bottom: 50px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 10000;
    .orderdal-top {
        width: 100%;
        padding: 15px 12px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: #fff;
        .orderstaues {
            display: block;
            font-size: 17px;
            color: #e72d60;
            i {
                color: #999;
                font-size: 12px;
                margin-left: 8px;
            }
        }
        p {
            font-size: 13px;
            color: #999;
            margin-top: 8px;
        }
    }
    .wuliu-con {
        width: 100%;
        margin-top: 10px;
        background: #fff;
        padding: 15px 12px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        position: relative;
        .icon-wuliu-l {
            display: block;
            position: absolute;
            width: 35px;
            text-align: center;
            font-size: 19px;
            color: #696767;
            left: 13px;
            top: 32px;
        }
        .wuliuinfo {
            display: block;
            width: 100%;
            padding-left: 40px;
            padding-right: 30px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            p {
                font-size: 13px;
                color: #c79f62;
                height: 34px;
                overflow: hidden;
                line-height: 17px;
                margin-bottom: 5px;
            }
            time {
                display: block;
                color: #999;
                font-size: 12px;
            }
        }
        .youjiantou {
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            font-size: 19px;
            color: #888;
            right: 10px;
            top: 33px;
        }
    }
    .orderaddress {
        margin-top: 10px;
        background: #fff;
        padding: 15px 12px;
        position: relative;
        .addressincon {
            display: block;
            width: 20px;
            height: 20px;
            position: absolute;
            font-size: 20px;
            color: #888;
            top: 28px;
            left: 22px;
        }
        .orderaddress-man {
            width: 100%;
            padding-left: 40px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            p {
                font-size: 13px;
                color: #999;
            }
            p:nth-child(2) {
                margin-top: 5px;
                line-height: 18px;
            }
        }
    }
    .orderproducrlist {
        width: 100%;
        margin-top: 10px;
        background: #fff;
        li {
            background: #fff;
            width: 100%;
            margin-bottom: 0.625rem;
            position: relative;
            .orderproitem {
                width: 100%;
                height: 80px;
                padding: 8px 0.625rem;
                position: relative;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                overflow: hidden;
                border-bottom: 1px solid #ddd;
                img {
                    position: absolute;
                    display: block;
                    width: 4.375rem;
                    height: 4.375rem;
                    left: 0px;
                    top: 8px;
                }
                .protitle-porder {
                    width: 100%;
                    padding: 0px 95px 0px 80px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    .ttile-prod {
                        font-size: 14px;
                        color: #666;
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .right-orderprik {
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    text-align: right;
                    width: 80px;
                    span {
                        font-size: 16px;
                        color: #666;
                        height: 30px;
                        line-height: 30px;
                        display: block;
                    }
                    em {
                        font-size: 13px;
                        color: #999;
                        height: 20px;
                        line-height: 20px;
                        display: block;
                    }
                }
            }
            .order-list-bottom {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                .nunmberangrice {
                    width: 100%;
                    height: 21px;
                    .number-p-o {
                        display: block;
                        float: left;
                        font-size: 13px;
                        color: #777;
                        span {
                            margin-left: 10px;
                        }
                    }
                    .price-o-n-z {
                        display: block;
                        float: right;
                        font-size: 11px;
                        color: #777;
                        em {
                            font-size: 11px;
                            color: #e72d60;
                            margin-left: 3px;
                        }
                    }
                    .price-o-n-z-s {
                        display: block;
                        float: right;
                        font-size: 13px;
                        color: #777;
                        em {
                            font-size: 14px;
                            color: #e72d60;
                            margin-left: 3px;
                        }
                    }
                }
            }
        }
    }
    .orderdealbottom {
        position: fixed;
        bottom: 0px;
        left: 0px;
        height: 40px;
        padding: 7px 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: #fff;
        border-top: 1px solid #ddd;
        text-align: right;
        width: 100%;
        a {
            display: inline-block;
            padding: 0px 10px;
            line-height: 24px;
            font-size: 13px;
            color: #e72d60;
            border: 1px solid #e72d60;
            border-radius: 5px;
            text-align: center;
            margin-left: 5px;
        }
        span.showwuliu {
            display: inline-block;
            padding: 0px 10px;
            line-height: 24px;
            font-size: 13px;
            color: #e72d60;
            border: 1px solid #e72d60;
            border-radius: 5px;
            text-align: center;
            margin-left: 5px;
            color: #999;
            border: 1px solid #999;
        }
    }
}

@media screen and (min-height:480px) {
    .orderdeailssbox {
        min-height: 480px;
    }
}

@media screen and (min-height:568px) {
    .orderdeailssbox {
        min-height: 568px;
    }
}

@media screen and (min-height:667px) {
    .orderdeailssbox {
        min-height: 667px;
    }
}

@media screen and (min-height:736px) {
    .orderdeailssbox {
        min-height: 736px;
    }
}
</style>


