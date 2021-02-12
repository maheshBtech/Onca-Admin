const PugmarkRequestDL = require('../../DL/PugmarkDL/PugmarkRequestDL');

class PugmarkRequestBL {  
    constructor() {
        this.pugmarkrequestdl = new PugmarkRequestDL();

    }   

    ////Get the list of the PMrequestList
    async GetPugMarkrequestList(reqBodyObj) {
        return await this.pugmarkrequestdl.GetPugMarkrequestList(reqBodyObj);
        
    }
    async ApproveRejectPMReq(reqBodyObj) {
        return await this.pugmarkrequestdl.ApproveRejectPMReq(reqBodyObj);
        
    }
     //----------------------------------------------------
     
}

module.exports = PugmarkRequestBL;
