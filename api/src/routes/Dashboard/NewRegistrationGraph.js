var express = require('express');
var router = express.Router();
const newRegGraph = require("../../core/BL/DashboardBL/NewRegistrationBL");

router.get('/',newRegGraph.getRegistration);
 
module.exports = router