"use strict"
var database = require('../../loaders/db');
var logger = require('../../config/winston');
var environment = require('../../config/environment');
var dbconn = new database();
class LoginDL
{
  //below method is to check the the user login creds
 async isCorrectPassword(loginuser){
  const usermail =  loginuser.Email;
  const pass =  loginuser.Password;
    let sqlquery = `call usp_User_GetUserDetails_Admin('${usermail}','${pass}');`; ;

    try {
      let conn = await dbconn.runQuery(sqlquery); //calling the db query
      return conn;
  }
  catch (err) {
    console.log("error: ", err);
    logger.error('Error occured while fetching data from db Error: ' + err);
    return null;
  }

    }

  }
module.exports = LoginDL;