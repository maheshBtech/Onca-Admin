const initialState = {
    LeaderboardresultList:"",
    racelist:[],
    racedeletemessage:"",
    runnerslist:[],
    popupData:"",
    grouplist:[],
    locationlist:[],
    genderlist:[],
    showTimingPoupup:false,
    showdeletePoupup:false,
    loader:true,
    distancelist:[]
    
}

const LeaderboardResult = (state = initialState, action)=>{  
   
    if(action.type==="TABLE_LEADERRESULT_DATA")
    {            
        state.LeaderboardresultList = action.payload 
           
    }
    if(action.type==="LIST_RACE_DATA")
    {                
        state.racelist = action.payload 
       // console.log(state.showRaceDetails)       
    }
    if(action.type==="RESULT_MESSAGE_POPUP_DATA")
    {     
       state.leaderresultmessage = action.payload       
    }
    if(action.type==="RESULT_CHANGE_POPUP_DATA")
    {     
       state.popupData = action.payload       
    }
    if(action.type==="CHANGE_POPUP_TIMING_VIEW")
    {             
        state.showTimingPoupup = action.payload 
        //console.log(state.showRolePoupup)       
    }
    if(action.type==="CHANGE_DELETE_POPUP_TIMING_VIEW")
    {               
        state.showdeletePoupup = action.payload 
        //console.log(state.showRolePoupup)       
    }
    
    
  
    if(action.type==="LIST_RUNNER_DATA")
    {            
        state.runnerslist = action.payload 
           
    }
     
    if(action.type==="LIST_GROUP_DATA")
    {            
        state.grouplist = action.payload 
           
    }
    if(action.type==="LIST_DISTANCE_DATA")
    {            
        state.distancelist = action.payload 
           
    }
     
    if(action.type==="LIST_GENDER_DATA")
    {            
        state.genderlist = action.payload 
           
    }
    if(action.type==="LIST_LOCATION_DATA")
    {            
        state.locationlist = action.payload 
           
    }
    if(action.type==="LOADER")
    {            
        state.loader = action.payload 
           
    }
    return state
}

export default LeaderboardResult
