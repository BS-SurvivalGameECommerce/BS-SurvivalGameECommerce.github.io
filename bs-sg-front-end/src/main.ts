import Vue from 'vue'
import App from './APP/index.vue'
// import router from './router'
import router from './router'
// import plugin from './plugin/plugin.js'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'
// Vue.prototype.cart = cartObj;
// Vue.prototype.addToCart = function(pID : string, quantity :number){
//     cartObj.addToCart(pID, quantity);
// };
// Vue.prototype.removeFromCart = function(pID : string){
//     cartObj.removeFromCart(pID);
// };
// Vue.mixin(cartObj);
Vue.prototype.InitAnime = function(){
    carousel();
    counter();
    contentWayPoint();
}
Vue.prototype.getToken = function(){
    return localStorage.getItem('LoginToken');
}

Vue.use(BootstrapVue)
// Vue.use(plugin)

Vue.config.productionTip = false



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')