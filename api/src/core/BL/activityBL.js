const activityDL = require('../DL/activityDL');

class ActivityBL {
    constructor() {
        this.activitydl = new activityDL();

    }

    ////Get the list of the activity
    async GetActivityList() {
        return await this.activitydl.GetActivityList();

    }
    async UpdateActivityList(reqBodyObj) {
        return await this.activitydl.UpdateActivityList(reqBodyObj);
    }

    async ActivateRemoveActivityList(activityId, activateFlag, userId) {
        return await this.activitydl.ActivateRemoveActivityList(activityId, activateFlag, userId);
    }

    async GetActivateTypeList() {
        return await this.activitydl.GetActivateTypeList();
    }

    async GetNewActivityFormDDLs(ProviderId) {
        return await this.activitydl.GetNewActivityFormDDLs(ProviderId);
    }

    async AddUpdateActivity(reqBodyObj) {
        return await this.activitydl.AddUpdateActivity(reqBodyObj);
    }

    async ActivityAddTemplate(reqBodyObj) {
        return await this.activitydl.ActivityAddTemplate(reqBodyObj);
    }

    async GetActivityById(ActivityId) {
        return await this.activitydl.GetActivityById(ActivityId);
    }
    //----------------------------------------------------

}

module.exports = ActivityBL;