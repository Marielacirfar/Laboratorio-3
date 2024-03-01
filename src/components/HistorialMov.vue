<template>
    <div>
        <h1>Historial de movimiento de {{ userId }}</h1>
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Cryptomoneda</th>
                        <th>Acción</th>
                        <th>Cantidad</th>
                        <th>Disponibilidad</th>
                        <th>Precio </th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaccion, index) in historialTransacciones" :key="index">
                        <td>{{ transaccion.cryptoCode }}</td>
                        <td>{{ transaccion.action }}</td>
                        <td>{{ transaccion.action === 'compra' ? transaccion.cryptoAmountCompra :
                            transaccion.cryptoAmountVenta }}</td>
                        <td>"{{ transaccion.disponibilidad }}"</td>
                        <td>{{ transaccion.action === 'compra' ? transaccion.totalAsk : transaccion.totalBid }}</td>
                        <td>{{ transaccion.datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: "HistorialMov",

    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            historial: [],

        }


    },
    computed: {
        ...mapState(['historialTransacciones'])
    }


}

</script>

