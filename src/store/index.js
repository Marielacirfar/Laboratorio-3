
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    nombreUsuario: localStorage.getItem('nombreUsuario') || '',

  },
  mutations: {
    setNombreUsuario(state, nombreUsuario) {
      state.nombreUsuario = nombreUsuario;
      localStorage.setItem('nombreUsuario', nombreUsuario)
    },


  },
  actions: {},
  modules: {},
});
<style>
</style>