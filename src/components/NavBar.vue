<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">CyptoMar <img src="../assets/crypto.png" /></a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text-black">


          <li><router-link to="./NegociacionComp" class="nav-link px-2 text-black">Negociación</router-link></li>
          <li><router-link to="./HistorialMov" class="nav-link px-2 text-black">Historial de movimientos</router-link>
          </li>
          <li><router-link to="./EstadoActual" class="nav-link px-2 text-black">Estado actual</router-link></li>

        </ul>
        <div class="registro">
          <router-link type="button" v-if="$store.state.username === ''">Login</router-link>
          <p class="text-primary fw-bold  btn btn-outline-secondary " v-else>{{
            $store.state.nombreUsuario }}</p>
        </div>

      </div>
    </nav>

  </div>
</template>

<script>
export default {

  name: "NavBar",



};

</script>

<style lang="scss" scoped>
img {
  height: 1.5em;
  width: 1.5em;
}
</style>
