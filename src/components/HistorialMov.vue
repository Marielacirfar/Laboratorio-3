<template>
    <div class="row">

        <div class="col-12 col-md-4">
            <form @submit.prevent="registrarProyecto">

                <div class="mb-3">
                    <label class="form-label text-white">Actividad Compra/Venta</label>
                    <select v-model.trim="actividad" class="form-select" required>
                        <option disabled selected value="">Seleccione una actividad</option>
                        <option>Compra</option>
                        <option> Venta</option>

                    </select>

                </div>
                <div class="mb-3">
                    <label class="form-label text-white">Tipo de moneda</label>
                    <select v-model.trim="tipo" class="form-select" required>
                        <option disabled selected value="">Seleccione una moneda</option>
                        <option>Bitcoin (BTC)</option>
                        <option> Ethereum (ETH)</option>
                        <option>Tether (USDT)</option>
                        <option>Dai</option>
                    </select>

                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-check-label">Urgente</label>
                    <input v-model.trim="urgente" type="checkbox" class="form-check-input">
                </div>

                <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
            <hr>
        </div>
        <div class="col-12 col-md-8 text-white">
            <h3>
                Total de operaciones realizadas: {{ numeroOperaciones }}
            </h3>
            <div class="row">
                <div class="col-md-6">

                    <h4>Compras realizadas:</h4>
                    <ul>
                        <li v-for="(cantidad, tipo) in comprasDetalladas" :key="tipo">
                            {{ `Cantidad de compras de ${tipo}: ${cantidad}` }}
                        </li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h4>Ventas realizadas:</h4>
                    <ul>
                        <li v-for="(cantidad, tipo) in ventasDetalladas" :key="tipo">
                            {{ `Cantidad de ventas de ${tipo}: ${cantidad}` }}
                        </li>
                    </ul>
                </div>
            </div>
            <h4>Disponibles después de operaciones:</h4>
            <ul>
                <li v-for="(cantidad, tipo) in disponibles" :key="tipo">
                    {{ `Cantidad disponible de ${tipo}: ${cantidad}` }}
                </li>
            </ul>


            <div class="table-responsive">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Actividad</th>
                            <th>Moneda</th>
                            <th>Urgente</th>
                            <th>Completado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(proyecto, index) in proyectos" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ proyecto.actividad }}</td>
                            <td>{{ proyecto.tipo }}</td>
                            <td @click="cambiarEstado(proyecto, 'urgente')"
                                :class="proyecto.urgente ? 'bg-success' : 'bg-danger'">{{
                                    proyecto.urgente ?
                                    "SI" :
                                    "NO" }}</td>
                            <td @click="cambiarEstado(proyecto, 'completado')"
                                :class="proyecto.completado ? 'bg-success' : 'bg-danger'">{{
                                    proyecto.completado ?
                                    "Completo" :
                                    "Incompleto" }}</td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>

    </div>
</template>
<script>
export default {
    name: "HistorialMov",

    data: () => ({
        actividad: "",
        tipo: "",
        urgente: false,
        proyectos: [],
        compras: {
            "Bitcoin (BTC)": 0,
            "Ethereum (ETH)": 0,
            "Tether (USDT)": 0,
            "Dai": 0
        },
        ventas: {
            "Bitcoin (BTC)": 0,
            "Ethereum (ETH)": 0,
            "Tether (USDT)": 0,
            "Dai": 0
        },
        disponibles: {
            "Bitcoin (BTC)": 0,
            "Ethereum (ETH)": 0,
            "Tether (USDT)": 0,
            "Dai": 0
        }


    }),
    methods: {
        registrarProyecto() {
            const proyecto = {
                actividad: this.actividad,
                tipo: this.tipo,
                urgente: this.urgente,
                completado: false

            }
            this.proyectos.push(proyecto)

            if (this.actividad === "Compra") {
                this.compras[this.tipo]++;
                this.disponibles[this.tipo]++;
            } else if (this.actividad === "Venta") {
                this.ventas[this.tipo]++;
                this.disponibles[this.tipo]--;
            }

            this.actividad = ""
            this.tipo = ""
            this.urgente = false
        },
        cambiarEstado(proyecto, campo) {
            proyecto[campo] = !proyecto[campo]
        }

    },
    computed: {
        numeroOperaciones() {
            return this.proyectos.length
        },
        comprasDetalladas() {
            return this.compras;
        },
        ventasDetalladas() {
            return this.ventas;
        },
        porcentaje() {
            let completados = 0
            this.proyectos.map((proyecto) => {

                if (proyecto.completado) completados++;

            })

            return completados * 100 / this.numeroOperaciones || 0
        }

    },


}

</script>


  <script>
  
  
  
  
  </script>
  
  
  
<style scoped>
ul {
    list-style-type: none;
}
</style>
  