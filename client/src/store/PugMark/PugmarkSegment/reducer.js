const initialState = {
    tableData:"",
    dropdowndata:[],
    userdata:[],
    PMreasons:[],
    PMactivities:[],
    referaldata:[]   

}

const PMSegment = (state = initialState, action)=>{  
    
    if(action.type==="TABLE_DATA_PUGMARKSEGMENT")
    {            
        state.tableData = action.payload 
           
    }
    if(action.type==="PMSEGMENT_DROPDOWN_DATA")
    {            
        state.dropdowndata = action.payload 
           
    }
    if(action.type==="USER_DATA_PUGMARKSTATEMENT")
    {            
        state.userdata = action.payload 
           
    }
    if(action.type==="PUGMARKREASONS")
    {            
        state.PMreasons = action.payload 
           
    }
    if(action.type==="ACTIVITIES_PUGMARKSTATEMENT")
    {            
        state.PMactivities = action.payload 
           
    }
    if(action.type==="REFERALDATA")
    {            
        state.referaldata = action.payload 
           
    }
   

    return state
}

export default PMSegment
