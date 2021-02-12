class Constant {
  static DBErrorConstant() {
    const DBErrorConstant = {
      DB_CONNECTION_ERROR:
        "Error occured while fetching data from db for Role Error",
    };
    return DBErrorConstant;
  }

  static DBStoreProcedureConstant() {
    const DBStoreProcedureConstant = {
      USP_ACTIVITY_GETLIST: "CALL usp_Activity_GetList",
      USP_ACTIVITY_UPDATEDELETESTATUS: "CALL usp_Activity_UpdateStatus",
      USP_ACTIVITY_UPDATESTATUS: "CALL usp_Activity_UpdateStatus",
      USP_ACTIVITY_INSERTUPDATEDATA: "CALL usp_Activity_InsertUpdateData",
      USP_ACTIVITYTEMPLATE_INSERTUPDATEDATA:
        "CALL usp_ActivityTemplate_InsertUpdateData",
      USP_PUGMARKS_GETLIST: "call usp_Pugmarks_GetList",
      USP_USERTYPEDISCOUNT_GETLIST: "call usp_UserTypeDiscount_GetList",
      USP_USERTYPEDISCOUNT_UPDATESTATUS:
        "call usp_UserTypeDiscount_UpdateStatus",
      USP_USERTYPEDISCOUNT_INSERTUPDATEDATA:
        "call usp_UserTypeDiscount_InsertUpdateData",
      USP_ACTIVITY_DROPDOWNVALUES: "CALL usp_Activity_DropDownValues",
      USP_ECOM_VENDOR_INSERTUPDATEDATA: "call usp_Vendor_InsertUpdateData",
      USP_ECOM_VENDOR_GETLIST: "call usp_Vendor_GetList",
      USP_ACTIVITY_GETDETAILS: "CALL usp_Activity_GetDetails",
      USP_SETTING_TRAININGLOCATION_GETLIST: "call usp_TrainingLocation_GetList",
      USP_TRAININGLOCATION_UPDATESTATUS:
        "call usp_TrainingLocation_UpdateStatus",
      USP_TRAININGLOCATION_INSERTUPDATE:
        "call usp_TrainingLocation_InsertUpdate",
      USP_DISTANCEOPTION_GETLIST: "call usp_DistanceOption_GetList",
      USP_DISTANCEOPTION_INSERTUPDATE: "call usp_DistanceOption_InsertUpdate",
      USP_DISTANCEOPTIOM_UPDATESTATUS: ` call usp_DistanceOption_UpdateStatus`,
      USP_PROVIDERWISHES_GETLIST: "call usp_ProviderWishes_GetList",
      USP_PROVIDERWISHES_INSERTUPDATE: "call usp_ProviderWishes_InsertUpdate",
      USP_PROVIDERWISHES_UPDATESTATUS: "call usp_ProviderWishes_UpdateStatus",
      USP_FAQS_GETLIST: "call usp_FAQs_GetList",
      USP_FAQS_UPDATESTATUS: "call usp_FAQs_InsertUpdate",
      USP_FAQS_INSERTUPDATE: "call usp_FAQs_UpdateStatus",

      USP_GROUPSETANDGROUP_GETLIST: "call usp_GroupSetAndGroup_GetList",
      USP_GROUPSET_UPDATESTATUS: "call usp_GroupSet_UpdateStatus",
      USP_GROUPSET_INSERTUPDATE: "call usp_GroupSet_InsertUpdate",

      USP_BLOGS_INSERTUPDATE: "call usp_Blogs_InsertUpdate",
      USP_BLOG_UPDATESTATUS: "call usp_Blog_UpdateStatus",
      USP_BLOG_GETLIST: "call usp_Blog_GetList"



    };
    return DBStoreProcedureConstant;
  }
}

module.exports = Constant;
