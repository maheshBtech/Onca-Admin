const logData = require('../../DL/DashboardDL/LogDataDL');
 
exports.getAlertData = (req, res) => {
    logData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };