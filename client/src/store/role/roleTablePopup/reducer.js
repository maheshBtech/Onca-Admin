const initialState = {
    showRolePoupup:false
}

const rolePopup = (state = initialState, action)=>{      
    if(action.type==="CHANGE_POPUP_VIEW")
    {                
        state.showRolePoupup = action.payload 
        console.log(state.showRolePoupup)       
    }
    
    return state
}

export default rolePopup