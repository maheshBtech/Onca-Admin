const PredefinedStrDL = require('../../DL/SettingsDL/PredefinedStrDL');

class PredefinedStrBL {
    constructor() {
        this.predefinedstrdl = new PredefinedStrDL();
    }

    async AddUpdatePreStr(reqBodyObj)
     {
        return await this.predefinedstrdl.AddUpdatePreStr(reqBodyObj);
     }
     async GetPreStrList(req)
     {
        return await this.predefinedstrdl.GetPreStrList(req);
     }
  
     async RemoveSetPreStr(reqBodyObj){
        return await this.predefinedstrdl.RemoveSetPreStr(reqBodyObj);
     }
}
module.exports = PredefinedStrBL;