var appRoot = require('app-root-path');
var winston = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');
/*
Transports are a concept introduced by Winston that refer to the storage/output mechanisms used for the logs. Winston comes with three core transports - console, file, and HTTP. We will be focusing on the console and file transports for this tutorial: the console transport will log information to the console, and the file transport will log information to a specified file. Each transport definition can contain its own configuration settings such as file size, log levels, and log format. Here is a quick summary of the settings we’ll be using for each transport:

    level - Level of messages to log.
    filename - The file to be used to write log data to.
    handleExceptions - Catch and log unhandled exceptions.
    json - Records log data in JSON format.
    maxsize - Max size of log file, in bytes, before a new file will be created.
    maxFiles - Limit the number of files created when the size of the logfile is exceeded.
    colorize - Colorize the output. This can be helpful when looking at console logs.

Logging levels indicate message priority and are denoted by an integer. Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):

    0: error
    1: warn
    2: info
    3: verbose
    4: debug
    5: silly

When specifying a logging level for a particular transport, anything at that level or higher will be logged. For example, by specifying a level of info, anything at level error, warn, or info will be logged. Log levels are specified when calling the logger, meaning we can do the following to record an error: logger.error('test error message').
*/

// define the custom settings for each transport (file, console)
/*var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  
  // instantiate a new Winston Logger with the settings defined above
// your centralized logger object
let logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.File)(options.errorFile),
    new (winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});
  */

  
 const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'onca-admin' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: `${appRoot}/log/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${appRoot}/log/combined.log` }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };
  
  module.exports = logger;