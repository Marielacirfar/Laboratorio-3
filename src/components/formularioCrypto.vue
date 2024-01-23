<template>
    <div>
        <form @submit.prevent="$emit('infoMonedas', crypto, moneda)">
            <div>

                <label>Moneda Nacional: </label>
                <select v-model="moneda" required>
                    <option value="" disabled selected>
                        Seleccione una moneda...
                    </option>
                    <option>ARS</option>


                </select>

            </div>

            <div>

                <label>Criptomoneda: </label>
                <select v-model="crypto" required>
                    <option value="" disabled selected>
                        Seleccione una Criptomoneda...
                    </option>
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>USDT</option>
                    <option>DAI</option>
                </select>
            </div>


            <div>
                <button type="submit">Cotizar</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data: () => ({
        moneda: "",
        crypto: ""

    }),

};

</script>

<style>
body {
    background-color: black;
    color: aliceblue;

}

form {
    margin: 0 80px 0 0;
}

select {
    display: block;
    width: 300px;
    height: 35px;
    font-size: 15px;
    border: none;
    margin: 10px 0;
    border-radius: 20px;
    text-align: center;
}

button {
    width: 300px;
    height: 35px;
    cursor: pointer;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background: rgb(180, 52, 52);
    border: none;


}
</style>