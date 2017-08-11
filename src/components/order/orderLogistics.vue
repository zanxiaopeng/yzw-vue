<template>
    <div class="fixed-wuliuceng" v-show="isShow">
        <div class="wuliucentener">
            <p class="title-wuliu">
                <i class="iconfont">&#xe6ad;</i>物流信息
                <span class="close-wuliu iconfont" @click="closeLogistics">&#xe652;</span>
            </p>
            <ul class="font-xiti" id="wuliulist">
    
                <li v-for="item in ExpressInfo">
                    <i class="bioyundian"></i>
                    <div class="wuliuinfo">
                        <p>{{item.AcceptStation}}</p>
                        <time>时间
                            <i>{{item.AcceptTime}}</i>
                        </time>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import { getExpressListInfo } from '../../service/getData';

import _Common from '../../utils/common';
import _Config from '../../config/commonConfig';

export default {
    props: ['isShow', 'orderCode'],
    data() {
        return {
            customeruuid: "",
            ExpressInfo: new Array()
        }
    },
    mounted() {
        let UserInfo = _Common.getStore(_Config.loginStoreName);
        if (UserInfo) {
            UserInfo = JSON.parse(UserInfo);
            this.customeruuid = UserInfo.uuid;
            getExpressListInfo({
                data: {
                    customeruuid: this.customeruuid,
                    ordercode: this.orderCode
                }
            }).then(res => {
                console.log(res);
                if (res.result == 0) {
                    if (res.data.data && res.data.data.constructor == Array) {
                        this.ExpressInfo = res.data.data;
                    }
                }
            });
        }
        else {
            this.$router.push({ 'path': '/login?fromurl=' + this.fromurl });
        }
    },
    methods: {
        closeLogistics() {
            this.$emit('closeLogistics');
        }
    }
}
</script>

<style lang="scss" scoped>
.fixed-wuliuceng {
    position: fixed;
    z-index: 200;
    background: rgba(6, 6, 6, 0.49);
    width: 100%;
    height: 100%;
    overflow: hidden;
    left: 0px;
    top: 0px;
    z-index: 20000;
    .wuliucentener {
        width: 280px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -140px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        overflow: hidden;
        .title-wuliu {
            font-size: 13px;
            color: #c79f62;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            position: fixed;
            background: #fff;
            width: 100%;
            z-index: 200;
            left: 0px;
            top: 0px;
            padding: 0px 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            i {
                font-size: 16px;
                color: #5a5959;
                margin-right: 5px;
                vertical-align: -2px;
            }
            .close-wuliu {
                display: block;
                position: absolute;
                width: 20px;
                height: 20px;
                font-size: 23px;
                color: #929090;
                top: -1px;
                right: 13px;
            }
        }
        ul {
            width: 100%;
            height: 345px;
            margin-top: 40px;
            overflow-x: hidden;
            overflow-y: auto;
            li {
                width: 100%;
                position: relative;
                margin-bottom: 12px;
                margin-top: 17px;
                i.bioyundian {
                    display: block;
                    position: absolute;
                    left: 0px;
                    top: 20px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #999;
                }
                .wuliuinfo {
                    width: 100%;
                    padding-left: 18px;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    p {
                        height: 33px;
                        font-size: 12px;
                        line-height: 17px;
                        overflow: hidden;
                        width: 100%;
                        color: #888;
                    }
                    time {
                        color: #999;
                        font-size: 12px;
                        margin-top: 5px;
                    }
                }
            }
            li:nth-child(1) i.bioyundian {
                width: 12px;
                height: 12px;
                background: #c79f62;
            }
            li:nth-child(1) .wuliuinfo p {
                color: #c79f62;
            }
        }
    }
}
</style>


