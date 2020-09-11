import Vue from 'vue'
// import App from './App.vue'
// import 'jquery'
import 'bootstrap-vue'
import App from './APP/index.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')