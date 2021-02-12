const DistanceDL = require('../../DL/SettingsDL/DistanceDL');

class DistanceBL {
    constructor() {
        this.distancedl = new DistanceDL();
    }

    async AddUpdateDistance(reqBodyObj)
     {
        return await this.distancedl.AddUpdateDistance(reqBodyObj);
     }
     async GetDistanceList(spID)
     {
        return await this.distancedl.GetDistanceListData(spID);
     }
     
     async RemoveSetDistance(reqBodyObj){
        return await this.distancedl.RemoveSetDistance(reqBodyObj);
     }
}
module.exports = DistanceBL;