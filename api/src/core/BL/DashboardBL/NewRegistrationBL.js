const newRegData = require('../../DL/DashboardDL/NewRegistrationDL');
 
exports.getRegistration = (req, res) => {
    newRegData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };