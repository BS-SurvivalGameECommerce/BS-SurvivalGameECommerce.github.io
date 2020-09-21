<script>
import axios from "axios";

var domain = "https://localhost:5001/";
var api=domain+"Product/Menu"
var product = [];
var CatagoryName = [];

export default {
  name: "Menu",
  data() {
    return {
      product: product,
      CatagoryName: CatagoryName,
    };
  },
  mounted: function () {
    axios({
      url: api,
      method: "Get",
    }).then((res) => {
      let response = res.data;
      console.log(response);
      response.data.forEach((item) => {
        product.push(item);
      });
      response.data.forEach((item) => {
        if (CatagoryName.indexOf(item.catagoryName) == -1) {
          CatagoryName.push(item.catagoryName);
        }
      });
    });
  },
  methods: {
    Addcart:function(x){
      alert("Add to Cart")
       this.$store.dispatch("addToCart", { pid: x, quantity: 1 });
    },
    pselect: function (x) {
      this._data.product = product.filter(function (item) {
        return item.catagoryName == x;
      });
    },
    reset: function () {
      this._data.product = product;
    },
  }
};

</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>