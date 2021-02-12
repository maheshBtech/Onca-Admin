"use strict"
var database = require('../../loaders/db');
var logger = require('../../config/winston');
var environment = require('../../config/environment');
var dbconn = new database();
var db = environment.getDBconn();
const dbname = db.dbname;
class UserDL
{
    
    async userTableDataDl(){
        try{
            let query = "CALL  usp_User_GetUsersList(NULL,NULL,NULL,NULL);";   
            console.log(query)                
            let output = await dbconn.runQuery(query);            
            return output
            }
            catch(err){
            console.log("error: ", err);
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
            }
        } 

        async activityTableDataDl(req){
            try{
                let query = "CALL  usp_User_GetUserDetails_Admin('"+req.email+"','"+req.password+"');";   
                console.log(query)                
                let output = await dbconn.runQuery(query);            
                return output
                }
                catch(err){
                console.log("error: ", err);
                logger.error('Error occured while fetching data from db Error: ' + err);
                return null;
                }
            } 
        
            async insertCreateAODDl(req){
                try{
                    let query = "CALL usp_ActivityAOD_InsertUpdateData(NULL,"+req.activityID+","+req.activityScheduleID+","+req.AODTypeID+",'"+req.AODStartDate+"','"+req.AODEndDate+"','"
                    +req.startTime+"','"+req.endTime+"','"+req.aodTitle+"','"+req.AODDesc+"',"+req.duration+","+req.priorityID+","+req.reminderActivityTempletID+",'"
                    +req.reminderID+"','"+req.reminderDesc+"',"+req.feedbackTempletID+","+req.scheduledBeforeID+",'"+req.imagePath+"',"+req.scheduledBeforeFlag+","
                    +req.allowedFeedbackFlag+","+req.archiveFlag+","+req.userID+");";   
                    console.log(query)                
                    let output = await dbconn.runQuery(query);            
                    return output
                    }
                    catch(err){
                    console.log("error: ", err);
                    logger.error('Error occured while fetching data from db Error: ' + err);
                    return null;
                    }
                }


                async updateUserDetalsDl(data){
                    try{
                        let query =  "call usp_UserDetails_InsertUpdateData("+data.userID+",'"+data.email+"',"
                        +data.userTypeID+",'"+data.phoneNumber+"','"+data.emergencyPhoneNumber+"',"
                        +data.genderID+",'"+data.address+"','"+data.dob+"',"+data.locationID+","
                        +data.countryID+","+data.stateID+","+data.cityID+","+data.tShirtSizeID
                        +","+data.bloodGroupID+",'"+data.referalEmailID+"','"+data.emergencyName
                        +"',"+data.userTypeVerifiedFlag+",'"+data.firstName+"','"+data.lastName+"',"
                        +data.password+",'"+data.unqueUserID+"','"+data.health+"','"+data.maxDistLast+"');"      
                        query = String(query).replace('undefined','')                     
                        let output = await dbconn.runQuery(query);            
                        return output
                        }
                        catch(err){
                        console.log("error: ", err);
                        logger.error('Error occured while fetching data from db Error: ' + err);
                        return null;
                        }
                    }


            }
module.exports = UserDL;
