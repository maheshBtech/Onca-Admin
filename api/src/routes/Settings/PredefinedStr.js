
var express = require('express');
var router = express.Router();
const PredefinedStrService  = require('../../services/Settings/PredefinedStr-service');
var prestrservice = new PredefinedStrService();

router.post('/SetAddUpdatePreStr', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await prestrservice.AddUpdatePreStr(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.post('/SetGetPreStrList', async function(req, res){ 
  console.log('aa')
  console.log(req.body)
    let result = await prestrservice.GetPreStrList(req.body);  
    res.send(
        result
        );
 });

 
 router.post('/RemoveSetPreStr', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await prestrservice.RemoveSetPreStr(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;