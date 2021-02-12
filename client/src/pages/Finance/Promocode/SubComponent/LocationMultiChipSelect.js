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
   const[linklocationvalid, setlinklocationvalid] = useState("")
  const[locationsToRemove, setlocationsToRemove] = useState([])
  const[checkUpdateData, setcheckUpdateData] = useState(true)
  const[linkactivitymsg, setlinkactivitymsg] = useState("")
 
  
  useEffect(() => {      
     
    if(firstRun === false){
      getLocationData()     
    } 

    },[store.getState()]);
    
    useEffect(() => {    
        
      if(checkUpdateData){         
     let storeData = store.getState().Promocode   
     if(Object.keys(storeData)){
      setcheckUpdateData(false)
      updateValueOfSelector(storeData.selecteddata.Training_Location_IDs)
     }
      
     }    
      });
  
      const updateValueOfSelector = (vals)=>{
       
        let result=[]
     let val=  vals + ','
        result=  getselectedLocationdetails(val)
        if(result !== ""){
        let newVal = result
        setVal(newVal)
      }
      }
      const getselectedLocationdetails=(vals)=>{
        
      let values=[];

      values=vals.split(',');
        let allactivities = store.getState().Promocode.traininglocations
      let    arrr=[];
         
      let finalOutput =
      values.map(selectedvalues => {
               
              let subActivities = (allactivities.map(item => {
                if (item.Training_Location_ID.toString() === selectedvalues) {
               arrr.push({ title: item.Training_Location_Name, id: item.Training_Location_ID, discription: item.Training_Location_Desc })
                  return arrr
                }
                else {
                  return false
                }
              }))
             
            })
            return arrr
    }
   
  const getLocationData = ()=>{
    setFirstRun(true)
    console.log(store.getState())
    let rawData = store.getState().Promocode.traininglocations
    makeJson(rawData)  
  }

  const makeJson = (rawData)=>{         
    let arr = []
   
    let onlyRole = []

    rawData.forEach(obj => { 
     {
        arr.push({ title: obj.Training_Location_Name, id: obj.Training_Location_ID, discription: obj.Training_Location_Desc })
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
    store.dispatch({type:'CHANGE_SELECTED_TRAINING_LOCATION', activities:val})
    handleLinkLocationError(val)
  },[val]);

  const handleLinkLocationError= (newValue)=>{
   // let error = {...this.state.error}
    if (!newValue || newValue === "" || newValue.length === 0)  {
      setlinkactivitymsg( "Please select location");
        setlinklocationvalid(false) ;
    } else {
      setlinklocationvalid(true)   
    }
    
   // this.setState({error});
}

  const removeLocations = (delVal)=>{
    setlocationsToRemove(prevArray => [...prevArray, delVal])  
    
  }
  useEffect(() => {
    store.dispatch({type:'CHANGE_REMOVE_TRAINING_LOCATION', activities:locationsToRemove})
}, [locationsToRemove]);

  const removeSameRole=(newValue)=>{
     
    let arrayToDelete = []    
   newValue.forEach(obj =>{
      locationsToRemove.forEach((obj2,idx)=>{
        if(obj2.id === obj.id)
        {
          arrayToDelete.push(idx)
        }
      })
    })
    if(arrayToDelete.length > 0){
      arrayToDelete.forEach(obj=>{
        locationsToRemove.splice(obj, 1);
      })
    }
    store.dispatch({type:'CHANGE_REMOVE_TRAINING_LOCATION', activities:arrayToDelete})
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
          removeLocations(option);
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
            placeholder="Select Training Location"
            margin="normal"
            fullWidth
          />
        )}
      />
    <div className="selectedTags">{valHtml}</div>
    <ValidationMessage valid={linklocationvalid} message={linkactivitymsg} />
     {/* { 
     val.map((item, i) => <div className="role-desc">{item.title}: {item.discription}</div>)
     }       */}
    </div>
  );
}

