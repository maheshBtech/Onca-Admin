"use strict"

var DL = require('./../../DL/SettingsDL/uinqueIDDL')
const dlObject = new DL();


class uniqueIDBL{

  async insertUniqueIDBL(data) 
    { 
        
        return await dlObject.insertUniqueIDDL(data)

    }

    async iniqueIDTableDataBL(data) 
    { 
        
        return await dlObject.iniqueIDTableDataDL(data)

    }

    async suspendOrRemoveUniqueIDBL(data) 
    { 
        
        return await dlObject.suspendOrRemoveUniqueIDDL(data)

    }
}
module.exports = uniqueIDBL;