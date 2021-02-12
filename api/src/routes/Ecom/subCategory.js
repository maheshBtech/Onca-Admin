
var express = require('express');
var router = express.Router();
const SubCategoryService  = require('../../services/Ecom-Service/subCategory-service');
var subcategoryservice = new SubCategoryService();

router.post('/EcomAddSubCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await subcategoryservice.AddUpdateSubCategory(req.body);  
    res.send(
        result
        );
 });

///Get ActivityList to bind the grid
router.get('/EcomGetSubCategoryList', async function(req, res){ 
  
    let result = await subcategoryservice.GetSubCategoryList();  
    res.send(
        result
        );
 });

 router.post('/ActivateSuspendEcomSubCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await subcategoryservice.ActivateSuspendSubCategory(req.body);  
    res.send(
        result
        );
 });
 router.post('/RemoveEcomSubCategory', async function(req, res){  
    if (req.body === null) {
        return null;
    }
    
    let result = await subcategoryservice.RemoveSubCategory(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;