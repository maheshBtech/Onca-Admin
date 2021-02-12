const FaqBL = require('../../core/BL/CommunicationBL/FaqBL');

class FaqService{
    constructor(){
        this.faqbl = new FaqBL();
    }
    async CommAddUpdateFaq(reqBodyObj){
        return await this.faqbl.CommAddUpdateFaq(reqBodyObj);
     }
     async CommGetFaqListData(spID)
     {
        return await this.faqbl.CommGetFaqListData(spID);
     }
    
     async CommRemoveSetFaq(reqBodyObj){
        return await this.faqbl.CommRemoveSetFaq(reqBodyObj);
     }
}
module.exports = FaqService;