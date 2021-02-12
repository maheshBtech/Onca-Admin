"use strict"
var roleDL = require('../DL/RoleDL');
const roledl = new roleDL();
var logger = require('../../config/winston');
class RoleBL
{
  async fetchRoleData(loginuser) 
  { 
    let result = await roledl.getRoleData(loginuser);
    if (result == null || result == undefined) { 
      logger.error("alert: ", result);
    return null;
  }
  
  var useremail = result[0].EmailID;
  if(useremail == loginuser.Email){
  console.log("Roledata fetched Successfully");
  logger.info("Roledata received in BL",result);
  return result;}
  }

async getTableDataBL(){
  return await roledl.getTableDataDL()
}

async removeUserBL( data ){
  return await roledl.removeUserDL(data)
}

async getRoleListBL(){
  return await roledl.getRoleListDL()
}

async assignRoleBL(obj){  
  return await roledl.assignRoleDL(obj)
}

async getUsersListBL(){ 
  return await roledl.getUsersListDL()
}
}
module.exports = RoleBL;