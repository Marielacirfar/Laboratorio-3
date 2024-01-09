// import Vue from 'vue';
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    userEmail: localStorage.getItem('userEmail') || '', // This is where the user email will be stored
  },
  mutations: {
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail; // Update the user email in the store
      localStorage.setItem('userEmail', userEmail)
    },
  },
  actions: {},
  modules: {},
});
