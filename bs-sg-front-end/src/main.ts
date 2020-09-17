import Vue from 'vue'
// import App from './App.vue'
// import 'jquery'
// import 'bootstrap-vue'
import App from './APP/index.vue'
import router from './router'
import plugin from './plugin/plugin.js'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import cartObj from '@/assets/js/cart.js'
Vue.prototype.cart = cartObj;
// Vue.prototype.addToCart = function(pID : string, quantity :number){
//     cartObj.addToCart(pID, quantity);
// };
// Vue.prototype.removeFromCart = function(pID : string){
//     cartObj.removeFromCart(pID);
// };
Vue.mixin(cartObj);

Vue.use(BootstrapVue)


Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')