const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class UserTypeDL {
    constructor() {
        this.dbConnetion = new database();
    }
    //----------------------Grid----------------------------
    //Get the list of the activity
    async GetPugMarkUserTypeList() {
        try {

            let query = sps.USP_USERTYPEDISCOUNT_GETLIST + "()";
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 

    //Update the grid of the activity
    async UpdateCreatePugMarkUserTypeList(reqBodyObj) {
        try {
            let {ServiceProviderID,UserTypeID,Discount, UserTypeName,UserTypeDesc} = reqBodyObj;
            let query = "";
            if(UserTypeID === 0) {
                query= `${sps.USP_USERTYPEDISCOUNT_INSERTUPDATEDATA}
                (${2},NULL,${Discount},'${UserTypeName}','${UserTypeDesc}')`;
            }
            else{
                query = `${sps.USP_USERTYPEDISCOUNT_INSERTUPDATEDATA}
                 (${2},${UserTypeID},${Discount},'${UserTypeName}','${UserTypeDesc}')`;
            }
            
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
     
    //Activate the Activity List
    async ActivateSuspendPugMarkUserTypeList(reqBodyObj) {
        try {
            let {ServiceProviderID,UserTypeID,isActivate, isUserTypeDeleted} = reqBodyObj;
            let query = `${sps.USP_USERTYPEDISCOUNT_UPDATESTATUS} 
            (${ServiceProviderID},${UserTypeID},${isActivate},${isUserTypeDeleted})`;
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 

      //Activate the Activity List
      async RemovePugMarkUserTypeList(reqBodyObj) {
        try {

            let {ServiceProviderID,UserTypeID,isActivate, isUserTypeDeleted} = reqBodyObj;
            let query = `${sps.USP_USERTYPEDISCOUNT_UPDATESTATUS} 
            (${ServiceProviderID},${UserTypeID},${isActivate},${isUserTypeDeleted})`;
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 
    


  //----------------------Grid----------------------------


  
}

module.exports = UserTypeDL;
