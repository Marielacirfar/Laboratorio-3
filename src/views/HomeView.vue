<template>
  <div class="home">
   <NavBar/>
   <InicioComp/>
   
   
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import InicioComp from "../components/InicioComp.vue"


export default {
  name: 'HomeView',
  components: {
    NavBar,
    InicioComp
    
    
  }
}
</script>
