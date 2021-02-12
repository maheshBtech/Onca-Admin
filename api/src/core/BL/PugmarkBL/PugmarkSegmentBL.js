const PugmarkSegmentDL = require('../../DL/PugmarkDL/PugmarkSegmentDL');

class PugmarkSegmentBL {  
    constructor() {
        this.pugmarksegmentdl = new PugmarkSegmentDL();

    }   

    ////Get the list of the PMrequestList
    async GetPMsegmentlist(reqBodyObj) {
        return await this.pugmarksegmentdl.GetPMsegmentlist(reqBodyObj);
        
    }
    async DropdownDataPMSegment(reqBodyObj) {
        return await this.pugmarksegmentdl.DropdownDataPMSegment(reqBodyObj);
        
    }
    async InsertUpdatePMSegment(reqBodyObj) {
        return await this.pugmarksegmentdl.InsertUpdatePMSegment(reqBodyObj);
        
    }
     //----------------------------------------------------
     
}

module.exports = PugmarkSegmentBL;
