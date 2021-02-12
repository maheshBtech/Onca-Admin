
const initialState = {
reloadTableData:false,
updateFlag:false,
updateProviderData:'',
alertBoxData:'',
alertBox:{
    show:false,
    data:"",
    actionType:""
},
confirmBox:
{    show:false,
    data:"",
    actionType:""
   
},
providerDataToRemove:"",
resetCardData:false,
suspendOrActivateProvider:""
}

const reloadProviderTableData = (state = initialState, action)=>{      
    if(action.type==="CHANGE_REFRESH_PROVIDER_TABLE")
    {            
        state.reloadTableData = action.payload       
    }
    if(action.type==="CHANGE_PROVIDER_UPDATE_FLAG")
    {            
        state.updateFlag = action.payload       
    }
    if(action.type==="CHANGE_PROVIDER_UPDATE_DATA")
    {         
        state.updateProviderData = action.payload       
    }
    if(action.type === "SHOW_ALERT_BOX_DATA"){
        state.alertBoxData = action.payload   
    }
    if(action.type==="SHOW_ALERT_BOX"){        
        state.alertBox = action.payload 
    }
    if(action.type==="SHOW_CONFIRM_BOX"){       
        state.confirmBox = action.payload 
    }
    if(action.type==="REMOVE_PROVIDER_DATA"){
        state.providerDataToRemove = action.payload 
    }
    if(action.type==="RESET_PROVIDER_CARD_DATA"){
        state.resetCardData = action.payload 
    }
    if(action.type==="SUSPEND_OR_ACTIVATE_PROVIDER"){
        state.suspendOrActivateProvider = action.payload 
    }
    return state
}

export default reloadProviderTableData