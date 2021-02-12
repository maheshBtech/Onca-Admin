
var express = require('express');
var router = express.Router();
const LocationService  = require('../../services/Settings/location-service');
var locationservice = new LocationService();

router.post('/SetAddUpdateLocation', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await locationservice.AddUpdateLocation(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.get('/SetGetLocationList', async function(req, res){ 
    var id = req.query.spID.toString();
    let result = await locationservice.GetLocationList(id);  
    res.send(
        result
        );
 });
 //Get ActivityList to bind the grid
router.get('/SetGetActivityDropdownData', async function(req, res){ 
    var id = req.query.spID.toString();
    let result = await locationservice.GetActivityDropdownData(id);  
    res.send(
        result
        );
 });


 router.post('/ActivateSuspendSetLocation', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await locationservice.ActivateSuspendSetLocation(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveSetLocation', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await locationservice.RemoveSetLocation(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;