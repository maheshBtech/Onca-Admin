var express = require('express');
var router = express.Router();
var environment = require('../config/environment');
const navBL = require("../core/BL/navigationDataBL");
var navbl = new navBL();
router.post('/', async function(req, res){       
    let result = await navbl.fetchNavigationDataBL(req.body)
    res.send(
        result
        );
});


module.exports = router;