
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
      url:
        "https://sgwebapi-core.azurewebsites.net/Product/NewestSimpleProduct/8",
      method: "Get",
    }).then((res) => {
      let response = res.data;
      console.log(response);
      console.log('this :' ,this.Products);
      if (response.isSuccess) {
        self.Products = response.data;
      }
    });
  },
  updated: function () {
    contentWayPoint();
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>