const sql = require("../../../loaders/db");
var dbconn = new sql();
var logger = require('../../../config/winston');
exports.getAll = result => {
    dbconn.runQuery("call PROC_REVENUE_DASHBOARD_GET()", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("alert: ", res);
      result(null, res);
    });
  };