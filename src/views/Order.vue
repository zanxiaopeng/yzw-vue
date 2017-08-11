<template>
    <section class="orderlistbox">
        <nav class="headerorder-nav mui-flex font-xiti">
            <span @click="ordertype()" :class="pay_state == 'all'?'active':''" class="cell">
                全部
            </span>
            <span @click="ordertype(paystate.pendin_Payment)" :class="pay_state == paystate.pendin_Payment?'active':''" class="cell">
                待付款
            </span>
            <span @click="ordertype(paystate.already_Paid)" :class="pay_state == paystate.already_Paid?'active':''" class="cell">
                待发货
            </span>
            <span @click="ordertype(paystate.completed)" :class="pay_state == paystate.completed?'active':''" class="cell">
                已发货
            </span>
            <span @click="ordertype(paystate.canceled)" :class="pay_state == paystate.canceled?'active':''" class="cell">
                已取消
            </span>
        </nav>
    
        <section class="orderlist-b">
            <div class="null-order-div font-xiti" v-show="null_order_div">
                <p>您还没有相关的订单~~</p>
                <a href="/">前往98主会场</a>
            </div>
    
            <div class="order-list-c font-xiti" v-show="order_list_c">
    
                <v-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
    
                    <ul>
                        <li v-for="item in orderlist">
                            <p class="order-list-titkle clearfix">
                                <span class="ellisp">订单编号
                                    <i>{{item.code}}</i>
                                </span>
                                <em class="orderstateem">{{item.statename}}</em>
                            </p>
                            <template v-for="pro_item in item.productlist">
                                <div class="orderproitem">
                                    <img :src="pro_item.pro_icon">
                                    <div class="protitle-porder">
                                        <p class="ttile-prod ellisp">{{pro_item.pro_name}}</p>
                                    </div>
                                    <div class="right-orderprik">
                                        <span class="ellisp"></span>
                                        <em class="ellisp">x{{pro_item.count}}</em>
                                    </div>
                                </div>
                            </template>
    
                            <div class="order-list-bottom">
                                <p class="nunmberangrice clearfix">
                                    <span class="number-p-o"> 共
                                        <i>{{item.countall}}</i>件商品
                                        <span>(运费
                                            <em>¥0</em>)</span>
                                    </span>
                                    <span class="price-o-n-z"> 总计
                                        <em>¥{{item.priceOr}}</em>
                                    </span>
                                </p>
                                <p class="nunmberangrice clearfix">
                                    <span class="price-o-n-z font-xiti"> 积分
                                        <em>-{{item.integral}}</em>
                                    </span>
                                </p>
                                <p class="nunmberangrice clearfix">
                                    <span class="price-o-n-z-s"> 实付
                                        <em>¥{{item.payment}}</em>
                                    </span>
                                </p>
                                <div class="btn-order-di">
                                    <template v-if="item.state == pay_state.pendin_Payment">
                                        <span>
                                            立即支付
                                        </span>
                                        <span>
                                            取消订单
                                        </span>
                                        <router-link :to="'/Order/OrderInfo?code='+item.code">
                                            订单详情
                                        </router-link>
                                    </template>
                                    <template v-if="item.state == pay_state.already_Paid || item.state == paystate.canceled">
                                        <router-link to="/Order/OrderInfo">
                                            订单详情
                                        </router-link>
                                    </template>
                                    <template v-if="item.state == pay_state.completed">
                                        <router-link :to="'/Order/OrderInfo?code='+item.code">
                                            查看物流
                                        </router-link>
                                        <router-link :to="'/Order/OrderInfo?code='+item.code">
                                            订单详情
                                        </router-link>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </ul>
    
                </v-loadmore>
    
            </div>
        </section>
    
        <transition name="order-info">
            <router-view></router-view>
        </transition>
    
        <main-footer></main-footer>
    </section>
</template>

<script>
import { Loadmore } from 'mint-ui';
import { getOrderList } from '../service/getData';
import MainFooter from '../components/footerMain';

import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    components: {
        'v-loadmore': Loadmore,
        'main-footer': MainFooter
    },
    data() {
        return {
            paystate: _Config.payState,
            orderlist: [],
            pageIndex: 1,
            pageCount: 0,
            allLoaded: false,
            customeruuid: "",
            null_order_div: false,
            order_list_c: true,
            pay_state: 'all'
        }
    },
    mounted() {
        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;
            this.orderlistData("index");
            if (this.pageCount <= 1) {
                this.allLoaded = true;// 若数据已全部获取完毕
            }
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        ordertype(type) {
            if (type) {
                this.pay_state = type;
                this.orderlistData("index");
            }
            else {
                this.pay_state = "all";
                this.orderlistData("index");
            }
        },
        orderlistData(data) {
            let that = this;
            getOrderList({
                data: {
                    pageindex: this.pageIndex,
                    customeruuid: this.customeruuid,
                    orderstate: this.pay_state
                }
            }).then(res => {
                if (res.result == 0) {
                    if (data) {
                        that.pageCount = res.data.pagecount;
                        that.orderlist = res.data.data;
                    }
                    else {
                        that.pageCount = res.data.pagecount;
                        that.orderlist.push(...res.data.data);
                    }
                    if (that.orderlist.length > 0) {
                        that.null_order_div = false;
                        that.order_list_c = true;
                    }
                    else {
                        that.null_order_div = true;
                        that.order_list_c = false;
                    }
                }
                else {
                    that.null_order_div = true;
                    that.order_list_c = false;
                    _Common.toastBottom(res.message);
                }
            });
        },
        async loadTop() {  // 刷新数据的操作
            let that = this;
            setTimeout(function () {
                that.$refs.loadmore.onTopLoaded();
            }, 2000);
        },
        async loadBottom() {
            this.pageIndex++;
            if (this.pageIndex + 1 > this.pageCount) {
                this.allLoaded = true;// 若数据已全部获取完毕
            }
            this.orderlistData();
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../style/css/mixin';

.orderlistbox {
    display: block;
    position: relative;
    width: 100%;
    background: #f6f6f6;
    .headerorder-nav {
        height: 2.8125rem;
        line-height: 2.8125rem;
        background: #fff;
        color: #666;
        font-size: 0.875rem;
        text-align: center;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        z-index: 200;
        span {
            display: inline-block;
            border-bottom: 1px solid #ddd;
        }
        span.active {
            color: #e72d60;
            border-bottom: 2px solid #e72d60;
        }
    }
}

.mui-flex,
.mui-flex *,
.mui-flex :after,
.mui-flex :before {
    box-sizing: border-box;
}

.mui-flex {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -ms-flexbox!important;
    display: flex!important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}

.mui-flex>.cell {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0;
    -webkit-flex-basis: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
    display: block;
    padding: 0!important;
    position: relative;
}

.order-info-enter-active,
.order-info-leave-active {
    transition: transform .3s;
}

.order-info-enter,
.order-info-leave-to {
    transform: translate3d(100%, 0, 0);
}



.null-order-div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    left: 0px;
    top: 0px;
    z-index: 100;
    p {
        color: #888;
        font-size: 13px;
        text-align: center;
        margin-bottom: 5px;
        margin-top: 65px;
    }
    a {
        display: block;
        width: 130px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background: #e72d60;
        border-radius: 8px;
        margin: 0 auto;
        margin-top: 30px;
    }
}

.orderlist-b {
    margin-bottom: 45px;
    .order-list-c {
        display: block;
        margin-top: 2.8125rem;
        padding-top: 0.625rem;
        overflow: auto;
        ul {
            width: 100%;
            li {
                background: #fff;
                width: 100%;
                margin-bottom: 0.625rem;
                position: relative;
                .order-list-titkle {
                    height: 2.1875rem;
                    line-height: 2.1875rem;
                    font-size: 0.8125rem;
                    padding: 0 0.625rem;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    border-bottom: 1px solid #ddd;
                    span {
                        display: block;
                        float: left;
                        width: 14.375rem;
                        color: #999;
                        font-size: 12px;
                    }
                    em {
                        display: block;
                        float: right;
                        width: 6.375rem;
                        text-align: right;
                        color: #e72d60;
                    }
                }
                .orderproitem {
                    width: 100%;
                    height: 88px;
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
                        left: 10px;
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
                    .btn-order-di {
                        text-align: right;
                        width: 100%;
                        margin-top: 5px;
                        a {
                            display: inline-block;
                            font-size: 13px;
                            line-height: 25px;
                            height: 25px;
                            padding: 0px 10px;
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            border: 1px solid #ddd;
                            color: #999;
                            margin-left: 7px;
                            border-radius: 3px;
                        }
                        span {
                            display: inline-block;
                            font-size: 13px;
                            line-height: 25px;
                            height: 25px;
                            padding: 0px 10px;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            border: 1px solid #ddd;
                            color: #999;
                            margin-left: 7px;
                            border-radius: 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>

