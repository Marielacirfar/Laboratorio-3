<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>

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

.h1 {
  text-align: center;
  border: 2px solid rgb(110, 103, 103);
  box-shadow: 0px 0px 10px 0px #f2eeee inset;
  padding: 10px;
  color: rgb(192, 175, 175);
  text-shadow: 2px 2px 5px rgba(241, 234, 234, 0.906);
}

nav {
  padding: 30px;

}

nav a {
  font-weight: bold;

}

nav a.router-link-exact-active {
  color: #b9dacb;
}
</style>