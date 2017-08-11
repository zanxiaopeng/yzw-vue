<template>
  <div>
    <app-banner></app-banner>
  
    <section class="yz_selected_plat" ref="abc">
      <div class="selected_plat_img" id="yz_selected_plat">
        <img src="http://s.iyouzhuang.com/images/yzw_middle.png">
      </div>
    </section>
  
    <section class="yzero_free_receive" :style="{paddingTop: platHeight +'px'}">
      <router-link to="/NewList/all">
        <img src="http://s.iyouzhuang.com/images/sale-box-index-img.png" />
      </router-link>
      <router-link to="/NewList/new">
        <img src="http://s.iyouzhuang.com/images/new-box-index-img.png" />
      </router-link>
    </section>
  
    <index-list></index-list>
  
    <main-footer></main-footer>
  
    <router-link to="/cart" class="cart-buy">
      <span class="num">1</span>
    </router-link>
  
  </div>
</template>

<script>
import Banner from '../components/banner-swiper';
import IndexList from '../components/indexProList';
import MainFooter from '../components/footerMain';
let imgload = require('jambo-util-imgload');// 验证图片是否加载完成

import { getIndexBanner } from '../service/getData';

export default {
  data() {
    return {
      platHeight: 0,
    }
  },
  mounted() { //所有的DOM挂载和渲染都已完成
    imgload.image_load('http://s.iyouzhuang.com/images/yzw_middle.png', () => {
      this.platHeight = document.getElementById("yz_selected_plat").offsetHeight;
    });



  },
  created() { //只完成数据观测(data observer)，属性和方法的运算 挂载阶段还没开始

  },
  methods: {

  },
  components: {
    'app-banner': Banner,
    'index-list': IndexList,
    'main-footer': MainFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../style/css/mixin';

.yz_selected_plat {
  width: 100%;
  height: auto;
  position: relative;
}

.yz_selected_plat .selected_plat_img {
  width: 100%;
  position: absolute;
  top: -15px;
  left: 0px;
  z-index: 100;
}

.selected_plat_img img {
  display: block;
  width: 100%;
}

.app .yzero_free_receive {
  width: 100%;
  height: auto;
  padding: 5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.yzero_free_receive a {
  display: block;
  width: 49%;
  height: auto;
  margin-bottom: 10px;
}

.yzero_free_receive a:nth-child(1) {
  float: left;
}

.yzero_free_receive a:nth-child(2) {
  float: right;
}

.yzero_free_receive a img {
  width: 100%;
  height: auto;
  display: block;
}

.cart-buy {
  position: fixed;
  right: 5px;
  bottom: 60px;
  width: 40px;
  height: 40px;
  @include bagimg('../style/images/gouwuche-icon.png');
  display: block;
  .num {
    position: absolute;
    right: 2px;
    top: -1px;
    background-color: rgb(173, 177, 178);
    min-width: 14px;
    text-align: center;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    color: #FFF;
    padding: 0 1px;
    font-size: 12px;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1);
    display: none;
  }
}
</style>
