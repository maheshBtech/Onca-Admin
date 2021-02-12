const SubCategoryDL = require('../../DL/EcomDL/SubCategoryDL');

class SubCategoryBL {
    constructor() {
        this.subcategorydl = new SubCategoryDL();
    }

    async AddUpdateSubCategory(reqBodyObj)
     {
        return await this.subcategorydl.AddUpdateSubCategory(reqBodyObj);
     }
     async GetSubCategoryList()
     {
        return await this.subcategorydl.GetSubCategoryList();
     }
     async ActivateSuspendSubCategory(reqBodyObj){
      return await this.subcategorydl.ActivateSuspendSubCategory(reqBodyObj);
   }
   async RemoveSetSubCategory(reqBodyObj){
      return await this.subcategorydl.RemoveSubCategory(reqBodyObj);
   }
}
module.exports = SubCategoryBL;