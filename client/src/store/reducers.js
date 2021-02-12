import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";

//forRoleDataTableMode
import roleTableMode from "./role/tableMode/reducer";
//forRoleTableData
import roleTableData from "./role/tableData/reducer";
import selectedRoles from "./role/selectedRoles/reducer";
import rolePopup from "./role/roleTablePopup/reducer";
import rolePopupData from "./role/rolePopupData/reducer";
import masterRoleTableData from "./role/masterTableData/reducer";
import currentPageName from "./navigation/reducer";
import userProfileData from "./profileData/reducer";
import reloadProviderTableData from "./provider/reducer";
import activityReducer from "./activity/activityReducer";
import userPageData from "./users/reducer";
import generalData from "./generalData/reducer";
import raceTableData from "./Leaderboard/tableData/reducer";
import raceData from "./Leaderboard/RaceData/reducer";
import selectedActivity from "./Leaderboard/SelectedActivity/reducer";
import workoutData from "./Leaderboard/WorkoutData/reducer";
import LeaderboardResult from "./Leaderboard/LeaderboardResult/reducer";
import PugMarkRequestResult from "./PugMark/PugMarkRequest/TableData/reducer";
import  PugMarkStatementResult from './PugMark/PugmarkSegment/reducer'
import PreStrTableData from "./Settings/predefinedStr/tableData/reducer";
import uniqueID from "./Settings/uniqueID/reducer";
import Email from "./communication/Email/reducer";
import Promocode from "./Promocode/reducer";
import Blogs from "./Onca Bites/Blogs/Reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  generalData,
  roleTableMode,
  roleTableData,
  selectedRoles,
  rolePopup,
  rolePopupData,
  masterRoleTableData,
  currentPageName,
  userProfileData,
  reloadProviderTableData,
  activityReducer,
  userPageData,
  raceTableData,
  raceData,
  selectedActivity,
  workoutData,
  LeaderboardResult,
  PugMarkRequestResult,
  PreStrTableData,
  uniqueID,
  Email,
  Promocode,
  PugMarkStatementResult,
  Blogs,
});

export default rootReducer;
