<template>
    <section class="productimandin clearfix">
        <div class="productimglist" v-if="showThis === 'images'">
            <div class="productimgvideo">
                <iframe frameborder="0" width="100%" height="250px" :src="proInfoArr.pro_videourl" allowfullscreen=""></iframe>
            </div>
            <template v-for="items in proInfoArr.pro_imginfo">
                <img :src="items">
            </template>
    
        </div>
        <div class="product-canshu font-xiti" v-if="showThis === 'text'">
            <ul>
                <li v-for="items in proInfoArr.pro_info">
                    <span class="props-name">{{items.i_name}}</span>
                    <span class="props-content">{{items.i_value}}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        showThis: {
            type: String,
            required: true
        },
        proInfoArr: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.productimandin {
    width: 200%;
    position: relative;
    overflow: hidden;
    transition: transform .5s linear;
    -webkit-transition: transform .5s linear;
    -moz-transition: transform .5s linear;
    transform: translateX(0px);
    margin-top: 10px;
    .productimglist {
        width: 50%;
        float: left;
        .productimgvideo {
            width: 95%;
            margin: 0 auto;
        }
        img {
            display: block;
            width: 100%;
        }
    }
    .product-canshu {
        width: 50%;
        float: left;
        min-height: 350px;
        ul {
            padding: 15px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            li {
                margin-top: 8px;
                .props-name {
                    float: left;
                    color: #999;
                    display: block;
                    width: 70px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 12px;
                }
                .props-content {
                    color: #333;
                    display: inline-block;
                    width: 210px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 13px;
                }
            }
        }
    }
}
</style>



