"use strict"
var database = require('../../../loaders/db');
var logger = require('../../../config/winston');
var environment = require('../../../config/environment');
var dbconn = new database();
var db = environment.getDBconn();
const dbname = db.dbname;


class uniqueID{
    async insertUniqueIDDL(data) 
    { 
        try{
            let query=""
            if(data.uniqueUserID===null){
                query = "CALL `usp_UniqueUser_InsertUpdate`(NULL,'"+data.providerCode+"','"+data.variableCode1+"',"+data.variableCode2+",'"+data.submitDate+"',"+data.userID+","+data.providerID+");";            
            }
            else{
                query = "CALL `usp_UniqueUser_InsertUpdate`('"+data.uniqueUserID+"','"+data.providerCode+"','"+data.variableCode1+"',"+data.variableCode2+",'"+data.submitDate+"',"+data.userID+","+data.providerID+");";            
            }
            
            let output = await dbconn.runQuery(query);
            return output
            }
            catch(err){
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
            }
        
    }

    async iniqueIDTableDataDL(data) 
    { 
        try{
            let query =  "CALL `usp_UniqueUser_GetList`("+data.providerID+");";            
            let output = await dbconn.runQuery(query);
            return output
            }
            catch(err){
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
            }
        
    }

    async suspendOrRemoveUniqueIDDL(data) 
    { 
        try{            
            let query = "call usp_UniqueUser_UpdateStatus("+data.uniqueUserID+","+data.activeFlag+","+data.deleteFlag+","+data.userSkyID+");";            
            let output = await dbconn.runQuery(query);
            return output
            }
            catch(err){
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
            }
        
    }
}

module.exports = uniqueID;