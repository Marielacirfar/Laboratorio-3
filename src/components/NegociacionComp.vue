<template>
    <div>
        <div>
            <h1 class="h1">Ya te registraste: {{ userId }} hora de negociar</h1>
        </div>

        <div class="row">

            <div class="col-12 col-md-4">

                <label class="form-label text-white">Tipo de moneda que desea comprar</label>
                <select v-model.trim="tipoCompra" class="form-select" required>
                    <option disabled selected value="">Seleccione una moneda</option>
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ETH)</option>
                    <option>Tether (USDT)</option>
                    <option>Dai</option>
                </select>
                <label class="form-label text-white">Seleccione la cantidad que desea comprar</label>
                <input type="number" v-model.trim="cryptoAmountCompra">
                <button type="button"
                    :class="{ 'btn btn-primary': action === 'compra', 'btn btn-outline-primary': action !== 'compra' }"
                    @click="cambiarAccion('compra')">
                    Compra
                </button>

            </div>

            <div class="col-12 col-md-4 mx-auto">
                <div class="card" style="width: 25rem;">
                    <img :src="cryptoImage" :key="cryptoImage" class="card-img-top" alt="Crypto Image">
                    <div class="card-body">
                        <h3 class="card-title">{{ action }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            La cantidad de {{ action }} de: {{ cryptoCode }} es: {{ action === 'compra' ? cryptoAmountCompra
                                :
                                cryptoAmountVenta }}
                        </li>
                        <li class="list-group-item">El total pagado es: $ {{ action === 'compra' ? totalAsk *
                            cryptoAmountCompra :
                            totalBid * cryptoAmountVenta }}

                        </li>

                        <li class="list-group-item">Fecha {{ formatoFecha() }}</li>

                    </ul>
                </div>
            </div>

            <div class="col-12 col-md-4">
                <label class="form-label text-white">Tipo de moneda que desea vender</label>
                <select v-model.trim="tipoVenta" class="form-select" required>
                    <option disabled selected value="">Seleccione una moneda</option>
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ETH)</option>
                    <option>Tether (USDT)</option>
                    <option>Dai</option>
                </select>
                <label class="form-label text-white">Seleccione la cantidad que desea vender</label>
                <input type="number" v-model.trim="cryptoAmountVenta">
                <button type="button"
                    :class="{ 'btn btn-primary': action === 'venta', 'btn btn-outline-primary': action !== 'venta' }"
                    @click="cambiarAccion('venta')">
                    Venta
                </button>
            </div>
        </div>

        <div>
            <br>
            <br>
            <br>
            <button type="button" @click="realizarTransaccion" class="btn btn-outline-danger m-4" :disabled="action === ''">
                Realizar transacción
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Cryptomoneda</th>
                        <th>Compra/Venta</th>
                        <th>Cantidad Comprada</th>
                        <th>Cantidad Vendida</th>
                        <th>Disponibilidad</th>
                        <th>Precio pagado por la compra</th>
                        <th>Precio obtenido por la venta</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaccion, index) in historialTransacciones" :key="index">
                        <td>{{ transaccion.cryptoCode }}</td>
                        <td>{{ transaccion.action }}</td>
                        <td>{{ transaccion.action === 'venta' ? '-' : transaccion.cryptoAmountCompra }}</td>
                        <td>{{ transaccion.action === 'compra' ? '-' : transaccion.cryptoAmountVenta }}</td>
                        <td>{{ transaccion.disponibilidad }}</td>
                        <td>"{{ transaccion.action === 'venta' ? '-' : transaccion.totalAsk }}"</td>
                        <td>"{{ transaccion.action === 'compra' ? '-' : transaccion.totalBid }}"</td>
                        <td>{{ transaccion.datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  



<script>
import axios from 'axios';
import cryptoService from '../services/cryptoService'

export default {
    name: "NegociacionComp",
    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            action: "",
            cryptoCode: "",
            cryptoAmount: "",
            cryptoAmountCompra: "",
            cryptoAmountVenta: "",
            totalAsk: "",
            totalBid: "",
            money: "",
            cryptos: {
                "Bitcoin (BTC)": "BTC",
                "Ethereum (ETH)": "ETH",
                "Tether (USDT)": "USDT",
                "Dai": "DAI"
            },
            datetime: "",
            historialTransacciones: [],
        }
    },
    methods: {
        async cambiarAccion(accion) {
            this.action = accion;

            const tipo = this.action === 'compra' ? this.tipoCompra : this.tipoVenta;
            if (tipo) {
                this.cryptoCode = this.cryptos[tipo];

                if (this.action === 'compra') {
                    this.totalAsk = await cryptoService.getCryptoInfo(this.cryptoCode, 'compra');
                } else if (this.action === 'venta') {
                    this.totalBid = await cryptoService.getCryptoInfo(this.cryptoCode, 'venta');
                }
            } else {
                this.cryptoCode = '';
            }
        },

        formatoFecha() {
            const currentDate = new Date();

            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();

            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');

            const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;

            return formattedDateTime;
        },
        async realizarTransaccion() {
            try {
                const apiKey = '60eb09146661365596af552f';
                let action = "";
                let cryptoAmount = ""
                let disponibilidad = "-"
                let money = ""

                if (this.$data.action == 'venta') {
                    const cantidadComprada = this.historialTransacciones
                        .filter(transaccion => transaccion.action === 'compra' && transaccion.cryptoCode === this.$data.cryptoCode)
                        .reduce((total, transaccion) => total + parseFloat(transaccion.cryptoAmountCompra), 0);

                    if (parseFloat(this.cryptoAmountVenta) > cantidadComprada) {

                        console.error('No hay suficiente cantidad para vender');
                        return;
                    }


                    disponibilidad = cantidadComprada - parseFloat(this.cryptoAmountVenta);
                } else if (this.$data.action == 'compra') {
                    const cantidadCompradaActual = parseFloat(this.cryptoAmountCompra);
                    const cantidadCompradaTotalAnterior = this.historialTransacciones
                        .filter(transaccion => transaccion.accion === 'compra' && transaccion.cryptoCode === this.$data.cryptoCode)
                        .reduce((total, transaccion) => total + parseFloat(transaccion.cryptoAmountCompra), 0)

                    disponibilidad = cantidadCompradaActual + cantidadCompradaTotalAnterior;
                }

                if (this.$data.action == 'compra') {
                    action = 'purchase';
                    cryptoAmount = this.cryptoAmountCompra
                    money = this.totalAsk * this.cryptoAmountCompra

                } else if (this.$data.action == 'venta') {
                    action = 'sale'
                    cryptoAmount = this.cryptoAmountVenta
                    money = this.totalBid * this.cryptoAmountVenta

                }
                let body = {
                    "user_id": this.$data.userId,
                    "action": action,
                    "crypto_code": this.$data.cryptoCode,
                    "crypto_amount": cryptoAmount,
                    "money": money,
                    "datetime": this.formatoFecha()
                }
                const response = await axios.post(
                    'https://laboratorio3-f36a.restdb.io/rest/transactions',
                    body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-apikey': apiKey,
                        },
                    }
                );
                this.historialTransacciones.push({
                    cryptoCode: this.cryptoCode,
                    action: this.action,
                    cryptoAmountCompra: this.action === 'compra' ? cryptoAmount : '-',
                    cryptoAmountVenta: this.action === 'venta' ? cryptoAmount : '-',
                    totalAsk: this.action === 'compra' ? money : '-',
                    totalBid: this.action === 'venta' ? money : '-',
                    disponibilidad: disponibilidad,
                    datetime: this.formatoFecha(),
                });

                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        },


    },
    computed: {
        cryptoImage() {

            const imagenMapping = {
                BTC: require('../assets/Bitcoin(BTC).png'),
                ETH: require('../assets/Ethereum(ETH).png'),
                USDT: require('../assets/Tether(USDT).png'),
                DAI: require('../assets/Dai.jpg'),
                default: require('../assets/crypto.png')
            };
            return imagenMapping[this.cryptoCode] || imagenMapping.default;

        },
    },

}

</script>
<style scoped>
form {
    color: aliceblue;
    align-content: center;

}

.h1 {
    text-align: center;
    border: 2px solid rgb(110, 103, 103);
    box-shadow: 0px 0px 10px 0px #f2eeee inset;
    padding: 5px;
    color: aliceblue;
}

.card-title {
    color: rgb(42, 22, 22);
    font-size: xx-large;
    text-shadow: 2px 2px 5px rgba(245, 34, 34, 0.54);
}


select {

    width: 300px;
    height: 35px;
    font-size: 15px;
    border: none;
    margin: 30px 100px;
    border-radius: 20px;
    text-align: center;
}

input {
    width: 300px;
    height: 35px;
    font-size: 15px;
    border: none;
    margin: 40px;
    border-radius: 20px;
    text-align: center;

}

label {
    padding-right: 50px;
}

button {
    width: 300px;
    height: 35px;

    cursor: pointer;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background: rgb(115, 144, 237);
    border: none;


}
</style>