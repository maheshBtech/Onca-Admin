import axios from "axios";
import {getPromocodeDropdownDataURL,GetPromocodeListURL,removePromocodeURL,isActivateSuspendPromocodeListURL,setAddUpdatePromocodeURL} from '../../../AppConfig';
import {baseUrl} from "../../../AppConfig";
class PredefinedStrService 
{
    constructor() {

    }

    //This function is to filter
    //  filterByValue =(array, string) => {
    //     let filterDataToShow = []
    //     if(array != undefined)
    //     {
    //     array.forEach(obj =>{
    //         if(obj.Training_Location_Name.toLowerCase().includes(string.toLowerCase())||obj.Training_Location_Name.toLowerCase().includes(string.toLowerCase())){
    //           filterDataToShow.push(obj)
    //         }
    //       });
    //     }
    //       return filterDataToShow;
    // }

    /// this function is used to retive the data from the server
   
    handleError(error) {
        console.log(error.message);
    }
    
    async GetPromocodeList(url,data) {
        
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
    

    async getPromocodeDropdownDataList(url,data) {
        
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

    async CreateUpdatePromocode(dataObj) {
        
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(setAddUpdatePromocodeURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
           'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
            .then(response => {
                if(response.status === 200) {
                    if (response.data.length > 0) {
                        return response;
                    }
                   return response
                }
                else{
                    return null;
                }
            }).catch(err => {
                throw err;
            });
        } catch (error) {
            throw error;
        }
    }
    
    async ActivateSuspendPromocode(dataObj) {
   

        let Authtoken = sessionStorage.getItem("token");
        try {
           if (dataObj == null) {
               return;
           }
           return axios.post(isActivateSuspendPromocodeListURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
          'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
           .then(response => {
               if(response.status === 200) {
                   if (response.data.length > 0) {
                       return response;
                   }
                  return response
               }
               else{
                   return null;
               }
           }).catch(err => {
               throw err;
           });
       } catch (error) {
           throw error;
       }
      
   }



    async RemovePromocode(dataObj) {
       
        let Authtoken = sessionStorage.getItem("token");
         try {
            if (dataObj == null) {
                return;
            }
            return axios.post(removePromocodeURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
           'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
            .then(response => {
                if(response.status === 200) {
                    if (response.data.length > 0) {
                        return response;
                    }
                   return response
                }
                else{
                    return null;
                }
            }).catch(err => {
                throw err;
            });
        } catch (error) {
            throw error;
        }
       
    }
  
}

export default PredefinedStrService;