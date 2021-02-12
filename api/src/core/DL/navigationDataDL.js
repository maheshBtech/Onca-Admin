"use strict"
var database = require('../../loaders/db');
var logger = require('../../config/winston');
var environment = require('../../config/environment');
var dbconn = new database();
var db = environment.getDBconn();
const dbname = db.dbname;

class navDL{
   async fetchNavigationDataDL(data){
    try{
        let query = "CALL usp_User_GetUserDetails_Admin('"+data.email+"','"+data.pass+"');";   
        console.log(query)   
        //"CALL usp_User_GetUserDetails('ajayjaishankar@gmail.com','123456')"  
        let output = await dbconn.runQuery(query);
        console.log("output from user profile")
        console.log(output)
        return output
        }
        catch(err){
        console.log("error: ", err);
        logger.error('Error occured while fetching data from db Error: ' + err);
        return null;
        }
    }
}
module.exports = navDL;