
const initialState = {
    countryList : "",
    stateList:'',
    userList:'',
    providerSignUP:'',
    cityList:'',
}

const generalData = (state = initialState, action)=>{      
    if(action.type==="CHANGE_COUNTRY_LIST")
    {     
      
        state.countryList = action.payload       
    }
    if(action.type==="CHANGE_STATE_LIST")
    {     
            
        state.stateList = action.payload       
    }
    if(action.type==="CHANGE_CITY_LIST")
    {     
            
        state.cityList  = action.payload      
    }
    if(action.type==="CHANGE_USERS_LIST")
    {            
        state.userList = action.payload       
    }
    if(action.type==="CHANGE_CURRENT_PROVIDER_SIGNUP_DATA")
    {            
        state.providerSignUP = action.payload       
    }
    
    return state
}

export default generalData