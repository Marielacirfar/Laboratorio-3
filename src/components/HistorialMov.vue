<template>
    <div>
        <h1 class="h1">Historial de movimiento de {{ userId }}</h1>
        <div v-if="cargando">
            <h3>Cargando</h3>
        </div>
        <div v-else>
            <div class="table-responsive">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>Cryptomoneda</th>
                            <th>Acción</th>
                            <th>Cantidad</th>
                            <th>Precio </th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaccion, index) in historial" :key="index">
                            <td>{{ transaccion.crypto_code }}</td>
                            <td>{{ transaccion.action == "purchase" ? "Compra" : "Venta" }}</td>
                            <td>{{ transaccion.crypto_amount }}</td>
                            <td>{{ transaccion.money }}</td>
                            <td>{{ transaccion.datetime }}</td>
                            <td> <!-- Botones de acción -->
                                <button @click="leerTransaccion(transaccion._id)">Leer</button>
                                <button @click="editarTransaccion(transaccion._id)">Editar</button>
                                <div v-if="eliminando[transaccion._id] != null || eliminando[transaccion._id] == true">
                                    <div class="spinner-border text-danger" role="status">
                                    </div>
                                </div>
                                <div v-else>
                                    <button @click="borrarTransaccion(transaccion._id)">Borrar</button>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="transaccionSeleccionada">
            <h2>Detalle de la transacción seleccionada</h2>
            <p><strong>Id: </strong>{{ transaccionSeleccionada._id }}</p>
            <p><strong>Cryptomoneda: </strong>{{ transaccionSeleccionada.crypto_code }}</p>
            <p><strong>Accion: </strong>{{ transaccionSeleccionada.action == "purchase" ? "Compra" : "Venta" }}</p>
            <p><strong>Cantidad: </strong>{{ transaccionSeleccionada.crypto_amount }}</p>
            <p><strong>Precio: </strong>{{ transaccionSeleccionada.money }}</p>
            <p><strong>Fecha: </strong>{{ transaccionSeleccionada.datetime }}</p>


        </div>

        <div v-if="transaccionSeleccionada && mostrandoFormularioEdicion">
            <h2>Editar transacción</h2>
            <form @submit.prevent="guardarCambios">

                <div>
                    <label for="cryptoCode">Cryptomoneda:</label>
                    <input type="text" id="cryptoCode" v-model="formularioEdicion.crypto_code" disabled>
                </div>
                <div>
                    <label for="action">Acción:</label>
                    <input type="text" id="action" v-model="formularioEdicion.action" disabled>
                </div>
                <div>
                    <label for="cryptoAmount">Cantidad:</label>
                    <input type="number" id="cryptoAmount" v-model="formularioEdicion.crypto_amount">
                </div>
                <div>
                    <label for="money">Precio:</label>
                    <input type="number" id="money" v-model="formularioEdicion.money">
                </div>
                <div>
                    <label for="datetime">Fecha:</label>
                    <input type="text" id="datetime" v-model="formularioEdicion.datetime" disabled>
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>

        <button @click="irEstadoActual" class="btn btn-primary">
            Ver Estado Financiero actualizado
        </button>
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';


export default {
    name: "HistorialMov",

    data() {
        return {
            userId: this.$store.state.nombreUsuario,
            historial: [],
            transaccionSeleccionada: null,
            cargando: true,
            eliminando: {},
            formularioEdicion: {
                _id: "",
                crypto_code: "",
                action: "",
                crypto_amount: 0,
                money: 0,
                datetime: ""
            }

        }


    },
    created() {
        this.obtenerHistorial()
    }
    ,
    methods: {
        async obtenerHistorial() {
            this.cargando = true;
            try {
                const historial = await cryptoService.getTransaccionesUsuario()
                console.log("historial: ", historial)
                this.historial = historial
            } catch (err) {
                console.log("Error recuperando el historial de usuario", err)
            } finally {
                this.cargando = false;
            }

        },

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

                const transaccion = await cryptoService.leerTransaccion(id);

                this.mostrarFormularioEdicion(transaccion);
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
        },
        async mostrarFormularioEdicion(transaccion) {
            this.transaccionSeleccionada = transaccion;
            this.formularioEdicion = {
                _id: transaccion._id,
                crypto_code: transaccion.crypto_code,
                action: transaccion.action,
                crypto_amount: transaccion.crypto_amount,
                money: transaccion.money,
                datetime: transaccion.datetime
            };
            this.mostrandoFormularioEdicion = true;
        },
        async guardarCambios() {
            try {
                await cryptoService.editarTransaccion(this.formularioEdicion._id, this.formularioEdicion);
                console.log('Transacción editada correctamente');

                this.obtenerHistorial();
                this.mostrandoFormularioEdicion = false;
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
        },



        async borrarTransaccion(id) {
            this.eliminando[id] = true
            try {
                await cryptoService.borrarTransaccion(id);
                console.log('Transacción borrada correctamente');

            } catch (error) {
                console.error('Error al borrar la transacción', error);
            } finally {

                this.obtenerHistorial()
                this.eliminando[id] = false

            }
        },
        irEstadoActual() {

            this.$router.push({ name: 'EstadoActual' });
        }

    },





}

</script>

<style scoped></style>
