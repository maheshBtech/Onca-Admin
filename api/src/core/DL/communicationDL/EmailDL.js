const database = require('../../../loaders/db');
const logger = require('../../../config/winston');
const environment = require('../../../config/environment');
const dbconn = new database();
const db = environment.getDBconn();
const dbname = db.dbname;

class EmailDL {
  async GetDropDownDataDL(req) {
    try {
      let query = "call usp_Template_DropdownValues(" + req.Provider_ID +");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  
  async SetAddUpdateEmailDL(req) {
    try {
      let query = "call usp_Template_InsertUpdate(" + req.templateID + "," +req.templatetypeID + "," + req.provider_ID +","+"'"+ req.templatename +"'"+","+"'"+req.subject +"'"+ "," +"'"+ req.description +"'" +"," + req.UserSkeyID +")";  ;

      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }

  async GetEmailListDL(req) {
    try {
      let query = "call usp_Template_GetList(" + req.ProviderID +");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  } 
  async RemoveEmailDL(reqBodyObj) {
    try {

       
        let query =  "call usp_Template_UpdateStatus(" + reqBodyObj.emailtemplateId + "," + reqBodyObj.Is_active +","+ reqBodyObj.Is_deleted +","+ reqBodyObj.UserSkeyID +")";
        console.log(query)
        let output = await dbconn.runQuery(query);
        return output;
        
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    
    }
} 
async SetEmailTemplatetoActivityDL(reqBodyObj) {
  try {

     
      let query =  " call usp_ActivityTemplate_Update(" + reqBodyObj.templateID + "," + reqBodyObj.templatetypeID +","+ reqBodyObj.activityID +","+ reqBodyObj.UserSkeyID +")";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output;
      
  } catch (err) {
    console.log("error: ", err);
    logger.error('Error occured while fetching data from db Error: ' + err);
    return null;
  
  }
} 
  

  
}

module.exports = EmailDL;