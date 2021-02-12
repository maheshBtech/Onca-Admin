import axios from "axios";
import {setAddUpdateLocationURL,setGetSettingListURL,
    activateSuspendSetLocationURL,removeSetLocationURL,
    setGetActivityDropdownDataURL} from '../../../AppConfig';
import {baseUrl} from "../../../AppConfig";
class TrainingLocationService 
{
    constructor() {

    }

    //This function is to filter
     filterByValue =(array, string) => {
        let filterDataToShow = []
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.Training_Location_Name.toLowerCase().includes(string.toLowerCase())){
              filterDataToShow.push(obj)
            }
          });
        }
          return filterDataToShow;
    }
    
    //This function is to filter
    filterByValueCity =(array, string) => {
        let filterDataToShow = null;
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.label.toLowerCase().includes(string.toLowerCase())){
                filterDataToShow = obj;
                
            }
        });
        }
        return filterDataToShow;
    }

    //This function is to filter
    filterByValueCountry =(array, string) => {
        let filterDataToShow = null;
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.label.toLowerCase().includes(string.toLowerCase())){
                filterDataToShow = obj;
                
            }
        });
        }
        return filterDataToShow;
    }
    //This function is to filter
    filterByValueState =(array, string) => {
        let filterDataToShow = null;
        if(array != undefined)
        {
        array.forEach(obj =>{
            if(obj.label.toLowerCase().includes(string.toLowerCase())){
                filterDataToShow = obj;
                
            }
        });
        }
        return filterDataToShow;
    }
    /// this function is used to retive the data from the server
    async GetSettingLoctionList(spID) {
        let Authtoken = sessionStorage.getItem("token");
        try {
           return axios.get(setGetSettingListURL + '?spID='+spID , {credentials: "omit",mode: 'cors', method: 'GET', 
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
          'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
            .then(response => {
          
                if(response.status === 200) {
                    if (response.data.length > 0) {
                        console.log(response.data[0]);
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
    async GetActivityDropdownDataList(spID) {
        let Authtoken = sessionStorage.getItem("token");
        try {
           return axios.get(setGetActivityDropdownDataURL + '?spID='+spID , {credentials: "omit",mode: 'cors', method: 'GET', 
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
          'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} })
            .then(response => {
          
                if(response.status === 200) {
                    if (response.data.length > 0) {
                        console.log(response.data[0]);
                        return response.data;
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

    async CreateUpdateSettingLocation(dataObj) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(setAddUpdateLocationURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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
    
    async ActivateSuspendSetLoc(dataObj,userId) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            return axios.post(activateSuspendSetLocationURL,dataObj,{credentials: "omit",mode: 'cors', method: 'POST', 
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

    async RemoveSetLoc(dataObj,userId) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            return axios.post(removeSetLocationURL,dataObj,{credentials: "omit",mode: 'cors', method: 'GET', 
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
    
}

export default TrainingLocationService;