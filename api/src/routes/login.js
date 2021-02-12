//Add login related routes here
//include the login service from services/auth
var express = require('express');
const jwt = require('jsonwebtoken');
var environment = require('../config/environment');
const issurUrl = environment.getClientAppUrl();
var router = express.Router();
const loginBL = require('../core/BL/LoginBL');
const loginbl = new loginBL();
var roleBL = require('../core/BL/RoleBL');
const rolebl = new roleBL();
var logger = require('../config/winston');

router.post('/',
  async function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
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
     const roledata = await rolebl.fetchRoleData(user);
      // Issue token
    const payload = { email,roledata };
    const secret =  environment.getjwtSecret();
    const token = jwt.sign(payload, secret, {
      expiresIn: '7d',
      issuer: issurUrl
    });
    logger.info("token sent for user loggedin",token);
    res.status(200)
    .cookie('token', token, { httpOnly: true , // Forces to use https in production
      secure: process.env.NODE_ENV === 'production'? true: false})
      .send([{token:token},roledata]);
    }
  }
  catch(err){
    logger.error("error login api",err);
    res.status(500)
    .send("Error validating user please try again.");
  }
});
// POST route to register a user
  module.exports = router;