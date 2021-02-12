"use strict"
var userDL = require('../DL/usersDl');
var logger = require('../../config/winston');
const userdl = new userDL();
class UserBL
{

    async userTableDataBl(){
        return await userdl.userTableDataDl()
      }
      async activityTableDataBl(req){
        return await userdl.activityTableDataDl(req)
      }
      async insertCreateAODBl(req){
        return await userdl.insertCreateAODDl(req)
      }
      async updateUserDetalsBl(req){
        return await userdl.updateUserDetalsDl(req)
      }
    
}
module.exports = UserBL;