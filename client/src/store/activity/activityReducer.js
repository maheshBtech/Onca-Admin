import StateManager from "react-select";


const initalState = {
    UserID: 0,
    ToUpdateActivityData: null,
    createAOD:{
        aodIsValid:false,
        aodData:"",
        reminderAODIsValid:false,
        reminderAODData:"",
        aodImageIsValid:false,
        aodImageData:"",
        templetData:""
    }
};

const reducerActivity = (state = initalState,action) => {
    if(action.type === 'USERID'){
        return{
            UserID: state.UserID === undefined || null ? action.payload: state.UserID
        }
    }
    if(action.type === 'UPDATE_ACTITIY_DATA'){
        return{
            ...state,
            ToUpdateActivityData: action.getActivityToUpdate
        }
    }
    if(action.type==='UPDATE_CREATE_AOD_FORM_DATA')
    {
        state.createAOD = action.payload
    }
    
    return state;
}

export default reducerActivity;