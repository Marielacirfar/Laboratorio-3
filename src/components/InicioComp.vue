<template>
  
    <div class="tablas">
      <div class="titulo">
        <h1 >CyptoMar <img class="logo" src="../assets/crypto.png" /></h1>
        <h2>Las distintas agencias de Cryptoya para comparar precios</h2>

      </div>
      
      
      <table class= "table table-secondary table-hover border-light">
        <thead>
              <tr>
                <th scope="col">Bitcoin  <img class="logocript" src="../assets/bitcoin.png"/></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Precio de Venta</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeBtc of exchangesBtc" :key="exchangeBtc.id">
        <tr>
      
          <td>{{exchangeBtc.exchangeBtc.charAt(0).toUpperCase() + exchangeBtc.exchangeBtc.slice(1)}}</td>
          <td>AR$ {{Number(exchangeBtc.ask).toLocaleString()}}</td>
          <td>AR$ {{Number(exchangeBtc.bid).toLocaleString()}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-secondary table-hover border-light">
            <thead>
              <tr>
                <th scope="col"> Ethereum  <img class="logocript" src="../assets/eth.png"/></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Precio de Venta</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeEth of exchangesEth" :key="exchangeEth.id">
        <tr>
      
          <td>{{exchangeEth.exchangeEth.charAt(0).toUpperCase() + exchangeEth.exchangeEth.slice(1)}}</td>
          <td>AR$ {{Number(exchangeEth.ask).toLocaleString()}}</td>
          <td>AR$ {{Number(exchangeEth.bid).toLocaleString()}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-secondary table-hover border-light">
              <thead>
                <tr>
                  <th scope="col"> DAI <img class="logocript" src="../assets/dai.jpg"/></th>
            <th scope="col">Precio de Compra</th>
            <th scope="col">Sale Price</th>
          </tr>
        </thead>
        <tbody class="table-group-divider " v-for="exchangeDai of exchangesDai" :key="exchangeDai.id">
          <tr>
        
            <td>{{exchangeDai.exchangeDai.charAt(0).toUpperCase() + exchangeDai.exchangeDai.slice(1)}}</td>
            <td>AR$ {{Number(exchangeDai.ask).toLocaleString()}}</td>
            <td>AR$ {{Number(exchangeDai.bid).toLocaleString()}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-secondary table-hover border-light">
              <thead>
                <tr>
                  <th scope="col">Tether (USDT)  <img class="logocript" src="../assets/usdt.png"/></th>
            <th scope="col">Precio de Compra</th>
            <th scope="col">Precio de Venta</th>
          </tr>
        </thead>
        <tbody class="table-group-divider " v-for="exchangeUsdt of exchangesUsdt" :key="exchangeUsdt.id">
          <tr>
        
            <td>{{exchangeUsdt.exchangeUsdt.charAt(0).toUpperCase() + exchangeUsdt.exchangeUsdt.slice(1)}}</td>
            <td>AR$ {{Number(exchangeUsdt.ask).toLocaleString()}}</td>
            <td>AR$ {{Number(exchangeUsdt.bid).toLocaleString()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
   
    </template>
    <script>
    import axios from "axios"
    
    export default {
        name: "BtcService",
        data() {
            return {
              exchangesBtc: null,
              exchangesEth: null,
              exchangesDai: null,
              exchangesUsdt: null,
            }
        },
      async mounted() {
          const optionsBtc = {
            method: 'GET',
            url: 'https://criptoya.com/api/btc/ars/0.1',
          };
          
          axios.request(optionsBtc).then(response => {
            this.exchangesBtc = Object.keys(response.data).map((exchangeBtc) => (
                  {
                    exchangeBtc,
                    bid: response.data[exchangeBtc].totalBid,
                    ask: response.data[exchangeBtc].totalAsk,
                  }));
          }).catch(function (error) {
            console.error(error);
          });
    
          const optionsEth = {
            method: 'GET',
            url: 'https://criptoya.com/api/Eth/ars/0.1',
          };
          
          axios.request(optionsEth).then(response => {
            this.exchangesEth = Object.keys(response.data).map((exchangeEth) => (
                  {
                    exchangeEth,
                    bid: response.data[exchangeEth].totalBid,
                    ask: response.data[exchangeEth].totalAsk,
                  }));
          }).catch(function (error) {
            console.error(error);
          });
          const optionsDai = {
            method: 'GET',
            url: 'https://criptoya.com/api/Dai/ars/0.1',
          };
          
          axios.request(optionsDai).then(response => {
            this.exchangesDai = Object.keys(response.data).map((exchangeDai) => (
                  {
                    exchangeDai,
                    bid: response.data[exchangeDai].totalBid,
                    ask: response.data[exchangeDai].totalAsk,
                  }));
          }).catch(function (error) {
            console.error(error);
          });
    
          const optionsUsdt = {
            method: 'GET',
            url: 'https://criptoya.com/api/Usdt/ars/0.1',
          };
          
          axios.request(optionsUsdt).then(response => {
            this.exchangesUsdt = Object.keys(response.data).map((exchangeUsdt) => (
                  {
                    exchangeUsdt,
                    bid: response.data[exchangeUsdt].totalBid,
                    ask: response.data[exchangeUsdt].totalAsk,
                  }));
          }).catch(function (error) {
            console.error(error);
          });
        },
        
        
    }
    
    
    
    </script>
<style scoped>
.titulo{
    padding: 20px 0 10px 0;
    margin: 20px 0 20px 0;
    background-color: rgba(246, 217, 217, 0.932);
    color: rgb(38, 93, 38);

}

.logo{
    height: 30px;
    width: 30px;
   
}
.logocript{
  height: 30px;
  width: 30px;
}

img{
    height: 20px;
    width: 20px;
}
.tablas{
  background-color: black;
}
</style>