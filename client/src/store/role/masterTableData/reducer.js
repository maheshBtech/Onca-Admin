const initialState = {
    masterRoleTableDataRaw:"",
    totalRoleList:"",
    showCheckboxPopup:false,
    dataCheckBox:"",
    roleUserList:""
}

const masterRoleTableData = (state = initialState, action)=>{ 
    
    if(action.type==="CHANGE_MASTER_ROLE_TABLE_DATA")
    {          
        state.masterRoleTableDataRaw = action.payload          
    }
    if(action.type==="TOTAL_ROLE_LIST"){      
        state.totalRoleList = action.payload
    }
    if(action.type==="SHOW_CHECKBOX_POPUP"){       
        state.showCheckboxPopup = action.payload
    }
    if(action.type==="DATA_CHECKBOX_POPUP"){       
        state.dataCheckBox = action.payload
    }
    if(action.type==="CHANGE_ROLE_USER_DATA"){       
        state.roleUserList = action.payload
    }
    return state
}

export default masterRoleTableData