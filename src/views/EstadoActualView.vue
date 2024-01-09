<template>
    <div class="estadoActual">
     <NavBar/>
     <EstadoActual/>
     
     
    </div>
  </template>
  
  <script>
 
  
  import NavBar from "../components/NavBar.vue"
  import EstadoActual from "@/components/EstadoActual.vue";
  
  
  export default {
    name: 'NegociacionView',
    components: {
    EstadoActual,
    NavBar,
    
}
  }
  </script>