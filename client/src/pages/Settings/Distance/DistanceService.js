import axios from "axios";
import {
  setAddUpdateDistanceURL,
  setGetDistanceListURL,
  removeSetDistanceURL,
} from "../../../AppConfig";
import { baseUrl } from "../../../AppConfig";
class DistanceService {
  constructor() {}

  //This function is to filter
  filterByValue = (array, string) => {
    let filterDataToShow = [];
    if (array != undefined) {
      array.forEach((obj) => {
        if (
          obj.Training_Location_Name.toLowerCase().includes(
            string.toLowerCase()
          )
        ) {
          filterDataToShow.push(obj);
        }
      });
    }
    return filterDataToShow;
  };

  /// this function is used to retive the data from the server
  async GetSettingDistanceList(spID) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .get(setGetDistanceListURL + "?spID=" + spID, {
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
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              console.log(response.data[0]);
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

  async CreateUpdateSettingDistance(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(setAddUpdateDistanceURL, dataObj, {
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

  async RemoveSetDistance(dataObj, userId) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .post(removeSetDistanceURL, dataObj, {
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

export default DistanceService;
