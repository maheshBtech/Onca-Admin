const activityBL = require('../core/BL/activityBL');


class ActivityService {
   constructor() {
      this.activitybl = new activityBL();
   }

   async GetActivityList() {
      return await this.activitybl.GetActivityList();
   }

   async UpdateActivityList(reqBodyObj) {
      return await this.activitybl.UpdateActivityList(reqBodyObj);
   }

   async ActivateRemoveActivityList(reqBodyObj) {

      return await this.activitybl.ActivateRemoveActivityList(reqBodyObj);
   }

   async AddUpdateActivity(reqBodyObj) {
      return await this.activitybl.AddUpdateActivity(reqBodyObj);
   }

   async ActivityAddTemplate(reqBodyObj) {
      return await this.activitybl.ActivityAddTemplate(reqBodyObj);
   }
   
   async GetActivateTypeList() {
      return await this.activitybl.GetActivateTypeList();
   }

   async GetNewActivityFormDDLs(ProviderId) {
      return await this.activitybl.GetNewActivityFormDDLs(ProviderId);
   }

   async GetActivityById(ActivityId) {
      return await this.activitybl.GetActivityById(ActivityId);
   }
}

module.exports = ActivityService; 