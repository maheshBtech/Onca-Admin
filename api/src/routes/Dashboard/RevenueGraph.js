var express = require('express');
var router = express.Router();
const revenueGraph = require("../../core/BL/DashboardBL/RevenueBL.js");

router.get('/',revenueGraph.getRevenue);
 
module.exports = router