const revenueData = require('../../DL/DashboardDL/RevenueDL');
 
exports.getRevenue = (req, res) => {
    revenueData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };