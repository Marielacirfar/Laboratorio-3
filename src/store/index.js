
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    nombreUsuario: localStorage.getItem('nombreUsuario') || '',
    historialTransacciones: [],


  },
  mutations: {
    setNombreUsuario(state, nombreUsuario) {
      state.nombreUsuario = nombreUsuario;
      localStorage.setItem('nombreUsuario', nombreUsuario)
    },
    agregarTransaccion(state, transaccion) {
      state.historialTransacciones.push(transaccion);

    }


  },
  actions: {},
  modules: {},
});
<style>
</style>