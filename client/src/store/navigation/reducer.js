
const initialState = {
    currentPage:"Dashboard",
    userEmail:"",
    roleAndProvider:{
        isProviderInitialized:false,
        isRoleInitialized:false,
        selectedProvider:"",
        selectedRole:"",
        providerList:"",
        roleList:""
        }
}

const currentPageName = (state = initialState, action)=>{      
    if(action.type==="CHANGE_CURRENT_PAGE_NAME")
    {            
        state.currentPage = action.payload       
    }
    if(action.type==="CHANGE_USER_EMAIL")
    { 
        state.userEmail = action.payload       
    }
    if(action.type==="CHANGE_ROLE_AND_PROVIDER")
    { 
        state.roleAndProvider = action.payload       
    }
    return state
}

export default currentPageName