const initialState = {
    roles:"",
    totalRoleList:""
    
}

const roleUpdate = (state = initialState, action)=>{      
    if(action.type==="UPDATE_USER_ROLE")
    {         
        state.roles = action.roles       
    }     
    return state
}

export default roleUpdate