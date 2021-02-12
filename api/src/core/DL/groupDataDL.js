const database = require('../../loaders/db');
const logger = require('../../config/winston');
const constant = require('../../config/constant');
const sps = constant.DBStoreProcedureConstant();
const errconst = constant.DBErrorConstant();

class GroupDataDL {

    constructor() {
        this.dbConnetion = new database();
    }

    async GetGroupList() {
        try {
            let query = sps.USP_GROUPSETANDGROUP_GETLIST + "()";
            const result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    //Add the Group set
    async AddGroupSet(reqBodyObj) {
        try {
            let groupSetId = 0;
            let {GroupSetName} = reqBodyObj;
            let query = "";
            if(groupSetId === 0) {
                query= `${sps.USP_GROUPSET_INSERTUPDATE}
                (NULL,'${GroupSetName}')`;
            }
            else{
                query = `${sps.USP_GROUPSET_INSERTUPDATE}
                 (${groupSetId},${GroupSetName})`;
            }
            
            const  result = await this.dbConnetion.runQuery(query);
            return result;
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }
    
    //Activate the Activity List
    async ActivateSuspendGroup(reqBodyObj) {
        try {
            // usp_GroupSet_UpdateStatus(P_GroupSetID INT(10),P_ActiveFlag BIT ,P_DeleteFlag bit)
            let {Group_Set_ID,Group_Set_Active_Flag,isGroupDeleted} = reqBodyObj;
            let query=`${sps.USP_GROUPSET_UPDATESTATUS}  (${Group_Set_ID},${Group_Set_Active_Flag},${isGroupDeleted})`;
            const  result = await this.dbConnetion.runQuery(query);
            return result;

        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    } 

      //Activate the Activity List
      async RemoveGroup(reqBodyObj) {
        try {
            //usp_Group_UpdateStatus(P_GroupSetID INT(10),P_GroupID INT(10),P_ActiveFlag BIT ,P_DeleteFlag BIT)
  
            let {Group_Set_ID,Group_Set_Active_Flag,isGroupDeleted} = reqBodyObj;
            let query=`${sps.USP_GROUPSET_UPDATESTATUS}  (${Group_Set_ID},${Group_Set_Active_Flag},${isGroupDeleted})`;
            const  result = await this.dbConnetion.runQuery(query);
            return result;
            
        } catch (error) {
            logger.error(`${errconst.DB_CONNECTION_ERROR}: ${error}`);
        }
    }  

}

module.exports = GroupDataDL;