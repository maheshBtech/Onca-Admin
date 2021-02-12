const initialState = {
    tableMode:12345,
    path:""
}

const roleTableMode = (state = initialState, action)=>{      
    if(action.type==="CHANGE_TABLE_MODE")
    {   
        state.tableMode = action.payload
        state.path = action.path
      
    }
    return state
}

export default roleTableMode