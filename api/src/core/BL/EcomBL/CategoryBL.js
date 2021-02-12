const CategoryDL = require('../../DL/EcomDL/CategoryDL');

class CategoryBL {
    constructor() {
        this.categorydl = new CategoryDL();
    }

    async AddUpdateCategory(reqBodyObj)
     {
        return await this.categorydl.AddUpdateCategory(reqBodyObj);
     }
     async GetCategoryList()
     {
        return await this.categorydl.GetCategoryList();
     }
     async ActivateSuspendCategory(reqBodyObj){
      return await this.categorydl.ActivateSuspendCategory(reqBodyObj);
   }
   async RemoveSetCategory(reqBodyObj){
      return await this.categorydl.RemoveSetCategory(reqBodyObj);
   }
}
module.exports = CategoryBL;