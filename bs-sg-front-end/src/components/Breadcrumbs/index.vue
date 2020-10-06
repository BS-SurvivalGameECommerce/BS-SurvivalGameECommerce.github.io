<template >
    <div>
        <p class="breadcrumbs mb-0" v-if="breadcrums">
            <span class="mr-2" v-for="(b ,i) in breadcrums" :key="i">
                <router-link :to="b.path" v-if="i != breadcrums.length - 1">
                    {{b.name}}
                    <i class="fa fa-chevron-right"></i>
                </router-link>
                <span v-else>
                    {{b.name}}
                    <!-- <i class="fa fa-chevron-right"></i> -->
                </span>
            </span>
        </p>
    </div>
</template>
<script>
export default {
  name: "Breadcrumbs",
  props: {
    Alias: Object,
  },
  data(){
      return {
          currentPath: ""
      }
  },
  computed:{
      breadcrums: function(){
          let currentPath = this.$route.path;
        //   for (let p in this.$route.params) {
        //         let item = this.$route.params[p];
        //         currentPath = currentPath.replace(item ,'');
        //   }

          let result = ['Home'].concat(currentPath.split('/').filter(x => x)).map((x ,i ,a) => {
              if(this.Alias){
                let replaceText =  this.Alias[x];
                return {
                    name: replaceText ?  replaceText : x,
                    path: replaceText ? `/${a.slice(1 ,i+1).join('/')}`.replace(x ,replaceText) :`/${a.slice(1 ,i+1).join('/')}`
                }
              }
              else{
                return {
                    name: x,
                    path: `/${a.slice(1 ,i+1).join('/')}`
                }                  
              }

          });
          console.log('breadcrums: ' ,result);
          return result;
      }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumbs{
    position: relative;
    z-index: 100;
}
</style>