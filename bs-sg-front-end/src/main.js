import Vue from 'vue'
// import App from './App.vue'
// import 'jquery'
import 'bootstrap-vue'
import App from './APP/index.vue'
import router from './router'
import plugin from './plugin/plugin.js'

// import '@/assets/javaScript/jquery.min.js'
// import '@/assets/javaScript/jquery-migrate-3.0.1.min.js'
// import '@/assets/javaScript/popper.min.js'
// import '@/assets/javaScript/jquery.easing.1.3.js'
// import '@/assets/javaScript/jquery.waypoints.min.js'
// import '@/assets/javaScript/jquery.stellar.min.js'
// import '@/assets/javaScript/owl.carousel.min.js'
// import '@/assets/javaScript/jquery.magnific-popup.min.js'
// import '@/assets/javaScript/jquery.animateNumber.min.js'
// import '@/assets/javaScript/scrollax.min.js'
// import '@/assets/javaScript/main.js'


Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')