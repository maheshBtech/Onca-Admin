//Add user related routes here
//include the auth service from services/user
var express = require('express');
var router = express.Router();
var userBl = require('../core/BL/usersBl');
const withAuth = require('./middlewares/isAuth'); //for checking auth
const userbl  = new userBl();

/* GET home page. */
router.get('/', withAuth ,function (req, res) {
  res.send('Hello This is user page');
});

router.post('/userTableData',  /*withAuth,*/ async function(req, res){    
  //cosnsole.log('API method called.')
  let result = await userbl.userTableDataBl();
  res.send(
      result
      );
});
router.post('/activityTableData',  /*withAuth,*/ async function(req, res){    
  //cosnsole.log('API method called.')
  let result = await userbl.activityTableDataBl(req.body);
  res.send(
      result
      );
});
router.post('/insertCreateAOD',  /*withAuth,*/ async function(req, res){    
  //cosnsole.log('API method called.')
  let result = await userbl.insertCreateAODBl(req.body);
  res.send(
      result
      );
});

router.post('/updateUserDetals',  /*withAuth,*/ async function(req, res){    
  //cosnsole.log('API method called.')
  let result = await userbl.updateUserDetalsBl(req.body);
  res.send(
      result
      );
});

module.exports = router;