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
      totalRows: 50,
      selectedCatagory: "",
      SortName: ["name", "price", "Newest"],
      selectedsort: "",
      Sortselect: ["Asc", "Desc"],
    };
  },
  computed: {},
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
      this.paginate(this.perPage, 0);
    });
  },
  methods: {
    Asc(x) {
      switch (x) {
        case "":
          alert("select type");
          break;
        case "price":
          this.product = this.product.sort(function (a, b) {
            return a.price > b.price ? 1 : -1;
          });
          break;
        case "name":
          this.product = this.product.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
          });
          break;
        case "Newest":
          this.product = this.product.sort(function (a, b) {
            return a.pid > b.pid ? 1 : -1;
          });
          break;
      }
      this.paginate(this.perPage, 0);

    },
    Desc(x) {
      switch (x) {
        case "":
          alert("select type");
          break;
        case "price":
          this.product = this.product.sort(function (a, b) {
            return a.price < b.price ? 1 : -1;
          });
          break;
        case "name":
          this.product = this.product.sort(function (a, b) {
            return a.name < b.name ? 1 : -1;
          });
          break;
        case "Newest":
          this.product = this.product.sort(function (a, b) {
            return a.pid < b.pid ? 1 : -1;
          });
          break;
      }
      this.paginate(this.perPage, 0);

    },
    sortchange(event) {
      return event.target.value == "Asc"? this.Asc(this.selectedCatagory): this.Desc(this.selectedCatagory);
    },
    typechange(event) {
      if (this.selectedsort == "") {
        return;
      }
      return this.selectedsort == "Asc"? this.Asc(event.target.value): this.Desc(event.target.value);
    },
    paginate(page_size, page_number) {
      this.showItems = this.product.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
      console.log(this.showItems);
      console.log(page_size);
      console.log(page_number);
    },
    pageChange: function (p) {
      this.paginate(this.perPage, p - 1);
    },
  },
  updated: function () {
    this.InitAnime();
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css"></style>