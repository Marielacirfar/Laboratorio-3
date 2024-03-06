<template>
    <div>
        <h1>Estado Financiero de: {{ userId }}</h1>
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Disponibilidad</th>
                        <th>Resultado obtenido</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(crypto, index) in cryptos" :key="index">
                        <td>{{ crypto.cryptoCode }}</td>
                        <td>{{ crypto.disponibilidad }}</td>
                        <td> $ {{ crypto.totalMoney }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Total: $ {{ totalMoney }}</h2>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            userId: this.$store.state.nombreUsuario,
        }
    },
    computed: {
        ...mapState(['historialTransacciones']),


        groupedTransactions() {
            return this.historialTransacciones.reduce((grouped, transaccion) => {
                const { cryptoCode } = transaccion;
                if (!grouped[cryptoCode]) {
                    grouped[cryptoCode] = [];
                }
                grouped[cryptoCode].push(transaccion);
                return grouped;
            }, {});
        },

        // Calcular el dinero neto para cada criptomoneda
        cryptos() {
            const netCryptos = [];
            for (const cryptoCode in this.groupedTransactions) {
                const transactions = this.groupedTransactions[cryptoCode];
                let totalMoney = 0;
                let totaDisponibilidad = 0;
                transactions.forEach(transaccion => {
                    if (transaccion.action === 'compra') {
                        totaDisponibilidad += parseFloat(transaccion.cryptoAmountCompra);
                        totalMoney += transaccion.totalAsk;
                    } else if (transaccion.action === 'venta') {
                        totaDisponibilidad -= parseFloat(transaccion.cryptoAmountVenta);
                        totalMoney -= transaccion.totalBid;
                    }
                });
                netCryptos.push({
                    cryptoCode,
                    disponibilidad: totaDisponibilidad.toFixed(3), // Ajustar la precisión según sea necesario
                    totalMoney: totalMoney.toFixed(2) // Ajustar la precisión según sea necesario
                });
            }
            return netCryptos;
        },

        // Calcular el dinero total
        totalMoney() {
            return this.cryptos.reduce((total, crypto) => total + parseFloat(crypto.totalMoney), 0).toFixed(2);
        }
    }
};
</script>

<style>
/* Estilos CSS según sea necesario */
</style>