<script>
import axios from "axios";
import ProductCard from "../../components/ProductCard/index.vue";
import Breadcrumbs from "../../components/Breadcrumbs/index.vue";

var domain = "https://localhost:5001/";
var api = domain + "Product/Menu";
var product = [];
var CatagoryName = [];

export default {
  name: "Menu",
  components: {
    ProductCard,
    Breadcrumbs,
  },
  data() {
    return {
      product: product,
      CatagoryName: CatagoryName,
      showItems: product,
      perPage: 10,
      currentPage: 1,
      totalRows:50
    };
  },
  computed: {
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
      // console.log(product);
      response.data.forEach((item) => {
        if (CatagoryName.indexOf(item.catagoryName) == -1) {
          CatagoryName.push(item.catagoryName);
        }
      });
    this.paginate(this.perPage,0)

    });
  },
  methods: {
    paginate(page_size, page_number) {
      // let itemsToParse = this.items
      this.showItems = this.product.slice(page_number * page_size,(page_number + 1) * page_size);
      console.log(this.showItems);
      console.log(page_size);
      console.log(page_number);
    },
    pageChange: function (p) {
      this.paginate(this.perPage, p - 1);
    },
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
    this.InitAnime();
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>