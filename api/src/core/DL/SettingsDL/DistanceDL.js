const database = require("../../../loaders/db");
const logger = require("../../../config/winston");
const constant = require("../../../config/constant");
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();
class DistanceDL {
  constructor() {
    this.dbConnetion = new database();
  }

  async AddUpdateDistance(reqBodyObj) {
    try {
      let {
        DistanceOptID,
        DistanceServiceProviderID,
        DistanceOpt,
        DistanceMFT,
      } = reqBodyObj;
      let query = "";
      if (DistanceOptID === 0) {
        query = `${sps.USP_DISTANCEOPTION_INSERTUPDATE}
                (NULL,'${DistanceServiceProviderID}','${DistanceOpt}','${DistanceMFT}','${1}')`;
      } else {
        query = `${sps.USP_DISTANCEOPTION_INSERTUPDATE}
                 (${DistanceOptID},${DistanceServiceProviderID},${DistanceOpt},'${DistanceMFT}','${1}')`;
      }

      const result = await this.dbConnetion.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }

  async GetDistanceListData(spID) {
    try {
      let query = sps.USP_DISTANCEOPTION_GETLIST + "(" + spID + ")";
      const result = await this.dbConnetion.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }

  //Activate the Activity List
  async RemoveSetDistance(reqBodyObj) {
    try {
      let { DistanceOptionID, isActivate, isDistanceDeleted } = reqBodyObj;
      let userskey = 1;
      let query = `${sps.USP_DISTANCEOPTIOM_UPDATESTATUS}(${DistanceOptionID},${isActivate},${isDistanceDeleted},${userskey})`;

      const result = await this.dbConnetion.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
}

module.exports = DistanceDL;
