import 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import Cart from '../views/Cart/index.vue'
import ProductMenu from '../views/ProductMenu/index.vue'
import Catagory from '../views/Catagory/index.vue'
import MemberCenter from '../views/MemberCenter/index.vue'
import Register from '../views/Register/index.vue'
import Login from '../views/Login/index.vue'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: ProductMenu
    },
    {
        path: '/Menu/:name',
        name: 'Catagory',
        component: Catagory
    },
    {
        path: '/About',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About/index.vue')
    },
    {
        path: '/Contact',
        name: 'Contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Contact" */ '../views/Contact/index.vue')
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: () =>
            import ( /* webpackChunkName: "SignUp" */ '../views/SignUp/index.vue')
    },
    {
        path: '/MemberCenter',
        name: 'MemberCenter',
        component: MemberCenter

    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router