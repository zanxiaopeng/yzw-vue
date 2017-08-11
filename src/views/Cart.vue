<template>
    <div class="cartbox">
        <header class="cartheader font-xiti">
            <a href="javascript:;" onclick="javascript:history.go(-1);" class="iconfont go-1">&#xe660;</a>
            我的购物车
            <router-link to="/" class="iconfont home">
                &#xe629;
            </router-link>
        </header>
    
        <ul class="font-xiti">
    
            <li id="cartlist_6365" v-for="item in cartList.data">
                <div class="caretdounr">
                    <span @click="checkedThis(item.uuid,item.is_selected)" class="check-box-un-checked" :class="item.is_selected==true?'active':'' "></span>
                    <div class="item-content">
                        <div class="img-title">
                            <img :src="item.pro_ico" class="item-img">
                            <div class="text-wrap">
                                <span class="title">{{item.pro_name}}</span>
                                <div class="price-edit">
                                    <span class="price">
                                        ¥{{item.pro_price}}
                                    </span>
                                    <span class="number"> ×{{item.count}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="group-tail clearfix">
                    <span class="delcart" @click="delThis(item.uuid)">
                        <i class="iconfont">&#xe645;</i>移除
                    </span>
                    <span>邮费:
                        <i>¥{{item.pro_freight}}</i>
                    </span>
                </div>
            </li>
    
        </ul>
    
        <div class="flex-cart-botm font-xiti clearfix">
            <div class="left-car-fle" @click="checkedall">
                <i :class="isCheckedAll == true?'active':''"></i>
                全选
            </div>
            <div class="price-zongjia-cart padding-cler">
                <p class="ellisp">共
                    <i>{{cartList.countAll}}</i>件商品</p>
                <p class="ellisp">合计：{{cartList.priceAll}} ( 含运费 )</p>
            </div>
    
            <span @click="orderconfirm" class="gobuy-a">
                去结算
            </span>
    
        </div>
    </div>
</template>

<script>
import { getCartList, setCartChecked, delCart } from '../service/getData';
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

export default {
    data() {
        return {
            cartList: {},
            isCheckedAll: true,
            customeruuid: "",
            isChecked: false
        }
    },
    mounted() {
        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;

            this.getList();
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.$route.fullPath });
        }
    },
    methods: {
        async getList() {
            this.isCheckedAll = true;
            this.isChecked = false;
            getCartList({
                data: {
                    customeruuid: this.customeruuid
                }
            }).then(res => {
                if (res.result == 0) {
                    this.cartList = res.data;
                    if (res.data.data.length > 0) {
                        let that = this;
                        res.data.data.forEach(function (item) {
                            if (item.is_selected == false) {
                                that.isCheckedAll = false;
                            }
                            else {
                                that.isChecked = true;
                            }
                        });
                    }
                    else {
                        this.isCheckedAll = false;
                    }
                }
                else {
                    _Common.toastCenter("数据获取失败！");
                }
            });
        },
        async checkedall() {
            const checkedData = await setCartChecked({
                data: {
                    cart_uuid: "",
                    isselected: !this.isCheckedAll,
                    customeruuid: this.customeruuid
                }
            });
            if (checkedData.result == 0) {
                this.getList();
            }
        },
        async checkedThis(uuid, checked) {
            if (uuid) {
                const checkedData = await setCartChecked({
                    data: {
                        cart_uuid: uuid,
                        isselected: !checked,
                        customeruuid: this.customeruuid
                    }
                });
                if (checkedData.result == 0) {
                    this.getList();
                }
                else {
                    _Common.toastBottom(checkedData.message);
                }
            }
        },
        async delThis(uuid) {
            if (uuid) {
                const delData = await delCart({
                    data: {
                        cartuuid: uuid,
                        customeruuid: this.customeruuid
                    }
                });
                if (delData.result == 0) {
                    this.getList();
                }
                else {
                    _Common.toastBottom(checkedData.message);
                }
            }
        },
        async orderconfirm() {
            if (!this.cartList) {
                _Common.toastBottom("购物车不允许为空");
                return;
            }
            if (this.isChecked == false) {
                _Common.toastBottom("请选择需要结算的产品");
                return;
            }
            this.$router.push({ path: '/OrderConfirm' });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin';
.cartbox {
    width: 100%;
    background: #ebe6e3;
    padding-top: 40px;
    .cartheader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: fixed;
        left: 0px;
        top: 0px;
        color: #6b6868;
        font-size: 15px;
        background: #fff;
        box-shadow: -1px -1px #ddd;
        box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        -webkit-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        -moz-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
        a.go-1 {
            font-size: 22px;
            color: #777;
            position: absolute;
            display: block;
            width: 50px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            left: 0px;
            top: 0px;
        }
        a.home {
            font-size: 22px;
            color: #777;
            position: absolute;
            display: block;
            width: 50px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            right: 0px;
            top: 0px;
        }
    }
    ul {
        margin-bottom: 55px;
        li {
            margin-bottom: 7px;
            background: #fff;
            .caretdounr {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                padding: 10px 10px 0px 10px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                .check-box-un-checked {
                    display: block;
                    @include bagimg('../style/images/yuanquan0icon.png');
                    width: 19px;
                    height: 19px;
                    margin-top: 28px;
                }
                .check-box-un-checked.active {
                    @include bagimg('../style/images/yuandgouxuan.png');
                }
                .item-content {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    padding-left: 8px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    .img-title {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        .item-img {
                            width: 84px;
                            height: 84px;
                            margin-top: 6px;
                            margin-bottom: 6px;
                        }
                        .text-wrap {
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: flex;
                            -webkit-box-orient: vertical;
                            -webkit-box-direction: normal;
                            -ms-flex-direction: column;
                            flex-direction: column;
                            padding-left: 10px;
                            padding-top: 8px;
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            .title {
                                display: -webkit-box;
                                /* max-height: 25px; */
                                text-overflow: ellipsis;
                                overflow: hidden;
                                color: #333;
                                text-align: left;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                word-break: break-all;
                                font-size: 14px;
                                height: 36px;
                                line-height: 18px;
                            }
                            .price-edit {
                                margin-top: 10px;
                                display: -webkit-box;
                                display: -ms-flexbox;
                                display: flex;
                                -webkit-box-pack: justify;
                                -ms-flex-pack: justify;
                                justify-content: space-between;
                                -webkit-box-align: center;
                                -ms-flex-align: center;
                                align-items: center;
                                .price {
                                    display: block;
                                    font-size: 15px;
                                    color: #fe4070;
                                }
                                .number {
                                    color: #666;
                                }
                            }
                        }
                    }
                }
            }
            .group-tail {
                height: 35px;
                line-height: 35px;
                padding-right: 5px;
                background: #fff;
                border-top: 1px #eee solid;
                text-align: right;
                font-size: 12px;
                padding-left: 5px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                span:nth-child(1) {
                    float: left;
                    display: block;
                    width: 50%;
                    text-align: left;
                    font-size: 12px;
                    color: #999;
                    i {
                        font-size: 14px;
                        color: #888;
                    }
                }
                span:nth-child(2) {
                    float: right;
                    display: block;
                    width: 50%;
                    text-align: right;
                    i {
                        color: #e72d60;
                    }
                }
            }
        }
    }
    .flex-cart-botm {
        width: 100%;
        position: fixed;
        height: 45px;
        background: #000;
        bottom: 0px;
        left: 0px;
        padding: 0px 0px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        .left-car-fle {
            position: absolute;
            left: 5px;
            top: 5px;
            height: 35px;
            line-height: 35px;
            color: #fff;
            font-size: 12px;
            width: 50px;
            border-right: 1px solid #ddd;
            i {
                display: inline-block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #fff;
                border: 1px solid #ddd;
                vertical-align: -3px;
            }
            i.active {
                @include bagimg('../style/images/yuandgouxuan.png');
            }
        }
        .price-zongjia-cart {
            padding: 0px 110px 0px 75px;
            width: 100%;
            height: 45px;
            line-height: 45px;
            color: #fff;
            p:nth-child(1) {
                font-size: 12px;
                height: 16px;
                line-height: 16px;
                margin-top: 7px;
            }
            p:nth-child(2) {
                font-size: 13px;
                height: 15px;
                line-height: 15px;
            }
        }
        .gobuy-a {
            display: inline-block;
            position: absolute;
            right: 0px;
            top: 0px;
            width: 90px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            color: #fff;
            background: #cba162;
            font-size: 14px;
        }
    }
}
</style>


