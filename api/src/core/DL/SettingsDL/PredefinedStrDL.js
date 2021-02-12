const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class LocationDL {
    constructor() {
        this.dbConnetion = new database();
    }
    
    async AddUpdatePreStr(reqBodyObj) {

        try {
            
            let query = "call usp_PredefinedString_InsertUpdate(" + reqBodyObj.prestrID + "," + reqBodyObj.provider_ID +","+"'"+ reqBodyObj.prestr +"'"+","+"'"+reqBodyObj.fullform +"'"+ "," + reqBodyObj.PreDefDesccheckedValue +"," + reqBodyObj.valuecheckedValue +"," + reqBodyObj.UserSkeyID +")";  ;
          console.log(query);
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    async GetPreStrList(req) {
        try {

            let query = "call usp_PredefinedString_Getlist(" + req.ProviderID + ")";
            console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }


      //Activate the Activity List
      async RemoveSetPreStr(reqBodyObj) {
        try {

           
            let query =  "call usp_PredefinedString_UpdateStatus(" + reqBodyObj.prestrId + "," + reqBodyObj.Is_active +","+ reqBodyObj.Is_deleted +","+ reqBodyObj.UserSkeyID +")";
console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }  
}

module.exports = LocationDL;