var express = require('express');
var router = express.Router();
const activityGraph = require("../../core/BL/DashboardBL/ActivityBL");
router.get('/',activityGraph.getActivity);
 
module.exports = router