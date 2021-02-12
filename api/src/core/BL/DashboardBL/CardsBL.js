const cardData = require('../../DL/DashboardDL/CardsDL');
 
exports.getCardsData = (req, res) => {
    cardData.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };