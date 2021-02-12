var express = require('express');
var router = express.Router();
var uniqueIDBL = require('./../../core/BL/SettingsBL/uinqueIDBL')  
const bl = new uniqueIDBL()

router.post('/insertUniqueID', async function(req, res){      
    res.send(
        await bl.insertUniqueIDBL(req.body)
        );
 });

 router.post('/uniqueIDTableData', async function(req, res){      

    res.send(
        await bl.iniqueIDTableDataBL(req.body)
        );
 });

 router.post('/suspendOrRemoveUniqueID', async function(req, res){      
    res.send(
        await bl.suspendOrRemoveUniqueIDBL(req.body)
        );
 });

module.exports = router;