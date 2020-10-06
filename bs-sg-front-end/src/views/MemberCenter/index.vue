

<script>
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs/index.vue";

let UserId = "MB001";
localStorage.setItem(
  "Authorization",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNQjAyNyAgICAgIiwianRpIjoiNzFmNDkwODgtOTkwMS00NmZhLWI5NWUtZGUwODEyZjIzNTU1Iiwicm9sZXMiOiJVc2VycyIsIm5iZiI6MTYwMTMwNDcwMSwiZXhwIjoxNjAxMzA4MzAxLCJpYXQiOjE2MDEzMDQ3MDEsImlzcyI6IlN1cnZpdmFsR2FtZUp3dCJ9.2yuf3IVpsNBuRE4DFevegXJ10MAGmqc5MHQwkEIngOY"
);
let token = localStorage.getItem("Authorization");
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
        MailError: false,
        MailhErrorMsg: "",
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
      wishlist: [],
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
          class: "text-center p-2",
        },
        {
          key: "status",
          label: "訂單狀態",
          sortable: true,
          sortDirection: "desc",
          class: "text-center p-2",
        },
        {
          key: "orderDate",
          label: "訂單日期",
          sortable: true,
          class: "text-center p-2",
        },
        {
          key: "totalPrice",
          label: "總價格",
          sortable: true,
          class: "text-center p-2",
        },
        {
          key: "paymentMethod",
          label: "付款方式",
          sortable: true,
          class: "text-center p-2",
        },
        { key: "actions", label: "Actions", class: "text-center p-2" },
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
  watch: {
    'Checkselected': {
      immediate: true,
      handler: function () {
        if (this.Checkselected == false) {
          console.log(15);
          this.inputstatus.button = true;
          this.inputstatus.background = "rgb(242 242 242)!important";
          this.inputstatus.color = "rgb(127 127 127 / 75%)!important";
        } else {
          console.log(12);
          this.inputstatus.button = false;
          this.inputstatus.background = "#fff!important";
          this.inputstatus.color = "#000!important";
        }
      },
    },
    "inputData.Name": {
      immediate: true,
      handler: function () {
        let NameReg = /^[\u4e00-\u9fa5]{2,25}$|^[a-zA-Z]{2,25}$/;
        if (!NameReg.test(this.inputData.Name)) {
          this.checkData.NameError = true;
          this.checkData.NameErrorMsg =
            "The name is between 2-25 Chinese or English characters.";
        } else {
          this.checkData.NameError = false;
          this.checkData.NameErrorMsg = "";
        }
      },
    },
    "inputData.Mail": {
      immediate: true,
      handler: function () {
        let MailReg = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
        if (!MailReg.test(this.inputData.Mail)) {
          this.checkData.MailError = true;
          this.checkData.MailErrorMsg = "Please enter the complete email.";
        } else {
          this.checkData.MailError = false;
          this.checkData.MailErrorMsg = "";
        }
      },
    },
    "inputData.Password": {
      immediate: true,
      handler: function () {
        let passwordReg = new RegExp(
          "^(?=.{8,35})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"
        );
        if (!passwordReg.test(this.inputData.Password)) {
          this.checkData.PasswordError = true;
          this.checkData.PasswordErrorMsg =
            "Password length is between 8-35 uppercase and lowercase English digits";
        } else {
          this.checkData.PasswordError = false;
          this.checkData.PasswordErrorMsg = "";
        }
      },
    },
    "inputData.CheckPassword": {
      immediate: true,
      handler: function () {
        if (
          this.inputData.CheckPassword != this.inputData.Password ||
          this.inputData.CheckPassword == ""
        ) {
          this.checkData.CheckPasswordError = true;
          this.checkData.CheckPasswordErrorMsg = "Passwords are inconsistent.";
        } else {
          this.checkData.CheckPasswordError = false;
          this.checkData.CheckPasswordErrorMsg = "";
        }
      },
    },
    "inputData.Phone": {
      immediate: true,
      handler: function () {
        let PhoneReg = /^09\d{8}$/;
        if (!PhoneReg.test(this.inputData.Phone)) {
          this.checkData.PhoneError = true;
          this.checkData.PhoneErrorMsg =
            "Please enter the 10-digit mobile phone number starting with 09";
        } else {
          this.checkData.PhoneError = false;
          this.checkData.PhoneErrorMsg = "";
        }
      },
    },
    "inputData.Postcode": {
      immediate: true,
      handler: function () {
        let PostcodeReg = /^[0-9]{3,6}/;
        if (!PostcodeReg.test(this.inputData.Postcode)) {
          this.checkData.PostcodeError = true;
          this.checkData.PostcodeErrorMsg = "Please enter 3 to 6 digits";
        } else {
          this.checkData.PostcodeError = false;
          this.checkData.PostcodeErrorMsg = "";
        }
      },
    },
    "inputData.Address": {
      immediate: true,
      handler: function () {
        if (
          this.inputData.Address != undefined &&
          this.inputData.Address.length < 10
        ) {
          this.checkData.AddressError = true;
          this.checkData.AddressErrorMsg =
            "Please enter the complete address of more than 10 words";
        } else {
          this.checkData.AddressError = false;
          this.checkData.AddressErrorMsg = "";
        }
      },
    },
  },
  created() {
    axios({
      url: `${this.$store.state.domain}Member/MemberCenter/${UserId}`,
      method: "Get",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      response = response.data;
      var member = response.data.member;
      console.log(response.data);
      var profile = {
        Name: member.name,
        Mail: member.mail,
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
    });
  },
  mounted: function () {
    this.totalRows = this.history.length;
  },
  methods: {
    change: function () {
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
    info: function (item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    onFiltered: function (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    removeWish:function(wid){
      var index = this.wishlist.findIndex(x => x.wid == wid);
      console.log(index);
      this.wishlist.splice(index,1);
      console.log(this.wishlist)
       axios
          .post(`${this.$store.state.domain}Member/RemoveWish/${wid}`)
          .then((res) =>{
            res = res.data;
            console.log(res);
          })
  },
  addcart:function(pid){
    console.log(pid)
    this.$store.commit('addToCart' ,pid);
  },
    sendNewProfile: function () {
      var input = document.getElementsByClassName("input");
      var isnull;
      for (var i = 0; i < input.length; i++) {
        if (input[1].classList.contains("is-invalid") == false) {
          isnull = false;
        } else {
          isnull = true;
        }
      }
      if (isnull == false) {
        let json = {
          Id: UserId,
          Name: this.inputData.Name,
          Mail: this.inputData.Mail,
          Phone: this.inputData.Phone,
          Postcode: this.inputData.Postcode,
          Address: this.inputData.Address,
        };
        console.log(json);
        axios
          .post(`${this.$store.state.domain}Member/PostMember`, json)
          .then((res) => {
            res = res.data;
            console.log(res);

            let newprofile = {
              Name: res.data.name,
              Mail: res.data.mail,
              Birthday: res.data.birthday.split('T')[0],
              Phone: res.data.phone,
              Postcode: res.data.postCode,
              Address: res.data.address,
            };
            this.inputData = newprofile;
            this.Checkselected = false;
          });
      }
    },
    
  },
 
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>