const initialState = {
    tableData:""
}

const PreStrTableData = (state = initialState, action)=>{  
    
    if(action.type==="TABLE_DATA_PRESTR")
    {            
        state.tableData = action.payload 
           
    }

    return state
}

export default PreStrTableData