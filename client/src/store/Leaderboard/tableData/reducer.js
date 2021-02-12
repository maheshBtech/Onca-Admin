const initialState = {
    tableData:""
}

const raceTableData = (state = initialState, action)=>{  
    
    if(action.type==="TABLE_DATA_RACE")
    {            
        state.tableData = action.payload 
           
    }

    return state
}

export default raceTableData