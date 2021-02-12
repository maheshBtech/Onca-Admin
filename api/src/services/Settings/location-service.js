const LocationBL = require('../../core/BL/SettingsBL/LocationBL');

class LocationService{
    constructor(){
        this.locationbl = new LocationBL();
    }
    async AddUpdateLocation(reqBodyObj){
        return await this.locationbl.AddUpdateLocation(reqBodyObj);
     }
     async GetLocationList(spID)
     {
        return await this.locationbl.GetLocationList(spID);
     }
     async GetActivityDropdownData(spID)
     {
        return await this.locationbl.GetActivityDropdownData(spID);
     }
     async ActivateSuspendSetLocation(reqBodyObj){
        return await this.locationbl.ActivateSuspendSetLocation(reqBodyObj);
     }
     async RemoveSetLocation(reqBodyObj){
        return await this.locationbl.RemoveSetLocation(reqBodyObj);
     }
}
module.exports = LocationService;