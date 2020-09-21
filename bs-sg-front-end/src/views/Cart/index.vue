<script >
import axios from "axios";
import Breadcrumbs from '../../components/Breadcrumbs/index.vue'
// import qs from "qs";

// var domain = "https://localhost:5001/";
export default {
  name: "cart",
  components:{
      Breadcrumbs
  },
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
    this.isLoading = false;
  },
  computed: {
    cartItems(){
        return this.$store.state.cartItems;
    },
    total: function() {
      return this.cartItems.reduce((accumulator, c) => {
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
      let target = this.cartItems[index];
      return parseFloat((target.price * target.quantity).toPrecision(12));
    },
    removeFromCartFunc: function(pid) {
      // this.removeFromCart(pid);

      // let tIndex = this.cartItems.findIndex(x => x.pid == pid);
      // this.cartItems.splice(tIndex, 1);
      this.$store.commit('removeFromCart' ,pid);
    },
    confirmOrder: function() {
      let data = {
        MemberId: this.memberID,
        PaymentMethodId: this.PaymentMethod.id,
        ShipAddress: this.DeliveryAddress.address,
        ODList: this.cartItems.map(x => {
          return {
            ProductId: x.pid,
            Quantity: x.quantity
          };
        })
      };
      axios
        .post(`${this.$store.state.domain}Order/CreateOrder`, data)
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>
<template src = "./template.html"></template>
<style src="./style.scss" lang="scss"></style>