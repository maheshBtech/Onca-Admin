const initialState = {
    popupData:"",
    checkBoxmessage:""
}

const rolePopupData = (state = initialState, action)=>{      
    if(action.type==="CHANGE_POPUP_DATA")
    {     
       state.popupData = action.payload       
    }
    if(action.type==="CHANGE_CHECKBOX_MESSAGE_POPUP_DATA")
    {     
       state.checkBoxmessage = action.payload       
    }
    return state
}

export default rolePopupData