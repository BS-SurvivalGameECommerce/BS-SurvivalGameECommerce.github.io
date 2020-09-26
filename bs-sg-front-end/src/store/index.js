import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import qs from "qs"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        domain: 'https://localhost:5001/',
        // domain: 'https://sgwebapi-core.azurewebsites.net/',
        cartItems: []
    },
    mutations: {
        addToCart: function(state, cartItem) {
            state.cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        addCartQuantity: function(state, cartItem) {
            let t = state.cartItems.find(x => x.pid == cartItem.pid);
            t.quantity = cartItem.quantity;
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        initCart: function(state, cartItems) {
            state.cartItems = cartItems;
        },
        removeFromCart: function(state, pid) {

            let targetIndex = state.cartItems.findIndex(x => x.pid == pid);
            if (targetIndex != -1) {
                state.cartItems.splice(targetIndex, 1);
            } else {
                console.log("no such product");
                return;
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        }
    },
    actions: {
        addToCart: function(context, cartItem) {
            if (context.state.cartItems.findIndex(x => x.pid == cartItem.pid) == -1) {
                let IDList = [];
                IDList.push(cartItem.pid);
                axios
                    .get(`${context.state.domain}Product/BatchSimpleProduct`, {
                        params: {
                            IDList: IDList
                        },
                        paramsSerializer: function(params) {
                            return qs.stringify(params, { arrayFormat: "repeat" });
                        }
                    })
                    .then(res => {
                        let response = res.data;

                        if (response.isSuccess) {
                            response.data.forEach(
                                x => (x.quantity = cartItem.quantity)
                            );
                            context.commit('addToCart', response.data[0]);
                        }
                    });
            } else {
                context.commit('addCartQuantity', cartItem);
            }
        },
        initCart: function(context) {
            console.log('initCart');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let IDList = cart.map(x => x.pid);

            return axios.get(`${context.state.domain}Product/BatchSimpleProduct`, {
                    params: {
                        IDList: IDList
                    },
                    paramsSerializer: function(params) {
                        return qs.stringify(params, { arrayFormat: "repeat" });
                    }
                })
                .then(res => {
                    let response = res.data;

                    if (response.isSuccess) {
                        response.data.forEach(
                            x => (x.quantity = cart.find(y => y.pid == x.pid).quantity)
                        );
                        cart = response.data;
                        context.commit('initCart', cart);
                    }
                });
        }
    },
    modules: {}
})