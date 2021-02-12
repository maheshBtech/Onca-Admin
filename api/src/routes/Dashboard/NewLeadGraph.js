var express = require('express');
var router = express.Router();
const newLeadGraph = require("../../core/BL/DashboardBL/NewLeadBL");

router.get('/',newLeadGraph.getNewLead);
 
module.exports = router