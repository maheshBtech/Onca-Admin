//Add leaderboard related routes here
const express = require('express');
const router = express.Router();
var environment = require('../config/environment');
const LeaderboardBL = require('../core/BL/leaderboardBL');

const leaderboardBL = new LeaderboardBL();



router.post('/leaderboardResult',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardResult api called.')
  const result = await leaderboardBL.leaderboardResultBL();
  res.send(result);
});

router.post('/leaderboardRace',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardRace api called.')
  const result = await leaderboardBL.leaderboardRaceBL(req.body);
  res.send(result);
});

router.post('/leaderboardRacebyFitnessID',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardRace api called.')
  const result = await leaderboardBL.leaderboardRacebyIDBL(req.body);
  res.send(result);
});

router.post('/leaderboardAddRace',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardRace api called.')
  const result = await leaderboardBL.leaderboardAddRaceBL(req.body);
  res.send(result);
});

router.post('/leaderboardActivity',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardActivity api called.')
  const result = await leaderboardBL.leaderboardActivityBL(req.body);
  res.send(result);
});

router.post('/activitydata',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.activitydataBL(req.body);
  res.send(result);
});

router.post('/leaderboardWorkout',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.leaderboardWorkoutBL(req.body);
  res.send(result);
});


router.post('/FilterleaderboardWorkout',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.FilterleaderboardWorkoutBL(req.body);
  res.send(result);
});

router.post('/ListRunnersURL',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.ListRunnersBL(req.body);
  res.send(result);
});

router.post('/leaderboardDropdownList',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.leaderboardDropdownListBL(req.body);
  res.send(result);
});

router.post('/DeleteleaderboardRace',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.DeleteleaderboardRaceBL(req.body);
  res.send(result);
});

router.post('/leaderboardResultList',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.leaderboardResultListBL(req.body);
  res.send(result);
});

router.post('/Insertleaderboardtiming',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.InsertleaderboardtimingBL(req.body);
  res.send(result);
});

router.post('/Deleteleaderboardtiming',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.DeleteleaderboardtimingBL(req.body);
  res.send(result);
});

router.post('/filterLeaderboardResultdata',  /*withAuth,*/ async function (req, res) {
  //console.log('activitydata api called.')
  const result = await leaderboardBL.filterLeaderboardResultdataBL(req.body);
  res.send(result);
});


module.exports = router;