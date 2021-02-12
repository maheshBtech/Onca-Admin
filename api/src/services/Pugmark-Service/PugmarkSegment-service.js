const PugmarkSegmentBL = require('../../core/BL/PugmarkBL/PugmarkSegmentBL');


class PugmarkSegmentService {
    constructor() {
        this.pugmarksegmentbl = new PugmarkSegmentBL();
    }


    async GetPMsegmentlist(reqBodyObj) {
       return await this.pugmarksegmentbl.GetPMsegmentlist(reqBodyObj);
    }
    async DropdownDataPMSegment(reqBodyObj) {
        return await this.pugmarksegmentbl.DropdownDataPMSegment(reqBodyObj);
     }
     async InsertUpdatePMSegment(reqBodyObj) {
        return await this.pugmarksegmentbl.InsertUpdatePMSegment(reqBodyObj);
     }
}
module.exports = PugmarkSegmentService; 
