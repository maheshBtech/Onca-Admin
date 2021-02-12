import axios from "axios";
import {addEcomNewVendorURL,getEcomGetVendorListURL} from '../../../../AppConfig';
import {baseUrl} from "../../../../AppConfig";
class NewVendorService 
{
    constructor() {
    }

async AddNewVendor(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
        if (dataObj == null) {
            return;
        }
        return axios.post(addEcomNewVendorURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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

/// this function is used to retive the data from the server
async GetEcomVendorList() {
    let Authtoken = sessionStorage.getItem("token");
    try {
       return axios.get(getEcomGetVendorListURL, {credentials: "omit",mode: 'cors', method: 'GET', 
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


async ActivateSuspendEV(dataObj,userId) {
    try {
        return axios.post("",dataObj)
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

async RemoveEV(dataObj,userId) {
    try {
        return axios.post("",dataObj)
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

    //This function is to filter
    filterByValue =(array, string) => {
        let filterDataToShow = []
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.Vendor_Name.toLowerCase().includes(string.toLowerCase())){
              filterDataToShow.push(obj)
            }
          });
        }
          return filterDataToShow;
    }


}


export default NewVendorService;