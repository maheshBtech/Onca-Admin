var express = require('express');
var router = express.Router();
const cardData = require("../../core/BL/DashboardBL/CardsBL");

router.get('/',cardData.getCardsData);
 
module.exports = router