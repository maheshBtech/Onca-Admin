const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class PromocodeDL {
    constructor() {
        this.dbConnetion = new database();
    }

    async GetDropdownValuesList(req) {
        try {

            let query = "call usp_Promocode_DropdownValues(" + req.ProviderID + ")";
            console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    async AddUpdatePromocode(reqBodyObj) {

        try {
            
            let query = "call usp_Promocode_InsertUpdate(" + reqBodyObj.promocodeID + "," + reqBodyObj.provider_ID +","+"'"+ reqBodyObj.promocode +"'"+","+reqBodyObj.promocodevalue + "," +"'"+ reqBodyObj.promocodeDesc +"'"+","+ "'"+ reqBodyObj.startdate +"'"+"," +"'"+ reqBodyObj.todate +"'"+"," + reqBodyObj.maxuserlimit +"," + reqBodyObj.signupflag +"," + reqBodyObj.registeredflag +
            "," + reqBodyObj.interesteduserflag +"," + reqBodyObj.oldrunnerflag +"," + reqBodyObj.visibilityflag +"," + "'"+ reqBodyObj.traininglocationIds+"'" +"," + "'"+reqBodyObj.activityids +"'"+"," + reqBodyObj.UserSkeyID +")";  ;
          console.log(query);
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    async GetPromocodeList(req) {
        try {

            let query = "call usp_Promocode_GetList(" + req.ProviderID + ")";
            console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    

    async ActivateSuspendPromocode(reqBodyObj) {
        try {

           
            let query =  "call usp_Promocode_UpdateStatus(" + reqBodyObj.Promocode_ID + "," + reqBodyObj.isActivate +","+ reqBodyObj.isPromocodeDeleted +","+ reqBodyObj.UserSkeyID +")";
            console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 

   
      async RemoveSetPromocode(reqBodyObj) {
        try {

           
            let query =  "call usp_Promocode_UpdateStatus(" + reqBodyObj.Promocode_ID + "," + reqBodyObj.isActivate +","+ reqBodyObj.isPromocodeDeleted +","+ reqBodyObj.UserSkeyID +")";
            console.log(query)
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }  
}

module.exports = PromocodeDL;