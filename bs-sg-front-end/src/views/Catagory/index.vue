 <script>
import axios from "axios";
import ProductCard from "../../components/ProductCard/index.vue";
import Breadcrumbs from "../../components/Breadcrumbs/index.vue";

// var domain = "https://localhost:5001/";
// var api = domain + "Product/Menu";
var product = [];
var AttrListValues = [];

var AttrList = [];

var routername = "";
var num;
var endnum;
export default {
  name: "Catagory",
  components: {
    ProductCard,
    Breadcrumbs,
  },
  data() {
    return {
      api: this.$store.state.domain + "Product/Menu",
      routername: "",
      product: product,
      ClassName: [],
      AttrListName: [],
      AttrListValues: AttrListValues,
      AttrList: [],
      valueul: "value-ul",
      showItems: product,
      perPage: 10,
      currentPage: 1,
      totalRows: "",
      selectedCatagory: "Newest",
      SortName: [
        "name" ,"price" ,"Newest" ,
      ],
      selectedsort: "Asc",
      Sortselect: ["Asc", "Desc"],
    };
  },
  watch: {
    $route(to) {
      product = [];
      this._data.AttrListName = [];
      this._data.ClassName = [];
      console.log(to.params.name);
      this._data.routername = to.params.name;
      routername = to.params.name;
      axios({
        url: this.api,
        method: "Get",
      }).then((res) => {
        let response = res.data;

        response.data.forEach((item) => {
          product.push(item);
        });
        product = response.data.filter(
          (item) => item.catagoryName == routername
        );
        this._data.product = product;
        this._data.showItems = product;

        this._data.totalRows = product.length;

        this._data.product.forEach((item) => {
          if (this._data.ClassName.indexOf(item.className) == -1) {
            this._data.ClassName.push(item.className);
          }
        });
        this._data.product.forEach((item) => {
          item.attrlist.forEach((aitem) => {
            if (this._data.AttrListName.indexOf(aitem.name) == -1) {
              this._data.AttrListName.push(aitem.name);
            }
          });
        });
        this.paginate(this.perPage, 0);
      });
    },
  },
  created() {},
  mounted() {
    console.log(this.$route.params.name);
    this._data.routername = this.$route.params.name;
    routername = this.$route.params.name;
    axios({
      url: this.api,
      method: "Get",
    }).then((res) => {
      // ClassName=[]
      // AttrListName=[]
      let response = res.data;

      response.data.forEach((item) => {
        product.push(item);
      });
      product = response.data.filter((item) => item.catagoryName == routername);
      this._data.product = product;
      this._data.showItems = product;

      this._data.totalRows = product.length;

      this._data.product.forEach((item) => {
        if (this._data.ClassName.indexOf(item.className) == -1) {
          this._data.ClassName.push(item.className);
        }
      });
      this._data.product.forEach((item) => {
        item.attrlist.forEach((aitem) => {
          if (this._data.AttrListName.indexOf(aitem.name) == -1) {
            this._data.AttrListName.push(aitem.name);
          }
        });
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
      return event.target.value == "Asc"
        ? this.Asc(this.selectedCatagory)
        : this.Desc(this.selectedCatagory);
    },
    typechange(event) {
      if (this.selectedsort == "") {
        return;
      }
      return this.selectedsort == "Asc"
        ? this.Asc(event.target.value)
        : this.Desc(event.target.value);
    },
    paginate(page_size, page_number) {
      this._data.showItems = this._data.product.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    pageChange: function (p) {
      this.paginate(this.perPage, p - 1);
    },
    pselect: function (x) {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });
      this._data.showItems = product.filter((item) => item.className == x);
      this._data.totalRows = this._data.showItems.length;
    },
    reset: function () {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });
      this._data.showItems = product;
      this._data.totalRows = this._data.showItems.length;
    },
    display: function (x) {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });

      var dul = document.getElementById(x);
      dul.style.display = "block";
      AttrList = [];
      AttrListValues.length = 0;
      console.log(x);
      product.forEach((item) => {
        AttrList.push(item.attrlist.filter((aitem) => aitem.name == x)[0]);
      });
      console.log(AttrList);
      AttrList = [
        ...new Set(AttrList.map((item) => JSON.stringify(item))),
      ].map((item) => JSON.parse(item));
      AttrList.forEach((item) => {
        console.log(item.value);
        AttrListValues.push(item.value);
      });
      console.log(AttrList);
      this._data.AttrList = AttrList;
    },
    aselect: function (x) {
      product.forEach((item) => {
        num = item.attrlist
          .map(function (aitem) {
            return aitem.value;
          })
          .indexOf(x);
        if (num != -1) {
          endnum = num;
        }
      });
      this._data.showItems = product.filter(
        (item) => item.attrlist[endnum].value == x
      );
      this._data.totalRows = this._data.showItems.length;
    },
  },
  updated: function () {
    this.InitAnime();
  },
};
// console.log(document.getElementById("option"));
// document.getElementById("option").selected=true;
// op.selected=true;
</script>
<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped ></style>
