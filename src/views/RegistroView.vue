<template>
    <div class="home">
        <NavBar/>
        <RegistroComponent/>

    </div>
</template>

<script>


import NavBar from "../components/NavBar.vue"
import RegistroComponent from '../components/RegistroComponent.vue'
    export default {
        name: "RegistroView",
        components:{
 
            RegistroComponent,
            NavBar
        }
        
    }
</script>

<style lang="scss" scoped>

</style>