const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const constant = require('../../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst= constant.DBErrorConstant();
class CategoryDL {
    constructor() {
        this.dbConnetion = new database();
    }
    
    async AddUpdateCategory(reqBodyObj) {
        //usp_Vendor_InsertUpdateData
        // `usp_Vendor_InsertUpdateData`(
        //     P_Vendor_ID INT(10),P_ServiceProviderID INT(10),P_VendorName VARCHAR(150),P_EmailID VARCHAR(50),P_TelephoneNo VARCHAR(20)
        //    ,P_Address VARCHAR(300),P_LocationID INT,P_CompanyTelephoneNo VARCHAR(20),P_PinCode INT(10),P_GSTCode VARCHAR(30)
        //    ,P_PANNo VARCHAR(30),P_FirmTypeID INT(10)
        //    )
        try {
            // let {ServiceProviderID,UserTypeID,isActivate, isUserTypeDeleted} = reqBodyObj;
            // let query = `${sps.USP_USERTYPEDISCOUNT_UPDATESTATUS} 
            // (${ServiceProviderID},${UserTypeID},${isActivate},${isUserTypeDeleted})`;
            // const  result = await this.dbConnetion.runQuery(query);
            // return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    async GetCategoryList() {
        try {

            let query = sps.USP_ECOM_VENDOR_GETLIST + "("+ 1 +")";
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    async ActivateSuspendCategory(reqBodyObj){
        // try {
        //     let {ServiceProviderID,UserTypeID,isActivate, isUserTypeDeleted} = reqBodyObj;
        //     let query = `${sps.USP_USERTYPEDISCOUNT_UPDATESTATUS} 
        //     (${ServiceProviderID},${UserTypeID},${isActivate},${isUserTypeDeleted})`;
        //     const  result = await this.dbConnetion.runQuery(query);
        //     return result;

        // } catch (error) {
        //     logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        // }
     }
     async RemoveSetCategory(reqBodyObj){
        // try {

        //     let {ServiceProviderID,UserTypeID,isActivate, isUserTypeDeleted} = reqBodyObj;
        //     let query = `${sps.USP_USERTYPEDISCOUNT_UPDATESTATUS} 
        //     (${ServiceProviderID},${UserTypeID},${isActivate},${isUserTypeDeleted})`;
        //     const  result = await this.dbConnetion.runQuery(query);
        //     return result;
            
        // } catch (error) {
        //     logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        // }
     } 
}

module.exports = CategoryDL;