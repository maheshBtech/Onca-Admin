import axios from "axios";
import { setAddUpdatePreStrURL, setGetPreStrListURL, removeSetPreStrURL } from '../../../AppConfig';
import { baseUrl } from "../../../AppConfig";
class PredefinedStrService {
    constructor() {

    }

    handleError(error) {
        console.log(error.message);
    }

    /// this function is used to retive the data from the server

    async GetPredefinedStringList(url, data) {

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

    async CreateUpdateSettingPredStr(dataObj) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(setAddUpdatePreStrURL, dataObj, {
                credentials: "omit", mode: 'cors', method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                    'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            return response;
                        }
                        return response
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

    async RemovePreStr(dataObj) {
        // try {
        //     return axios.post(removeSetPreStrURL,dataObj)
        //      .then(response => {

        //          if(response.status === 200) {
        //              if (response.data.length > 0) {
        //                  return response;
        //              }
        //              return response;
        //          }
        //          else{
        //              return null;
        //          }
        //      }).catch(err => {
        //          throw err;
        //      });
        //  } catch (error) {
        //      throw error;
        //  }
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(removeSetPreStrURL, dataObj, {
                credentials: "omit", mode: 'cors', method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': baseUrl,
                    'Vary': 'Origin', 'Access-Control-Request-Method': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Authorization': 'Bearer ' + Authtoken
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            return response;
                        }
                        return response
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

    validatePrestrPopupForm(prestr, fullform, PreDefDesccheckedValue, valuecheckedValue) {
        let message = []
        let section = []
        let status = true
        var prestrRGEX = /[%][A-Za-z]*[%]$/;
        var prestrResult = prestrRGEX.test(prestr);
        if (prestr === "" || prestr === null || prestr === undefined) {
            message.push("*PreDefined String cannot be empty.")
            section.push("PreStrError")
            status = false
        }
        if (fullform === "" || fullform === null || fullform === undefined) {
            message.push("*Full Form cannot be empty.")
            section.push("fullformError")
            status = false
        }
        if ((PreDefDesccheckedValue === "" || PreDefDesccheckedValue === null || PreDefDesccheckedValue === undefined) && (valuecheckedValue === "" || valuecheckedValue === null || valuecheckedValue === undefined)) {
            message.push("*Select at least one Checkbox")
            section.push("checkboxError")
            status = false
        }

        return {
            status: status,
            message: message,
            section: section
        }
    }
}

export default PredefinedStrService;