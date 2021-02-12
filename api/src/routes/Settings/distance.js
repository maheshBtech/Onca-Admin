var express = require("express");
var router = express.Router();
const DistanceService = require("../../services/Settings/distance-service");
var distanceservice = new DistanceService();

router.post("/SetAddUpdateDistance", async function (req, res) {
  if (req.body === null) {
    return null;
  }
  let result = await distanceservice.AddUpdateDistance(req.body);
  res.send(result);
});

///Get ActivityList to bind the grid
router.get("/SetGetDistanceList", async function (req, res) {
  var id = req.query.spID.toString();
  let result = await distanceservice.GetLocationList(id);
  res.send(result);
});

router.post("/RemoveSetDistance", async function (req, res) {
  if (req.body === null) {
    return null;
  }

  let result = await distanceservice.RemoveSetDistance(req.body);
  res.send(result);
});

module.exports = router;
