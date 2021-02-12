
var express = require('express');
var router = express.Router();
const PromocodeService  = require('../../services/Finance/promocode-service');
var promocodeservice = new PromocodeService();


router.post('/getDropdownData', async function(req, res){ 
    console.log(req.body)
      let result = await promocodeservice.GetDropdownValuesList(req.body);  
      res.send(
          result
          );
   });

router.post('/SetAddUpdatePromocode', async function(req, res){   
    let result = await promocodeservice.AddUpdatePromocode(req.body);  
    res.send(
        result
        );
 });


router.post('/GetPromocodeList', async function(req, res){ 
  console.log(req.body)
    let result = await promocodeservice.GetPromocodeList(req.body);  
    res.send(
        result
        );
 });

 
 router.post('/ActivateSuspendPromocode', async function(req, res){  
        
    let result = await promocodeservice.ActivateSuspendPromocode(req.body);  
    res.send(
        result
        );
 });

 router.post('/RemovePromocode', async function(req, res){  
        
    let result = await promocodeservice.RemoveSetPromocode(req.body);  
    res.send(
        result
        );
 });
 
 
module.exports = router;