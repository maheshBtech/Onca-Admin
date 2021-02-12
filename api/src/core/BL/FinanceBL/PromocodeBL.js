const PromocodeDL = require('../../DL/FinanceDL/PromocodeDL');

class PromocodeBL {
    constructor() {
        this.promocodedl = new PromocodeDL();
    }
    async GetDropdownValuesList(req)
    {
       return await this.promocodedl.GetDropdownValuesList(req);
    }
    async AddUpdatePromocode(reqBodyObj)
     {
        return await this.promocodedl.AddUpdatePromocode(reqBodyObj);
     }
     async GetPromocodeList(req)
     {
        return await this.promocodedl.GetPromocodeList(req);
     }
     async ActivateSuspendPromocode(req)
     {
        return await this.promocodedl.ActivateSuspendPromocode(req);
     }
  
     async RemoveSetPromocode(reqBodyObj){
        return await this.promocodedl.RemoveSetPromocode(reqBodyObj);
     }
}
module.exports = PromocodeBL;