const PredefinedStrBL = require('../../core/BL/SettingsBL/PredefinedStrBL');

class PredefinedStrService{
    constructor(){
        this.predefinedstrbl = new PredefinedStrBL();
    }
    async AddUpdatePreStr(reqBodyObj){
        return await this.predefinedstrbl.AddUpdatePreStr(reqBodyObj);
     }
     async GetPreStrList(req){
        return await this.predefinedstrbl.GetPreStrList(req);
     }
 
     async RemoveSetPreStr(reqBodyObj){
        return await this.predefinedstrbl.RemoveSetPreStr(reqBodyObj);
     }
}

module.exports =PredefinedStrService;