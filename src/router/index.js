import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  component: () => import('../views/Home'),
  children: [{
    path: '/home/usermanage',
    component: () => import('../views/user/UserManage')
  }, {
    path: '/home/tagmanage',
    component: () => import('../views/tag/TagManage')
  }, {
    path: '/home/groupmanage',
    component: () => import('../views/group/GroupManage')
  }, {
    path: '/home/productmanage',
    component: () => import('../views/product/ProductManage')
  }, {
    path: '/home/addproduct',
    component: () => import('../views/product/AddProduct')
  }, {
    path: '/home/ordermanage',
    component: () => import('../views/order/OrderManage')
  }, {
    path: "/home/userdetail/:id",
    component: () => import('../views/user/UserDetail')
  }]
}, {
  path: "/",
  redirect: "/login"
}, {
  path: "/Login",
  component: () => import('@/views/Login')
}, {
  path: "/register",
  component: () => import('@/views/Register')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router