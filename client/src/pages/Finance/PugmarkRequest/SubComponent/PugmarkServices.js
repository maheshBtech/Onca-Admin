
import axios from 'axios';
import {baseUrl} from "../../../../AppConfig";


export class PugmarkServices {

    getProductsSmall() {
        return axios.get('data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('data/products-orders-small.json').then(res => res.data.data);
    }
    handleError(error) {
        console.log(error.message);
    }
   

    async GetPugMarkRequestList(url,data) {
        
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
      try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response.data[0];

        }

        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }
   
    async approvePMRequestData(url,data) {
        
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
      try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response;

        }

        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }
    
    async GetPMDropdownList(url,data) {
        
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
      try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response;

        }

        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }
    // async Razorpaypayment(url,data) {
    //     
    //     let response = null;
    //     let Authtoken = sessionStorage.getItem("token");
    //   try{
            
    //      response =  await axios.post(
    //         url,
    //         data,
    //     {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
    //      'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
    //     );
    //     if (!response.statusText.toLowerCase() === 'ok') {
    //             this.handleResponseError(response);
    //         }
    //         return response;
    //     }

    //     catch(error)
    //     {
    //             this.handleError(error);
    //             return response;
    //     }
    // }
   
}
    