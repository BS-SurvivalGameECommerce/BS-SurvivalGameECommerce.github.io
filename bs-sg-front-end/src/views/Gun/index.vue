 <script>
import axios from "axios";

var product = [];
var AttrListName = [];
var AttrListValues = [];
var ClassName = [];
var AttrList = [];
// var valueul;

var num;
var endnum;
export default {
  name: "Gun",
  data() {
    return {
      product: product,
      ClassName: ClassName,
      AttrListName: AttrListName,
      AttrListValues: AttrListValues,
      AttrList:[],
      valueul:"value-ul"
    };
  },
  mounted: function () {
    axios({
      url: "https://localhost:44306/Product/Catagory/Gun",
      method: "Get",
    }).then((res) => {
      let response = res.data;
      console.log(response);
      response.data.forEach((item) => {
        product.push(item);
      });
      response.data.forEach((item) => {
        if (ClassName.indexOf(item.className) == -1) {
          ClassName.push(item.className);
        }
      });
      response.data.forEach((item) => {
        item.attrlist.forEach((aitem) => {
          if (AttrListName.indexOf(aitem.name) == -1) {
            AttrListName.push(aitem.name);
          }
        });
      });
    });
  },
  methods: {
    pselect: function (x) {
      this._data.product = product.filter((item) => item.className == x);
    },
    reset: function () {
      this._data.product = product;
    },
    display: function (x) {
      var cul=document.getElementsByClassName("value-ul");
      console.log(cul)
      cul.forEach(item=>{
        item.style.display="none";
      })
      
      var dul=document.getElementById(x);
      dul.style.display="block";
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
      this._data.AttrList=AttrList;

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