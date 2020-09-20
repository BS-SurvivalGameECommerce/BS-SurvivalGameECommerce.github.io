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
    this.$store.dispatch('initCart');
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