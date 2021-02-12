const LeaderboardDL = require('../DL/leaderboardDL');
const leaderboardDL = new LeaderboardDL();

class LeaderboardBL {
  async leaderboardResultBL() {
    return await leaderboardDL.leaderboardResultDL()
  }

  async leaderboardRaceBL(req) {
    return await leaderboardDL.leaderboardRaceDL(req)
  }

  async leaderboardRacebyIDBL(req) {
    return await leaderboardDL.leaderboardRacebyIDDL(req)
  }
  
  
  async leaderboardAddRaceBL(req) {
    return await leaderboardDL.leaderboardAddRaceDL(req)
  }

  async leaderboardActivityBL(req) {
    return await leaderboardDL.leaderboardActivityDL(req)
  }

  async activitydataBL(req) {
    return await leaderboardDL.activitydataDL(req)
  }
  async  leaderboardWorkoutBL(req) {
    return await leaderboardDL.leaderboardWorkoutDL(req)
  }
  async  FilterleaderboardWorkoutBL(req) {
    return await leaderboardDL.FilterleaderboardWorkoutDL(req)
  }
  async  ListRunnersBL(req) {
    return await leaderboardDL.ListRunnersDL(req)
  }
  async  leaderboardDropdownListBL(req) {
    return await leaderboardDL.leaderboardDropdownListDL(req)
  }
  async DeleteleaderboardRaceBL(req) {
    return await leaderboardDL.DeleteleaderboardRaceDL(req)
  }
  async  leaderboardResultListBL(req) {
    return await leaderboardDL.leaderboardResultListDL(req)
  }
  async InsertleaderboardtimingBL(req) {
    return await leaderboardDL.InsertleaderboardtimingDL(req)
  }
  async  DeleteleaderboardtimingBL(req) {
    return await leaderboardDL.DeleteleaderboardtimingDL(req)
  }

  async  filterLeaderboardResultdataBL(req) {
    return await leaderboardDL.filterLeaderboardResultdataDL(req)
  }
   
}

module.exports = LeaderboardBL;