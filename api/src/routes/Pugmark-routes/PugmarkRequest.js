

// const express = require('express');
// const router = express.Router();
// var environment = require('../../config/environment');
// const PugmarkRequestBL = require('../../core/BL/PugmarkBL/PugmarkRequestBL');

// const pugmarkrequestbl = new PugmarkRequestBL()
var express = require('express');
var router = express.Router();
const PugmarkRequestService = require('../../services/Pugmark-Service/PugmarkRequest-service');
const { response } = require('express');
// const Razorpay= require('razorpay')
// const shortid=require('shortid')
var pugmarkrequestService = new PugmarkRequestService();
// const razorpay =new Razorpay({
//   key_id:'rzp_test_bW1zTsp1Pxih92',
//   key_secret:'3qPCikbfYouPLdPhP1D6EANK',
// })

router.post('/GetPMrequestList', async function(req, res){ 
  
  let result = await pugmarkrequestService.GetPugMarkrequestList(req.body);  
  res.send(
      result
      );
});
router.post('/ApproveRejectPMReq', async function(req, res){ 
  
  let result = await pugmarkrequestService.ApproveRejectPMReq(req.body);  
  res.send(
      result
      );
});



// router.post('/Razorpay', async function(req, res){ 
// console.log(req.body);
// console.log('razorpay');
// const options={
//   amount:499 * 100, 
//   currency:'INR', 
//   receipt :shortid.generate(), 
//   payment_capture:1
// }
//   let result = await razorpay.orders.create(
//     options
//   ) 
  
//   res.json(
//    {
//       id:result.id,
//       currency:result.currency,
//       amount:result.amount
//     }
     
//       );
// });



module.exports = router;