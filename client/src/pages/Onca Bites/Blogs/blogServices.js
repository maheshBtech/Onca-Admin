import {
  oncaBitesBlogList,
  oncaBitesBlogAddUpdate,
  oncaBitesBlogUpdateStatus,
  oncaBitesBlogUpdateDetails
} from "../../../AppConfig";
import axios from "axios";
import { baseUrl } from "../../../AppConfig";
class BlogServices {
  constructor() { }

  async getBlogList(spID) {
    let Authtoken = sessionStorage.getItem("token");

    try {
      return axios
        .get(
          oncaBitesBlogList + "?spID=" + spID,

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

  async CreateUpdateBlogs(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(oncaBitesBlogAddUpdate, dataObj, {
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

  async CreateUpdateBlogDetails(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(oncaBitesBlogUpdateDetails, dataObj, {
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
        .post(oncaBitesBlogUpdateStatus, dataObj, {
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

export default BlogServices;
