const sql = require("../../../loaders/db");
var dbconn = new sql();
var logger = require('../../../config/winston');
exports.getAll = result => {
    dbconn.querySql("call PROC_NEW_LEADS_DASHBOARD_GET()", (err, res) => {
      if (err) {
        logger.error("error: ", err);
        result(null, err);
        return;
      }
  
      logger.info("alert: ", res);
      result(null, res);
    });
  };