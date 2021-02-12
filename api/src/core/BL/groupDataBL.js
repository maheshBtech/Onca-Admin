const groupDataDL = require('../DL/groupDataDL');

class GroupDataBL {
    constructor() {
        this.groupdatadl = new groupDataDL();
    }

    async GetGroupList() {
        return await this.groupdatadl.GetGroupList();
    }
    
    async AddGroupSet(reqBodyObj){
        return await this.groupdatadl.AddGroupSet(reqBodyObj);
    }

    async ActivateSuspendGroup(reqBodyObj){
        return await this.groupdatadl.ActivateSuspendGroup(reqBodyObj);
     }
     async RemoveGroup(reqBodyObj){
        return await this.groupdatadl.RemoveGroup(reqBodyObj);
     }
}

module.exports = GroupDataBL;