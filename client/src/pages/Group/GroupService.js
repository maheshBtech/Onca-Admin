import axios from "axios";
import {AddGroupSetURL,ActivateSuspendGroupURL,GetGroupListURL,RemoveGroupURL} from '../../AppConfig';
import {baseUrl} from "../../AppConfig";
class GroupService 
{
    constructor() {

    }
    /// this function is used to retive the data from the server
  async GetGroupList() {
   
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .get(GetGroupListURL , {
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

  async ActivateSuspendGroup(dataObj) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      if (dataObj == null) {
        return;
      }
      return axios
        .post(ActivateSuspendGroupURL, dataObj, {
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

  async RemoveGroup(dataObj, userId) {
    let Authtoken = sessionStorage.getItem("token");
    try {
      return axios
        .post(RemoveGroupURL, dataObj, {
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
    async InsertUpdateGroupSet(dataObj) {
        let Authtoken = sessionStorage.getItem("token");
        try {
            if (dataObj == null) {
                return;
            }
            return axios.post(AddGroupSetURL,dataObj, {credentials: "omit",mode: 'cors', method: 'GET', 
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

export default GroupService;