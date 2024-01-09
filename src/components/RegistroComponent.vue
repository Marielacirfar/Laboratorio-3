<template>
    <div class="form-registro m-auto mb-3">
        <form @submit.prevent="crearUsuario">
            <h1>Registrese aqui</h1>
            <div class="form-floating">
                <input type="text" class="form-control mb3" id="nombreUsuario" name="nombreUsuario" v-model="email"
                    :class="{ 'invalid-email': !isEmailValid }" />
                <label for="floatingInput">Ingrese su email</label>
            </div>
            <p v-if=" !isEmailValid" class="text-danger">Ingrese un email válido</p>

            <br /><br />
            <button class="w-100 btn-lg btn-primary" @click.prevent="crearUsuario">Registro</button>
        </form>
    </div>
</template>
  
<script>
export default {
    name: "RegistroComponent",
    data() {
        return {
            email: "",
        };
    },
    computed: {
    isEmailValid() {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
  },

    methods: {
        crearUsuario: function () {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.email === "") {
                alert("El usuario es obligatorio");
                this.$router.push("/");
            } else if (!emailRegex.test(this.email)) {
                alert("Ingrese un email válido");
                this.$router.push("/");
            } else {
                // Use the setUserId mutation to save the email in the store
                this.$store.commit("setUserEmail", this.email);

                // Now you can check if the email is correctly saved in the store
                console.log("User email saved in store:", this.$store.state.userEmail);

                // Redirect to the desired route
                this.$router.push("/NegociacionComp");
            }
        },
    },
};
</script>
  
  
<style lang="scss" scoped>
.registro {
    margin: 10% 0 0 0;
}

.form-registro {
    max-width: 300px;
    padding: 15px;
}
.invalid-email {
  border: 1px solid red; /* Change the style for invalid email */
}
.form-registro .form-floating:focus-within {
    z-index: 2;
}
</style>
  