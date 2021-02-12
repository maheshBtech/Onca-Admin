
var express = require('express');
var router = express.Router();
const alertData = require("../../core/BL/DashboardBL/AlertDataBL");

router.get('/',alertData.getAlertData);
 
module.exports = router