const BaseURL = "http://localhost:3001/";
//const BaseURL = "http://admin.allapp.co.in/api/";

let base = BaseURL;
export const baseUrl = base;
export const EnvironmentUrl = "ping";
//login related urls
export const loginusingpass = base + "login/";
export const forgotpassurlb = base + "Forgotpass/";
export const auth = base + "auth/";
export const logout = base + "logout/";
export const checktoken = base + "checkToken/";
export const fileuploadurl = base + "/Fileupload/Uploadfile";
//Dashboard related urls
export const alertData_dash = base + "dashboard/alertData";
export const logData_dash = base + "dashboard/logData";
export const activityGraph_dash = base + "dashboard/activityGraph";
export const revenueGraph_dash = base + "dashboard/revenueGraph";
export const newLeadGraph_dash = base + "dashboard/newLeadGraph";
export const newRegistrationGraph_dash =
  base + "dashboard/newRegistrationGraph";
export const cardDashboard_dash = base + "dashboard/cardDashboard";
export const roleDataURL = base + "role/data";
export const removeUserURL = base + "role/data/removeUser";
export const listRoleURL = base + "role/data/getRoleList";
export const assginRoleURL = base + "role/data/assignRole";
export const roleUserList = base + "role/data/getUserList";
export const profileDetails = base + "navigationData/data";
export const AddProvider = base + "provider/add/addProvider";
export const GetProviders = base + "provider/get/test";
export const providerActivateOrDeactive =
  base + "provider/get/activateDeactivateProvider";
export const getProviderCardData = base + "provider/get/getProviderCardData";
export const generateAuthenticationCode =
  base + "provider/get/generateAuthenticationCode";
export const inserttAuthenticationCode =
  base + "provider/get/inserttAuthenticationCode";
export const getAuthenticationCodeDetails =
  base + "noAuth/getAuthenticationCodeDetails";
export const addProviderFromProviderSignup =
  base + "noAuth/addProviderFromProviderSignup";
export const deactivateAuthenticationCode =
  base + "noAuth/deactivateAuthenticationCode";
export const mailer = base + "mailer/go/setMail";
//Other status
export const ExceptionMessage = "error occured";
export const Environment = "";
export const RetCodeFailure = "FAILURE";
export const RetCodeSuccess = "SUCCESS";
//Activity
export const getActivityListURL = base + "activity/data/GetActivityList";
export const putActivateRemoveActivityListURL =
  base + "activity/data/ActivateRemoveActivityList";
export const AddUpdateActivityURL = base + "activity/data/AddUpdateActivity";
export const ActivityAddTemplateURL =
  base + "activity/data/ActivityAddTemplate";
export const GetActivateTypeListURL =
  base + "activity/data/GetActivityTypeList";
export const GetActivityByIdURL = base + "activity/data/GetActivityById";

//Group - in Activity
export const GetGroupListURL = base + "groupData/data/GetGroupList";
export const AddGroupSetURL = base + "groupData/data/AddGroupSet";
export const ActivateSuspendGroupURL =
  base + "groupData/data/ActivateSuspendGroup";
export const RemoveGroupURL = base + "groupData/data/RemoveGroup";

export const GetNewActivityFormDDLsURL =
  base + "activity/data/GetNewActivityFormDDLs"; // all the ddls data for Create activity form
//export const GetGroupListURL = base + 'groupData/data/GetGroupList';

//Pugmark-UserType
export const getPugMarkUserTypeListURL =
  base + "pugmark/usertype/data/GetPMUserTypeList";
export const createUpdatePugMarkUserTypeListURL =
  base + "pugmark/usertype/data/CreateUpdatePMUserType";
export const isActivateSuspendPugMarkUserTypeListURL =
  base + "pugmark/usertype/data/ActivateSuspendPMUserType";
export const removePugMarkUserTypeListURL =
  base + "pugmark/usertype/data/RemovePMUserType";

//Finance-Promocode
export const getPromocodeDropdownDataURL =
  base + "finance/promocode/data/getDropdownData";
export const setAddUpdatePromocodeURL =
  base + "finance/promocode/data/SetAddUpdatePromocode";
export const GetPromocodeListURL =
  base + "finance/promocode/data/GetPromocodeList";
export const removePromocodeURL =
  base + "finance/promocode/data/RemovePromocode";
export const isActivateSuspendPromocodeListURL =
  base + "finance/promocode/data/ActivateSuspendPromocode";

//Pugmark-Request
export const getpugmarkrequestlistURL =
  base + "pugmark/pugmarkrequest/data/GetPMrequestList";
export const ApproveRejectPMReq =
  base + "pugmark/pugmarkrequest/data/ApproveRejectPMReq";

//Pugmark-Statement
export const getpugmarksegmentlistURL =
  base + "pugmark/pugmarksegment/data/GetPMsegmentlist";
export const DropdownDataPMSegment =
  base + "pugmark/pugmarksegment/data/DropdownDataPMSegment";
  export const InsertUpdatePMSegment =
  base + "pugmark/pugmarksegment/data/InsertUpdatePMSegment";

//users page API call
export const userTableData = base + "user/userTableData";
export const activityTableData = base + "user/activityTableData";
export const insertCreateAOD = base + "activity/data/insertCreateAOD";
export const updateUserDetails = base + "user/updateUserDetals";

//leaderboard
export const leaderboardRace = base + "leaderboard/leaderboardRace";
export const leaderboardRacebyID =
  base + "leaderboard/leaderboardRacebyFitnessID";
export const leaderboardAddRace = base + "leaderboard/leaderboardAddRace";
export const DeleteleaderboardRace = base + "leaderboard/DeleteleaderboardRace";
export const activitydata = base + "leaderboard/activitydata";
export const leaderboardWorkout = base + "leaderboard/leaderboardWorkout";

export const ListRunnersURL = base + "leaderboard/leaderboardRunnerList";
export const ListLeadershipDropdownURL =
  base + "leaderboard/leaderboardDropdownList";
export const filterLeaderboardResultdata =
  base + "leaderboard/filterLeaderboardResultdata";
export const FilterleaderboardWorkout =
  base + "leaderboard/FilterleaderboardWorkout";
export const leaderboardResultList = base + "leaderboard/leaderboardResultList";
export const Insertleaderboardtiming =
  base + "leaderboard/Insertleaderboardtiming";
export const Deleteleaderboardtiming =
  base + "leaderboard/Deleteleaderboardtiming";

//NewVendor
export const addEcomNewVendorURL = base + "ecom/data/EcomAddVendor";
export const getEcomGetVendorListURL = base + "ecom/data/EcomGetVendorList";

//Setting- TrainingLocation
export const setAddUpdateLocationURL =
  base + "setting/data/SetAddUpdateLocation";
export const setGetSettingListURL = base + "setting/data/SetGetLocationList";
export const activateSuspendSetLocationURL =
  base + "setting/data/ActivateSuspendSetLocation";
export const removeSetLocationURL = base + "setting/data/RemoveSetLocation";
export const setGetActivityDropdownDataURL =
  base + "setting/data/SetGetActivityDropdownData";

//Pugmark-UserType
export const setAddUpdatePreStrURL =
  base + "setting/predefinedStr/data/SetAddUpdatePreStr";
export const setGetPreStrListURL =
  base + "setting/predefinedStr/data/SetGetPreStrList";
export const removeSetPreStrURL =
  base + "setting/predefinedStr/data/RemoveSetPreStr";

//communication
export const getDropdownDataURL =
  base + "communication/email/data/getDropdownData";
export const setAddUpdateEmailURL =
  base + "communication/email/data/SetAddUpdateEmail";
export const GetEmailListURL = base + "communication/email/data/GetEmailList";
export const removeEmailTemplateURL =
  base + "communication/email/data/RemoveEmail";
export const SetEmailTemplatetoActivityURL =
  base + "communication/email/data/SetEmailTemplatetoActivity";

//unique ID
export const insertUniqueID = base + "setting/uniqueID/insertUniqueID";
export const uniqueIDTableData = base + "setting/uniqueID/uniqueIDTableData";
export const suspendOrRemoveUniqueID =
  base + "setting/uniqueID/suspendOrRemoveUniqueID";

//Setting- Distance
export const setAddUpdateDistanceURL =
  base + "setting/distance/data/SetAddUpdateDistance";
export const setGetDistanceListURL =
  base + "setting/distance/data/SetGetDistanceList";
export const removeSetDistanceURL =
  base + "setting/distance/data/RemoveSetDistance";

//Communication-wishes
export const commAddUpdateWishesURL =
  base + "comm/wishes/data/CommAddUpdateWishes";
export const commWishesListURL = base + "comm/wishes/data/CommGetWishesList";
export const commRemoveWishesURL = base + "comm/wishes/data/CommRemoveWishes";
//communication-FAQ
export const commFAQsListURL = base + "comm/faq/data/CommGetFaqListData";
export const commFAQAddUpdateURL = base + "comm/faq/data/CommAddUpdateFaq";
export const commFAQRemoveURL = base + "comm/faq/data/CommRemoveSetFaq";

//Razorpay
export const OrderRazorpay = base + "pugmark/pugmarkrequest/data/Razorpay"
//Onca-Bites
export const oncaBitesBlogList =
  base + "oncaBites/blogs/data/OncaBitesGetBlogList";
export const oncaBitesBlogAddUpdate =
  base + "oncaBites/blogs/data/OncaBitesAddUpdate";
export const oncaBitesBlogUpdateStatus =
  base + "oncaBites/blogs/data/OncaBiteUpdateStatus";
export const oncaBitesBlogUpdateDetails =
  base + "oncaBites/blogs/data/OncaBitesUpdateDetails";
