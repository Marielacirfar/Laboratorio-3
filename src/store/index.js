// import Vue from 'vue';
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    userEmail: localStorage.getItem('userEmail') || '',
  },
  mutations: {
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
      localStorage.setItem('userEmail', userEmail)
    },
  },
  actions: {},
  modules: {},
});
<style>
</style>