const initialState = {
    tableData:"",
    allcolumndata:"",
    traininglocations:"",
    activities:"",
    removeactivities:[],
    selectedactivities:"",
    selectedlocations:"",
    removelocations:[],
    selecteddata:""
}

const Promocode = (state = initialState, action)=>{  
    
    if(action.type==="TABLE_DATA_PROMOCODE")
    {            
        state.tableData = action.payload 
           
    }
    if(action.type==="VIEW_PROMOCODE_DATA")
    {            
        state.selecteddata = action.payload 
           
    }
    if(action.type==="TABLE_ALL_DATA_PROMOCODE")
    {            
        state.allcolumndata = action.payload 
           
    }
    if(action.type==="TRAINING_DATA_PROMOCODE")
    {            
        state.traininglocations = action.payload 
           
    }
    if(action.type==="ACTIVITY_DATA_PROMOCODE")
    {            
        state.activities = action.payload 
           
    }
    if(action.type==="CHANGE_REMOVE_ACTIVITIES")
    {            
        state.removeactivities = action.activities 
           
    }
    if(action.type==="CHANGE_SELECTED_ACTIVITIES")
    {            
        state.selectedactivities = action.activities 
           
    }
    if(action.type==="CHANGE_REMOVE_TRAINING_LOCATION")
    {            
        state.removelocations = action.activities 
           
    }
    if(action.type==="CHANGE_SELECTED_TRAINING_LOCATION")
    {            
        state.selectedlocations = action.activities 
           
    }
    

    return state
}

export default Promocode