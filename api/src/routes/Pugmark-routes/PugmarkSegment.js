var express = require('express');
var router = express.Router();
const PugmarkSegmentService = require('../../services/Pugmark-Service/PugmarkSegment-service');
const { response } = require('express');

var pugmarksegmentService = new PugmarkSegmentService();


router.post('/GetPMsegmentlist', async function (req, res) {

    let result = await pugmarksegmentService.GetPMsegmentlist(req.body);
    res.send(
        result
    );
});
router.post('/DropdownDataPMSegment', async function (req, res) {

    let result = await pugmarksegmentService.DropdownDataPMSegment(req.body);
    res.send(
        result
    );
});

router.post('/InsertUpdatePMSegment', async function (req, res) {

    let result = await pugmarksegmentService.InsertUpdatePMSegment(req.body);
    res.send(
        result
    );
});


module.exports = router;