const database = require('../../loaders/db');
const logger = require('../../config/winston');
const environment = require('../../config/environment');
const dbconn = new database();
const db = environment.getDBconn();
const dbname = db.dbname;

class LeaderboardDL {
  async leaderboardResultDL() {
    try {
      let query = "CALL  usp_User_GetUsersList(NULL,NULL,NULL,NULL);";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }

  async leaderboardRaceDL(req) {
    try {
      let query = "CALL usp_FitnessDetails_GetList();";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async leaderboardRacebyIDDL(req) {
    try {
      let query = "CALL usp_FitnessDetails_GetData('" + req.raceID + "');";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
 

  async leaderboardAddRaceDL(req) {
    try {
      //CALL usp_FitnessDetails_InsertUpdate(NULL,'Race10KM','Race10KM','Banglore',1,'2020-10-7','10:10:00',2.5,1,'path1');
      let query =""
   
       query = "CALL usp_FitnessDetails_InsertUpdate(" + req.fitnessDetailID + ",'" + req.fitnesseventname + "','" + req.fitnesseventdesc 
      + "','" + req.fitnesseventvenue + "','" + req.fromdate + "','" + req.starttime + "'," + req.durationinhrs + "," + req.fitnesseventID + ",'" + req.imagepath + "','" 
      + req.activitiesID + "'," + req.checkbox + ");";
   
     
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }

  async leaderboardActivityDL(req) {
    try {
      let query = "CALL  usp_User_GetUserDetails_Admin('" + req.email + "','" + req.password + "');";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async activitydataDL(req) {
    try {
      let query = "CALL usp_Activity_GetList();";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async leaderboardWorkoutDL(req) {
    try {
      let query = "CALL usp_WorkoutLeaderBoard_GetList();";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async FilterleaderboardWorkoutDL(req) {
    try {
      let query = "CALL  usp_WorkoutLeaderBoard_GetFilterList("+ 1 +"," + req.activity + "," + req.group + ","  + req.location + ");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async ListRunnersDL(req) {
    try {
      let query = "usp_WorkoutLeaderBoard_GetList();";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async leaderboardDropdownListDL(req) {
    try { 
      // let query = "CALL  usp_WorkoutLeaderBoard_GetFilterList('" + req.activity + "','" + req.group + "','"  + req.location + "');";
        let query = "CALL  usp_Leaderboard_DropDownValues(" + req.provider +");";
  
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  
  async DeleteleaderboardRaceDL(req) {
    try { 
      // let query = "CALL  usp_WorkoutLeaderBoard_GetFilterList('" + req.activity + "','" + req.group + "','"  + req.location + "');";
        let query = "CALL  usp_FitnessDetails_UpdateStatus(" + req.raceID + "," +1 + "," + 0 +");";
  
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }

  async leaderboardResultListDL(req) {
    try {
     
      // let query = "CALL usp_FitnessEventParticipant_GetList("+ 1 +"," + null + "," + null + ","  + null + ","  + null +");";
      let query = "CALL  usp_FitnessEventParticipant_GetList(" + req.provider + "," + req.activity + "," + req.group + "," + req.gender + "," + req.location + ");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }

  async InsertleaderboardtimingDL(req) {
    try {
     let  query = "CALL usp_FitnessEventParticipant_InsertUpdate(" + req.fitnesseventparticipantID + "," + req.race + "," + req.runner 
      + ",'" + req.timing + "','" + req.raceurl + "'," + req.personalBest + "," + req.debut +  ");";
   
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async DeleteleaderboardtimingDL(req) {
    try {
      let query = "CALL  usp_FitnessEventParticipant_UpdateStatus("+ req.participantID +"," + req.deleteFlag + "," + req.Activeflag +  ");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  async filterLeaderboardResultdataDL(req) {
    try {
      let query = "CALL  usp_FitnessEventParticipant_GetList(" + req.provider + "," + req.activity + "," + req.group + "," + req.gender + "," + req.location + ");";
      console.log(query)
      let output = await dbconn.runQuery(query);
      return output
    } catch (err) {
      console.log("error: ", err);
      logger.error('Error occured while fetching data from db Error: ' + err);
      return null;
    }
  }
  
}

module.exports = LeaderboardDL;