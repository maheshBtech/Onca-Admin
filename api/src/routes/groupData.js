
var express = require('express');
var router = express.Router();
const GroupDataBL = require('../core/BL/groupDataBL');
var groupdatabl = new GroupDataBL;


///Get ActivityList to bind the grid
router.get('/GetGroupList', async function (req, res) {
    let result = await groupdatabl.GetGroupList();
    res.send(
        result
    );
});

///Get ActivityList to bind the grid
router.post('/AddGroupSet', async function (req, res) {
    if (req.body === null) {
        return null;
    }
    let result = await groupdatabl.AddGroupSet(req.body);
    res.send(
        result
    );
});

router.post('/ActivateSuspendGroup', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await groupdatabl.ActivateSuspendGroup(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveGroup', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await groupdatabl.RemoveGroup(req.body);  
    res.send(
        result
        );
 });

module.exports = router;