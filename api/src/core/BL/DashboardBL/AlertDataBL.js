const alertData = require('../../DL/DashboardDL/AlertDataDL');
 
exports.getAlertData = (req, res) => {
    alertData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };