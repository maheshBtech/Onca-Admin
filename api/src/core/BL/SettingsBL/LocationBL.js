const LocationDL = require('../../DL/SettingsDL/LocationDL');

class LocationBL {
    constructor() {
        this.locationdl = new LocationDL();
    }

    async AddUpdateLocation(reqBodyObj)
     {
        return await this.locationdl.AddUpdateLocation(reqBodyObj);
     }
     async GetLocationList(spID)
     {
        return await this.locationdl.GetLocationListData(spID);
     }
     async GetActivityDropdownData(spID)
     {
        return await this.locationdl.GetActivityDropdownData(spID);
     }
     async ActivateSuspendSetLocation(reqBodyObj){
        return await this.locationdl.ActivateSuspendSetLocation(reqBodyObj);
     }
     async RemoveSetLocation(reqBodyObj){
        return await this.locationdl.RemoveSetLocation(reqBodyObj);
     }
}
module.exports = LocationBL;