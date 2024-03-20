<template>
  <div class="estadoActual">
    <NavBar />
    <EstadoActual />
    <analisis-inver />



  </div>
</template>

<script>


import NavBar from "../components/NavBar.vue"
import EstadoActual from "@/components/EstadoActual.vue";
import AnalisisInver from '@/components/AnalisisInver.vue';




export default {
  name: 'NegociacionView',
  components: {
    EstadoActual,
    NavBar,
    AnalisisInver,


  }
}
</script>