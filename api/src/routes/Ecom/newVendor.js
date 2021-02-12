
var express = require('express');
var router = express.Router();
const NewVendowService  = require('../../services/Ecom-Service/newVendor-service');
var newvendorservice = new NewVendowService();

router.post('/EcomAddVendor', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newvendorservice.AddNewVendor(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.get('/EcomGetVendorList', async function(req, res){ 
  
    let result = await newvendorservice.GetNewVendor();  
    res.send(
        result
        );
 });
 router.post('/ActivateSuspendEcomVendor', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newvendorservice.ActivateSuspendVendor(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveEcomVendor', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newvendorservice.RemoveSetVendor(req.body);  
    res.send(
        result
        );
 });
 
module.exports = router;