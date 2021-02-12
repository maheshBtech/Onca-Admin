const SubCategoryBL = require('../../core/BL/EcomBL/SubCategoryBL');

class SubCategoryService{
    constructor(){
        this.subcategorybl = new SubCategoryBL();
    }
    async AddUpdateSubCategory(reqBodyObj){
        return await this.subcategorybl.AddUpdateSubCategory(reqBodyObj);
     }
     async GetSubCategoryList(){
        return await this.subcategorybl.GetSubCategoryList();
     }
     async ActivateSuspendSubCategory(reqBodyObj){
        return await this.subcategorybl.ActivateSuspendSubCategory(reqBodyObj);
     }
     async RemoveSetSubCategory(reqBodyObj){
        return await this.subcategorybl.RemoveSubCategory(reqBodyObj);
     }
}

module.exports =SubCategoryService;