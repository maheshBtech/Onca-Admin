import axios from "axios";
import { getActivityListURL, putActivateRemoveActivityListURL, AddUpdateActivityURL, ActivityAddTemplateURL, GetActivityByIdURL } from '../../AppConfig';
import AppService from '../../AppService';
import { baseUrl } from "../../AppConfig";
class ActivityService {
    constructor() {

    }
    appService = new AppService();
    //This function is to filter
    filterByValue = (array, string) => {
        let filterDataToShow = []
        array.forEach(obj => {
            if (obj.Activity_Name.toLowerCase().includes(string.toLowerCase())) {
                filterDataToShow.push(obj)
            }
        });
        return filterDataToShow;
    }

    /// this function is used to retive the data from the server
    async GetActivityList() {
        try {
            let Authtoken = sessionStorage.getItem("token");
            return axios.get(getActivityListURL,
                {
                    credentials: "omit", mode: 'cors', method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                        'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                    }
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            return response.data[0];
                        }
                        return null;
                    }
                    else {
                        return null;
                    }
                }).catch(err => {
                    throw err;
                });
        } catch (error) {
            throw error;
        }
    }

    async ActivateSuspendRemove(dataObj, userId) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return null;
            }
            return axios.post(putActivateRemoveActivityListURL, dataObj, {
                credentials: "omit", mode: 'cors', method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                    'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                }
            }
            ).then(response => {
                    if (response.status === 200) {
                        return response.status;
                    }
                    else {
                        return null;
                    }
                }).catch(err => {
                    throw err;
                });
        } catch (error) {
            throw error;
        }
    }

    async ActivityAddUpdate(dataObj) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            response = await axios.post(AddUpdateActivityURL, dataObj,
                {
                    credentials: "omit", mode: 'cors', method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                        'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                    }
                }
            );
            return response;
        }
        catch (error) {
            return response;
        }
    }
   
    async ActivityAddTemplate(dataObj) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            response = await axios.post(ActivityAddTemplateURL, dataObj,
                {
                    credentials: "omit", mode: 'cors', method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                        'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                    }
                }
            );
            return response;
        }
        catch (error) {
            return response;
        }
    }

    // get activity data by Id
    async GetActivityById(Id) {
        try {
            let Authtoken = sessionStorage.getItem("token");
            return axios.get(`${GetActivityByIdURL}/${Id}`,
                {
                    credentials: "omit", mode: 'cors', method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                        'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                    }
                }
            ).then(response => {
                if (response.status === 200) {
                    if (response.data.length > 0) {
                        return response.data;
                    }
                    return null;
                }
                else {
                    return null;
                }
            }).catch(err => {
                throw err;
            });
        } catch (error) {
            throw error;
        }
    }

    async GetEmailList(url, data) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
        try {
            response = await axios.post(
                url,
                data,
                {
                    credentials: "omit", mode: 'cors', method: 'POST', headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                        'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                    }
                }
            );
            if (!response.statusText.toLowerCase() === 'ok') {
                this.handleResponseError(response);
            }
            return response.data[0];
        }
        catch (error) {
            this.handleError(error);
            return response;
        }
    }
}

export default ActivityService;