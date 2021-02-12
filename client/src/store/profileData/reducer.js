import {CHANGE_PROVIDER_EMAIL_DATA, CHANGE_USER_PROFILE_DATA, CHANGE_USER_PROVIDER_DATA, CHANGE_PROVIDER_ROLE_DATA, CHANGE_CURRENT_ROLE} from './actionTypes'
const initialState = {
    ProfileData:"",
    providerName:"",
    providerRole:"",
    currentRole:"",
    emailData:""
  
}
const userProfileData = (state = initialState, action)=>{      
    if(action.type===CHANGE_USER_PROFILE_DATA)
    {            
        state.ProfileData = action.payload       
    }   
    if(action.type===CHANGE_USER_PROVIDER_DATA)
    {            
        state.providerName = action.payload       
    }
    if(action.type===CHANGE_PROVIDER_ROLE_DATA)
    {          
        state.providerRole = action.payload       
    }
    if(action.type===CHANGE_CURRENT_ROLE)
    {   
        state.currentRole = action.payload       
    } 
    if(action.type===CHANGE_PROVIDER_EMAIL_DATA)
    {   
        state.emailData = action.payload       
    }
    return state
}

export default userProfileData