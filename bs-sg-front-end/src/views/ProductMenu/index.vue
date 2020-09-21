<script>
import axios from "axios";
import ProductCardGroup from '../../components/ProductCardGroup/index.vue'

var domain = "https://localhost:5001/";
var api = domain + "Product/Menu";
var product = [];
var CatagoryName = [];

export default {
  name: "Menu",
  components: {
    ProductCardGroup,
  },
  data() {
    return {
      Products: product,
      CatagoryName: CatagoryName,
    };
  },
  mounted: function () {
    axios({
      url: api,
      method: "Get",
    }).then((res) => {
      let response = res.data;
      // console.log(response);
      response.data.forEach((item) => {
        product.push(item);
      });
      console.log(product)
      response.data.forEach((item) => {
        if (CatagoryName.indexOf(item.catagoryName) == -1) {
          CatagoryName.push(item.catagoryName);
        }
      });
    });
  },
  methods: {
    pselect: function (x) {
      this._data.Products = product.filter(function (item) {
        return item.catagoryName == x;
      });
    },
    reset: function () {
      this._data.Products = product;
    },
  },
  updated: function(){
    this.InitAnime();
  }
};

</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>