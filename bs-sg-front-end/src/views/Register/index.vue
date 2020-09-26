<script>
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs/index.vue";

export default {
  name: "Register",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      AddVerify: true,
      checkSelect: false,
      inputData: {
        Name: "",
        Email: "",
        Password: "",
        CheckPassword: "",
        Birthday: "",
        Phone: "",
        Postcode: "",
        Address: "",
      },
      checkData: {
        NameError: false,
        NameErrorMsg: "",
        EmailError: false,
        EmailhErrorMsg: "",
        PasswordError: false,
        PasswordErrorMsg: "",
        CheckPasswordError: false,
        CheckPasswordErrorMsg: "",
        BirthError: false,
        BirthErrorMsg: "",
        PhoneError: false,
        PhoneErrorMsg: "",
        PostcodeError: false,
        PostcodeErrorMsg: "",
        AddressError: false,
        AddressErrorMsg: "",
      },
    };
  },
  watch: {
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
    "inputData.Email": {
      immediate: true,
      handler: function () {
        let EmailReg = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
        if (!EmailReg.test(this.inputData.Email)) {
          this.checkData.EmailError = true;
          this.checkData.EmailErrorMsg = "Please enter the complete email.";
        } else {
          this.checkData.EmailError = false;
          this.checkData.EmailErrorMsg = "";
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
    "inputData.Birthday": {
      immediate: true,
      handler: function () {
        if (this.inputData.Birthday == "") {
          this.checkData.BirthdayError = true;
          this.checkData.BirthdayErrorMsg = "Please select birthday";
        } else {
          this.checkData.BirthdayError = false;
          this.checkData.BirthdayErrorMsg = "";
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
        if (this.inputData.Address.length < 10) {
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
  methods: {
    change: function () {
      if (this.checkSelect == true) {
        this.checkSelect = false;
        console.log(`this.checkSelect:${this.checkSelect}`)
      } else {
        this.checkSelect = true;
        console.log(`this.checkSelect:${this.checkSelect}`)
      }
    },
    RegisterIn: function () {
      var input = document.getElementsByClassName("input");
      var isnull;
      for (var i = 0; i < input.length; i++) {
        if (input[1].classList.contains("is-invalid") == false) {
          isnull = false;
        } else {
          isnull = true;
        }
      }

      if (this.checkSelect == true) {
        if (isnull == false) {
          let json = {
            Id: "",
            Name: this.inputData.Name,
            Password: this.inputData.Password,
            Mail: this.inputData.Email,
            Birthday: this.inputData.Birthday,
            PostCode: this.inputData.Postcode,
            Address: this.inputData.Address,
            Phone: this.inputData.Phone,
          };
          console.log(json);

          axios({
            url: `${this.$store.state.domain}Member/RegisterMember`,
            method: "post",
            data: JSON.stringify(json),
          }).then((response) => {
            console.log(response);
          });
        } else {
          alert("Please complete the form.");
        }
      } else {
        alert(
          "Please confirm whether you agree to the membership terms carefully"
        );
      }
    },
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>