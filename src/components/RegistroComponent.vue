<template>
    <div>
        <div class="form-registro m-auto mb-3">
            <form @submit.prevent="crearUsuario">
                <h1 class="h1">Registrese aqui</h1>
                <label for="">El nombre de usuario debe ser alfanumerico</label>
                <div class="form-floating">

                    <input type="text" class="form-control mb3" id="nombreUsuario" name="nombreUsuario"
                        v-model="nombreUsuario" placeholder="Ingrese su usuario"
                        :class="{ 'invalid-usuario': !isUsuarioValid }" />
                    <label for="floatingInput">Ingrese su usuario</label>
                </div>
                <p v-if="!isUsuarioValid && nombreUsuario !== ''" class="text-danger">El nombre de usuario no es válido.
                    Debe
                    tener al menos 10 caracteres y contener al menos una letra y un número.</p>

                <br /><br />

                <button type="button" class="btn btn-light" @click.prevent="crearUsuario">Registro</button>
            </form>
        </div>
    </div>
</template>


<script>
export default {
    name: "RegistroComponent",
    data() {
        return {
            nombreUsuario: "",
        };
    },
    computed: {
        isUsuarioValid() {
            return this.nombreUsuario !== "" && this.nombreUsuario.length >= 10 && /[a-zA-Z]/.test(this.nombreUsuario) && /\d/.test(this.nombreUsuario);
        }
    },
    methods: {
        crearUsuario: function () {
            if (!this.isUsuarioValid) {
                return;
            }

            this.$store.commit("setNombreUsuario", this.nombreUsuario);

            console.log("Usuario guardado en el store:", this.$store.state.nombreUsuario);
            this.$router.push("/NegociacionComp");
        }
    }
}

</script>


<style scoped>
body {
    background-color: black;
}

.h1 {
    text-align: center;
    border: 2px solid rgb(110, 103, 103);
    box-shadow: 0px 0px 10px 0px #f2eeee inset;
    padding: 5px;
    color: aliceblue;
}

.registro {
    margin: 10% 0 0 0;
}

.form-registro {
    max-width: 300px;
    padding: 15px;
}

.invalid-usuario {
    border: 1px solid red;

}

.form-registro .form-floating:focus-within {
    z-index: 2;
}
</style>
