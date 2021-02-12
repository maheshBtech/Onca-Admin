
var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var database = require('../loaders/db');
var databasecon = new database();
//const withAuth = require('./middlewares/isAuth');



//this is test function, intended to check the response of sp
router.post('/thisFuntionIsToTestSP', async function(req, res){    
    //cosnsole.log('API method called.')
    var conn;
    let sqlquery = "call `usp_ActivityAOD_GetDetails`(1)";
    console.log(sqlquery);
    try {
        conn = await databasecon.runQuery(sqlquery)
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
    res.send(
        conn
        );
});


router.post('/getProviderCardData',
async function(req, res)
{
    try {
        let result;
        result = await getCardData(req.body);
        res.send(result);
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});

async function getCardData(input){
    const sqlquery ="call usp_Service_Provider_Details_GetData("+input.numberOfCards+");"
    console.log(sqlquery)
    try {
       const conn = await databasecon.runQueryConnection(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}


router.post('/addProvider',
    async function (req, res)
     {
        
        try {
            let result;
            result = await AddProviderData(req.body);
            res.send(result);
        }
        catch (err) {
            logger.error("error add provider api", err);
            res.status(500)
                .send("Error adding provider please try again.");
        }
    });
module.exports = router;

async function AddProviderData(param) {
    let sqlquery = "CALL usp_ServiceProvider_InsertUpdateData(1,"+param.providerID+",1,1,'"+param.Provider_Name+"','short disc','full disc','category','tag'"+`,'["image"]',`+
    "'"+param.Contact_Number+"','"+param.Email_Id+"','"+param.Contact_Person+"',4,1,'"+param.subDomain+"','"+param.websiteUrl+"','"+param.address+"',"+param.newProvider+");"
    /*"CALL usp_ServiceProvider_InsertUpdateData (1,"+param.providerID+",1,1,'"+param.Provider_Name+"','short disc','full disc',"+param.newProvider+ `,'["category"]',` + `'["tag"]',` + `'["image"]'` +",'"+param.Contact_Number+"','"+param.Email_Id+"','"+param.Contact_Person+"',4,1,'"+param.subDomain+"','"+param.websiteUrl+"','"+param.address+"');"
   */
    try {
        console.log("------------------------ SP modified ------------------------------------------------")
        console.log(sqlquery)
        const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

router.get('/',
async function (req, res) {
    console.log("---------------------method called ------------------------------")
    try {
        let result;
        result = await GetProviderData();
        res.send(result);
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});

router.post('/test', async function(req, res){    
    let result = await GetProviderData();
    res.send(
        result
        );
});

router.post('/activateDeactivateProvider', async function(req, res){    
    const result = await activateDeactivateProvider(req.body);
    res.send(
        result
        );
});
async function activateDeactivateProvider(input) {
    const sqlquery = "call usp_ServiceProvider_UpdateStatus("+input.providerID+","+input.isActive+","+input.isDeleted+");"
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }

}

async function GetProviderData() {
    const sqlquery = 'call usp_Service_Provider_GetList()';
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

router.post('/generateAuthenticationCode',
async function(req, res)
{
    try {
        let result;
        result = await generateAuthenticationCodeDL();
        res.send(result);
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});


async function generateAuthenticationCodeDL() {
    const sqlquery = 'call usp_Generate_Provider_AuthCode()';
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

router.post('/inserttAuthenticationCode',
async function(req, res)
{
    try {
        let result;
        result = await inserttAuthenticationCodeDL(req.body);
        res.send(result);
    }
    catch (err) {
        logger.error("error add provider api", err);
        res.status(500)
            .send("Error adding provider please try again.");
    }
});

async function inserttAuthenticationCodeDL(data) {
    const sqlquery = "CALL usp_ProviderInvitation_InsertUpdate(NULL,'"+data.code+"','"+data.email+"','"+data.startDate+"','"+data.endDate+"');";
    console.log(sqlquery);
    try {
       const conn = await databasecon.runQuery(sqlquery);
        return conn;
    }
    catch (err) {
        console.log("error")
        logger.error('Error occoured while sending ping response', err);
    }
}

