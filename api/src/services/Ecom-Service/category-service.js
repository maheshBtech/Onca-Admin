const CategoryBL = require('../../core/BL/EcomBL/CategoryBL');

class CategoryService{
    constructor(){
        this.categorybl = new CategoryBL();
    }
    async AddUpdateCategory(reqBodyObj){
        return await this.categorybl.AddUpdateCategory(reqBodyObj);
     }
     async GetCategoryList(){
        return await this.categorybl.GetCategoryList();
     }
     async ActivateSuspendCategory(reqBodyObj){
        return await this.categorybl.ActivateSuspendCategory(reqBodyObj);
     }
     async RemoveSetCategory(reqBodyObj){
        return await this.categorybl.RemoveSetCategory(reqBodyObj);
     }
}

module.exports =CategoryService;