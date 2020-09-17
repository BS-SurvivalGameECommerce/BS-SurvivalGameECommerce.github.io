<script  lang="ts" >
import axios from "axios";
import qs from "qs";

var domain = "https://localhost:44306/";
export default {
  name: "cart",
  data() {
    return {
      memberID: "MB014",
      isLoading: true,
      fields: [
        "product",
        "price",
        "quantity",
        "total",
        {
          key: "delete",
          label: "",
          tdClass: "last"
        }
      ],
      items: [
        {
          img: "/assets/images/prod-1.jpg",
          name: "Jim Beam Kentucky Straight",
          price: 44.99,
          quantity: 2
        },
        {
          img: "/assets/images/prod-1.jpg",
          name: "Jim Beam Kentucky Straight",
          price: 44.99,
          quantity: 2
        }
      ],
      PaymentMethod: {
        valid: true,
        id: "PM001"
      },
      DeliveryAddress: {
        valid: true,
        address: "新竹市香山區五福路二段707號"
      }
    };
  },
  mounted: function() {
    console.log("mounted");
    this.addToCart("PD001", 1);
    this.addToCart("PD002", 2);
    this.addToCart("PD003", 3);
    
    console.log(this.store);

    let IDList = this.cart.store.map(x => x.pID);

    axios
      .get(`${domain}Product/BatchSimpleProduct`, {
        params: {
          IDList: IDList
        },
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(res => {
        let response = res.data;
        console.log(response);
        this.isLoading = false;

        if (response.isSuccess) {
          response.data.forEach(
            x => (x.quantity = this.cart.store.find(y => y.pID == x.pid).quantity)
          );
          this.items = response.data;
          this.contentWayPoint();
        }
      });
  },
  computed: {
    total: function() {
      return this.items.reduce((accumulator, c) => {
        return parseFloat(
          (
            parseFloat(accumulator) + parseFloat(c.price * c.quantity)
          ).toPrecision(12)
        );
      }, 0);
    },
    confirmOrderValid: function() {
      return this.PaymentMethod.valid && this.DeliveryAddress.valid;
    }
  },
  methods: {
    productTotal: function(index) {
      let target = this.items[index];
      return parseFloat((target.price * target.quantity).toPrecision(12));
    },
    removeFromCartFunc: function(pid) {
      this.removeFromCart(pid);

      let tIndex = this.items.findIndex(x => x.id == pid);
      this.items.splice(tIndex, 1);
    },
    confirmOrder: function() {
      let data = {
        MemberId: this.memberID,
        PaymentMethodId: this.PaymentMethod.id,
        ShipAddress: this.DeliveryAddress.address,
        ODList: this.cart.store.map(x => {
          return {
            ProductId: x.pID,
            Quantity: x.quantity
          };
        })
      };
      axios
        .post(`${domain}Order/CreateOrder`, data)
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>