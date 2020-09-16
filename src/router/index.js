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
    path: "/home/useredit",
    component: () => import('../views/user/UserEdit')
  }]
}, {
  path: "/",
  redirect: "/login"
}, {
  path: "/Login",
  component: () => import('@/views/Login')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router