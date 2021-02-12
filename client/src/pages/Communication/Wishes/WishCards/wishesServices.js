import axios from "axios";
import {
  commAddUpdateWishesURL,
  commWishesListURL,
  commRemoveWishesURL,
} from "../../../../AppConfig";
import { baseUrl } from "../../../../AppConfig";
class WishesServices {
  constructor() {}

  /// this function is used to retive the data from the server
  async getWishesList(spID) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .get(commWishesListURL + "?spID=" + spID, {
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

  async CreateUpdateWishes(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(commAddUpdateWishesURL, dataObj, {
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

  async RemoveWishes(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .post(commRemoveWishesURL, dataObj, {
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

export default WishesServices;
