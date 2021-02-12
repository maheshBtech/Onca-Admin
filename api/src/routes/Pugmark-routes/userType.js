
var express = require('express');
var router = express.Router();
const UserTypeService = require('../../services/Pugmark-Service/userType-service');
const { response } = require('express');
var usertypeservice = new UserTypeService();

///Get ActivityList to bind the grid
router.get('/GetPMUserTypeList', async function(req, res){ 
  
   let result = await usertypeservice.GetPugMarkUserTypeList();  
   res.send(
       result
       );
});

router.post('/CreateUpdatePMUserType', async function(req, res){  
    if (req.body === null) {
        return null;
    } 
    let result = await usertypeservice.UpdateCreatePugMarkUserTypeList(req.body);  
    res.send(
        result
        );
 });
 router.post('/ActivateSuspendPMUserType', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await usertypeservice.ActivateSuspendPugMarkUserTypeList(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemovePMUserType', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await usertypeservice.RemovePugMarkUserTypeList(req.body);  
    res.send(
        result
        );
 });

module.exports = router;