import axios from "axios";
import {getPugMarkUserTypeListURL,createUpdatePugMarkUserTypeListURL,isActivateSuspendPugMarkUserTypeListURL,removePugMarkUserTypeListURL} from '../../../AppConfig';
import {baseUrl} from "../../../AppConfig";
class UserTypeService 
{
    constructor() {

    }

    //This function is to filter
     filterByValue =(array, string) => {
        let filterDataToShow = []
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.User_Type_Name.toLowerCase().includes(string.toLowerCase())){
              filterDataToShow.push(obj)
            }
          });
        }
          return filterDataToShow;
    }

    /// this function is used to retive the data from the server
    async GetPugMarkUserTypeList() {
        let Authtoken = sessionStorage.getItem("token");
        try {
           return axios.get(getPugMarkUserTypeListURL, {credentials: "omit",mode: 'cors', method: 'GET', 
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


    async CreateUpdatePugMarkUserType(dataObj) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(createUpdatePugMarkUserTypeListURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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
    
    async ActivateSuspendUT(dataObj) {
   

         let Authtoken = sessionStorage.getItem("token");
         try {
            if (dataObj == null) {
                return;
            }
            return axios.post(isActivateSuspendPugMarkUserTypeListURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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

    async RemoveUT(dataObj) {
     

         let Authtoken = sessionStorage.getItem("token");
         try {
            if (dataObj == null) {
                return;
            }
            return axios.post(removePugMarkUserTypeListURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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

export default UserTypeService;