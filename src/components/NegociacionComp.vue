<template>
    <div>
        <div>
            <h1 class="h1">Ya te registraste: {{ userId }} hora de negociar</h1>
        </div>

        <div class="row">
            <div class="col-md-4 mb-3">
                <label class="form-label text-white">Tipo de moneda que desea comprar</label>
                <select v-model.trim="tipoCompra" class="form-select" required>
                    <option disabled selected value="">Seleccione una moneda</option>
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ETH)</option>
                    <option>Tether (USDT)</option>
                    <option>Dai</option>
                </select>
                <label class="form-label text-white">Seleccione la cantidad que desea comprar</label>
                <input type="number" v-model.trim="cryptoAmountCompra" class="form-control">
                <button type="button"
                    :class="{ 'btn btn-primary': action === 'compra', 'btn btn-outline-primary': action !== 'compra' }"
                    @click="cambiarAccion('compra')">
                    Compra
                </button>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card">
                    <img :src="cryptoImage" :key="cryptoImage" class="card-img-top" alt="Crypto Image">
                    <div class="card-body">
                        <h3 class="card-title">{{ action }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            La cantidad de {{ action }} de: {{ cryptoCode }} es: {{ action === 'compra' ?
                cryptoAmountCompra : cryptoAmountVenta }}
                        </li>
                        <li class="list-group-item">El total pagado es: $ {{ action === 'compra' ? totalAsk *
                cryptoAmountCompra : totalBid * cryptoAmountVenta }}</li>
                        <li class="list-group-item">Fecha {{ formatoFecha() }}</li>
                    </ul>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <label class="form-label text-white">Tipo de moneda que desea vender</label>
                <select v-model.trim="tipoVenta" class="form-select" required>
                    <option disabled selected value="">Seleccione una moneda</option>
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ETH)</option>
                    <option>Tether (USDT)</option>
                    <option>Dai</option>
                </select>
                <label class="form-label text-white">Seleccione la cantidad que desea vender</label>
                <input type="number" v-model.trim="cryptoAmountVenta" class="form-control">
                <button type="button"
                    :class="{ 'btn btn-primary': action === 'venta', 'btn btn-outline-primary': action !== 'venta' }"
                    @click="cambiarAccion('venta')">
                    Venta
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 mb-3">
                <button @click="realizarTransaccion" class="btn btn-outline-danger m-4" :disabled="action === ''">
                    Realizar transacción
                </button>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Cryptomoneda</th>
                        <th>Compra/Venta</th>
                        <th>Cantidad Comprada</th>
                        <th>Cantidad Vendida</th>

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

                        <td>{{ transaccion.action === 'venta' ? '-' : transaccion.totalAsk }}</td>
                        <td>{{ transaccion.action === 'compra' ? '-' : transaccion.totalBid }}</td>
                        <td>{{ transaccion.datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="irAHistorialMov" class="btn btn-primary">Ver Historial</button>
    </div>
</template>





<script>



import cryptoService from '../services/cryptoService'

//falta ajustar la logica de la disponibilidad de venta
export default {
    name: "NegociacionComp",
    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            id: "",
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
                let action = "";
                let cryptoAmount = ""
                let money = ""


                if (this.$data.action == 'compra') {
                    action = 'purchase';
                    cryptoAmount = this.cryptoAmountCompra
                    money = this.totalAsk * this.cryptoAmountCompra
                    this.historialTransacciones.push({
                        cryptoCode: this.cryptoCode,
                        action: this.action,
                        id: this.id,
                        cryptoAmountCompra: this.action === 'compra' ? cryptoAmount : '-',
                        cryptoAmountVenta: this.action === 'venta' ? cryptoAmount : '-',
                        totalAsk: this.action === 'compra' ? money : '-',
                        totalBid: this.action === 'venta' ? money : '-',
                        datetime: this.formatoFecha(),

                    });

                } else if (this.$data.action == 'venta') {
                    action = 'sale'
                    cryptoAmount = this.cryptoAmountVenta
                    money = this.totalBid * this.cryptoAmountVenta

                    const cantidadComprada = this.historialTransacciones
                        .filter(transaccion => transaccion.cryptoCode === this.cryptoCode && transaccion.action === 'compra')
                        .reduce((total, transaccion) => total + parseFloat(transaccion.cryptoAmountCompra), 0);
                    if (parseFloat(cryptoAmount) <= cantidadComprada) {
                        this.historialTransacciones.push({
                            cryptoCode: this.cryptoCode,
                            action: this.action,
                            id: this.id,
                            cryptoAmountCompra: this.action === 'compra' ? cryptoAmount : '-',
                            cryptoAmountVenta: this.action === 'venta' ? cryptoAmount : '-',
                            totalAsk: this.action === 'compra' ? money : '-',
                            totalBid: this.action === 'venta' ? money : '-',
                            datetime: this.formatoFecha(),

                        });

                    } else {
                        alert('No hay suficiente cantidad para vender');
                        return;
                    }

                }
                let body = {
                    "user_id": this.$data.userId,
                    "id": this.$data.id,
                    "action": action,
                    "crypto_code": this.$data.cryptoCode,
                    "crypto_amount": cryptoAmount,
                    "money": money,
                    "datetime": this.formatoFecha()
                }
                await cryptoService.realizarTransaccion(body);


            } catch (error) {
                console.error('Error:', error);
            }
        },
        irAHistorialMov() {

            this.$router.push({ name: 'HistorialMov' });
        }


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



.card-title {
    color: rgb(42, 22, 22);
    font-size: xx-large;
    text-shadow: 2px 2px 5px rgba(245, 34, 34, 0.54);
}

.card-img-top {
    height: 150px;
    width: 150px;
    margin: auto;

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
    margin: 30px 100px;
    border-radius: 20px;
    text-align: center;

}

label {
    padding-right: 50px;
}

button {
    width: 300px;
    height: 35px;
    margin: 30px 100px;
    cursor: pointer;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background: rgb(115, 144, 237);
    border: none;


}
</style>