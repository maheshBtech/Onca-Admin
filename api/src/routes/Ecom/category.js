
var express = require('express');
var router = express.Router();
const NewCategoryService  = require('../../services/Ecom-Service/category-service');
var newcategoryservice = new NewCategoryService();

router.post('/EcomAddCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newcategoryservice.AddNewCategory(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.get('/EcomGetVendorList', async function(req, res){ 
  
    let result = await newcategoryservice.GetCategoryList();  
    res.send(
        result
        );
 });

 router.post('/ActivateSuspendEcomCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newcategoryservice.ActivateSuspendCategory(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveEcomCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await newcategoryservice.RemoveSetCategory(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;