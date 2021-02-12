'user strict';

var mysql = require('mysql');
var logger = require('../config/winston');
const environment = require('../config/environment');
const dbconn = environment.getDBconn();
var Promise = require("bluebird");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
// var pool = mysql.createPool({
//     host: dbconn.host,
//     user: dbconn.user,
//     password: dbconn.pass,
//     database: dbconn.dbname,
//     port: 3306,
//     connectTimeout: 60000,
//     multipleStatements: true 
// });
var config = {
    host: dbconn.host,
    user: dbconn.user,
    password: dbconn.pass,
    database: dbconn.dbname,
    port: 3306,
    connectTimeout: 60000,
    multipleStatements: true,
    insecureAuth: false
}

class Database {

    sqlQuery() {
        var connection = mysql.createPool(config);
        //- Establish a new connection
        connection.getConnection(function (err) {
            if (err) {
                console.error("\n\t *** Cannot establish a connection with the database. ***");
                connection = reconnect(connection);
            } else {
                console.error("\n\t *** New connection established with the database. ***")
            }
        });

        //- Reconnection function
        function reconnect(connection) {
            console.log("\n New connection tentative...");

            //- Create a new one
            connection = mysql.createPool(config);

            //- Try to reconnect
            connection.getConnection(function (err) {
                if (err) {
                    setTimeout(reconnect(connection), 2000);
                } else {
                    console.error("\n\t *** New connection established with the database. ***")
                    return connection;
                }
            });
        }

        //- Error listener
        connection.on('error', function (err) {
            //- The server close the connection.
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
                return reconnect(connection);
            }

            else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
                console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
                return reconnect(connection);
            }

            else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
                console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
                return reconnect(connection);
            }

            else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
                console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
            }

            else {
                console.error("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
                return reconnect(connection);
            }
        });
    }
  
    getSqlConnection() {
        var pool = mysql.createPool(config);
        return pool.getConnectionAsync().disposer(function (connection) {
            console.log("Releasing connection back to pool")
            connection.release();
        });
    }
    //below method is to run the query using the pool connection
     querySql (query, params) {
        return Promise.using(this.getSqlConnection(), function (connection) {
            console.log("Got connection from pool");
            if (typeof params !== 'undefined'){
                return connection.queryAsync(query, params);
            } else {
                return connection.queryAsync(query);
            }
        });
    }

    //below method is to run the query using normal connection
    async runQuery(sqlquery, params) {
        return new Promise((resolve) => {
            var con = mysql.createPool(config);

            con.getConnection(function (err) {
                if (err) {
                    setTimeout(reconnect(con), 2000);
                } else {
                    console.error("\n\t *** New connection established with the database. ***")
                    return con;
                }
            });
            console.log("Got connection -- for run Query");
            if (typeof params !== 'undefined') {
                con.query(sqlquery, params, function (err, result) {
                    if (err) {
                        console.error("/!\\ Error occured while fetching data from db Error. /!\\ (" + err.code + ")");
                        logger.error('Error occured while fetching data from db Error: ' + err);
                        if (err.code === "ETIMEDOUT" ||
                            err.code === "PROTOCOL_CONNECTION_LOST" ||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" ||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"||
                        err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
                            this.runQuery(sqlquery, params);}
                    }
                    //console.log(result);
                    if (result != null)
                        resolve(result);
                        con.releaseConnection(con);
                        //con.end();
                });
            }
            else {
                con.query(sqlquery, function (err, result) {
                    if (err) {
                        console.error("/!\\ Error occured while fetching data from db Error. /!\\ (" + err.code + ")");
                        logger.error('Error occured while fetching data from db Error: ' + err);
                        if (err.code === "ETIMEDOUT" ||
                            err.code === "PROTOCOL_CONNECTION_LOST" ||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" ||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"||
                        err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"||
                        err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
                            this.runQuery(sqlquery, params);}
                    }

                    if (result != null)
                        resolve(result);
                    console.log("Releasing connection back to pool")
                    // connection.release();
                    con.releaseConnection(con);

                });
            }
        }).catch((err,resolve) => {
            console.log(err);
            logger.error('Error occured while fetching data from db Error: ' + err);
            resolve(err);

        })
    }

    async runQueryConnection(querystring) {
        const self = this;
        return new Promise((resolve, reject) => {
          var con = mysql.createConnection(config);
    
          con.connect();
          con.query(querystring , function (err, result, fields) {
            if (err){logger.error('Error occured while fetching data from db Error: ' + err);}
            //console.log(result);
            if(result != null)
            resolve(result)
            con.end();
          });
      
        }).catch((err)=>{
            console.log(err)
            resolve(err)
        })
      }
}
module.exports = Database;

   //- Reconnection function
   function reconnect(connection) {
    console.log("\n New connection tentative...");

    //- Create a new one
    connection = mysql.createPool(config);

    //- Try to reconnect
    connection.getConnection(function (err) {
        if (err) {
            setTimeout(reconnect(connection), 2000);
        } else {
            console.error("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}