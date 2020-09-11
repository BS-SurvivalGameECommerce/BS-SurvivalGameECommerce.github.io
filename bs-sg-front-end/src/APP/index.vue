<script>
export default {
  mounted: function () {
    console.log("mounted");

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "../assets/javaScript/main.js");
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>