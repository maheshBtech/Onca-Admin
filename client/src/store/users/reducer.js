const initialState = {
    firstTableData:"",
    activityTableData:"",
    transactionData:"",
    userProfileData:""
    }

    const userPageData = (state = initialState, action)=>{
        if(action.type==="CHANGE_FIRST_USER_TABLE_DATA")
        {    
            
            state.firstTableData = action.payload       
        }
        if(action.type==="CHANGE_ACTIVITY_TABLE_DATA")
        {    
            
            state.activityTableData = action.payload       
        }
        if(action.type==="CHANGE_TRANSACTIONS_TABLE_DATA")
        {    
            
            state.transactionData = action.payload       
        }
        if(action.type==="CHANGE_USER_PROFILE_VALUE")
        {             
            state.userProfileData = action.payload       
        }
        return state
     }
     
export default userPageData