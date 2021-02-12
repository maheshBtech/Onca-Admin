const initialState = {
    tableData:"",
    filterworkoutdata:""
   
}

const WorkoutData = (state = initialState, action)=>{  
      
    if(action.type==="TABLE_WORKOUT_DATA")
    {            
        state.tableData = action.payload 
           
    }
    if(action.type==="CHANGE_WORKOUT_DATA")
    {            
        state.filterworkoutdata = action.payload 
           
    }
   
    return state
}

export default WorkoutData
