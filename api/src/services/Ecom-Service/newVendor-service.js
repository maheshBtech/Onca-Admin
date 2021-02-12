const NewVendorBL = require('../../core/BL/EcomBL/NewVendorBL');

class NewVendorService{
    constructor(){
        this.newvendorbl = new NewVendorBL();
    }
    async AddNewVendor(reqBodyObj){
        return await this.newvendorbl.AddNewVendor(reqBodyObj);
     }
     async GetNewVendor(){
        return await this.newvendorbl.GetNewVendor();
     }
     async ActivateSuspendVendor(reqBodyObj){
        return await this.newvendorbl.ActivateSuspendVendor(reqBodyObj);
     }
     async RemoveSetVendor(reqBodyObj){
        return await this.newvendorbl.RemoveSetVendor(reqBodyObj);
     }
}

module.exports =NewVendorService;