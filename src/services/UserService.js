import axios from "axios";

const clientApi = axios.create({
    baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
    headers: { 'x-apikey': '60eb09146661365596af552f' }

});
export default {
    clientApi,
    // getMovements(email){
    //     return clientApi.get
    // }

    getCryptoData(coin) {
        return axios.get("https://criptoya.com/api/buenbit/" + coin + "/ars/0.1")
    },

    cryptos: [
        { id: 0, name: "Bitcoin", symbol: "BTC", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
        { id: 1, name: "Ethereum", symbol: "ETH", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
        { id: 2, name: "Theter", symbol: "USDT", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
        { id: 3, name: "Dai", symbol: "DAI", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    ],

}
