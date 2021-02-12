const userTypeDL = require('../../DL/PugmarkDL/UserTypeDL');

class UserTypeBL {
    constructor() {
        this.usertypedl = new userTypeDL();

    }

    ////Get the list of the activity
    async GetPugMarkUserTypeList() {
        return await this.usertypedl.GetPugMarkUserTypeList();
        
    }
    async UpdateCreatePugMarkUserTypeList(reqBodyObj) {
        return await this.usertypedl.UpdateCreatePugMarkUserTypeList(reqBodyObj);
     }

     async ActivateSuspendPugMarkUserTypeList(reqBodyObj)
     {
        return await this.usertypedl.ActivateSuspendPugMarkUserTypeList(reqBodyObj);
     }
     
     async RemovePugMarkUserTypeList(reqBodyObj)
     {
        return await this.usertypedl.RemovePugMarkUserTypeList(reqBodyObj);
     }
     //----------------------------------------------------
     
}

module.exports = UserTypeBL;
