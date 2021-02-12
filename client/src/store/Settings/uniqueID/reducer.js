const initialState = {
    viewUniqueID:{
        canEdit:false,
        data:""    },
    removeOrSuspendUniqueID:{
        type:"",
        data:""
    }
}
const uniqueID = (state = initialState, action)=>{  
    
    if(action.type==="CHANGE_VIEW_UNIQUE_ID")
    {                 
        state.viewUniqueID = action.payload            
    }
    if(action.type==="CHANGE_REMOVE_SUSPEND_UNIQUE_ID")
    {                 
        state.removeOrSuspendUniqueID = action.payload            
    }

    return state
}

export default uniqueID