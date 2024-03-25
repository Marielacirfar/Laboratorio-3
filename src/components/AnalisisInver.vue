<template>
    <div>
        <h1 class="h1">Analisis de inverciones realizadas</h1>
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Criptomoneda</th>

                        <th>Total Compras</th>
                        <th>Total Ventas</th>
                        <th>Disponibilidad</th>
                        <th>Total Dinero Compras</th>
                        <th>Total Dinero Ventas</th>
                        <th>Precio Actual</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(balance, index) in balances" :key="index">
                        <td>{{ balance.crypto_code }}</td>

                        <td> {{ balance.totalCompras }}</td>
                        <td> {{ balance.totalVentas }}</td>
                        <td>{{ balance.disponibilidad.toFixed(2) }}</td>
                        <td>$ {{ balance.totalMoneyCompras }}</td>
                        <td>$ {{ balance.totalMoneyVentas }}</td>
                        <td>$ {{ balance.precioActual.toFixed(2) }}</td>
                        <td>$ {{ balance.importeResultante.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';

export default {
    name: "EstadoActual",
    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            balances: [],
        };
    },
    async created() {
        await this.obtenerEstadoActual();
    },
    methods: {
        async obtenerEstadoActual() {
            try {
                const historial = await cryptoService.getTransaccionesUsuario();
                const balancesMap = new Map();

                historial.forEach(transaction => {
                    if (transaction.action === 'purchase') {
                        if (balancesMap.has(transaction.crypto_code)) {
                            const balance = balancesMap.get(transaction.crypto_code);
                            balance.totalCompras += parseFloat(transaction.crypto_amount);
                            balance.totalMoneyCompras += parseFloat(transaction.money);
                        } else {
                            balancesMap.set(transaction.crypto_code, {
                                crypto_code: transaction.crypto_code,
                                disponibilidad: 0,
                                totalCompras: parseFloat(transaction.crypto_amount),
                                totalVentas: 0,
                                totalMoneyCompras: parseFloat(transaction.money),
                                totalMoneyVentas: 0,
                                precioActual: 0,
                                importeResultante: 0
                            });
                        }
                    } else if (transaction.action === 'sale') {
                        if (balancesMap.has(transaction.crypto_code)) {
                            const balance = balancesMap.get(transaction.crypto_code);
                            balance.totalVentas += parseFloat(transaction.crypto_amount);
                            balance.totalMoneyVentas += parseFloat(transaction.money);
                        } else {
                            balancesMap.set(transaction.crypto_code, {
                                crypto_code: transaction.crypto_code,
                                disponibilidad: 0,
                                totalCompras: 0,
                                totalVentas: parseFloat(transaction.crypto_amount),
                                totalMoneyCompras: 0,
                                totalMoneyVentas: parseFloat(transaction.money),
                                precioActual: 0,
                                importeResultante: 0
                            });
                        }
                    }
                });

                const balances = [];
                for (const [crypto_code, balance] of balancesMap) {
                    const precio = await this.getCryptoInfo(crypto_code, 'venta');
                    const disponibilidad = balance.totalCompras - balance.totalVentas;
                    const importeResultante = balance.totalMoneyVentas + disponibilidad * parseFloat(precio) - balance.totalMoneyCompras;
                    balances.push({
                        crypto_code: balance.crypto_code,
                        disponibilidad,
                        totalCompras: balance.totalCompras,
                        totalVentas: balance.totalVentas,
                        totalMoneyCompras: balance.totalMoneyCompras,
                        totalMoneyVentas: balance.totalMoneyVentas,
                        precioActual: parseFloat(precio) * disponibilidad,
                        importeResultante
                    });
                }

                this.balances = balances;
            } catch (error) {
                console.log("Error recuperando el historial de usuario", error);
            }
        },
        async getCryptoInfo(crypto, action) {
            try {
                const response = await cryptoService.getCryptoInfo(crypto, action);
                return parseFloat(response);
            } catch (error) {
                console.error('Error al obtener información de la criptomoneda:', error);
                throw error;
            }
        },
    },
};
</script>

<style scoped>
h1,
h2 {
    color: rgb(192, 175, 175);
    font-size: xx-large;
    text-shadow: 2px 2px 5px rgba(241, 234, 234, 0.906);
}
</style>