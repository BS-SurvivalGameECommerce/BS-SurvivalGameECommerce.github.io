<script>
import ProductCard from '../ProductCard/index.vue'
export default {
  name: "ProductCardGroup",
  components:{
    ProductCard
  },
  props: {
    Products: Array,
  },
  methods: {
    addToCart: function (pid) {
      this.$store.dispatch("addToCart", { pid: pid, quantity: 1 });
    },
  },
};
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>