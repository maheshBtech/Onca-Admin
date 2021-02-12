var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var database = require('../loaders/db');
var databasecon = new database();
var environment = require('../config/environment');

router.post('/getAuthenticationCodeDetails',
async function(req, res)
{
    try {
        let result;
        result = await getAuthenticationCodeDetailsDL(req.body);
        console.log(req.body)
        res.send(result);
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});

async function getAuthenticationCodeDetailsDL(data) {
    console.log(data)
    const sqlquery = "CALL usp_ProviderInvitation_GetDetails('"+data.authenticationCode+"')";
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
      console.log(conn)
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

router.post('/addProviderFromProviderSignup',
async function(req, res)
{
    try {
         let result;
         result = await addProviderFromProviderSignupDL(req.body);
         console.log(req.body)
         res.send(result);       
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});

async function addProviderFromProviderSignupDL(param) {
    console.log(param)
    let sqlquery = "CALL usp_ServiceProvider_InsertUpdateData(1,"+param.providerID+",1,1,'"+param.Provider_Name+"','short disc','full disc','category','tag'"+`,'["image"]',`+
    "'"+param.Contact_Number+"','"+param.Email_Id+"','"+param.Contact_Person+"',4,1,'"+param.subDomain+"','"+param.websiteUrl+"','"+param.address+"',"+param.newProvider+");"
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
      console.log(conn)
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

router.post('/deactivateAuthenticationCode',
async function(req, res)
{
    try {
         let result;
         result = await deactivateAuthenticationCodeDL(req.body);
         console.log(req.body)
         res.send(result);       
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});
async function deactivateAuthenticationCodeDL(param) {
    console.log(param)
    let sqlquery =  "call usp_ProviderInvitation_UpdateStatus('"+param.AuthenticationCode+"',"+param.deleteFlag+","+param.activeFlag+")"
     console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
      console.log(conn)
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

module.exports = router;