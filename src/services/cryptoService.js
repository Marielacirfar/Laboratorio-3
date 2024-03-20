import store from "@/store";
import axios from "axios";


const BASE_URL = 'https://criptoya.com/api/buenbit/';
const URL_base = 'https://laboratorio3-5459.restdb.io/rest/transactions';
const apiKey = '64a57c2b86d8c50fe6ed8fa5';
export default {
    async getCryptoInfo(crypto, action) {
        try {
            const response = await axios.get(`${BASE_URL}${crypto.toLowerCase()}/ars/0.1`);
            return action === 'compra' ? response.data.totalAsk : response.data.totalBid;
        } catch (error) {
            console.error('Error al traer la info de crypto :', error);
            throw error;
        }
    },
    async realizarTransaccion(body) {
        try {
            const response = await axios.post(
                'https://laboratorio3-5459.restdb.io/rest/transactions',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': apiKey,
                    },
                }
            );
            console.log('Response', response.data)
            return response.data;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }


    },
    async leerTransaccion(id) {
        try {
            const response = await axios.get(`${URL_base}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al leer transacción', error);
            throw error;
        }
    },
    async editarTransaccion(id, newData) {
        try {
            const response = await axios.patch(`${URL_base}/${id}`, newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            console.log('Response', response.data)
            return response.data;
        } catch (error) {
            console.error('Error al editar transacción', error);
            throw error;
        }
    },

    async borrarTransaccion(id) {
        try {
            const response = await axios.delete(`${URL_base}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al borrar transacción', error);
            throw error;
        }
    },
    async getTransaccionesUsuario() {
        console.log("nombreUsuario", store.state.nombreUsuario)
        const userId = store.state.nombreUsuario;
        try {
            const response = await axios.get(`${URL_base}?q={"user_id": "${userId}"}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            console.log('transacciones del usuario:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener transacciones del usuario', error);
            throw error;
        }
    },




}