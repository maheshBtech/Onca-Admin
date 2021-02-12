var express = require("express");
var router = express.Router();
const FaqService = require("../../services/communication/faq-service");
var faqservice = new FaqService();

router.post("/CommAddUpdateFaq", async function (req, res) {
  if (req.body === null) {
    return null;
  }
  console.log(req.body);

  let result = await faqservice.CommAddUpdateFaq(req.body);
  res.send(result);
});

///
router.get("/CommGetFaqListData", async function (req, res) {
  //   var id = req.query.spID.toString();
  const obj = req.query;
  let result = await faqservice.CommGetFaqListData(obj);
  res.send(result);
});

router.post("/CommRemoveSetFaq", async function (req, res) {
  if (req.body === null) {
    return null;
  }

  let result = await faqservice.CommRemoveSetFaq(req.body);
  res.send(result);
});

module.exports = router;
