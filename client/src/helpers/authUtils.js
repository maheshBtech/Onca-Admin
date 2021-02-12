
// Add the App service products that you want to use
import AppService from "../AppService";
import { loginusingpass, forgotpassurlb, logout } from "../AppConfig";
import Cookies from 'universal-cookie';
import store from "../store";
 
const cookies = new Cookies();
 
class authUtils {
  constructor() {
    // Initialize Firebase
    this.AppService = new AppService();
    this.getAuthenticatedUser = (user => {
      if (user) {
        sessionStorage.setItem("authUser", JSON.stringify(user));
        sessionStorage.setItem("token",JSON.stringify(user.token));
      } else {
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("token");
      }
    });

  }

  /**
   * Registers the user with given details
   */

  /**
   * Login user with given details
   */

  //   loginUser = (email, password) => {
  //     return new Promise((resolve, reject) => {
  //       if (email !== "" && password !== "") {
  //         let loginurl = loginusingpass;
  //         console.log("initiating login to get user details");

  //         let logindata = {
  //             'email': email, 'password': password
  //         }
  //         var rejson = this.AppService.GetDataFromApiPost(loginurl, logindata);
  //             if (rejson) {
  //               sessionStorage.setItem("authUser", JSON.stringify(rejson));
  //                   console.log(rejson);
  //                   resolve(rejson);
  //                       } 
  //                       else {
  //                           sessionStorage.removeItem("authUser");
  //                       }
  //           error => {
  //             reject(this._handleError(error));
  //           }

  //   }
  // });
  // }
  loginUser = async (email, password) => {
    try {
      var rejson = null;
      if (email !== "" && password !== "") {
        let loginurl = loginusingpass;
        console.log("initiating login to get user details");

        let logindata = {
          'email': email, 'password': password
        }
        var response = await this.AppService.GetDataFromApiPostLogin(loginurl, logindata);
        if (response !== null || response !== undefined)
          rejson = response.data;
        cookies.set('userEmail', email, { path: '/' });
        console.log("Token Received");
        ;
      }

      if (rejson != null || rejson != undefined) {
        sessionStorage.setItem("authUser", JSON.stringify(rejson));

        if (rejson[0] != null) {
          let token = rejson[0]['token'];
          let d = new Date();
          d.setTime(d.getTime() + (60 * 60 * 1000));
          sessionStorage.setItem("token", token);
          store.dispatch({type:'AUTH_TOKEN', payload:token})  
          cookies.set('token', token, { path: "/", expires: d });
          //console.log(cookies.get('token')); // Pacman
          console.log('The cookie "token" exists (ES6)');
         
      }
        return rejson;
      } else {
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("token");
        return null;
      }

    }
    catch (error) {
      this.handleError(error);
    }


  }

  authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(sessionStorage.getItem('authUser'));

    if (user && user.token) {
      return { 'Authorization': 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
  /**
   * forget Password user with given details
   */
  forgetPassword = async email => {
    let forgotpassurl = forgotpassurlb;

    let forgetdata = {
      'email': email,
    }
    var responsepwd = await this.AppService.GetDataFromApiPost(forgotpassurl, forgetdata);
    console.log("This is response from resetpass: " + responsepwd);
    sessionStorage.removeItem("token");
    return responsepwd;
  }

  /**
     * Logout the user
     */
  logout = async logoutresponse => {

    let logouturluser = logout;
    let isloggedout = false;
    try {
      logoutresponse = await this.AppService.GetDataFromApiGet(logouturluser, "");
      console.log("This is response from logout: " + logoutresponse);
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("token");
      isloggedout = true;
      store.dispatch({type:'AUTH_TOKEN', payload:[]});
      return isloggedout;
    }
    catch (error) {
      this._handleError(error);
      return isloggedout;
    }

  };

  setLoggeedInUser = user => {
    sessionStorage.setItem("authUser", JSON.stringify(user));
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem("authUser")) return null;
    return JSON.parse(sessionStorage.getItem("authUser"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}
export default authUtils
let _loginuser = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initLoginuser = () => {
  if (!_loginuser) {
    _loginuser = new authUtils().getAuthenticatedUser();
  }
  return _loginuser;
}
const getLoginuser = (email, pass) => {
  if (email === null || email === '') {
    _loginuser = new authUtils().getAuthenticatedUser();
  }
  else
    _loginuser = new authUtils().loginUser(email, pass);

  return _loginuser;
};

const logoutuser = () => {
  new authUtils().logout();

  return "logout successful";
};
const forgotpass = email => {
  if (email === null || email === '') {
    _loginuser = null;
  }
  else { _loginuser = new authUtils().forgetPassword(email); }

  return _loginuser;
};

export { getLoginuser, logoutuser, forgotpass, initLoginuser };