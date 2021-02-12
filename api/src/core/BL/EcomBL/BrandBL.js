const BrandDL = require('../../DL/EcomDL/BrandDL');

class BrandBL {
    constructor() {
        this.branddl = new BrandDL();
    }

    async AddUpdateBrand(reqBodyObj)
     {
        return await this.branddl.AddUpdateBrand(reqBodyObj);
     }
     async GetBrandList()
     {
        return await this.branddl.GetBrandList();
     }
     async ActivateSuspendBrand(reqBodyObj){
      return await this.branddl.ActivateSuspendBrand(reqBodyObj);
   }
   async RemoveSetBrand(reqBodyObj){
      return await this.branddl.RemoveSetBrand(reqBodyObj);
   }
}
module.exports = BrandBL;