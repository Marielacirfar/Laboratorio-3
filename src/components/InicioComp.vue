<template>
  <div class="tablas">
    <div class="titulo">
      <h1>CyptoMar <img class="logo" src="../assets/crypto.png" /></h1>
      <h2>Informate sobre el precio de compra y venta de las distintas Crypto</h2>
    </div>

    <div class="row">

      <div class="col-md-6">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">Bitcoin <img class="logocript" src="../assets/Bitcoin(BTC).png" /></h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeBtc of exchangesBtc" :key="exchangeBtc.id">

              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeBtc.ask).toLocaleString() }}
              </p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeBtc.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">Ethereum <img class="logocript" src="../assets/Ethereum(ETH).png" /></h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeEth of exchangesEth" :key="exchangeEth.id">

              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeEth.ask).toLocaleString() }}
              </p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeEth.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-6">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">DAI <img class="logocript" src="../assets/Dai.jpg" /></h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeDai of exchangesDai" :key="exchangeDai.id">

              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeDai.ask).toLocaleString() }}
              </p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeDai.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">Tether (USDT) <img class="logocript" src="../assets/Tether(USDT).png" />
            </h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeUsdt of exchangesUsdt" :key="exchangeUsdt.id">

              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeUsdt.ask).toLocaleString() }}
              </p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeUsdt.bid).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"

export default {
  name: "InicioComp",
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
  box-shadow: 0px 10px 10px 0px #f2eeee inset;
  padding: 5px;
  color: aliceblue;


}

body {
  background-color: black;
}

.card-title {
  color: aliceblue;
  ;
}

.card {

  border: 5px solid rgb(128, 135, 140);
  box-shadow: 0px 10px 10px 0px;

}


.logo {
  height: 50px;
  width: 50px;
  background-color: aliceblue;
  border-radius: 50%;

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
</style>