<template>
  <div class="home">
    <NavBar />
    <RegistroComponent />
    <InicioComp />


  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import InicioComp from "../components/InicioComp.vue"
import RegistroComponent from "@/components/RegistroComponent.vue";


export default {
  name: 'HomeView',
  components: {
    NavBar,
    RegistroComponent,
    InicioComp


  }
}
</script>

