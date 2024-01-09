<template>
    <div class="historial">
     <NavBar/>
     <HistorialMov/>
     
     
    </div>
  </template>
  
  <script>
 
 
  import NavBar from "../components/NavBar.vue"
  import HistorialMov from "@/components/HistorialMov.vue";
  
  
  export default {
    name: 'HistorialView',
    components: {

    HistorialMov,
    NavBar,
}
  }
  </script>