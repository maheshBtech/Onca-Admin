'use strict'
require('dotenv').config({path: __dirname + '/.env'});
var logger = require('./src/config/winston');
class Dotenv
{

static initenv()
{
    logger.info( process.cwd());
let dotenv = require('dotenv');
const envFound = dotenv.config();
if (envFound.error) {
// This error should crash whole process

logger.error("⚠️  Couldn't find .env file  ⚠️" + "searched at :- " +process.cwd()+'/api/.env');
}
}
}

module.exports = Dotenv;