

<script>
import axios from "axios";
var url = 'https://localhost:44306/'
var UserId = "MB001"
var api = url + `Member/MemberCenter/${UserId}`

export default {
    name: "MemberCenter",
    data(){
        return{
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
      history: null,
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
        { key: "actions", label: "Actions",class: "text-center p-3" },
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
        }
    },
    create(){
         axios({
      url: api,
      method: "Get",
    }).then((response)=>{
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
      var history = [];
     
      response.data.hitory.forEach(item => {
    var object = {orderID:'',orderDate:'',status:'',paymentMethod:'', shipAddress:'',totalPrice:0, totalQuantity:0,orderDetailList:[]};
       object.orderID = item.orderID
       object.orderDate = item.orderDate.split('T')[0]
       object.status = item.status
       object.paymentMethod = item.paymentMethod
       object.shipAddress = item.shipAddress
       item.orderDetailList.forEach(product =>{
        var detail = {productId:'',productName:'',img:'',quantity:'', discount:'',unitPrice:'',totalPrice:0}
        detail.productId = product.productId
        detail.productName = product.productName
        detail.img = product.img
        detail.quantity = product.quantity
        detail.discount = product.discount
        detail.unitPrice = product.unitPrice
        detail.totalPrice = parseInt(product.quantity) * parseFloat(product.discount) * parseFloat(product.unitPrice)
        object.orderDetailList.push(detail)
        object.totalQuantity += parseInt(product.quantity)
           object.totalPrice +=  detail.totalPrice
       })
       history.push(object)
    });
      var wishlist = response.data.wishList;
      console.log(wishlist);
      console.log(profile);
      console.log(history);
      this.inputData = profile
      this.history = history
      this.wishlist = wishlist
    })
    },
    mounted: function () {
       
    this.totalRows = this.history.length;
    }
}
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>