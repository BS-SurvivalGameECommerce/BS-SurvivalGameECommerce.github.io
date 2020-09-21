<script>
export default {
    name: 'simpleCart',
    mounted: function() {
        console.log("mounted");
        // console.log(this.cart.store);
    },
    methods:{
        removeItemFromCart: function(pid){
            console.log(pid);
            // this.removeFromCart(pid);

            // let tIndex = this.items.findIndex(x => x.pid == pid);
            // this.items.splice(tIndex, 1);
            // console.log(this.items);
            this.$store.commit('removeFromCart' ,pid);
        }
    },
    computed:{
        simpleCartItems(){
            return this.$store.state.cartItems;
        }
    }
}
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>