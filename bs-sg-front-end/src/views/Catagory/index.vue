 <script>
import axios from "axios";

var product = [];
// var AttrListName = [];
var AttrListValues = [];
// var ClassName = [];
var AttrList = [];
// var valueul;
var routername = "";
var num;
var endnum;
export default {
  name: "Catagory",
  data() {
    return {
      routername: "",
      product: product,
      ClassName: [],
      AttrListName:[],
      AttrListValues: AttrListValues,
      AttrList: [],
      valueul: "value-ul",
    };
  },
  created() {
    console.log(this.$route.params.name);
    this._data.routername = this.$route.params.name;
    routername = this.$route.params.name;
    axios({
      url: "https://localhost:44306/Product/Menu",
      method: "Get",
    }).then((res) => {
      // ClassName=[]
      // AttrListName=[]
      let response = res.data;
      console.log(response);
      response.data.forEach((item) => {
        product.push(item);
      });
      product = response.data.filter((item) => item.catagoryName == routername);
      this._data.product=product
      console.log(product);
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
    });
  },
  mounted: function () {},
  methods: {
    pselect: function (x) {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });
      this._data.product = product.filter((item) => item.className == x);
    },
    reset: function () {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });
      this._data.product = product;
    },
    display: function (x) {
      var cul = document.getElementsByClassName("value-ul");
      console.log(cul);
      cul.forEach((item) => {
        item.style.display = "none";
      });

      var dul = document.getElementById(x);
      dul.style.display = "block";
      // if (valueul != undefined) {
      //   valueul.remove();
      // }
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
      this._data.product = product.filter(
        (item) => item.attrlist[endnum].value == x
      );
    },
  },
  updated: function () {
    this.contentWayPoint();
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>