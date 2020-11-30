import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Categroy from '../views/sort/Sort.vue'
import Cart from '../views/cart/Cart.vue'
import My from '../views/my/My.vue'
import Login from '../components/login'
import HomePage from '../components/homepage'
import Detail from '../views/detail/Detail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },{
    path:'/sort',
    name:'Categroy',
    component:Categroy
  },{
    path:'/cart',
    name:'Cart',
    component:Cart
  },{
    path:'/my',
    name:'My',
    component:My
  },{
    path:'/login',
    name:'Login',
    component:Login
  },{
    path:'/homepage',
    name:'HomePage',
    component: HomePage
  },{
    path:'/detail/:iid',//动态路由
    name:'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
