//Add auth related routes here
//include the auth service from services/auth
var express = require('express');
var router = express.Router();
const loginBL = require('../core/BL/LoginBL');
const loginbl = new loginBL();
const jwt = require('jsonwebtoken');
var logger = require('../config/winston');
var environment = require('../config/environment');
const issurUrl = environment.getClientAppUrl();
router.post('/',async function(req, res) {
  const { email, password } = req.body;
  let verified = false;
const user = { Email:email, Password:password };
  try{
verified = await loginbl.validate(user);
  if (!verified) {

      res.status(401)
        .json({
          error: 'Incorrect email or password'
      });

  } else {
    logger.info("user loggedin",user);
    // Issue token
    const payload = { email };
    const secret =  environment.getjwtSecret();
    const token = jwt.sign(payload, secret, {
      expiresIn: '7d',
      issuer: issurUrl
    });
    logger.info("token sent for user loggedin",token);
    res.cookie('token', token, { httpOnly: true , // Forces to use https in production
      secure: process.env.NODE_ENV === 'production'? true: false})
      .send({token:token});
  }
}
catch(err){
  if (err) {
    logger.error("error auth api",err);
    res.status(500)
      .json({
        error: 'Internal error please try again'
    });
  }
}
});



module.exports = router;