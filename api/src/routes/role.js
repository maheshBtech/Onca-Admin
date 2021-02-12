var express = require('express');
var router = express.Router();
var environment = require('../config/environment');
const roleBL = require('../core/BL/RoleBL');
var rolebl = new roleBL();
router.post('/', async function(req, res){    
    console.log('API method called.')
    let result = await rolebl.getTableDataBL()
    res.send(
        result
        );
});
router.post('/removeUser', async function(req, res){   
    //console.log(req.body)
    let result = await rolebl.removeUserBL(req.body.userID)    
    res.send(
        result
        );
});
router.post('/getRoleList', async function(req, res){   
    let result = await rolebl.getRoleListBL()    
    res.send(
        result
        );
});
router.post('/assignRole', async function(req, res){       
    let input = req.body
    let result = await rolebl.assignRoleBL(req.body)    
    res.send(
       result
        );
});

router.post('/getUserList', async function(req, res){       
    let input = req.body
    let result = await rolebl.getUsersListBL()    
    res.send(
       result
        );
});

module.exports = router;