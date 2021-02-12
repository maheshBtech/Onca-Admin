const database = require('../../loaders/db');
const logger = require('../../config/winston');
const constant = require('../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();

class ActivityDL {
    constructor() {
        this.dbConnetion = new database();
    }
    //----------------------Grid----------------------------
    //Get the list of the activity
    async GetActivityList() {
        try {

            let query = sps.USP_ACTIVITY_GETLIST + "()";
            const result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    //Update the grid of the activity
    async UpdateActivityList(reqBodyObj) {
        try {

            let query = sps.USP_ACTIVITY_GETLIST + "()";
            const result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    //Activate the Activity List
    async ActivateRemoveActivityList(reqBodyObj) {
        try {
            let { P_ActivityID, P_DeleteFlag, P_ActiveFlag, P_UserID } = reqBodyObj;
            let query = `${sps.USP_ACTIVITY_UPDATESTATUS}(${P_ActivityID},${P_DeleteFlag},${P_ActiveFlag},${P_UserID})`;
            const result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    //Update the grid of the activity
    async AddUpdateActivity(data) {
        try {
            let query = `${sps.USP_ACTIVITY_INSERTUPDATEDATA}(${data.P_ActivityID},${data.P_ServiceProviderID},${data.P_ActivityTypeID},'${data.P_ActivityName}','${data.P_ActivityShortDesc}','${data.P_ActivityFullDesc}',${data.P_GroupSetID},'${data.P_StartDate}','${data.P_EndDate}','${data.P_StartTime}','${data.P_EndTime}','${data.P_ActivityDayJSON}',${data.P_Rating},${data.P_CategoryID},'${data.P_AdditionalInformation}',${data.P_CountryID},${data.P_StateID},${data.P_CityID},'${data.P_TrainingLocationID}',${data.P_RegistrationTemplateID},${data.P_RegistrationSuccessMailTemplateID},${data.P_RegistrationFailureMailTemplateID},${data.P_ECertificateTemplateID},${data.P_MaxUserLimit},${data.P_ActivityAODFlag},${data.P_NewActivityFlag},${data.P_ECertificateFlag},${data.P_WebsiteVisibilityFlag},${data.P_AppVisibilityFlag},${data.P_VisibilityFlag},${data.P_ActivityChatFlag},${data.P_GroupChatFlag},${data.P_ArchiveFlag},${data.P_ArchiveDurationDays},'${data.P_Image}','${data.P_Tags}','${data.P_MappedUserSkeyIDs}','${data.P_ActivityPricing_JSON}',${data.P_StartEmailTemplateID},${data.P_EndEmailTemplateID},'${data.P_StartEmailSubject}','${data.P_StartEmailDescription}','${data.P_EndEmailSubject}','${data.P_EndEmailDescription}',${data.P_ActivityStartMailFlag},${data.P_ActivityEndMailFlag},'${data.P_StartSMSMessage}','${data.P_EndSMSMessage}',${data.P_ActivityModeLiveFlag},${data.P_ActivityModeOnlineFlag},${data.P_ActivityModeOnGroundFlag},${data.P_UserID})`;
            console.log(query)
            const result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    //Update the grid of the activity
    async ActivityAddTemplate(data) {
        try {
            let query = `${sps.USP_ACTIVITYTEMPLATE_INSERTUPDATEDATA}(${data.P_ActivityTemplateID},'${data.P_ActivityTemplateName}',${data.P_ServiceProviderID},${data.P_ActivityTypeID},'${data.P_ActivityName}','${data.P_ActivityShortDesc}','${data.P_ActivityFullDesc}',${data.P_GroupSetID},'${data.P_StartDate}','${data.P_EndDate}','${data.P_StartTime}','${data.P_EndTime}','${data.P_ActivityDayJSON}',${data.P_Rating},${data.P_CategoryID},'${data.P_AdditionalInformation}',${data.P_CountryID},${data.P_StateID},${data.P_CityID},'${data.P_TrainingLocationID}',${data.P_RegistrationTemplateID},${data.P_RegistrationSuccessMailTemplateID},${data.P_RegistrationFailureMailTemplateID},${data.P_ECertificateTemplateID},${data.P_MaxUserLimit},${data.P_ActivityAODFlag},${data.P_NewActivityFlag},${data.P_ECertificateFlag},${data.P_WebsiteVisibilityFlag},${data.P_AppVisibilityFlag},${data.P_VisibilityFlag},${data.P_ActivityChatFlag},${data.P_GroupChatFlag},${data.P_ArchiveFlag},${data.P_ArchiveDurationDays},'${data.P_Image}','${data.P_Tags}','${data.P_MappedUserSkeyIDs}','${data.P_ActivityPricing_JSON}',${data.P_StartEmailTemplateID},${data.P_EndEmailTemplateID},'${data.P_StartEmailSubject}','${data.P_StartEmailDescription}','${data.P_EndEmailSubject}','${data.P_EndEmailDescription}',${data.P_ActivityStartMailFlag},${data.P_ActivityEndMailFlag},'${data.P_StartSMSMessage}','${data.P_EndSMSMessage}',${data.P_ActivityModeLiveFlag},${data.P_ActivityModeOnlineFlag},${data.P_ActivityModeOnGroundFlag},${data.P_UserID})`;
            console.log(query)
            const result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    async GetActivateTypeList() {
        try {
            let query = "select * from lkp_Activity_Type"
            const result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }

    async GetNewActivityFormDDLs(ProviderId) {
        try {
            //let query = "CALL usp_Activity_DropDownValues(" + ProviderId + ");";
            let query = `${sps.USP_ACTIVITY_DROPDOWNVALUES}(${ProviderId})`
            console.log(query)
            let output = await this.dbConnetion.runQueryConnection(query);
            return output
        } catch (err) {
            console.log("error: ", err);
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
        }
    }

    async GetActivityById(ActivityId) {
        try {
            //let query2 = "CALL usp_Activity_GetDetails(" + ActivityId + ");";
            let query = `${sps.USP_ACTIVITY_GETDETAILS}(${ActivityId})`
            console.log(query)
            let output = await this.dbConnetion.runQueryConnection(query);
            return output
        } catch (err) {
            console.log("error: ", err);
            logger.error('Error occured while fetching data from db Error: ' + err);
            return null;
        }
    }

}

module.exports = ActivityDL;