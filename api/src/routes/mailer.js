var express = require('express');
var router = express.Router();
var environment = require('../config/environment');
var MailerBL = require('../core/BL/mailerBL')
var mailerBL = new MailerBL();


router.post('/setMail', function (req, res) {
    console.log(req.body);   
    if (req.body.type === 'Email') {      
        let result = mailerBL.mailerBL(req.body)  
        res.send(
            result
            );     
    }
    else if (req.body.type === 'MobileNo') { //this should not be empty
        let result = mailerBL.mailerBL(req.body)  
        res.send(
            result
            ); 
    }
   })


module.exports = router;