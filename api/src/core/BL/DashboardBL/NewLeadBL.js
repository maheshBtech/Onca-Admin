const newLeadData = require('../../DL/DashboardDL/NewLeadDL');
 
exports.getNewLead = (req, res) => {
    newLeadData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };