const initialState = {
    
    templatetypelist: "",
    emailtemplatelist:"",
    activitytypelist:"",
    activitylist:"",
    activityemailtemplatelist:"",
    registrationemailtemlist:"",
    reminderemailtemlist:"",
    otheremailtemlist:"",
    
}

const Email = (state = initialState, action)=>{  
   
   if(action.type==="LIST_TEMPATE_TYPE_DATA")
    {            
        state.templatetypelist = action.payload 
           
    }
    if(action.type==="LIST_DATA_EMAIL_TEMPLATE")
    {            
        state.emailtemplatelist = action.payload 
           
    }
    if(action.type==="LIST_ACTIVITY_TYPE_DATA")
    {            
        state.activitytypelist = action.payload 
           
    }
    if(action.type==="LIST_ACTIVITY_DATA")
    {            
        state.activitylist = action.payload 
           
    }
    if(action.type==="LIST_ACTIVITY_EMAIL_TEMPLATE_DATA")
    {            
        state.activityemailtemplatelist= action.payload 
           
    }
    if(action.type==="LIST_REGISTRATION_EMAIL_TEMPLATE_DATA")
    {            
        state.registrationemailtemlist = action.payload 
           
    }
    if(action.type==="LIST_REMINDER_EMAIL_TEMPLATE_DATA")
    {            
        state.reminderemailtemlist = action.payload 
           
    }
    if(action.type==="LIST_OTHER_EMAIL_TEMPLATE_DATA")
    {            
        state.otheremailtemlist = action.payload 
           
    }
  
    return state
}

export default Email
