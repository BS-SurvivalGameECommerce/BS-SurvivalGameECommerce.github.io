

<script>
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs/index.vue";


var UserId = "MB001";
localStorage.setItem('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNQjAyNyAgICAgIiwianRpIjoiNWFlYzU0YzEtMjE1Mi00YWMyLTkyYzMtZTc4ZGMwM2IzZTYzIiwicm9sZXMiOiJVc2VycyIsIm5iZiI6MTYwMTEzNDAzMCwiZXhwIjoxNjAxMTM1ODMwLCJpYXQiOjE2MDExMzQwMzAsImlzcyI6IlN1cnZpdmFsR2FtZUp3dCJ9.y2Q0S_snIl-SOlghkAxj_DevRW3qb8fsqXl_1iYHwqQ')
var token = localStorage.getItem('Authorization')
export default {
  name: "MemberCenter",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      AddVerify: true,
      Checkselected: false,
      inputData: "",
      checkData: {
        NameError: false,
        NameErrorMsg: "",
        EmailError: false,
        EmailhErrorMsg: "",
        PasswordError: false,
        PasswordErrorMsg: "",
        CheckPasswordError: false,
        CheckPasswordErrorMsg: "",
        PhoneError: false,
        PhoneErrorMsg: "",
        PostcodeError: false,
        PostcodeErrorMsg: "",
        AddressError: false,
        AddressErrorMsg: "",
      },
      history: [],
      wishlist: "",
      inputstatus: {
        button: true,
        background: "",
        color: "",
      },
      fields: [
        {
          key: "orderID",
          label: "訂單編號",
          sortable: true,
          sortDirection: "desc",
          class: "text-center p-3",
        },
        {
          key: "status",
          label: "訂單狀態",
          sortable: true,
          sortDirection: "desc",
          class: "text-center p-3",
        },
        {
          key: "orderDate",
          label: "訂單日期",
          sortable: true,
          class: "text-center p-3",
        },
        {
          key: "totalPrice",
          label: "總價格",
          sortable: true,
          class: "text-center p-3",
        },
        {
          key: "paymentMethod",
          label: "付款方式",
          sortable: true,
          class: "text-center p-3",
        },
        { key: "actions", label: "Actions", class: "text-center p-3" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  create() {
    axios({
      url: `${this.$store.state.domain}Member/MemberCenter/${UserId}`,
      method: "Get",
      headers: {'Authorization': `Bearer ${token}`}
    }).then((response) => {
      var member = response.data.member;
      console.log(response.data);
      var profile = {
        Name: member.name,
        Email: member.mail,
        Birthday: member.birthday.split("T")[0],
        Phone: member.phone,
        Postcode: member.postCode,
        Address: member.address,
      };

      response.data.hitory.forEach((item) => {
        var object = {
          orderID: "",
          orderDate: "",
          status: "",
          paymentMethod: "",
          shipAddress: "",
          totalPrice: 0,
          totalQuantity: 0,
          orderDetailList: [],
        };
        object.orderID = item.orderID;
        object.orderDate = item.orderDate.split("T")[0];
        object.status = item.status;
        object.paymentMethod = item.paymentMethod;
        object.shipAddress = item.shipAddress;
        item.orderDetailList.forEach((product) => {
          var detail = {
            productId: "",
            productName: "",
            img: "",
            quantity: "",
            discount: "",
            unitPrice: "",
            totalPrice: 0,
          };
          detail.productId = product.productId;
          detail.productName = product.productName;
          detail.img = product.img;
          detail.quantity = product.quantity;
          detail.discount = product.discount;
          detail.unitPrice = product.unitPrice;
          detail.totalPrice =
            parseInt(product.quantity) *
            parseFloat(product.discount) *
            parseFloat(product.unitPrice);
          object.orderDetailList.push(detail);
          object.totalQuantity += parseInt(product.quantity);
          object.totalPrice += detail.totalPrice;
        });
        this.history.push(object);
      });
      var wishlist = response.data.wishList;
      console.log(wishlist);
      console.log(profile);
      console.log(history);
      this.inputData = profile;
      this.wishlist = wishlist;
    })
  },
  mounted: function () {
    this.totalRows = this.history.length;
  },
    methods: {
      change:function() {
        if (this.Checkselected == true) {
          this.Checkselected = false;
          this.$refs.name.blur();
          this.$refs.mail.blur();
          this.$refs.phone.blur();
          this.$refs.postcode.blur();
          this.$refs.address.blur();
        } else {
          this.Checkselected = true;
        }
      },
      info:function(item, index, button) {
        this.infoModal.title = `Row index: ${index}`;
        this.infoModal.content = JSON.stringify(item, null, 2);
        this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      },
      onFiltered:function(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      addcart:function(){
        this.$store.dispatch('addToCart', { pid: 'PD001', quantity: 1 });
      }
    },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>