// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick' // 提升移动端按钮点击的响应时间
import axios from 'axios' // ajax 模块
import App from './App'
import router from './router'

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

// 提升移动端按钮点击的响应时间 必须要这样写来实例化 FastClick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App }
})
