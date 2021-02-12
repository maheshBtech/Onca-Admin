const initialState = {
    tableData:""
}

const roleTableData = (state = initialState, action)=>{      
    if(action.type==="CHANGE_TABLE_DATA")
    {            
        state.tableData = action.payload 
           
    }

    return state
}

export default roleTableData