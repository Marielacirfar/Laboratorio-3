import axios from "axios";


const BASE_URL = 'https://criptoya.com/api/buenbit/';
const apiKey = '60eb09146661365596af552f';
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
                'https://laboratorio3-f36a.restdb.io/rest/transactions',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': apiKey,
                    },
                }
            );
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }


    }


}