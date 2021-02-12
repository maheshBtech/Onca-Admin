import axios from "axios";
import {baseUrl,setAddUpdateEmailURL,removeEmailTemplateURL,SetEmailTemplatetoActivityURL} from "../../../AppConfig"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class EmailService {
 
    constructor() {
          
       
    }

    async GetdropdownDataFromApipost(url, data) {
       
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
 
    handleError(error) {
        console.log(error.message);
    }
    async CreateUpdateEmail(dataObj) {
        
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(setAddUpdateEmailURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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
   
  
    async GetEmailList(url,data) {
        
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
    // updateLeaderboardListMasterData(providerID){     
    
    //     this.GetDataFromApiPost(leaderboardResultList, data)
    //     .then((response)=>{  
            
    //         let rawTableData = response.data[0];
    //         store.dispatch({type:'TABLE_LEADERRESULT_DATA', payload:rawTableData})  
            
    //     })
    // }
    
    
    async RemoveEmailTemplate(dataObj) {
       
        let Authtoken = sessionStorage.getItem("token");
         try {
            if (dataObj == null) {
                return;
            }
            return axios.post(removeEmailTemplateURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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
    
    
    async AssignEmailtoActivity(dataObj) {
        
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(SetEmailTemplatetoActivityURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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

    validateTimingPopupForm(raceName, runnerName, timing){        
        let message = []
        let section = []
        let status = true
        if(raceName === "" || raceName === null || raceName === undefined)
        {
            message.push("*Race Name cannot be empty.") 
            section.push("racenameError")
            status = false
        }
        if(runnerName === "" || runnerName === null || runnerName === undefined)
        {
            message.push("*Runner cannot be empty.")
            section.push("runnerError")
            status = false
        }
        if(timing === "" || timing === null || timing === undefined )        {
            message.push("*Select Timing")
            section.push("timingError")            
            status = false
         } 
         //if(raceurl === "" || raceurl === null || raceurl === undefined )        {
        //     message.push("*raceurl cannot be empty.")
        //     section.push("raceurlError")            
        //     status = false
        // }
        return{
            status: status,
            message: message,
            section: section
        }
    }
}

export default EmailService;
