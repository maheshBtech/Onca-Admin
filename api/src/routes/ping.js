var express = require('express');
var router = express.Router();
var environment = require('../config/environment');
var logger = require('../config/winston');
var database = require('../loaders/db');
var databasecon = new database();
var db = environment.getDBconn();
const dbname = db.dbname;
/* GET home page. */
router.get('/',async function (req, res, next) {
try{
  let dbstatus = null;
let result;
      result = await DBhealthcheck();
      if(result[0].email.includes("dit"))
      {
        dbstatus = "db connection Successful"
      }
      else{
        dbstatus = "db connection Unsuccessful"
      }
      const statusCode = 200;
    let Healthmsg = '';
    Healthmsg += 'Pong \n' + 'App :' +environment.getAppname() + ' \n';
    Healthmsg += 'Environment : '+ environment.getEnvironment() + ' \n';
    Healthmsg += 'Port :'+ environment.getPort().toString() + ' \n' ;
    Healthmsg += new Date().toLocaleString() + ' \n' ;
    Healthmsg += 'Database conn status: ' + dbstatus+ ' \n' ;
    res.set('Content-Type','text/plain;charset=UTF-8');
    res.status(statusCode).send(Healthmsg);
 
}
catch(err)
{
    logger.error('Error occoured while sending ping response',err);
    if (err instanceof Error) {
      res.status(400).send("General error");
    } 
    else {
      res.status(500).json({ "code": 1000, "message": err });
    }
}
  
});

module.exports = router;

async function DBhealthcheck()
{ 
    const param = '1';
    let sqlquery = `SELECT * FROM ${dbname}.Oncaadminlogin where userloginId =  `+`'${param}'`; 

    try {
       const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response',err);
    }
  }