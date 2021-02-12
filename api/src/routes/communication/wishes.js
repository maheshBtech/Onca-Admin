const router = require("express").Router();
const WishesService = require("../../services/communication/wishes-service");
const wishesService = new WishesService();

router.get("/CommGetWishesList", async (req, res) => {
  let Id = req.query.spID.toString();
  let result = await wishesService.GetWishesList(Id);
  res.send(result);
});

router.post("/CommAddUpdateWishes", async (req, res) => {
  if (req.body === null) {
    return null;
  }
  let result = await wishesService.AddUpdateWishes(req.body);
  res.send(result);
});


router.post("/CommRemoveWishes", async (req, res) => {

  if (req.body === null) {
    return null;
  }
  let result = await wishesService.RemoveWishes(req.body);
  res.send(result);
});
module.exports = router;
