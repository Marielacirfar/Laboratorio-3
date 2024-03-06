<template>
    <div>
        <h1 class="h1">Historial de movimiento de {{ userId }}</h1>
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
                        <th>Acciones</th>
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
                        <td> <!-- Botones de acción -->
                            <button @click="leerTransaccion(transaccion._id)">Leer</button>

                            <button @click="editarTransaccion(transaccion._id)">Editar</button>
                            <button @click="borrarTransaccion(transaccion._id)">Borrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="transaccionSeleccionada">
            <h2>Detalle de la transacción seleccionada</h2>
            <p><strong>Id</strong>{{ transaccionSeleccionada._id }}</p>
            <p><strong>Cryptomoneda</strong>{{ transaccionSeleccionada.cryptoCode }}</p>
            <p><strong>Accion</strong>{{ transaccionSeleccionada.action }}</p>
            <p><strong>Cantidad</strong>{{ transaccionSeleccionada.cryptoAmount }}</p>
            <p><strong>Disponibilidad</strong>{{ transaccionSeleccionada.disponibilidad }}</p>
            <p><strong>Precio</strong>{{ transaccionSeleccionada.money }}</p>
            <p><strong>Id</strong>{{ transaccionSeleccionada.datetime }}</p>


        </div>
        <button @click="irEstadoActual" class="btn btn-primary">
            Ver Estado Financiero actualizado
        </button>
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';
import { mapState } from 'vuex';

export default {
    name: "HistorialMov",

    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            historial: [],
            transaccionSeleccionada: null


        }


    },
    methods: {
        async leerTransaccion(id) {
            try {
                const transaccion = await cryptoService.leerTransaccion(id);
                this.transaccionSeleccionada = transaccion;
                console.log('transaccion leida', transaccion)
            } catch (error) {
                console.log('error al leer la transaccion seleccionada', error)
            }
        },
        async editarTransaccion(id) {
            try {
                // Obtener los detalles de la transacción actual
                const transaccion = await cryptoService.leerTransaccion(id);

                // Mostrar un formulario de edición con los datos actuales de la transacción
                // y permitir al usuario modificarlos
                const nuevaTransaccion = {
                    _id: transaccion._id,
                    crypto_code: transaccion.crypto_code,
                    action: transaccion.action,
                    crypto_amount: transaccion.crypto_amount,
                    money: transaccion.money,
                    datetime: transaccion.datetime
                    // Agrega más campos si es necesario
                };

                // Ejemplo de cómo mostrar un diálogo modal de edición (puedes usar tu propia implementación)
                // Por ejemplo, utilizando una librería de componentes como BootstrapVue, Vuetify, etc.
                this.mostrarFormularioEdicion(nuevaTransaccion);
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
        },

        mostrarFormularioEdicion(transaccion) {
            // Aquí implementarías la lógica para mostrar un formulario de edición
            // con los datos actuales de la transacción
            // y permitir al usuario modificarlos
            // Puedes utilizar un componente modal, un formulario en la misma página, etc.
            console.log('Mostrar formulario de edición', transaccion);
        },
        async borrarTransaccion(id) {
            try {
                await cryptoService.borrarTransaccion(id);
                console.log('Transacción borrada correctamente');
                // Actualizar el historial de transacciones en el frontend si es necesario
            } catch (error) {
                console.error('Error al borrar la transacción', error);
            }
        },
        irEstadoActual() {

            this.$router.push({ name: 'EstadoActual' });
        }

    },


    computed: {
        ...mapState(['historialTransacciones'])
    }


}

</script>

<style scoped></style>
