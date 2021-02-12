'use strict'
const dotenv = require('../../dotenvSetup');
const { urlencoded } = require('body-parser');
dotenv.initenv();
//require('dotenv').config({path: __dirname + '../.env'})
class Environment {

  /**
   * send environment details
   */
  static getEnvironment()
{
 
// Set the NODE_ENV to 'development' by default
if(process.env.NODE_ENV == '' || process.env.NODE_ENV == undefined || process.env.NODE_ENV !== 'production')
{
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

  return process.env.NODE_ENV;
}

  /**
   * That long string from mlab or mysql db or mssql db connection string
   */

  static getDBconn()
{

  let dbconn = 
  { 'host' : process.env.DBHOST,
    'user' : process.env.DBUSER,
    'pass' : process.env.DBPASS,
    'dbname' : process.env.DBNAME
  }

  return dbconn;
}

  /**
   * Your favorite port
   */
  static getPort()
  {
  let port = parseInt(process.env.PORT, 10);

  return port;
  }

  //send the app url for resolving cors error
  static getClientAppUrl()
  {
    console.log("client urlencoded",process.env.CLIENT_URL);
  return process.env.CLIENT_URL;
  }


  /**
   * send the app name
   */
  static getAppname()
  {
    console.log(process.cwd());
  return process.env.APPNAME;
  }

  /**
   * Your secret sauce
   */
  static getjwtSecret()
  {
  return process.env.JWT_SECRET;
  }


  /**
   * Used by winston logger
   */
  static getLoglevel()
  {
    const logs = {
    level: process.env.LOG_LEVEL || 'silly',
  }
  return logs;
}

  /**
   * API configs
   */
   static getApi()
  {
  return '/';
  }

}
module.exports = Environment;