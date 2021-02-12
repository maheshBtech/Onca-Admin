const initialState = {
    activities:"",
    activitiesToRemove:""
}

const selectedActivity = (state = initialState, action)=>{      
    if(action.type==="CHANGE_SELECTED_ACTIVITIES")
    {         
        state.activities = action.activities 
        console.log(state.roles)       
    }
    if(action.type==="CHANGE_REMOVE_ACTIVITIES")
    {         
        state.activitiesToRemove = action.activities       
    }
    return state
}

export default selectedActivity