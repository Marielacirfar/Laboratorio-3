<template>
    <div>
        <h1 class="h1">Estado financiero actual de: {{ userId }}</h1>
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Disponibilidad</th>
                        <th>Valor en ARS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(balance, index) in balances" :key="index">
                        <td>{{ balance.crypto_code }}</td>
                        <td>{{ balance.crypto_amount }}</td>
                        <td>{{ balance.money }}</td>
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
            totalObtenido: 0,
            investments: []
        }
    },
    created() {
        this.obtenerEstadoFinanciero()

    },
    methods: {
        async obtenerEstadoFinanciero() {
            try {
                const historial = await cryptoService.getTransaccionesUsuario()
                const balancesMap = new Map()

                historial.forEach(transaction => {
                    if (transaction.action === 'purchase') {
                        if (balancesMap.has(transaction.crypto_code)) {
                            balancesMap.set(transaction.crypto_code, balancesMap.get(transaction.crypto_code) + parseFloat(transaction.crypto_amount))
                        } else {
                            balancesMap.set(transaction.crypto_code, parseFloat(transaction.crypto_amount))
                        }
                    } else if (transaction.action === 'sale') {
                        if (balancesMap.has(transaction.crypto_code)) {
                            balancesMap.set(transaction.crypto_code, balancesMap.get(transaction.crypto_code) - parseFloat(transaction.crypto_amount))
                        } else {

                            balancesMap.set(transaction.crypto_code, -parseFloat(transaction.crypto_amount))
                        }
                    }
                })

                const balances = []
                for (const [crypto_code, crypto_amount] of balancesMap) {
                    const price = await this.getCryptoInfo(crypto_code, 'venta')
                    const money = parseFloat(crypto_amount) * parseFloat(price)
                    balances.push({ crypto_code, crypto_amount, money })
                }

                this.balances = balances
            } catch (err) {
                console.log("Error recuperando el historial de usuario", err)
            }
        },
        async getCryptoInfo(crypto, action) {
            try {
                const response = await cryptoService.getCryptoInfo(crypto, action)
                return response;
            } catch (error) {
                console.error('Error al obtener información de la criptomoneda:', error);
                throw error;
            }
        }
    }
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