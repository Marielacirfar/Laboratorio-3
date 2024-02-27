import axios from "axios";


const BASE_URL = 'https://criptoya.com/api/buenbit/';

export default {
    async getCryptoInfo(crypto, action) {
        try {
            const response = await axios.get(`${BASE_URL}${crypto.toLowerCase()}/ars/0.1`);
            return action === 'compra' ? response.data.totalAsk : response.data.totalBid;
        } catch (error) {
            console.error('Error al traer la info de crypto :', error);
            throw error;
        }
    }

}