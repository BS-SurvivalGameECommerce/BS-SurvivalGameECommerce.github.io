<script  lang="ts" >
import { cart, addToCart ,removeFromCart } from "../../assets/js/cart.js";
import axios from "axios";
import qs from "qs";

export default {
  name: "cart",
  data() {
    return {
      isLoading: true,
      fields: [
        "product",
        "price",
        "quantity",
        "total",
        {
          key: "delete",
          label: "",
          tdClass: "last",
        },
      ],
      items: [
        {
          img: "/assets/images/prod-1.jpg",
          name: "Jim Beam Kentucky Straight",
          price: 44.99,
          quantity: 2,
        },
        {
          img: "/assets/images/prod-1.jpg",
          name: "Jim Beam Kentucky Straight",
          price: 44.99,
          quantity: 2,
        },
      ],
    };
  },
  mounted: function () {
    console.log("mounted");
    addToCart("PD001", 1);
    addToCart("PD002", 2);
    addToCart("PD003", 3);
    let IDList = cart.map((x) => x.pID);

    axios
      .get("https://localhost:5001/Product/BatchSimpleProduct", {
        params: {
          IDList: IDList,
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        let response = res.data;
        console.log(response);
        console.log(cart);
        console.log(this.items);
        this.isLoading = false;

        if (response.isSuccess) {
          //   self.Products = response.data;
          response.data.forEach(
            (x) => (x.quantity = cart.find((y) => y.pID == x.pid).quantity)
          );
          this.items = response.data;
          this.contentWayPoint();
        }
      });
  },
  computed: {
    total: function () {
      return this.items.reduce((accumulator, c) => {
        return parseFloat(
          (
            parseFloat(accumulator) + parseFloat(c.price * c.quantity)
          ).toPrecision(12)
        );
      }, 0);
    },
  },
  methods: {
    productTotal: function (index) {
      let target = this.items[index];
      return parseFloat((target.price * target.quantity).toPrecision(12));
    },
    removeFromCart:function(pid){
        removeFromCart(pid);

        let tIndex = this.items.findIndex(x => x.id == pid);
        this.items.splice(tIndex ,1);
    }
  },
};
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>