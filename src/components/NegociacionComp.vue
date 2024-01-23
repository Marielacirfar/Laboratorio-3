<template>
    <div>
        <div>
            <h1 class="h1">Ya te registraste: {{ userId }} hora de negociar</h1>
        </div>

        <div class="row">

            <div class="col-12 col-md-4">
                <form @submit.prevent="registrarProyecto">
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
                </form>
            </div>

            <div class="col-12 col-md-4 mx-auto">
                <div class="card" style="width: 25rem;">
                    <img :src="cryptoImage" :key="cryptoImage" class="card-img-top" alt="Crypto Image">
                    <div class="card-body">
                        <h5 class="card-title">{{ action }}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            La cantidad {{ action }} de: {{ cryptoCode }} es: {{ action === 'compra' ? cryptoAmountCompra :
                                cryptoAmountVenta }}
                        </li>
                        <li class="list-group-item">El precio pagado es: {{ money }}</li>
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
                        <th>Precio de compra</th>
                        <th>Precio de venta</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaccion, index) in historialTransacciones" :key="index">
                        <td>{{ transaccion.cryptoCode }}</td>
                        <td>{{ transaccion.action }}</td>
                        <td>{{ transaccion.action === 'venta' ? '-' : transaccion.cryptoAmountCompra }}</td>
                        <td>{{ transaccion.action === 'compra' ? '-' : transaccion.cryptoAmountVenta }}</td>
                        <td>"-"</td>
                        <td>{{ transaccion.money }}</td>
                        <td>{{ transaccion.money }}</td>
                        <td>{{ transaccion.datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  



<script>
import axios from 'axios';

export default {
    name: "NegociacionComp",
    data() {
        return {
            userId: this.$store.state.userEmail,
            action: "",
            cryptoCode: "",
            cryptoAmount: "",
            cryptoAmontCompra: "",
            cryptoAmountVenta: "",
            money: "2500",
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
        cambiarAccion(accion) {
            this.action = accion;


            const tipo = this.action === 'compra' ? this.tipoCompra : this.tipoVenta;
            if (tipo) {
                this.cryptoCode = this.cryptos[tipo];
            } else {
                this.cryptoCode = '';
            }
            console.log("acá gil", this.action)
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
                if (this.$data.action == 'compra') {
                    action = 'purchase';
                    cryptoAmount = this.cryptoAmountCompra
                } else if (this.$data.action == 'venta') {
                    action = 'sale'
                    cryptoAmount = this.cryptoAmountVenta
                }
                let body = {
                    "user_id": this.$data.userId,
                    "action": action,
                    "crypto_code": this.$data.cryptoCode,
                    "crypto_amount": cryptoAmount,

                    "money": this.$data.money,
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
                    money: this.money,
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

            const tipo = this.action === 'compra' ? this.tipoCompra : this.tipoVenta;


            if (tipo === 'Bitcoin (BTC)') {
                return require('../assets/Bitcoin(BTC).png');
            } else if (tipo === 'Ethereum (ETH)') {
                return require('../assets/Ethereum(ETH).png');
            } else if (tipo === 'Tether (USDT)') {
                return require('../assets/Tether(USDT).png');
            } else if (tipo === 'Dai') {
                return require('../assets/Dai.jpg');
            } else {

                return require('../assets/crypto.png');
            }
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