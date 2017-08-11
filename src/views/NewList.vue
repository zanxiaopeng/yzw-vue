<template>
    <section class="freelist-mian">
        <img src="http://s.iyouzhuang.com/images/lingquzhuanqu-ban.png" class="top-free-list">
        <pro-list :listtype="listType"></pro-list>
        <footer-main></footer-main>
    </section>
</template>

<script>
import proList from '../components/proList';
import footerMain from '../components/footerMain';

export default {
    data() {
        return {
            listType: "" //列表类型 new代表新品 all代表全部
        }
    },
    components: {
        'pro-list': proList,
        'footer-main': footerMain
    },
    created() { //组件创建完成，属性已绑定
        this.listType = this.$route.params.type;
    }
}
</script>

<style lang="scss" scoped>
.freelist-mian {
    width: 100%;
    background: #f4f2f2;

    img.top-free-list {
        width: 100%;
        display: block;
    }
}
</style>


