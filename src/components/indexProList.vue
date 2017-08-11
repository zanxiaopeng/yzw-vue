<template>
    <div class="content-index-b padding-cler">
        <div class="content-index-con">
            <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul class="clearfix">
                    <li v-for="items in proList">
                        <router-link :to="'/ProDeails?uuid='+items.uuid" class="card-item">
                            <span class="item-pic">
                                <img :src="items.pro_ico" />
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
            </v-loadmore>
        </div>
    </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import 'mint-ui/lib/style.css';

import { getInexProList } from '../service/getData';
export default {
    data() {
        return {
            proList: [],
            pageIndex: 1,
            pageCount: 0,
            allLoaded: false
        }
    },
    mounted() {
        getInexProList({
            data: {
                page_index: this.pageIndex
            }
        }).then(res => {
            this.pageCount = res.data.pagecount;
            this.proList = res.data.data;
        });
    },
    components: {
        'v-loadmore': Loadmore
    },
    methods: {
        async loadBottom() {
            this.pageIndex++;
            let proListData = await getInexProList({
                data: {
                    page_index: this.pageIndex
                }
            });
            this.proList.push(...proListData.data.data);
            if (this.pageIndex + 1 > this.pageCount) {
                this.allLoaded = true;// 若数据已全部获取完毕
            }
            this.$refs.loadmore.onBottomLoaded();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin';

.content-index-b {
    position: relative;
    width: 100%;
    padding-bottom: 70px;
    overflow-x: hidden;
    @include bagimg('../style/images/yzw_new_backphoto.png')
}

.content-index-con {
    width: 100%;
}

.content-index-b ul {
    width: 100%;
    height: auto;
    padding: 10px 0px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.content-index-b ul li {
    background: #fff;
    width: 50%;
    float: left;
}

.content-index-b ul li:nth-child(n) {
    margin-right: 5px;
}

.card-item .item-pic {
    display: block;
    position: relative;
    overflow: hidden;
    position: relative;
}

.card-item .item-info {
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    padding-top: 0px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.card-item .item-desc {
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

.card-item .item-info .price-btom {
    margin-top: 3px;
    position: relative;
    -webkit-font-smoothing: antialiased;
    font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
}

.price-btom span.price-span {
    margin-bottom: 5px;
    font-size: 16px;
    color: #e72d60;
}

.card-item .item-info .price-btom span {
    display: block;
}

.content-index-b .price-btom span.price-span {
    font-size: 16px;
    color: #e72d60;
}

.content-index-b .price-btom span.price-span del {
    color: #999;
    margin-left: 5px;
    font-size: 11px;
}

.content-index-b ul li:nth-child(2n) {
    margin-right: -5px;
}

.price-btom span.buy-p-num {
    color: #999;
    font-size: 12px;
}

.price-btom .btn-lingqu {
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

.card-item .item-pic img {
    display: block;
    width: 100%;
    height: 100%;
}
</style>

