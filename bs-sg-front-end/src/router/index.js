import 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import Cart from '../views/Cart/index.vue'
import ProductMenu from '../views/ProductMenu/index.vue'
import Catagory from '../views/Catagory/index.vue'

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
        path: '/Catagory/:name',
        name: 'Catagory',
        component: Catagory
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: Cart
    }
]

const router = new VueRouter({
    routes
})

export default router