<script>
import simpleCart from '../components/SimpleCart/index.vue'


export default {
  name: 'APP',
  components:{
     simpleCart
  },
  mounted: function () {
    this.$store.dispatch('initCart').then(() => {
      this.$store.dispatch('addToCart', { pid: 'PD001', quantity: 1 });
      this.$store.dispatch('addToCart', { pid: 'PD002', quantity: 2 });
      this.$store.dispatch('addToCart', { pid: 'PD003', quantity: 3 });
    });
    this.InitAnime();

  },
  updated: function(){
    console.log('app updated');
    this.InitAnime();

  },
  computed:{
    simpleCartItemsAmount(){
        return this.$store.state.cartItems.length;
    }
  },
  watch:{
    $route(){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>