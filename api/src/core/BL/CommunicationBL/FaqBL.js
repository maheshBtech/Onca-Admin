const FaqDL = require('../../DL/Communication/FaqDL');

class FaqBL {
    constructor() {
        this.faqdl = new FaqDL();
    }

    async CommAddUpdateFaq(reqBodyObj)
     {
        return await this.faqdl.CommAddUpdateFaq(reqBodyObj);
     }
     async CommGetFaqListData(spID)
     {
        return await this.faqdl.CommGetFaqListData(spID);
     }
     
     async CommRemoveSetFaq(reqBodyObj){
        return await this.faqdl.CommRemoveSetFaq(reqBodyObj);
     }
}
module.exports = FaqBL;