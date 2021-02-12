const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class PugmarkRequestDL {
    constructor() {
        this.dbConnetion = new database();
    }



    async GetPugMarkrequestList(reqBodyObj) {
     
      try {

        let query = "call usp_Pugmarks_GetList(" + reqBodyObj.ProviderID + ")";
        const  result = await this.dbConnetion.runQuery(query);
        return result;

    } catch (error) {
        logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
} 

async ApproveRejectPMReq(reqBodyObj) {
     
  try {

    let query = "call usp_Pugmark_RequestUpdate(" + reqBodyObj.Pugmark_ID +","+ reqBodyObj.Approve_Flag+",'" + reqBodyObj.Reason +"',"+ reqBodyObj.USerID+")";
    console.log(query);
    const  result = await this.dbConnetion.runQuery(query);
    return result;


} catch (error) {
    logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
}
} 
    

  
}

module.exports = PugmarkRequestDL;
