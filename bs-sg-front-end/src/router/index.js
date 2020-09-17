import 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import Cart from '../views/Cart/index.vue'
import ProductMenu from '../views/ProductMenu/index.vue'
import Gun from '../views/Gun/index.vue'
import Magazine from '../views/Magazines/index.vue'
import Accessories  from '../views/Accessories/index.vue'
import Clothes  from '../views/Clothes/index.vue'

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
        path: '/Gun',
        name: 'Gun',
        component: Gun
    },
    {
        path: '/Magazine',
        name: 'Magazine',
        component: Magazine
    },
    {
        path: '/Accessories',
        name: 'Accessories',
        component: Accessories
    },
    {
        path: '/Clothes',
        name: 'Clothes',
        component: Clothes
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