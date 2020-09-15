<script>
import axios from "axios";

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
      url: "https://localhost:44306/Product/Menu",
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
    pselect: function (x) {
      this._data.product = product.filter(function (item) {
        return item.catagoryName == x;
      });
    },
    reset: function () {
      this._data.product = product;
    },
  },
  updated: function () {
    this.contentWayPoint();
  },
};

</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>