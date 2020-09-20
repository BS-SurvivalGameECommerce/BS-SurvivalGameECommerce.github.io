<script>

import simpleCart from '../components/SimpleCart/index.vue'

export default {
  name: 'APP',
  components:{
     simpleCart
  },
  mounted: function () {
    console.log("mounted");

    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute("src", "../assets/javaScript/main.js");
    // document.head.appendChild(recaptchaScript);
    this.contentWayPoint();
    this.$store.dispatch('initCart').then(() => {
      this.$store.dispatch('addToCart', { pid: 'PD001', quantity: 1 });
      this.$store.dispatch('addToCart', { pid: 'PD002', quantity: 2 });
      this.$store.dispatch('addToCart', { pid: 'PD003', quantity: 3 });
    });


  },
  computed:{
    simpleCartItemsAmount(){
        return this.$store.state.cartItems.length;
    }
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>