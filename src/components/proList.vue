<template>
    <section class="list-main-d padding-cler">
        <div class="content-index-con">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
    
                <ul class="clearfix">
                    <li v-for="items in prolist">
                        <router-link :to="'/ProDeails?uuid='+items.uuid" class="card-item">
                            <span class="item-pic">
                                <img :src="items.pro_ico">
                            </span>
                            <div class="item-info">
                                <span class="item-desc ellisp">{{items.pro_name}}</span>
                                <p class="price-btom">
                                    <span class="price-span">¥{{items.pro_price}}
                                        <del>¥{{items.pro_orgprice}}</del>
                                    </span>
                                    <span class="buy-p-num">{{items.pro_sale}}人已申请</span>
                                    <span class="btn-lingqu"></span>
                                </p>
                            </div>
                        </router-link>
                    </li>
                </ul>
    
            </mt-loadmore>
        </div>
    </section>
</template>

<script>
import { Loadmore } from 'mint-ui';
import 'mint-ui/lib/style.css';

import { getProListAll, getProListNew } from '../service/getData';

export default {
    data() {
        return {
            prolist: [],
            pageIndex: 1,
            pageCount: 0,
            allLoaded: false
        }
    },
    components: {
        'mt-loadmore': Loadmore
    },
    props: [
        "listtype"
    ],
    mounted() {
        if (this.listtype == "new") {
            getProListNew({
                data: {
                    page_index: this.pageIndex
                }
            }).then(res => {
                this.prolist = res.data.data;
                this.pageCount = res.data.pagecount;
            });
        }
        else {
            getProListAll({
                data: {
                    page_index: this.pageIndex
                }
            }).then(res => {
                this.prolist = res.data.data;
                this.pageCount = res.data.pagecount;
            });
        }
    },
    methods: {
        async loadTop() {  // 刷新数据的操作
            let that = this;
            setTimeout(function () {
                that.$refs.loadmore.onTopLoaded();
            }, 2000);
        },
        async loadBottom() {
            this.pageIndex++;
            let proList = await getProListNew({
                data: {
                    page_index: this.pageIndex
                }
            });
            this.prolist.push(...proList.data.data);
            
            if (this.pageIndex + 1 > this.pageCount) {
                this.allLoaded = true;// 若数据已全部获取完毕
            }
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin';

.freelist-mian .list-main-d {
    padding: 8px;
    margin-bottom: 45px;

    .content-index-con {
        width: 100%;
        overflow-x: hidden;

        ul {
            width: 100%;

            li {
                background: #fff;
                margin-bottom: 5px;
                width: 50%;
                float: left;
                .card-item {
                    min-height: 150px;
                    padding-bottom: 68px;
                    .item-pic {
                        display: block;
                        position: relative;
                        overflow: hidden;
                        position: relative;
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .item-info {
                        box-sizing: border-box;
                        overflow: hidden;
                        padding: 10px;
                        padding-top: 0px;
                        box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        .item-desc {
                            margin-top: 8px;
                            color: #333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: block;
                            height: 19px;
                            line-height: 19px;
                            font-size: 13px;
                        }
                        .price-btom {
                            margin-top: 3px;
                            position: relative;
                            -webkit-font-smoothing: antialiased;
                            font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
                            span.price-span {
                                margin-bottom: 5px;
                                font-size: 16px;
                                color: #e72d60;
                                del {
                                    color: #999;
                                    margin-left: 5px;
                                    font-size: 14px;
                                }
                            }
                            span {
                                display: block;
                            }
                            .buy-p-num {
                                color: #999;
                                font-size: 12px;
                            }
                            .btn-lingqu {
                                display: block;
                                position: absolute;
                                width: 30px;
                                height: 30px;
                                @include bagimg('../style/images/888275803E7EEB8E1AA57498CC07379F.png');
                                color: #fff;
                                font-size: 16px;
                                text-align: center;
                                line-height: 35px;
                                right: 0px;
                                top: 0px;
                            }
                        }
                    }
                }
            }

            li:nth-child(n) {
                margin-right: 5px;
            }

            li:nth-child(2n) {
                margin-right: -5px;
            }
        }
    }
}
</style>


