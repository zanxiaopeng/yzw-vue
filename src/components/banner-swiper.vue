<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <template v-for="str in listImg">
                <div class="swiper-slide">
                    <img :src="str.image_url" />
                </div>
            </template>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';// npm install --save swiper

import { getIndexBanner } from '../service/getData';


export default {
    data() {
        return {
            listImg: [ ]
        }
    },
    mounted() { //不能保证 组件已经在dom中
        getIndexBanner().then(res => {
            this.listImg = res.data;
        });
    },
    updated() {//比mounted 晚一步  组件更新时执行
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            speed: 600,
            autoplay: 4000,
            onTouchEnd: function () {
                swiper.startAutoplay()
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/swiper.min.css';

.swiper-container {
    width: 100%;
    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            display: block;
        }
    }
    .swiper-pagination-bullet {
        width: 0.833rem;
        height: 0.833rem;
        display: inline-block;
        background: #7c5e53;
    }
    .swiper-pagination-bullets {
        bottom: 18px;
    }
}
</style>


