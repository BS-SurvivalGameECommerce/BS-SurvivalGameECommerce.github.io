<script>
import axios from "axios";
export default {
    name: 'LoginComponent',
    data(){
        return {
            AddVerify: true,
            inputData:{
                Email:"",
                Password:""
            },
            checkData:{
                EmailError: false,
                EmailhErrorMsg: '',
                PasswordError: false,
                PasswordErrorMsg: ''
            }
        }
    },
    watch:{
        'inputData.Email': {
            immediate: true,
            handler: function () {
                let EmailReg = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
                if (!EmailReg.test(this.inputData.Email)) {
                    this.checkData.EmailError = true;
                    this.checkData.EmailErrorMsg = "Please enter the complete email."
                }
                else {
                    this.checkData.EmailError = false;
                    this.checkData.EmailErrorMsg = "";
                }
            }
        },
        'inputData.Password': {
            immediate: true,
            handler: function () {
                let passwordReg = new RegExp("^(?=.{8,35})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
                if (!passwordReg.test(this.inputData.Password)) {
                    this.checkData.PasswordError = true;
                    this.checkData.PasswordErrorMsg = "Password length is between 8-35 uppercase and lowercase English digits"
                }
                else {
                    this.checkData.PasswordError = false;
                    this.checkData.PasswordErrorMsg = "";
                }
            }
        },
    },
    methods:{
        // Remeber(){
        //     if($('#ckb').is(':checked')){
        //         let datenow = new Date();
        //         let overtime = datenow + 30
        //         document.cookie = `UserID = ${userID}; path=/ expires=${overtime};`;
        //         document.cookie = `Email = ${email}; path=/; expires=${overtime};`;
        //     }else{
        //         let datenow = new Date();
        //         document.cookie = `UserID = ${userID}; path=/ expires=${datenow};`;
        //         document.cookie = `Email = ${email}; path=/; expires=${datenow};`;
        //     }
                
        // },

        LogIn(){
            var account ={
                Mail:this.inputData.Email,
                Password:this.inputData.Password
            } 
            // $.ajax({
            //     type: "POST",
            //         url: "https://localhost:44306/Member/Login",
            //         contentType: 'application/JSON',
            //         dataType:'json',
            //         data: JSON.stringify(account),
            //         success: function (e) {
            //             alert(e.data)
            //             console.log(e)
            //         }
            // });
            axios
                .post(`${this.$store.state.domain}Member/Login`, account)
                .then(res => {
                    console.log(res.data);
                    localStorage.setItem('LoginToken', res.data.data.token);
                    this.$store.commit('setProfile',res.data.data);
                });
        }
    }    
}
</script>
<template src = "./template.html">
</template>
<style src="./icon-font.min.css" ></style>
<style src="./style.css"></style>
<style src="./util.css" ></style>
