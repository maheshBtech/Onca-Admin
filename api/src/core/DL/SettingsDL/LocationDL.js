const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class LocationDL {
    constructor() {
        this.dbConnetion = new database();
    }
    
    async AddUpdateLocation(reqBodyObj) {
        
        
        try {
            let {TrainingLocationID,ServiceProviderID,CityName, LocationName,LocationCode} = reqBodyObj;
            let query = "";
            if(TrainingLocationID === 0) {
                query= `${sps.USP_TRAININGLOCATION_INSERTUPDATE}
                (NULL,${ServiceProviderID},'${CityName}','${LocationName}','${LocationCode}','${1}')`;
            }
            else{
                query = `${sps.USP_TRAININGLOCATION_INSERTUPDATE}
                 (${TrainingLocationID},${ServiceProviderID},${CityName},'${LocationName}','${LocationCode}','${1}')`;
            }
            
            const  result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    async GetActivityDropdownData(spID) {
        try {

            let query = sps.USP_ACTIVITY_DROPDOWNVALUES + "("+ spID+")";
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    async GetLocationListData(spID) {
        try {

            let query = sps.USP_SETTING_TRAININGLOCATION_GETLIST + "("+ spID+")";
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    //Activate the Activity List
    async ActivateSuspendSetLocation(reqBodyObj) {
        try {
           
           // `usp_TrainingLocation_UpdateStatus`(P_TrainingLocationID INT(10),P_ActiveFlag BIT,P_DeleteFlag BIT,P_UserSkeyID INT(10))
            let {TrainingLocationId,isActivate, isTrainingLocationDeleted,TLServiceProviderID} = reqBodyObj;
            let query = `${sps.USP_TRAININGLOCATION_UPDATESTATUS} 
            (${TrainingLocationId},${isActivate},${isTrainingLocationDeleted},${TLServiceProviderID})`;
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 

      //Activate the Activity List
      async RemoveSetLocation(reqBodyObj) {
        try {

             // `usp_TrainingLocation_UpdateStatus`(P_TrainingLocationID INT(10),P_ActiveFlag BIT,P_DeleteFlag BIT,P_UserSkeyID INT(10))
             let {TrainingLocationId,isActivate, isTrainingLocationDeleted,TLServiceProviderID} = reqBodyObj;
             let query = `${sps.USP_TRAININGLOCATION_UPDATESTATUS} 
             (${TrainingLocationId},${isActivate},${isTrainingLocationDeleted},${TLServiceProviderID})`;
             console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }  
}

module.exports = LocationDL;