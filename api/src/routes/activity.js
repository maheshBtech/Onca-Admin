var express = require('express');
var router = express.Router();
const activityService = require('../services/activity-service');
var activityservice = new activityService();

///Get ActivityList to bind the grid
router.get('/GetActivityList', async function (req, res) {
    let result = await activityservice.GetActivityList();
    res.send(
        result
    );
});
router.put('/UpdateActivityList', async function (req, res) {
    if (req.body === null) {
        return null;
    }
    let result = await activityservice.UpdateActivityList(req.body);
    res.send(
        result
    );
});
router.post('/ActivateRemoveActivityList', async function (req, res) {
    if (req.body === null) {
        return null;
    }

    let result = await activityservice.ActivateRemoveActivityList(req.body);
    res.send(
        result
    );
});

router.post('/AddUpdateActivity', async function (req, res) {
    if (req.body === null) {
        return null;
    }
    let result = await activityservice.AddUpdateActivity(req.body);
    res.send(
        result
    );
});

router.post('/ActivityAddTemplate', async function (req, res) {
    if (req.body === null) {
        return null;
    }
    let result = await activityservice.ActivityAddTemplate(req.body);
    res.send(
        result
    );
});

router.get('/GetActivityTypeList', async function (req, res) {
    let result = await activityservice.GetActivateTypeList();
    res.send(
        result
    );
});

router.post('/GetNewActivityFormDDLs', async function (req, res) {
    let ProviderId = req.body.ProviderId;
    let result = await activityservice.GetNewActivityFormDDLs(ProviderId);
    res.send(
        result
    );
});

router.get('/GetActivityById/:id', async function (req, res) {
    let ActivityId = req.params.id;
    let result = await activityservice.GetActivityById(ActivityId);
    res.send(
        result
    );
});

module.exports = router;