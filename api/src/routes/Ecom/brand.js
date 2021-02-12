
var express = require('express');
var router = express.Router();
const NewBrandService  = require('../../services/Ecom-Service/brand-service');
var newbrandservice = new NewBrandService();

router.post('/EcomAddBrand', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newbrandservice.AddNewBrand(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.get('/EcomGetVendorList', async function(req, res){ 
  
    let result = await newbrandservice.GetBrandList();  
    res.send(
        result
        );
 });

 router.post('/ActivateSuspendEcomBrand', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newbrandservice.ActivateSuspendBrand(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveEcomBrand', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newbrandservice.RemoveSetBrand(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;