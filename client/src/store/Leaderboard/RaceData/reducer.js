const initialState = {
    RaceDetails:"",
    showRaceDetails:false,
    racedeletemessage:"",
    activities:[],
    successmessage:""
}

const raceData = (state = initialState, action)=>{  
    
    if(action.type==="CHANGE_RACE_DATA")
    {            
        state.RaceDetails = action.payload 
           
    }
    if(action.type==="CHANGE_RACE_VIEW")
    {                
        state.showRaceDetails = action.payload 
        console.log(state.showRaceDetails)       
    }
    if(action.type==="MESSAGE_POPUP_DATA")
    {     
       state.racedeletemessage = action.payload       
    }
    if(action.type==="CHANGE_MESSAGE_POPUP_DATA")
    {     
       state.successmessage = action.payload       
    }    
    if(action.type==="Activity_DATA_RACE")
    {            
        state.activities = action.payload 
           
    }
    return state
}

export default raceData
