const DistanceBL = require('../../core/BL/SettingsBL/DistanceBL');

class DistanceService{
    constructor(){
        this.distancebl = new DistanceBL();
    }
    async AddUpdateDistance(reqBodyObj){
        return await this.distancebl.AddUpdateDistance(reqBodyObj);
     }
     async GetLocationList(spID)
     {
        return await this.distancebl.GetDistanceList(spID);
     }
    
     async RemoveSetDistance(reqBodyObj){
        return await this.distancebl.RemoveSetDistance(reqBodyObj);
     }
}
module.exports = DistanceService;