const BrandBL = require('../../core/BL/EcomBL/BrandBL');

class BrandService{
    constructor(){
        this.brandbl = new BrandBL();
    }
    async AddUpdateBrand(reqBodyObj){
        return await this.brandbl.AddUpdateBrand(reqBodyObj);
     }
     async GetBrandList(){
        return await this.brandbl.GetBrandList();
     }
     async ActivateSuspendBrand(reqBodyObj){
        return await this.brandbl.ActivateSuspendBrand(reqBodyObj);
     }
     async RemoveSetBrand(reqBodyObj){
        return await this.brandbl.RemoveSetBrand(reqBodyObj);
     }
}

module.exports =BrandService;