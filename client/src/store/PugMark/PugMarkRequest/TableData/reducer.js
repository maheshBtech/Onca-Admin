const initialState = {
    tableData:"",
    action:'DND',
    selecteddata:[],
    event:""
}

const PMRequestTableData = (state = initialState, action)=>{  
    
    if(action.type==="TABLE_DATA_PUGMARKREQUEST")
    {            
        state.tableData = action.payload 
           
    }
    if(action.type==="ACTION_TYPE")
    {            
        state.action = action.payload 
           
    }
    if(action.type==="PMREQUESTDATA")
    {            
        state.selecteddata = action.payload 
           
    }
    if(action.type==="PMEVENT")
    {            
        state.event = action.payload 
           
    }
    

    return state
}

export default PMRequestTableData
