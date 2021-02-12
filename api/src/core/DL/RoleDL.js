"use strict"
var database = require('../../loaders/db');
var logger = require('../../config/winston');
var environment = require('../../config/environment');
var dbconn = new database();
var db = environment.getDBconn();
const dbname = db.dbname;
class RoleDL
{
//below method is to check the the user login creds
async getRoleData(loginuser){
    const usermail =  loginuser.Email;
    const pass =  loginuser.Password;
    let sqlquery = 'call usp_User_GetUserDetails_Admin('+`'${usermail}','${pass}');` ;
    let roledata = [];
    
    try {
       const roleDataAll = await dbconn.runQuery(sqlquery); //calling the db query
        for (let i = 0; i < roleDataAll.length; i++) {
            if(roleDataAll[i][i].EmailID == usermail){
            roledata.push(roleDataAll[i][i]);
            logger.info('Role data: ' + roledata);
        return roledata;
            }
        }
    }
    catch (err) {
    logger.error('Error occured while fetching data from db for Role Error: ' + err);
    return null;
    }
    
    }
async getTableDataDL(){
    try{
    let query = "CALL usp_User_GetRoleList();";
    /*"CREATE TEMPORARY TABLE data (userID varchar(100),  Role varchar(100), MemberName varchar(1000), EmailID varchar(1000), PhNumber bigint); INSERT into data select a.User_ID, b.Role_Name, CONCAT(a.First_Name,' ',a.Last_Name), a.Email_ID,a.Telephone_No from tbl_Users a inner join lkp_Role b on a.User_Skey_ID = b.Role_ID;select * from data; select Role, COUNT(*) AS `num`  from data GROUP BY Role ;";*/
   
    let output = await dbconn.runQuery(query);
    return output
    }
    catch(err){
    logger.error('Error occured while fetching data from db Error: ' + err);
    return null;
    }
    
}

async removeUserDL(userID){
    try{
        let query = "UPDATE `tbl_Users` SET `Active_Flag` = 0 WHERE `tbl_Users`.`User_ID` = '"+userID+"';";
        console.log(query)
        /*"CREATE TEMPORARY TABLE data (userID varchar(100),  Role varchar(100), MemberName varchar(1000), EmailID varchar(1000), PhNumber bigint); INSERT into data select a.User_ID, b.Role_Name, CONCAT(a.First_Name,' ',a.Last_Name), a.Email_ID,a.Telephone_No from tbl_Users a inner join lkp_Role b on a.User_Skey_ID = b.Role_ID;select * from data; select Role, COUNT(*) AS `num`  from data GROUP BY Role ;";*/
       
        let output = await dbconn.runQuery(query);
        return output
        }
        catch(err){
        logger.error('Error occured while fetching data from db Error: ' + err);
        return null;
        }
}

async getRoleListDL(){

    try{
        let query = "CALL usp_Get_DropDownValues();";
        /*"CREATE TEMPORARY TABLE data (userID varchar(100),  Role varchar(100), MemberName varchar(1000), EmailID varchar(1000), PhNumber bigint); INSERT into data select a.User_ID, b.Role_Name, CONCAT(a.First_Name,' ',a.Last_Name), a.Email_ID,a.Telephone_No from tbl_Users a inner join lkp_Role b on a.User_Skey_ID = b.Role_ID;select * from data; select Role, COUNT(*) AS `num`  from data GROUP BY Role ;";*/
       
        let output = await dbconn.runQuery(query);
        return output
        }
        catch(err){
        logger.error('Error occured while fetching data from db Error: ' + err);
        return null;
        }

}
 async assignRoleDL(obj){
    console.log(obj)
    try{
        let query = "CALL usp_UserRole_InsertUpdateData('"+obj.mobNO +"'"+","+"'"+obj.email+"'"+","+"'"+obj.roles+"'"+","+obj.activeFlag+","+obj.userActiveFlag+','+obj.roleDeleteFlag+");";
        let output = await dbconn.runQuery(query);
         return output
        }
        catch(err){
        logger.error('Error occured while fetching data from db Error: ' + err);
        return null;
        }


 }

 async getUsersListDL(){   
    try{
        let query = "call usp_User_GetUserDetails_Admin()";
        let output = await dbconn.runQuery(query);
         return output
        }
        catch(err){
        logger.error('Error occured while fetching data from db Error: ' + err);
        return null;
        }


 }



}
module.exports = RoleDL;