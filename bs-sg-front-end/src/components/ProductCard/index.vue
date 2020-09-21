<template>
    <div class="product ftco-animate">
        <div class="img productimg d-flex align-items-center justify-content-center" :style="{'background-image' : `url(${Product.img})`}">
            <div class="desc">
                <p class="meta-prod d-flex">
                    <a @click="addToCart(Product.pid)" class="d-flex align-items-center justify-content-center">
                        <span class="flaticon-shopping-bag"></span>
                    </a>
                    <a href="#" class="d-flex align-items-center justify-content-center">
                        <span class="flaticon-heart"></span>
                    </a>
                    <a href="#" class="d-flex align-items-center justify-content-center">
                        <span class="flaticon-visibility"></span>
                    </a>
                </p>
            </div>
        </div>
        <div class="className text-center" v-if="Product.className">
            <span class="category">{{Product.className}}</span>
        </div>
        <div class="title text-center">
            <h4 class="limit-length">
                {{Product.name}}
            </h4>
        </div>
        <div class="text text-center">
            <span class="productprice">
                ${{Product.price}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
  name: "ProductCard",
  props: {
    Product: Object,
  },
  methods: {
    addToCart: function (pid) {
      this.$store.dispatch("addToCart", { pid: pid, quantity: 1 });
    },
  },
};
</script>
<style lang="scss">
.product {
    display: flex;
    flex-direction: column;
    .title {
        h4 {
            font-size: 1.3rem;
        }
    }
    .text {
        margin-top: auto;
        font-size: 24px;
    }
}
</style>