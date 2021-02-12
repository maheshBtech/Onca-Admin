import axios from "axios";
import {baseUrl} from "../../../AppConfig";

class PugMarkRequestService 
{
    constructor() {

    }

    handleError(error) {
        console.log(error.message);
    }

    /// this function is used to retive the data from the server
    async GetPugMarkRequestList(url) {
       
        let Authtoken = sessionStorage.getItem("token");
        try {
           return axios.get(url, {credentials: "omit",mode: 'cors', method: 'GET', 
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
          'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
            .then(response => {
          
                if(response.status === 200) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                    return null;
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

    // async GetPugMarkRequestList(url, data) {
    //     let response = null;
    //     let Authtoken = sessionStorage.getItem("token");
    //     try{            
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
    //         }
    // }

    // async CreateUpdatePugMarkRequest(dataObj) {
    //     let Authtoken = sessionStorage.getItem("token");
    //     try {
    //         if (dataObj == null) {
    //             return;
    //         }
    //         return axios.post(createUpdatePugMarkUserTypeListURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
    //         headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
    //        'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
    //         .then(response => {
    //             if(response.status === 200) {
    //                 if (response.data.length > 0) {
    //                     return response.data[0];
    //                 }
    //                 return null;
    //             }
    //             else{
    //                 return null;
    //             }
    //         }).catch(err => {
    //             throw err;
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
 

    // async RemoveRequest(dataObj,userId) {
    //     try {
    //         return axios.post(removePugMarkUserTypeListURL,dataObj)
    //          .then(response => {
           
    //              if(response.status === 200) {
    //                  if (response.data.length > 0) {
    //                      return response.data[0];
    //                  }
    //                  return null;
    //              }
    //              else{
    //                  return null;
    //              }
    //          }).catch(err => {
    //              throw err;
    //          });
    //      } catch (error) {
    //          throw error;
    //      }
       
    // }
    
}

export default PugMarkRequestService;