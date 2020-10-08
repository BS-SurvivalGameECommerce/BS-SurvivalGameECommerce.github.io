import Vue from 'vue'
import App from './APP/index.vue'
// import router from './router'
//@ts-ignore
import router from './router'
// import plugin from './plugin/plugin.js'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//@ts-ignore
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
    //@ts-ignore
    carousel();
    //@ts-ignore
    counter();
    //@ts-ignore
    contentWayPoint();
}
Vue.prototype.getToken = function(){
    return localStorage.getItem('LoginToken');
}
Vue.prototype.LogOut = function(){
    return localStorage.removeItem('LoginToken');

}

Vue.use(BootstrapVue)
// Vue.use(plugin)

Vue.config.productionTip = false



new Vue({
    //@ts-ignore
    router,
    store,
    render: h => h(App)
}).$mount('#app')