<template src="./template.html"></template>
<style src="./style.css" scoped></style>
<script>
// import '@/assets/javaScript/jquery.min.js'
// import '@/assets/javaScript/jquery-migrate-3.0.1.min.js'
// import '@/assets/javaScript/popper.min.js'
// import '@/assets/javaScript/jquery.easing.1.3.js'
// import '@/assets/javaScript/jquery.waypoints.min.js'
// import '@/assets/javaScript/jquery.stellar.min.js'
// import '@/assets/javaScript/owl.carousel.min.js'
// import '@/assets/javaScript/jquery.magnific-popup.min.js'
// import '@/assets/javaScript/jquery.animateNumber.min.js'
// import '@/assets/javaScript/scrollax.min.js'
// import '@/assets/javaScript/main.js'

export default {
    mounted: function(){
        console.log('mounted');

        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '../assets/javaScript/main.js')
        document.head.appendChild(recaptchaScript)
    }
}
</script>

