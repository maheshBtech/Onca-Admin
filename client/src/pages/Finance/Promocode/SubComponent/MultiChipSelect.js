/* eslint-disable no-use-before-define */
import React,{ useState, useEffect, Component }from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppService from '../../../../AppService'
import store from '../../../../store/index'
import { connect } from "react-redux";
import { ValidationMessage }  from "./CommonMessage";

export default function Tags(props) {
  const [val, setVal] = useState([]);
  const appService  = new AppService();
  const [firstRun, setFirstRun] = useState(false)
  const [selectionData, setSelectionData] = useState("")
   const[linkactivityvalid, setlinkactivityvalid] = useState("")
  const[activitiesToRemove, setactivitiesToRemove] = useState([])
  const[checkUpdateData, setcheckUpdateData] = useState(true)
  const[linkactivitymsg, setlinkactivitymsg] = useState("")
 
  
  useEffect(() => {      
     
    if(firstRun === false){
      getActivityData()     
    } 

    },[store.getState()]);
    
    useEffect(() => {    
         
      if(checkUpdateData){         
     let storeData = store.getState().Promocode   
     if(Object.keys(storeData)){
      setcheckUpdateData(false)
      updateValueOfSelector(storeData.selecteddata.Activity_IDs)
     }
      
     }    
      });
  
      const updateValueOfSelector = (vals)=>{
       
        let result=[]
     let val=  vals + ','
        result=  getselectedActivitydetails(val)
        if(result !== ""){
        let newVal = result
        setVal(newVal)
      }
      }
      const getselectedActivitydetails=(vals)=>{
         
      let values=[];

      values=vals.split(',');
        let allactivities = store.getState().Promocode.activities
      let    arrr=[];
         
      let finalOutput =
      values.map(selectedvalues => {
               
              let subActivities = (allactivities.map(item => {
                if (item.Activity_ID.toString() === selectedvalues) {
               arrr.push({ title: item.Activity_Name, id: item.Activity_ID, discription: item.Activity_Desc })
                  return arrr
                }
                else {
                  return false
                }
              }))
             
            })
            return arrr
    }
   
  const getActivityData = ()=>{
    setFirstRun(true)
    console.log(store.getState())
    let rawData = store.getState().Promocode.activities
    makeJson(rawData)  
  }

  const makeJson = (rawData)=>{         
    let arr = []
   
    let onlyRole = []

    rawData.forEach(obj => { 
     {
            arr.push({ title: obj.Activity_Name, id: obj.Activity_ID, discription: obj.Activity_Desc })          
      }});   
    
    if(props.clickType){
      arr.forEach(obj=>{
        if(obj.title.toLowerCase().includes(props.clickType))
        {onlyRole.push(obj)}
      })
      arr = onlyRole
    } 
    
    console.log(arr)
    setSelectionData(arr)
  }

  const clickHandeler = (event, newValue) => { 
    removeSameRole(newValue)       
     
    setVal(newValue)
    // handleLinkActivityError(newValue)
  }
  
  useEffect(() => {
      
    console.log(val)  
    store.dispatch({type:'CHANGE_SELECTED_ACTIVITIES', activities:val})
    handleLinkActivityError(val)
  },[val]);

  const handleLinkActivityError= (newValue)=>{
   // let error = {...this.state.error}
    if (!newValue || newValue === "" || newValue.length === 0)  {
      setlinkactivitymsg( "Please select activity");
        setlinkactivityvalid(false) ;
    } else {
      setlinkactivityvalid(true)   
    }
    
   // this.setState({error});
}

  const removeActivities = (delVal)=>{
    setactivitiesToRemove(prevArray => [...prevArray, delVal])  
    
  }
  useEffect(() => {
    store.dispatch({type:'CHANGE_REMOVE_ACTIVITIES', activities:activitiesToRemove})
}, [activitiesToRemove]);

  const removeSameRole=(newValue)=>{
     
    let arrayToDelete = []    
   newValue.forEach(obj =>{
      activitiesToRemove.forEach((obj2,idx)=>{
        if(obj2.id === obj.id)
        {
          arrayToDelete.push(idx)
        }
      })
    })
    if(arrayToDelete.length > 0){
      arrayToDelete.forEach(obj=>{
        activitiesToRemove.splice(obj, 1);
      })
    }
    store.dispatch({type:'CHANGE_REMOVE_ACTIVITIES', activities:arrayToDelete})
  }

  const valHtml = val.map((option, index) => {
    // This is to handle new options added by the user (allowed by freeSolo prop).
    const label = option.title || option;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setVal(val.filter(entry => entry !== option));
          removeActivities(option);
        }}        
      />
    );
  });

  return (
    <div style={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        freeSolo
        filterSelectedOptions
        options={selectionData}
        /*onChange={(e, newValue) => setVal(newValue)}*/
        onChange={(e, newValue) => clickHandeler(e, newValue)}
        // onBlur = {(e, newValue) => clickHandeler(e, newValue)}
        getOptionLabel={option => option.title}
        renderTags={() => {}}
        value={val}        
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select Role"
            margin="normal"
            fullWidth
          />
        )}
      />
    <div className="selectedTags">{valHtml}</div>
    <ValidationMessage valid={linkactivityvalid} message={linkactivitymsg} />
     {/* { 
     val.map((item, i) => <div className="role-desc">{item.title}: {item.discription}</div>)
     }       */}
    </div>
  );
}

