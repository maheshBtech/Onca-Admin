const database = require("../../../loaders/db");
const logger = require("../../../config/winston");
const constant = require("../../../config/constant");
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();

class WishesDL {
  constructor() {
    this.dbConnection = new database();
  }
  async GetWishesList(spID) {
    try {
      let query = sps.USP_PROVIDERWISHES_GETLIST + "(" + spID + ")";
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
  async AddUpdateWishes(data) {
    try {
      let {
        Provider_Wishes_ID,
        P_ServiceProviderID,
        P_WishesTitle,
        P_UserSkeyID,
        P_Message,
      } = data;
      let query = "";
      if (Provider_Wishes_ID === 0) {
        query = `${sps.USP_PROVIDERWISHES_INSERTUPDATE}(NULL,'${P_ServiceProviderID}','${P_WishesTitle}','${P_Message}','${P_UserSkeyID}')`;
      } else {
        query = `${sps.USP_PROVIDERWISHES_INSERTUPDATE}('${Provider_Wishes_ID}','${P_ServiceProviderID}','${P_WishesTitle}','${P_Message}','${P_UserSkeyID}')`;
      }
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
  async RemoveWishes(data) {
    try {
      let { Provider_Wishes_ID, Active_Flag, Delete_Flag, P_UserSkeyID } = data;
      let query = `${sps.USP_PROVIDERWISHES_UPDATESTATUS}(${Provider_Wishes_ID},${Active_Flag},${Delete_Flag},${P_UserSkeyID})`;
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
}

module.exports = WishesDL;
