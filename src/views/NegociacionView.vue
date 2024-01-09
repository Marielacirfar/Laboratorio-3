<template>
    <div class="negociacion">
     <NavBar/>
     <NegociacionComp/>
    <h1>{{ this.$store.state.userEmail }}</h1>
     
    </div>
  </template>
  
  <script>
 
  import NegociacionComp from "../components/NegociacionComp.vue"
  import NavBar from "../components/NavBar.vue"
  
  
  export default {
    name: 'NegociacionView',
    components: {
      NegociacionComp,
      NavBar 
    }
  }
  </script>