"use strict"
var loginDL = require('../DL/LoginDL');
const logindl = new loginDL();
var logger = require('../../config/winston');
class LoginBL
{
 async validate(loginuser) 
 { let isverified = false;

   let result = await logindl.isCorrectPassword(loginuser);
   if (result.length == 0 || result[0].length === 0 || (result[0].length === 0 && result[1].length === 0)) {
    logger.error("alert: ", result);
    return isverified;
  }

  var user = [];
  for (let i = 0; i < result.length; i++) {
    if(result[i][i].EmailID == loginuser.Email){
      user.push(result[i][i]);
    logger.info('User data: ' + user);
    break;
   }
}

if((user[0].EmailID === loginuser.Email) && (user[0].Password === loginuser.Password)){
  isverified =true;
  console.log("login Successful");
  logger.info("login Successful,")
  return isverified;}
  }
}
module.exports = LoginBL;