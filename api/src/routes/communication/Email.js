//Add leaderboard related routes here
const express = require('express');
const router = express.Router();
var environment = require('../../config/environment');
const EmailBL = require('../../core/BL/communicationBL/EmailBL');

const emailBL = new EmailBL();



router.post('/getDropdownData',  /*withAuth,*/ async function (req, res) {
  //console.log('LeaderboardResult api called.')
  const result = await emailBL.GetDropDownDataBL(req.body);
  res.send(result);
});


router.post('/SetAddUpdateEmail',  /*withAuth,*/ async function (req, res) {
    //console.log('LeaderboardResult api called.')
    const result = await emailBL.SetAddUpdateEmailBL(req.body);
    res.send(result);
  });

  router.post('/GetEmailList',  /*withAuth,*/ async function (req, res) {
    //console.log('LeaderboardResult api called.')
    const result = await emailBL.GetEmailListBL(req.body);
    res.send(result);
  });

  router.post('/RemoveEmail',  /*withAuth,*/ async function (req, res) {
    //console.log('LeaderboardResult api called.')
    const result = await emailBL.RemoveEmailBL(req.body);
    res.send(result);
  });

  router.post('/SetEmailTemplatetoActivity',  /*withAuth,*/ async function (req, res) {
    //console.log('LeaderboardResult api called.')
    const result = await emailBL.SetEmailTemplatetoActivityBL(req.body);
    res.send(result);
  });

module.exports = router;
