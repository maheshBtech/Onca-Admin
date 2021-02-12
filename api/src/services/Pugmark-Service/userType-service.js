const userTypeBL = require('../../core/BL/PugmarkBL/UserTypeBL');


class UserTypeService {
    constructor() {
        this.usertypebl = new userTypeBL();
    }

    async GetPugMarkUserTypeList() {
       return await this.usertypebl.GetPugMarkUserTypeList();
    }

    async UpdateCreatePugMarkUserTypeList(reqBodyObj) {
        return await this.usertypebl.UpdateCreatePugMarkUserTypeList(reqBodyObj);
     }

     async ActivateSuspendPugMarkUserTypeList(reqBodyObj){
        return await this.usertypebl.ActivateSuspendPugMarkUserTypeList(reqBodyObj);
     }

     async RemovePugMarkUserTypeList(reqBodyObj){
      return await this.usertypebl.RemovePugMarkUserTypeList(reqBodyObj);
   }

}

module.exports = UserTypeService; 