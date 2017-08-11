<template>
    <div>
        <section class="header-info" id="content-item">
            <img :src="pro_img" class="mianproimg" style="transform: scale(1);">
        </section>
        <section class="content-item" :style="{top: content_item_top + 'px'}">
            <div class="txt-info-item padding-cler">
                <div class="priceandtitle">
                    <p class="title-product ellisp">{{pro_name}}</p>
                    <p class="producr-price">
                        <span class="price-h">
                            <i class="iconfont">&#xe664;</i>{{pro_price}}</span>
                        <del>
                            ¥{{pro_orgprice}}
                        </del>
                    </p>
                    <a href="javacrupt:;" @click="sharBoxShow" class="share-icon">
                        <i>分享</i>
                    </a>
                </div>
                <div class="ku-info-pro font-xiti">
                    <span>库存：{{pro_stoce}}</span>
                    <span>销量：{{pro_sale}}</span>
                    <span>运费：
                        <i>¥{{pro_freight}}</i>
                    </span>
                </div>
            </div>
            <div class="baozheng-priodect clearfix font-xiti">
                <span>
                    <em class="iconfont">&#xe61d;</em>
                    厂家直供
                </span>
                <span>
                    <em class="iconfont">&#xe61d;</em>
                    一次购买 终身领取
                </span>
                <span>
                    <em class="iconfont">&#xe61d;</em>
                    正品保证
                </span>
            </div>
            <div class="product-info-img">
                <nav class="tab-box font-xiti">
                    <a @click="deailsshow('images')" :class="showdeail == 'images' ? 'active' :' '">
                        图文详情
                    </a>
                    <a @click="deailsshow('text')" :class="showdeail == 'text' ? 'active' :' '">
                        商品参数
                    </a>
                </nav>
                <pro-info :show-this="showdeail" :proInfoArr="proInfoArr"></pro-info>
            </div>
            <div class="buybtn-fixed">
                <a href="javascript:;" @click="showAttribute">加入购物车</a>
            </div>
        </section>
    
        <!--属性选择区-->
        <section>
            <div class="cover-decision" v-show="attributeBox.isShow"></div>
            <div :class="[attributeBox.classname]" class="mui-cover font-xiti" id="s-decision-wrapper">
                <div class="summary font-xiti">
                    <div class="img">
                        <img :src="pro_ico">
                    </div>
                    <div class="main font-xiti">
                        <div class="priceContainer">
                            <span class="price">¥{{pro_price*pro_count}}</span>
                        </div>
                        <div class="stock-control">
                            <span class="stock">
                                <label class="label">库存</label>{{pro_stoce}}件
                            </span>
                            <span class="limitTip"></span>
                        </div>
                        <div class="sku-dtips">已选择:
                            <span id="skuTipsContent">本产品</span>
                        </div>
                    </div>
                    <a class="sback iconfont" @click="closeAttribute" aria-label="关闭">&#xe620;</a>
                </div>
                <div class="body" style="overflow: auto;">
                    <section>
                        <div class="sku-control">
                            <ul class="mui-sku">
                                <li v-for="items in ProductAttr" class="J_SkuGroup mui-sku-group">
                                    <h2>{{items.attr_obj.attr_name}}</h2>
                                    <div class="items">
                                        <template v-for="(item,index) in items.attr_obj.attr_val">
                                            <label :attr_vaule="item.vaule" :class="item.checked == true ? 'checked':''" @click="checked_attr(items.uuid,item.vaule)">{{item.vaule}}</label>
                                        </template>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="number">
                            <h2>数量</h2>
                            <div class="content clearfix">
                                <div class="number-control">
                                    <div class="mui-number">
                                        <span class="decrease" @click="mincount">-</span>
                                        <input type="number" class="num" disabled="disabled" id="pronum" :value="pro_count" min="1" max="100" step="">
                                        <span class="increase" @click="maxcount">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="optionbtn">
                    <span @click="addCart">确定</span>
                </div>
            </div>
        </section>
        <!--属性选择区-->
    
        <share-box :isShow="shareIsShow" v-on:closeShareBox="closeShareBox"></share-box>
    </div>
</template>

<script>
import _Common from '../utils/common';
import _Config from '../config/commonConfig';

import ProInfo from '../components/proDeails/proInfo';
import ShareBox from '../components/common/shareBox';
let imgload = require('jambo-util-imgload');// 验证图片是否加载完成

import { getProInfo, getProductAttr, setCart } from '../service/getData';

export default {
    data() {
        return {
            pro_uuid: "",
            pro_ico: "",
            pro_name: "",
            pro_price: "",
            pro_orgprice: "",
            pro_stoce: "",
            pro_sale: "",
            pro_freight: "",
            pro_img: "",
            pro_imginfo: "",
            pro_videourl: "",
            pro_info: "",
            content_item_top: 0,
            showdeail: 'images',
            ProductAttr: new Array(),
            pro_count: 1,
            attributeBox: {
                isShow: false,
                classname: ''
            },
            shareIsShow: false,
            proInfoArr: {
                pro_videourl: "",
                pro_info: new Array(),
                pro_imginfo: new Array()
            }
        }
    },
    created() {
        this.pro_uuid = this.$route.query.uuid;
    },
    mounted() {
        getProInfo({
            data: {
                proid: this.pro_uuid
            }
        }).then(res => {
            if (res.result == 0) {
                let proData = res.data;
                this.pro_ico = proData.pro_ico;
                this.pro_name = proData.pro_name;
                this.pro_price = proData.pro_price;
                this.pro_orgprice = proData.pro_orgprice;
                this.pro_stoce = proData.pro_stoce;
                this.pro_sale = proData.pro_sale;
                this.pro_freight = proData.pro_freight;
                this.pro_img = proData.pro_img;
                this.pro_imginfo = proData.pro_imginfo;
                this.pro_videourl = proData.pro_videourl;
                this.pro_info = proData.pro_info;

                this.proInfoArr.pro_videourl = proData.pro_videourl;
                this.proInfoArr.pro_info = proData.pro_info;
                this.proInfoArr.pro_imginfo = proData.pro_imginfo;
            }
            else {
                this.$router.push({ path: '/' });
            }
        });
        getProductAttr({
            data: {
                proid: this.pro_uuid
            }
        }).then(res => {
            if (res.result == 0) {
                res.data.forEach(item => {
                    let ProductAttrData = {
                        uuid: "",
                        attr_obj: ""
                    };

                    ProductAttrData.uuid = item.uuid;
                    let _attr_obj = {
                        attr_name: item.attr_obj.attr_name,
                        attr_val: new Array()
                    };

                    item.attr_obj.attr_val.forEach((items, index) => {
                        let attr_val_obj = {
                            vaule: items,
                            checked: false
                        }
                        if (index == 0) {
                            attr_val_obj.checked = true;
                        }
                        _attr_obj.attr_val.push(attr_val_obj);
                    });

                    ProductAttrData.attr_obj = _attr_obj;

                    this.ProductAttr.push(ProductAttrData);
                });
            }
        });
    },
    updated() {
        let that = this;
        if (this.pro_img) {
            imgload.image_load(this.pro_img, function () {
                that.content_item_top = document.getElementById("content-item").offsetHeight;
            });
        }
    },
    methods: {
        deailsshow(obj) {
            this.showdeail = obj;
        },
        showAttribute() {
            this.attributeBox.isShow = true;
            this.attributeBox.classname = 'show';
        },
        closeAttribute() {
            this.attributeBox.isShow = false;
            this.attributeBox.classname = '';
        },
        sharBoxShow() {
            this.shareIsShow = true;
        },
        closeShareBox() {
            this.shareIsShow = false;
        },
        checked_attr(uuid, vaule) {
            this.ProductAttr.forEach(res => {
                if (res.uuid == uuid) {
                    res.attr_obj.attr_val.forEach(item => {
                        if (item.vaule == vaule) {
                            item.checked = true;
                        }
                        else {
                            item.checked = false;
                        }
                    });
                }
            });
        },
        mincount() {
            if (this.pro_count - 1 >= 1) {
                this.pro_count--;
            }
        },
        maxcount() {
            if (this.pro_count + 1 <= this.pro_stoce) {
                this.pro_count++;
            }
        },
        async addCart() {
            let specifications = new Array();
            if (this.ProductAttr.length > 0) {
                this.ProductAttr.forEach(res => {
                    let specifiObj = {
                        name: "",
                        vaule: ""
                    };
                    res.attr_obj.attr_val.forEach(item => {
                        if (item.checked == true) {
                            specifiObj.name = res.attr_obj.attr_name;
                            specifiObj.vaule = item.vaule;
                            specifications.push(specifiObj);
                        }
                    });

                });
            }
            if (this.pro_count <= 0) {
                _Common.toastBottom('购买数量不正确');
                return;
            }

            let UserInfo = _Common.getStore(_Config.loginStoreName);
            if (UserInfo) {
                UserInfo = JSON.parse(UserInfo);
                const addCartRes = await setCart({
                    data: {
                        customeruuid: UserInfo.uuid,
                        prouuid: this.pro_uuid,
                        count: this.pro_count,
                        specifications: specifications
                    }
                });
                if (addCartRes.result == 0) {
                    this.$router.push({ 'path': '/cart' });
                }
                else {
                    _Common.toastBottom('加入购物车失败');
                }
            }
            else {
                this.$router.push({ 'path': '/login?fromurl='+this.$route.fullPath });
            }
        }
    },
    components: {
        'pro-info': ProInfo,
        'share-box': ShareBox
    }
}
</script>


<style lang="scss" scoped>
@import '../style/css/mixin';


.header-info {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    img.mianproimg {
        width: 100%;
    }
}

.content-item {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
    background: #fff;
    transition: top 1.3s linear;
    -webkit-transition: top 1.3s linear;
    -moz-transition: top 1.3s linear;
    padding-bottom: 65px;
    .txt-info-item {
        width: 100%;
        padding: 10px;
        .priceandtitle {
            width: 100%;
            position: relative;
            .title-product {
                font-size: 17px;
                color: #333;
                margin-bottom: 10px;
                padding-right: 55px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
            .producr-price {
                font-size: 25px;
                color: #e72d60;
                .price-h {
                    margin-right: 7px;
                    i.iconfont {
                        font-size: 18px;
                        color: #e72d60;
                        margin-right: -4px;
                    }
                }
                del {
                    font-size: 14px;
                    color: #999;
                }
            }
            .share-icon {
                position: absolute;
                right: 0px;
                top: 2px;
                width: 42px;
                height: 42px;
                @include bagimg('../style/images/share-icon-p.png');
                color: #fff;
                i {
                    position: absolute;
                    display: block;
                    font-size: 12px;
                    bottom: 3px;
                    left: 9px;
                }
            }
        }
        .ku-info-pro {
            width: 101%;
            font-size: 14px;
            color: #999;
            height: 40px;
            line-height: 40px;
            span {
                display: inline-block;
                width: 32%;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;
            }
            span:nth-child(1) {
                text-align: left;
            }
            span:nth-child(2) {
                text-align: center;
            }
            span:nth-child(3) {
                text-align: right;
                i {
                    color: #e72d60;
                }
            }
        }
    }
    .baozheng-priodect {
        width: 100%;
        background: #ebe6e3;
        padding: 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 40px;
        line-height: 20px;
        font-size: 13px;
        color: #666;
        span {
            display: block;
            width: 33.333%;
            float: left;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            em {
                font-size: 16px;
                color: #cba163;
                vertical-align: -1px;
            }
        }
        span:nth-child(1) {
            text-align: left;
        }
        span:nth-child(2) {
            text-align: center;
        }
        span:nth-child(3) {
            text-align: right;
        }
    }
    .product-info-img {
        width: 100%;
        overflow: hidden;
        .tab-box {
            height: 50px;
            line-height: 50px;
            padding: 0px 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            text-align: center;
            a {
                display: inline-block;
                padding: 0px 40px;
                color: #666;
                font-size: 15px;
                position: relative;
            }
            a.active {
                color: #cba162;
            }
            a.active::after {
                position: absolute;
                display: block;
                content: ' ';
                width: 100%;
                border-bottom: 2px solid #cba162;
                bottom: 0px;
                left: 0px;
            }
        }
    }
}

.buybtn-fixed {
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

.cover-decision {
    width: 100%;
    opacity: .7;
    height: 100%;
    position: fixed;
    background-color: #000;
    top: 0;
    left: 0;
    z-index: 100;
}

.mui-cover {
    background-color: #fff;
    position: fixed;
    z-index: 1500;
    top: 40%;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    -webkit-transition: -webkit-transform .2s cubic-bezier(0, 0, .25, 1);
    transition: transform .2s cubic-bezier(0, 0, .25, 1);
    font-size: 13px;
    .summary {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        -webkitbox-shadow: 0 1px 0 rgba(0, 0, 0, .05), 0 .5px 0 rgba(0, 0, 0, .09);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .05), 0 0.5px 0 rgba(0, 0, 0, .09);
        padding: 10px;
        height: 95px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        .img {
            position: relative;
            top: -32px;
            background-color: #fff;
            z-index: 10;
            padding: 2px;
            border: 1px solid #ddd;
            -moz-border-radius: 4px;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            float: left;
            margin-right: 10px;
            height: 100px;
            width: 100px;
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            display: -ms-flexbox;
            -ms-flex-pack: center;
            -ms-flex-align: center;
            img {
                max-width: 100%;
                max-height: 100%;
                display: block;
                -moz-border-radius: 4px;
                border-radius: 4px;
                -webkit-border-radius: 4px;
            }
        }
        .main {
            overflow: hidden;
            .priceContainer {
                font-size: 14px;
                line-height: 14px;
                display: inline-block;
                vertical-align: middle;
                margin-bottom: 3px;
                .price {
                    display: block;
                    vertical-align: middle;
                    height: 18px;
                    line-height: 18px;
                    font-size: 16px;
                    padding: 0 10px 0 0;
                }
                span:first-child {
                    color: #fe4070;
                }
            }
            .stock-control {
                .stock {
                    .label {
                        font-size: 14px;
                        margin-right: 5px;
                    }
                }
            }
            .sku-dtips {
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
                overflow: hidden;
                margin-right: 3.8px;
                display: -webkit-box;
                margin-top: 5px;
                span {
                    padding-left: 5px;
                }
            }
        }
        .sback {
            position: absolute;
            width: 24px;
            height: 28px;
            display: block;
            top: 5px;
            right: 5px;
            font-size: 22px;
        }
    }
    .body {
        position: absolute;
        top: 100px;
        bottom: 48px;
        left: 0;
        right: 0;
        section {
            .sku-control {
                -webkit-tap-highlight-color: transparent;
                margin: 0 16px;
                border-bottom: 1px solid #e5e5e5;
                margin-bottom: 10px;
                .mui-sku {
                    -webkit-tap-highlight-color: transparent;
                    li {
                        padding: 10px 0 5px;
                        h2 {
                            color: #666;
                            margin-bottom: 10px;
                            margin-top: 10px;
                        }
                        .items {
                            label {
                                outline: 0;
                                -webkit-tap-highlight-color: transparent;
                                background-color: #fff;
                                min-width: 20px;
                                padding: 5px 12px;
                                margin: 0 5px 8px 0;
                                max-width: 100%;
                                text-align: center;
                                display: inline-block;
                                border: 1px solid #e5e5e5;
                                -webkit-box-sizing: border-box;
                                box-sizing: border-box;
                                -webkit-border-radius: 3px;
                                border-radius: 3px;
                                font-size: 12px;
                                color: #333;
                            }
                            label.checked {
                                border-color: #fe4070;
                                color: #000;
                            }
                        }
                    }
                }
            }
            .number {
                padding-bottom: 20px;
                -webkit-tap-highlight-color: transparent;
                margin: 0 16px;
                h2 {
                    color: #666;
                    margin-bottom: 10px;
                    margin-top: 10px;
                }
                .content {
                    overflow: hidden;
                    .number-control {
                        float: left;
                        .mui-number {
                            display: inline-block;
                            vertical-align: middle;
                            border: 1px solid #e5e5e5;
                            -webkit-border-radius: 3px;
                            border-radius: 3px;
                            letter-spacing: 0;
                            height: 36px;
                            line-height: 36px;
                            overflow: hidden;
                            .decrease {
                                font-style: normal;
                                font-size: 24px;
                                font-weight: 700;
                                border: none;
                                display: inline-block;
                                width: 32px;
                                height: 100%;
                                -webkit-user-select: none;
                                -ms-user-select: none;
                                background-color: #FFF;
                                color: #5f646e;
                                display: block;
                                border-right: 1px solid #e5e5e5;
                                float: left;
                                text-align: center;
                            }
                            .num {
                                height: 100%;
                                min-width: 35px;
                                max-width: 55px;
                                -webkit-box-sizing: border-box;
                                box-sizing: border-box;
                                padding: 0 2px;
                                border: none;
                                -webkit-border-radius: 0;
                                border-radius: 0;
                                font-weight: 700;
                                color: #3d4245;
                                float: left;
                                text-align: center;
                            }
                            .increase {
                                font-style: normal;
                                font-size: 24px;
                                font-weight: 700;
                                border: none;
                                display: inline-block;
                                width: 32px;
                                height: 100%;
                                -webkit-user-select: none;
                                -ms-user-select: none;
                                background-color: #FFF;
                                color: #5f646e;
                                display: block;
                                border-left: 1px solid #e5e5e5;
                                float: left;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
    .optionbtn {
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e5e5e5;
        text-align: center;
        width: 100%;
        span {
            display: block;
            background: #fe4070;
            color: #fff;
            width: 100%;
            height: 48px;
            line-height: 48px;
            font-size: 15px;
        }
    }
}

.mui-cover.show {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
</style>


