const PromocodeBL = require('../../core/BL/FinanceBL/PromocodeBL');

class PromocodeService{
    constructor(){
        this.promocodebl = new PromocodeBL();
    }

    async GetDropdownValuesList(reqBodyObj){
        return await this.promocodebl.GetDropdownValuesList(reqBodyObj);
     }
    async AddUpdatePromocode(reqBodyObj){
        return await this.promocodebl.AddUpdatePromocode(reqBodyObj);
     }
     async GetPromocodeList(req){
        return await this.promocodebl.GetPromocodeList(req);
     }
     async ActivateSuspendPromocode(req){
        return await this.promocodebl.ActivateSuspendPromocode(req);
     }
     
     async RemoveSetPromocode(reqBodyObj){
        return await this.promocodebl.RemoveSetPromocode(reqBodyObj);
     }
}

module.exports =PromocodeService;