var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.clearCookie('sessionId');
  res.clearCookie('token');
  res.status(200).send('You have been successfully logged out');
});

module.exports = router;