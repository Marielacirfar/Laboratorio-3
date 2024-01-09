import axios from "axios";

const clientApi= axios.create({
    baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
	headers: {'x-apikey': '60eb09146661365596af552f'}

});
export default{
    clientApi,
    // getMovements(email){
    //     return clientApi.get
    // }
    
}
