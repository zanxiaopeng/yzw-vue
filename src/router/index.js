import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

// 引用所有的页面组件
const Page = {
  Index: r => require.ensure([], () => r(require('@/views/Index')), 'Index'),
  NewList: r => require.ensure([], () => r(require('@/views/NewList')), 'NewList'),
  ProDeails: r => require.ensure([], () => r(require('@/views/ProDeails')), 'ProDeails'),
  Login: r => require.ensure([], () => r(require('@/views/Login')), 'Login'),
  Cart: r => require.ensure([], () => r(require('@/views/Cart')), 'Cart'),
  OrderConfirm: r => require.ensure([], () => r(require('@/views/OrderConfirm')), 'OrderConfirm'),
  My: r => require.ensure([], () => r(require('@/views/My')), 'My'),
  Order: r => require.ensure([], () => r(require('@/views/Order')), 'Order'),
  Address: r => require.ensure([], () => r(require('@/views/Address')), 'Address')
}

// 引用所有的公用组件
const Components = {
  Register: r => require.ensure([], () => r(require('@/components/account/Register')), 'Register'),
  GetPassword: r => require.ensure([], () => r(require('@/components/account/getPassword')), 'GetPassword'),
  OrderInfo: r => require.ensure([], () => r(require('@/components/order/orderInfo')), 'orderInfo'),
  AddAddress: r => require.ensure([], () => r(require('@/components/address/addAddress')), 'AddAddress'),
  EditInfo: r => require.ensure([], () => r(require('@/components/account/editInfo')), 'EditInfo')
}

export default new Router({
  mode: 'history', // 启动HTML5 history模式
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) { // 记录此页面跳转时滚动条的位置
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [
    {
      path: '/',
      component: App, // 顶层路由，对应index.html
      children: [ // 二级路由。对应App.vue
        // 地址为空时跳转home页面
        {
          path: '',
          redirect: '/Index'
        },
        {
          path: '/Index',
          component: Page.Index,
          meta: {
            keepAlive: true // 记录此页面跳转时滚动条的位置
          }
        },
        {
          path: '/NewList/:type',
          component: Page.NewList,
          meta: {
            keepAlive: true // 记录此页面跳转时滚动条的位置
          }
        },
        {
          path: '/ProDeails',
          component: Page.ProDeails
        },
        {
          path: '/Login',
          component: Page.Login,
          children: [
            {
              path: 'Register',
              component: Components.Register
            },
            {
              path: 'Getpassword',
              component: Components.GetPassword
            }
          ]
        },
        {
          path: '/Cart',
          component: Page.Cart
        },
        {
          path: '/OrderConfirm',
          component: Page.OrderConfirm
        },
        {
          path: '/My',
          component: Page.My,
          children:[
            {
              path:'EditInfo',
              component:Components.EditInfo
            }
          ]
        },
        {
          path: '/Order',
          component: Page.Order,
          children: [
            {
              path: 'OrderInfo',
              component: Components.OrderInfo
            }
          ]
        },
        {
          path: '/Address',
          component: Page.Address,
          children:[
            {
              path:'AddAddress',
              component:Components.AddAddress
            }
          ]
        },
        {
          path: '*',
          name: 'others',
          redirect: '/Index'
        }
      ]
    }
  ]
})
