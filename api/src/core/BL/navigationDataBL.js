"use strict"
var logger = require('../../config/winston');
const navDL = require("../DL/navigationDataDL")
var navdl = new navDL()

class navBL
{
    async fetchNavigationDataBL(data){ 
        console.log(data)       
        return await navdl.fetchNavigationDataDL(data)    }

}
module.exports = navBL;