<template>
    <footer>
        <div class="footer-nav font-xiti">
            <router-link to="/" :class="$route.path.toLowerCase().indexOf('index') !== -1 ? 'active' : ''">
                <i class="iconfont">&#xe62a;</i>
                首页
            </router-link>
            <router-link to="/NewList/new" :class="$route.path.toLowerCase().indexOf('newlist') !== -1 ? 'active' : ''">
                <i class="iconfont">&#xe62e;</i>
                免费专区
            </router-link>
            <router-link to="/Order" :class="$route.path.toLowerCase().indexOf('order') !== -1 ? 'active' : ''">
                <i class="iconfont">&#xe62d;</i>
                订单
            </router-link>
            <router-link to="/My" :class="$route.path.toLowerCase().indexOf('my') !== -1 ? 'active' : ''">
                <i class="iconfont">&#xe62c;</i>
                我的
            </router-link>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer-nav {
    position: fixed;
    background: rgba(255, 255, 255, 0.99);
    width: 100%;
    height: 45px;
    line-height: 45px;
    display: -webkit-flex;
    display: flex;
    left: 0px;
    bottom: 0px;
    box-shadow: -1px -1px #ddd;
    box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
    -webkit-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
    -moz-box-shadow: 0 0 10px 0 rgba(155, 143, 143, 0.6);
}

.footer-nav a {
    flex: 1;
    text-align: center;
    color: #c7c7c7;
    font-size: 12px;
    display: inline-block;
    width: 25%;
}

a.active {
    color: #f61a56;
}

.footer-nav a i.iconfont {
    font-size: 54px;
    display: block;
    line-height: 0px;
    margin-top: 18px;
    margin-bottom: -5px;
}
</style>


