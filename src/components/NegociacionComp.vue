<template>
    <div>
        <div>
            <button type="button"
                :class="{ 'btn btn-primary': action === 'compra', 'btn btn-outline-primary': action !== 'compra' }"
                @click="cambiarAccion('compra')">Compra</button>
            <br>
            <br>
            <br>
            <button type="button"
                :class="{ 'btn btn-primary': action === 'venta', 'btn btn-outline-primary': action !== 'venta' }"
                @click="cambiarAccion('venta')">Venta</button>
            <br>
            <br>
            <br>
            <button type="button" @click="realizarTransaccion" class="btn btn-outline-dark" :disabled="action === ''">{{
                cryptos['Ethereum'] }}</button>

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
            cryptoCode: "usdt",
            cryptoAmount: "2",
            money: "2500",
            cryptos: {
                "Bitcoin": "btc",
                "Ethereum": "eth"
            },
        }
    },
    methods: {
        cambiarAccion(accion) {
            this.action = accion;
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
                let action = ""
                if (this.$data.action == 'compra') {
                    action = 'purchase'
                } else if (this.$data.action == 'venta') {
                    action = 'sale'
                }
                let body = {
                    "user_id": this.$data.userId,
                    "action": action,
                    "crypto_code": this.$data.cryptoCode,
                    "crypto_amount": this.$data.cryptoAmount,
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
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        },
    }
}

</script>
<style scoped></style>