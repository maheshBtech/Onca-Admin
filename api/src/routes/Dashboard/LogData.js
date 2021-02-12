
var express = require('express');
var router = express.Router();
const logData = require("../../core/BL/DashboardBL/LogDataBL");

router.get('/',logData.getAlertData);
 
module.exports = router