<template>
    <div class="presentacion">
        <NavBar />
        <presentacionComp />

        <presentacionComp url="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" nombre="Bitcoint" />
        <presentacionComp url="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029" nombre="Etherum" />
        <presentacionComp url="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=029" nombre="Dai" />
        <presentacionComp url="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029" nombre="USDT" />


    </div>
</template>
  
<script>



import presentacionComp from "../components/presentacionComp.vue";
import NavBar from "../components/NavBar.vue"


export default {
    name: 'PresentacionView',
    components: {

        presentacionComp,
        NavBar,
    }
}
</script>

 
<style scoped>
div {
    display: inline-block;
    text-align: center;
    border: 1px solid #f2f2f2;
    padding: 1%;
    border-radius: 5px;
    margin: 4px;
}

img {
    width: 8rem;
    height: 8rem;
    background: gray;
    padding: 0.5rem;
}
</style>