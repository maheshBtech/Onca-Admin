import axios from "axios";
import {
  commFAQsListURL,
  commFAQAddUpdateURL,
  commFAQRemoveURL,
} from "../../../AppConfig";
import { baseUrl } from "../../../AppConfig";
class FAQServices {
  constructor() {}

  /// this function is used to retive the data from the server
  async getFAQList(obj) {
    let Authtoken = sessionStorage.getItem("token");

    try {
      return axios
        .get(
          commFAQsListURL +
            "?spID=" +
            obj.Service_Provider_ID +
            "&topicName=" +
            obj.Topic_Name,

          {
            credentials: "omit",
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": baseUrl,
              Vary: "Origin",
              "Access-Control-Request-Method": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type,Authorization",
              Authorization: "Bearer " + Authtoken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              return response.data;
            }
            return null;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async CreateUpdateFAQs(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(commFAQAddUpdateURL, dataObj, {
          credentials: "omit",
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": baseUrl,
            Vary: "Origin",
            "Access-Control-Request-Method": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            Authorization: "Bearer " + Authtoken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              return response.data[0];
            }
            return null;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async RemoveFAQs(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .post(commFAQRemoveURL, dataObj, {
          credentials: "omit",
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": baseUrl,
            Vary: "Origin",
            "Access-Control-Request-Method": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            Authorization: "Bearer " + Authtoken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              return response.data[0];
            }
            return null;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
}

export default FAQServices;
