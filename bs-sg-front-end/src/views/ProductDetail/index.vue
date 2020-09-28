<script>
import axios from "axios";
import Breadcrumbs from '../../components/Breadcrumbs/index.vue'
import ProductCard from '../../components/ProductCard/index.vue'

export default {
    name: 'ProductDetail',
    components:{
        Breadcrumbs,
        ProductCard
    },
    data(){
        return {
            product: null,
            RelatedProducts: null,
            slide: 0,
            sliding: null,
            interval : 0,
            routerAlias:{
                ProductDetail: "Menu"
            }
        }
    },
    mounted: function(){
        axios
            .get(`${this.$store.state.domain}Product/Product/${this.$route.params.pid}`)
            .then((res) => { 

                this.product = res.data.data;
                this.product.amount = 1;
            });
        axios
            .get(`${this.$store.state.domain}Product/SimilarProductById/${'PD001'}`)
            .then((res) => { 
                this.RelatedProducts = res.data.data;
            });
    },
    updated: function(){
        this.InitAnime();
    },
    methods: {
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        }
    },
    watch: {
        $route() {
            axios
                .get(`${this.$store.state.domain}Product/Product/${this.$route.params.pid}`)
                .then((res) => { 
                    this.product = res.data.data;
                    this.product.amount = 1;
                });
            axios
                .get(`${this.$store.state.domain}Product/SimilarProductById/${'PD001'}`)
                .then((res) => { 
                    this.RelatedProducts = res.data.data;
                });
        }
    }
}
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>