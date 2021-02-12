import axios from "axios";
import { getEventListURL, putActivateRemoveEventListURL, AddUpdateEventURL, EventAddTemplateURL, GetEventByIdURL } from '../../AppConfig';
import AppService from '../../AppService';
import { baseUrl } from "../../AppConfig";
class EventService {
    constructor() {

    }
    appService = new AppService();
    // //This function is to filter
    // filterByValue = (array, string) => {
    //     let filterDataToShow = []
    //     array.forEach(obj => {
    //         if (obj.Event_Name.toLowerCase().includes(string.toLowerCase())) {
    //             filterDataToShow.push(obj)
    //         }
    //     });
    //     return filterDataToShow;
    // }

    // /// this function is used to retive the data from the server
    // async GetEventList() {
    //     try {
    //         let Authtoken = sessionStorage.getItem("token");
    //         return axios.get(getEventListURL,
    //             {
    //                 credentials: "omit", mode: 'cors', method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                     'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //                 }
    //             }
    //         )
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     if (response.data.length > 0) {
    //                         return response.data[0];
    //                     }
    //                     return null;
    //                 }
    //                 else {
    //                     return null;
    //                 }
    //             }).catch(err => {
    //                 throw err;
    //             });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async ActivateSuspendRemove(dataObj, userId) {
    //     let Authtoken = sessionStorage.getItem("token");
    //     try {
    //         if (dataObj == null) {
    //             return null;
    //         }
    //         return axios.post(putActivateRemoveEventListURL, dataObj, {
    //             credentials: "omit", mode: 'cors', method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                 'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //             }
    //         }
    //         ).then(response => {
    //                 if (response.status === 200) {
    //                     return response.status;
    //                 }
    //                 else {
    //                     return null;
    //                 }
    //             }).catch(err => {
    //                 throw err;
    //             });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async EventAddUpdate(dataObj) {
    //     let response = null;
    //     let Authtoken = sessionStorage.getItem("token");
    //     try {
    //         if (dataObj == null) {
    //             return;
    //         }
    //         response = await axios.post(AddUpdateEventURL, dataObj,
    //             {
    //                 credentials: "omit", mode: 'cors', method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                     'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //                 }
    //             }
    //         );
    //         return response;
    //     }
    //     catch (error) {
    //         return response;
    //     }
    // }
   
    // async EventAddTemplate(dataObj) {
    //     let response = null;
    //     let Authtoken = sessionStorage.getItem("token");
    //     try {
    //         if (dataObj == null) {
    //             return;
    //         }
    //         response = await axios.post(EventAddTemplateURL, dataObj,
    //             {
    //                 credentials: "omit", mode: 'cors', method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                     'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //                 }
    //             }
    //         );
    //         return response;
    //     }
    //     catch (error) {
    //         return response;
    //     }
    // }

    // // get Event data by Id
    // async GetEventById(Id) {
    //     try {
    //         let Authtoken = sessionStorage.getItem("token");
    //         return axios.get(`${GetEventByIdURL}/${Id}`,
    //             {
    //                 credentials: "omit", mode: 'cors', method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                     'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //                 }
    //             }
    //         ).then(response => {
    //             if (response.status === 200) {
    //                 if (response.data.length > 0) {
    //                     return response.data;
    //                 }
    //                 return null;
    //             }
    //             else {
    //                 return null;
    //             }
    //         }).catch(err => {
    //             throw err;
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async GetEmailList(url, data) {
    //     let response = null;
    //     let Authtoken = sessionStorage.getItem("token");
    //     try {
    //         response = await axios.post(
    //             url,
    //             data,
    //             {
    //                 credentials: "omit", mode: 'cors', method: 'POST', headers: {
    //                     'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
    //                     'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
    //                 }
    //             }
    //         );
    //         if (!response.statusText.toLowerCase() === 'ok') {
    //             this.handleResponseError(response);
    //         }
    //         return response.data[0];
    //     }
    //     catch (error) {
    //         this.handleError(error);
    //         return response;
    //     }
    // }
}

export default EventService;