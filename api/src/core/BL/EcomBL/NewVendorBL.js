const NewVendorDL = require('../../DL/EcomDL/NewVendorDL');

class NewVendorBL {
    constructor() {
        this.newvendordl = new NewVendorDL();
    }

    async AddNewVendor(reqBodyObj)
     {
        return await this.newvendordl.AddNewVendor(reqBodyObj);
     }
     async GetNewVendor()
     {
        return await this.newvendordl.GetNewVendor();
     }
     async ActivateSuspendVendor(reqBodyObj){
      return await this.newvendordl.ActivateSuspendVendor(reqBodyObj);
   }
   async RemoveSetVendor(reqBodyObj){
      return await this.newvendordl.RemoveSetVendor(reqBodyObj);
   }
}
module.exports = NewVendorBL;