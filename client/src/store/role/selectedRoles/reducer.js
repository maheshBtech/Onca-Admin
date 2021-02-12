const initialState = {
    roles:"",
    roleToRemove:""
}

const selectedRoles = (state = initialState, action)=>{      
    if(action.type==="CHANGE_SELECTED_ROLES")
    {         
        state.roles = action.roles               
    }
    if(action.type==="CHANGE_REMOVE_ROLES")
    {         
        state.roleToRemove = action.roles       
    }
    return state
}

export default selectedRoles