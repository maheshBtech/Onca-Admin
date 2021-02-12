const activityData = require('../../DL/DashboardDL/ActivityDL');
 
exports.getActivity = (req, res) => {
    activityData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };