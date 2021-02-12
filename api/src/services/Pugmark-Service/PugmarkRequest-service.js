const PugmarkRequestBL = require('../../core/BL/PugmarkBL/PugmarkRequestBL');


class PugmarkRequestService {
    constructor() {
        this.pugmarkrequestbl = new PugmarkRequestBL();
    }


    async GetPugMarkrequestList(reqBodyObj) {
       return await this.pugmarkrequestbl.GetPugMarkrequestList(reqBodyObj);
    }
    async ApproveRejectPMReq(reqBodyObj) {
        return await this.pugmarkrequestbl.ApproveRejectPMReq(reqBodyObj);
     }
}
module.exports = PugmarkRequestService; 
