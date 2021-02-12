const database = require("../../../loaders/db");
const logger = require("../../../config/winston");
const constant = require("../../../config/constant");
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();
class FaqDL {
  constructor() {
    this.dbConnetion = new database();
  }

  async CommAddUpdateFaq(reqBodyObj) {
    try {
      let {
        P_ServiceProviderID,
        P_TopicName,
        P_Question,
        P_Answer,
        P_UserSKeyID,
        P_FAQID,
      } = reqBodyObj;
      let query = "";
      if (P_FAQID === 0) {
        query = `${sps.USP_FAQS_UPDATESTATUS}(NULL,${P_ServiceProviderID},'${P_TopicName}','${P_Question}','${P_Answer}',${P_UserSKeyID})`;
      } else {
        query = `${sps.USP_FAQS_UPDATESTATUS}(${P_FAQID},${P_ServiceProviderID},'${P_TopicName}','${P_Question}','${P_Answer}',${P_UserSKeyID})`;
      }
      const result = await this.dbConnetion.runQuery(query);

      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }

  async CommGetFaqListData(obj) {
    try {
      const { spID, topicName } = obj;

      let query = "";
      if (topicName === "" || topicName === null || topicName === undefined) {
        query = `${sps.USP_FAQS_GETLIST}(${spID},NULL)`;
      } else {
        query = `${sps.USP_FAQS_GETLIST}(${spID},'${topicName}')`;
      }

      const result = await this.dbConnetion.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }

  //Activate the Activity List
  async CommRemoveSetFaq(reqBodyObj) {
    try {
      //   let {
      //     ServiceProviderID,
      //     TopicName,
      //     Question,
      //     Answer,
      //     UserSkeyID,
      //   } = reqBodyObj;
      //   let query = `${sps.USP_FAQS_INSERTUPDATE}
      //         (NULL,${ServiceProviderID},'${TopicName}','${Question}','${Answer}',${UserSkeyID})`;
      //   const result = await this.dbConnetion.runQuery(query);
      //   return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
}

module.exports = FaqDL;
