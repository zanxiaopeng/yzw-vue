<template>
    <div class="share-pro-item" @click="closeShareBox" v-show="isShow">
        <span></span>
    </div>
</template>

<script>
export default {
    props:['isShow'],
    methods:{
        closeShareBox(){
            this.$emit('closeShareBox');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/css/mixin';

.share-pro-item {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: #000;
    z-index: 1000;
    opacity: .7;
    span {
        display: block;
        position: absolute;
        right: 15px;
        top: 20px;
        width: 245px;
        height: 140px;
        @include bagimg('../../style/images/share-ico.png');
        background-size: 100%;
    }
}
</style>


