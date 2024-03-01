<template>
  <div class="tablas">
    <div class="titulo">
      <h1>CyptoMar <img class="logo" src="../assets/crypto.png" /></h1>
      <h2>Las distintas agencias de Cryptoya para comparar precios</h2>

    </div>


    <table class="table text-light table-hover border-light">
      <thead>
        <tr class="encabezado">
          <th scope="col">Bitcoin <img class="logocript" src="../assets/Bitcoin(BTC).png" /></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Precio de Venta</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeBtc of exchangesBtc" :key="exchangeBtc.id">
        <tr>

          <td>{{ exchangeBtc.exchangeBtc.charAt(0).toUpperCase() + exchangeBtc.exchangeBtc.slice(1) }}</td>
          <td>AR$ {{ Number(exchangeBtc.ask).toLocaleString() }}</td>
          <td>AR$ {{ Number(exchangeBtc.bid).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table text-light table-hover border-light">
      <thead>
        <tr class="encabezado">
          <th scope="col"> Ethereum <img class="logocript" src="../assets/Ethereum(ETH).png" /></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Precio de Venta</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeEth of exchangesEth" :key="exchangeEth.id">
        <tr>

          <td>{{ exchangeEth.exchangeEth.charAt(0).toUpperCase() + exchangeEth.exchangeEth.slice(1) }}</td>
          <td>AR$ {{ Number(exchangeEth.ask).toLocaleString() }}</td>
          <td>AR$ {{ Number(exchangeEth.bid).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table text-light table-hover border-lightt">
      <thead>
        <tr class="encabezado">
          <th scope="col"> DAI <img class="logocript" src="../assets/Dai.jpg" /></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Sale Price</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeDai of exchangesDai" :key="exchangeDai.id">
        <tr>

          <td>{{ exchangeDai.exchangeDai.charAt(0).toUpperCase() + exchangeDai.exchangeDai.slice(1) }}</td>
          <td>AR$ {{ Number(exchangeDai.ask).toLocaleString() }}</td>
          <td>AR$ {{ Number(exchangeDai.bid).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table text-light table-hover border-light">
      <thead>
        <tr class="encabezado">
          <th scope="col">Tether (USDT) <img class="logocript" src="../assets/Tether(USDT).png" /></th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Precio de Venta</th>
        </tr>
      </thead>
      <tbody class="table-group-divider " v-for="exchangeUsdt of exchangesUsdt" :key="exchangeUsdt.id">
        <tr>

          <td>{{ exchangeUsdt.exchangeUsdt.charAt(0).toUpperCase() + exchangeUsdt.exchangeUsdt.slice(1) }}</td>
          <td>AR$ {{ Number(exchangeUsdt.ask).toLocaleString() }}</td>
          <td>AR$ {{ Number(exchangeUsdt.bid).toLocaleString() }}</td>
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
      const firstExchangeBtc = Object.keys(response.data)[1]

      if (firstExchangeBtc) {
        this.exchangesBtc = [{
          exchangeBtc: firstExchangeBtc,
          bid: response.data[firstExchangeBtc].totalBid,
          ask: response.data[firstExchangeBtc].totalAsk
        }]
      }
    })

    const optionsEth = {
      method: 'GET',
      url: 'https://criptoya.com/api/Eth/ars/0.1',
    };

    axios.request(optionsEth).then(response => {

      const firstExchangeEth = Object.keys(response.data)[1];


      if (firstExchangeEth) {
        this.exchangesEth = [{
          exchangeEth: firstExchangeEth,
          bid: response.data[firstExchangeEth].totalBid,
          ask: response.data[firstExchangeEth].totalAsk,
        }]
      }

    })
    const optionsDai = {
      method: 'GET',
      url: 'https://criptoya.com/api/Dai/ars/0.1',
    };

    axios.request(optionsDai).then(response => {
      const firstExchangeDai = Object.keys(response.data)[1];
      if (firstExchangeDai) {
        this.exchangesDai = [{
          exchangeDai: firstExchangeDai,
          bid: response.data[firstExchangeDai].totalBid,
          ask: response.data[firstExchangeDai].totalAsk,

        }]

      }

    });

    const optionsUsdt = {
      method: 'GET',
      url: 'https://criptoya.com/api/Usdt/ars/0.1',
    };

    axios.request(optionsUsdt).then(response => {
      const firstExchangeUsdt = Object.keys(response.data)[1];
      if (firstExchangeUsdt) {
        this.exchangesUsdt = [{
          exchangeUsdt: firstExchangeUsdt,
          bid: response.data[firstExchangeUsdt].totalBid,
          ask: response.data[firstExchangeUsdt].totalAsk
        }]
      }

    });


  }
}



</script>
<style scoped>
.titulo {
  padding: 20px 0 10px 0;
  margin: 20px 0 20px 0;
  text-align: center;
  border: 2px solid rgb(110, 103, 103);
  box-shadow: 0px 0px 10px 0px #f2eeee inset;
  padding: 5px;
  color: aliceblue;


}

body {
  background-color: black;
}



.logo {
  height: 30px;
  width: 30px;

}

.logocript {
  height: 30px;
  width: 30px;
  background-color: wheat;
  border-radius: 50%;
}

img {
  height: 20px;
  width: 20px;
}

.encabezado {
  background-color: rgb(71, 60, 60);
}

.tablas {
  background-color: black;
}
</style>