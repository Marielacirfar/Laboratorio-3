<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |


      <div>

      </div>
    </div>
    <router-view />

  </div>
</template>
<script>


export default {
  name: 'App',

  methods: {
    logout() {
      this.$store.commit("logout")
    }
  },
  mounted() {

  }
}
</script>

<style>
body {
  background-color: rgb(66, 60, 60);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5e9ed;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #eef0f2;
}

nav a.router-link-exact-active {
  color: #b9dacb;
}
</style>