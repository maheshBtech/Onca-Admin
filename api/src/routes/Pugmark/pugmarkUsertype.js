var express = require('express');
var router = express.Router();
const UserTypeBL = require('../../core/BL/PugmarkBL/UserTypeBL');
const withAuth = require('../middlewares/isAuth'); //for checking auth

var userTypebl = new UserTypeBL();
router.post('/addUpdate', withAuth, async function(req, res){       
    let result = await userTypebl.InsertUpdateUserType(req.body)    
    res.send(
       result
        );
});
router.post('/remove',withAuth, async function(req, res){   
    let result = await userTypebl.removePugUserType(req.body.userID)    
    res.send(
        result
        );
});
router.post('/getList',withAuth, async function(req, res){   
    let result = await userTypebl.getPugUserType()    
    res.send(
        result
        );
});


module.exports = router;