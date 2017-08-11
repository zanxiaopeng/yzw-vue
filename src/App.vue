<template>
  <div>
    <transition name="fade-anim" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@import './style/css/common.css';

.toast {
  z-index: 10000 !important;
}

.mint-indicator {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10000;
}

.fade-anim-enter-active,
.fade-anim-leave-active {
  transition: opacity .3s;
}

.fade-anim-enter,
.fade-anim-leave-to {
  opacity: 0;
}
</style>
