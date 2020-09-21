<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      Products: [
        {
          pid: "",
          name: "",
          img: "",
          price: "",
        },
      ],
    };
  },
  mounted: function () {
    let self = this;
    axios({
      url:`${this.$store.state.domain}Product/NewestSimpleProduct/8`,
      method: "Get",
    }).then((res) => {
      let response = res.data;
      console.log(response);

      if (response.isSuccess) {
        self.Products = response.data;
      }
    });
  },
  updated: function(){
    console.log('Home updated');
    this.InitAnime();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>