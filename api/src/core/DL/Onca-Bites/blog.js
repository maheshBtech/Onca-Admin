const database = require("../../../loaders/db");
const logger = require("../../../config/winston");
const constant = require("../../../config/constant");
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();

class BlogDL {
  constructor() {
    this.dbConnection = new database();
  }
  async GetBlogList(spID) {
    try {
      let query = sps.USP_BLOG_GETLIST + "(" + spID + ")";
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
  async AddUpdateBlogs(data) {
    try {
      let {
        P_BlogTitle,
        P_BlogID,
        P_ServiceProviderID,
        P_ActivityTypeID,
        P_UserSkeyID,
        P_Description,
        P_ImagePath,
        P_VisibilityFlag,
        P_WebsiteVisibilityFlag,
        P_MobileVisibilityFlag,
      } = data;

      let query = "";
      if (P_BlogID == 0) {
        query = `${sps.USP_BLOGS_INSERTUPDATE}(NULL,${P_ServiceProviderID},'${P_BlogTitle}',${P_ActivityTypeID},"${P_Description}",'${P_ImagePath}',${P_VisibilityFlag},${P_WebsiteVisibilityFlag},${P_MobileVisibilityFlag},${P_UserSkeyID})`;
      } else {
        query = `${sps.USP_BLOGS_INSERTUPDATE}(${P_BlogID},${P_ServiceProviderID},'${P_BlogTitle}',${P_ActivityTypeID},"${P_Description}",'${P_ImagePath}',${P_VisibilityFlag},${P_WebsiteVisibilityFlag},${P_MobileVisibilityFlag},${P_UserSkeyID})`;
      }
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }

  async AddUpdateBlogsDetails(data) {
    try {
      let {
        P_BlogTitle,
        P_BlogID,
        P_ServiceProviderID,
        P_ActivityTypeID,
        P_UserSkeyID,
        P_Description,
        P_ImagePath,
        P_VisibilityFlag,
        P_WebsiteVisibilityFlag,
        P_MobileVisibilityFlag,
      } = data;

      let query = "";
      if (P_BlogID == 0) {
        query = `${sps.USP_BLOGS_INSERTUPDATE}(NULL,${P_ServiceProviderID},'${P_BlogTitle}',${P_ActivityTypeID},"${P_Description}",'${P_ImagePath}',${P_VisibilityFlag},${P_WebsiteVisibilityFlag},${P_MobileVisibilityFlag},${P_UserSkeyID})`;
      } else {
        query = `${sps.USP_BLOGS_INSERTUPDATE}(${P_BlogID},${P_ServiceProviderID},'${P_BlogTitle}',${P_ActivityTypeID},"${P_Description}",'${P_ImagePath}',${P_VisibilityFlag},${P_WebsiteVisibilityFlag},${P_MobileVisibilityFlag},${P_UserSkeyID})`;
      }
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }


  async RemoveBlogs(data) {
    try {
      let { P_BlogID, P_ActiveFlag, P_DeleteFlag, P_UserSKeyID } = data;
      let query = `${sps.USP_BLOG_UPDATESTATUS}(${P_BlogID},${P_ActiveFlag},${P_DeleteFlag},${P_UserSKeyID})`;
      const result = await this.dbConnection.runQuery(query);
      return result;
    } catch (error) {
      logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
    }
  }
}

module.exports = BlogDL;
